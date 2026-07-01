import { useState, useEffect, useCallback, useRef } from 'react';
import { useGlobalStore } from '../store/GlobalStoreProvider';
import { NoteDetectedEvent } from '../store/GlobalStoreProvider';

export const useAudioContext = () => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const { dispatch } = useGlobalStore();

  const analyzeAudio = useCallback((analyser: AnalyserNode, ctx: AudioContext) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function process() {
      requestAnimationFrame(process);
      analyser.getByteFrequencyData(dataArray);
      let maxIndex = 0;
      let maxValue = 0;
      for (let i = 0; i < bufferLength; i++) {
        if (dataArray[i] > maxValue) { maxValue = dataArray[i]; maxIndex = i; }
      }
      const frequency = maxIndex * (ctx.sampleRate / analyser.fftSize);
      if (frequency < 20) return;
      const midiPitch = Math.round(69 + 12 * Math.log2(frequency / 440));
      if (midiPitch < 36 || midiPitch > 84) return;
      const noteEvent: NoteDetectedEvent = {
        pitch: midiPitch,
        time: new Date(),
        confidence: Math.min(1.0, maxValue / 255),
      };
      dispatch({ type: 'HANDLE_NOTE_DETECTED', payload: noteEvent });
    }
    process();
  }, [dispatch]);

  useEffect(() => {
    let audioContextInstance: AudioContext | null = null;
    let stream: MediaStream | null = null;

    const initializeAndStart = async () => {
      try {
        audioContextInstance = new AudioContext();
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioContextInstance.createMediaStreamSource(stream);
        const analyserNode = audioContextInstance.createAnalyser();
        source.connect(analyserNode);
        analyserRef.current = analyserNode;
        setAudioCtx(audioContextInstance);
        setStreamActive(true);
        analyzeAudio(analyserNode, audioContextInstance);
      } catch (error) {
        console.error('Failed to initialize audio pipeline:', error);
      }
    };

    initializeAndStart();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
      audioContextInstance?.close();
    };
  }, [analyzeAudio]);

  return { audioCtx, streamActive };
};
