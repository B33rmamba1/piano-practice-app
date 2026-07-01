import { useState, useEffect, useCallback, useRef } from 'react';
import { useGlobalStore } from '../store/GlobalStoreProvider';
import { detectPitchYIN, frequencyToMidi } from '../utils/pitchDetector';

export const useAudioContext = () => {
  const [streamActive, setStreamActive] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const { dispatch } = useGlobalStore();

  const analyzeAudio = useCallback(() => {
    const analyser = analyserRef.current;
    const ctx = audioCtxRef.current;
    if (!analyser || !ctx) return;

    const bufferSize = 2048;
    const buffer = new Float32Array(bufferSize);

    const process = () => {
      animFrameRef.current = requestAnimationFrame(process);
      analyser.getFloatTimeDomainData(buffer);

      // Check if there's actual audio signal (not just silence)
      let rms = 0;
      for (let i = 0; i < bufferSize; i++) rms += buffer[i] * buffer[i];
      rms = Math.sqrt(rms / bufferSize);
      if (rms < 0.01) return; // Too quiet, skip detection

      const result = detectPitchYIN(buffer, ctx.sampleRate, 0.15);
      if (!result) return;

      const { frequency, clarity } = result;
      if (clarity < 0.8) return; // Not confident enough

      // Filter to piano range (A0=21 to C8=108)
      const midi = frequencyToMidi(frequency);
      if (midi < 21 || midi > 108) return;

      dispatch({
        type: 'HANDLE_NOTE_DETECTED',
        payload: { pitch: midi, time: new Date(), confidence: clarity },
      });
    };

    process();
  }, [dispatch]);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const init = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ctx = new AudioContext();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;

        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);

        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        setStreamActive(true);
        analyzeAudio();
      } catch (err) {
        console.error('Microphone error:', err);
        setPermissionDenied(true);
      }
    };

    init();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      stream?.getTracks().forEach(t => t.stop());
      audioCtxRef.current?.close();
    };
  }, [analyzeAudio]);

  return { streamActive, permissionDenied };
};
