import React, { useState, useEffect, useRef } from 'react';
import { GlobalStoreProvider, useGlobalStore } from '../store/GlobalStoreProvider';
import { useAudioContext } from '../hooks/useAudioContext';
import { kidsSongs, Song } from '../data/songs';
import { midiToNoteName } from '../utils/pitchDetector';

// ─── Piano Keyboard ───────────────────────────────────────────────────────────

const WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11]; // C D E F G A B
const BLACK_KEY_OFFSETS: Record<number, number> = { 1: 36, 3: 94, 6: 206, 8: 264, 10: 322 };

const NOTE_NAMES_SHORT = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

interface KeyboardProps {
  targetMidi: number | null;
  detectedMidi: number | null;
  startOctave?: number;
  numOctaves?: number;
}

const PianoKeyboard: React.FC<KeyboardProps> = ({
  targetMidi, detectedMidi, startOctave = 3, numOctaves = 3
}) => {
  const keys: { midi: number; isBlack: boolean; left?: number }[] = [];

  for (let oct = startOctave; oct < startOctave + numOctaves; oct++) {
    WHITE_KEYS.forEach(semitone => {
      keys.push({ midi: oct * 12 + semitone + 12, isBlack: false });
    });
  }

  const whiteKeys = keys.filter(k => !k.isBlack);

  return (
    <div className="keyboard-container">
      <div className="keyboard" style={{ width: whiteKeys.length * 54 + 'px' }}>
        {Array.from({ length: numOctaves }, (_, octIdx) => {
          const oct = startOctave + octIdx;
          const baseLeft = octIdx * 7 * 54;

          return (
            <React.Fragment key={oct}>
              {WHITE_KEYS.map((semitone, i) => {
                const midi = oct * 12 + semitone + 12;
                const isTarget = targetMidi === midi;
                const isDetected = detectedMidi === midi;
                const isCorrect = isTarget && isDetected;
                return (
                  <div
                    key={midi}
                    className={`key-white${isCorrect ? ' correct' : isTarget ? ' target' : isDetected ? ' played' : ''}`}
                    style={{ left: baseLeft + i * 54, position: 'absolute' }}
                  >
                    {semitone === 0 && <span>C{oct}</span>}
                  </div>
                );
              })}
              {[1, 3, 6, 8, 10].map(semitone => {
                const midi = oct * 12 + semitone + 12;
                const isTarget = targetMidi === midi;
                const isDetected = detectedMidi === midi;
                const offset = BLACK_KEY_OFFSETS[semitone] ?? 0;
                return (
                  <div
                    key={midi}
                    className={`key-black${isTarget ? ' target' : isDetected ? ' played' : ''}`}
                    style={{ left: baseLeft + offset }}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// ─── Song Selector ────────────────────────────────────────────────────────────

interface SongSelectorProps {
  selectedId: string | null;
  onSelect: (song: Song) => void;
}

const SongSelector: React.FC<SongSelectorProps> = ({ selectedId, onSelect }) => {
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate'>('all');

  const filtered = kidsSongs.filter(s => filter === 'all' || s.difficulty === filter);

  return (
    <div>
      <div className="mode-tabs" style={{ marginBottom: 12 }}>
        {(['all', 'beginner', 'intermediate'] as const).map(f => (
          <button key={f} className={`mode-tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? '🎵 All' : f === 'beginner' ? '⭐ Beginner' : '⭐⭐ Intermediate'}
          </button>
        ))}
      </div>
      <div className="song-list">
        {filtered.map(song => (
          <div
            key={song.id}
            className={`song-card${selectedId === song.id ? ' selected' : ''}`}
            onClick={() => onSelect(song)}
          >
            <div className="song-title">{song.title}</div>
            <span className={`difficulty-badge ${song.difficulty}`}>
              {song.difficulty === 'beginner' ? '⭐ Beginner' : '⭐⭐ Intermediate'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main App Content ─────────────────────────────────────────────────────────

const AppContent: React.FC = () => {
  const { state, dispatch } = useGlobalStore();
  const { streamActive, permissionDenied } = useAudioContext();

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState<'perfect' | 'good' | 'tryagain' | null>(null);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const detectedMidi = state.lastDetectedEvent?.pitch ?? null;
  const targetMidi = state.targetNote?.pitch ?? null;

  // Watch for correct note detection
  useEffect(() => {
    if (!isPlaying || !selectedSong || targetMidi === null || detectedMidi === null) return;
    const diff = Math.abs(detectedMidi - targetMidi);
    if (diff === 0) {
      setFeedback('perfect');
      setTimeout(advanceStep, 600);
    } else if (diff <= 1) {
      setFeedback('good');
    } else {
      setFeedback('tryagain');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectedMidi]);

  const advanceStep = () => {
    if (!selectedSong) return;
    setCurrentStep(prev => {
      const next = prev + 1;
      if (next >= selectedSong.notes.length) {
        // Song complete!
        setIsPlaying(false);
        setFeedback(null);
        dispatch({ type: 'END_LESSON' });
        return 0;
      }
      dispatch({
        type: 'SET_TARGET_NOTE',
        payload: {
          pitch: selectedSong.notes[next].pitch,
          keyName: midiToNoteName(selectedSong.notes[next].pitch),
        },
      });
      return next;
    });
  };

  const startSong = (song: Song) => {
    setSelectedSong(song);
    setCurrentStep(0);
    setIsPlaying(true);
    setFeedback(null);
    dispatch({
      type: 'SET_TARGET_NOTE',
      payload: { pitch: song.notes[0].pitch, keyName: midiToNoteName(song.notes[0].pitch) },
    });
  };

  const stopSong = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setFeedback(null);
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    dispatch({ type: 'END_LESSON' });
  };

  const progress = selectedSong ? Math.round((currentStep / selectedSong.notes.length) * 100) : 0;

  return (
    <div className="app-wrapper">
      {/* Header */}
      <div className="app-header">
        <h1>🎹 Piano Practice!</h1>
        <p>Pick a song and play along with your keyboard!</p>
        <div className={`mic-status ${streamActive ? 'active' : 'inactive'}`}>
          {permissionDenied
            ? '🚫 Microphone blocked — please allow access'
            : streamActive
            ? '🎤 Microphone ready'
            : '⏳ Starting microphone...'}
        </div>
      </div>

      {/* Song Selector */}
      <div className="card purple">
        <h2>🎵 Choose a Song</h2>
        <SongSelector
          selectedId={selectedSong?.id ?? null}
          onSelect={song => { if (!isPlaying) startSong(song); else { stopSong(); setTimeout(() => startSong(song), 100); } }}
        />
      </div>

      {/* Now Playing */}
      {selectedSong && (
        <div className="card orange">
          <h2>▶️ Now Playing: {selectedSong.title}</h2>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: progress + '%' }} />
          </div>
          <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: 12 }}>
            Note {currentStep + 1} of {selectedSong.notes.length}
          </p>
          <div className="step-dots">
            {selectedSong.notes.map((_, i) => (
              <div key={i} className={`step-dot${i < currentStep ? ' done' : i === currentStep ? ' current' : ''}`} />
            ))}
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            {isPlaying
              ? <button className="btn btn-orange" onClick={stopSong}>⏹ Stop</button>
              : <button className="btn btn-green" onClick={() => startSong(selectedSong)}>▶️ Restart</button>
            }
          </div>
        </div>
      )}

      {/* Keyboard */}
      <div className="card blue">
        <h2>🎹 Keyboard</h2>
        {targetMidi !== null && (
          <p style={{ marginBottom: 8, fontSize: '1.1rem' }}>
            🎯 Play: <strong style={{ color: '#9B59B6', fontSize: '1.4rem' }}>{midiToNoteName(targetMidi)}</strong>
          </p>
        )}
        <PianoKeyboard
          targetMidi={targetMidi}
          detectedMidi={detectedMidi}
          startOctave={3}
          numOctaves={3}
        />
      </div>

      {/* Feedback */}
      <div className="card green">
        <h2>⭐ How Am I Doing?</h2>
        <div className="feedback-display">
          <div className="detected-note">
            {detectedMidi ? midiToNoteName(detectedMidi) : '—'}
          </div>
          <div className={`feedback-message ${feedback ?? ''}`}>
            {feedback === 'perfect' ? '🌟 Perfect!' : feedback === 'good' ? '👍 Close!' : feedback === 'tryagain' ? '🎵 Try again!' : isPlaying ? '🎧 Listening...' : '🎹 Pick a song to start!'}
          </div>
          <div className="score-row">
            <div className="score-item">
              <div className="score-value">{state.score.currentScore}</div>
              <div className="score-label">Score</div>
            </div>
            <div className="score-item">
              <div className="score-value">🔥 {state.score.streak}</div>
              <div className="score-label">Streak</div>
            </div>
            <div className="score-item">
              <div className="score-value">{state.score.totalNotesPlayed}</div>
              <div className="score-label">Notes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Root with Provider ───────────────────────────────────────────────────────

const PianoPracticeApp: React.FC = () => (
  <GlobalStoreProvider>
    <AppContent />
  </GlobalStoreProvider>
);

export default PianoPracticeApp;
