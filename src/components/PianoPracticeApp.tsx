import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GlobalStoreProvider, useGlobalStore } from '../store/GlobalStoreProvider';
import { useAudioContext } from '../hooks/useAudioContext';
import { kidsSongs, Song } from '../data/songs';
import { midiToNoteName } from '../utils/pitchDetector';
import SongScene from './SongScene';
import '../scenes.css';

// ═══════════════════════════════════════════════════════════════
// Note color mapping (Boomwhacker-inspired)
// ═══════════════════════════════════════════════════════════════
const NOTE_COLORS: Record<number, string> = {
  0: '#FF4136',  // C  - Red
  1: '#FF6B35',  // C# - Red-Orange
  2: '#FF851B',  // D  - Orange
  3: '#FFB700',  // D# - Amber
  4: '#FFDC00',  // E  - Yellow
  5: '#2ECC40',  // F  - Green
  6: '#01C08B',  // F# - Teal
  7: '#0074D9',  // G  - Blue
  8: '#5B7FFF',  // G# - Blue-Purple
  9: '#7B2FBE',  // A  - Purple
  10: '#B10DC9', // A# - Magenta
  11: '#FF69B4', // B  - Pink
};

function noteColor(midi: number): string {
  return NOTE_COLORS[midi % 12] || '#888';
}

function noteLabel(midi: number): string {
  return midiToNoteName(midi);
}

// ═══════════════════════════════════════════════════════════════
// Screen types
// ═══════════════════════════════════════════════════════════════
type Screen = 'home' | 'practice' | 'results';

// ═══════════════════════════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════════════════════════
interface HomeScreenProps {
  onSelectSong: (song: Song) => void;
  micActive: boolean;
  micDenied: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectSong, micActive, micDenied }) => {
  const beginnerSongs = kidsSongs.filter(s => s.difficulty === 'beginner');
  const intermediateSongs = kidsSongs.filter(s => s.difficulty === 'intermediate');

  return (
    <div>
      <div className="home-header">
        <h1>Piano Practice</h1>
        <p>Pick a song and play along!</p>
        <div style={{ marginTop: 12 }}>
          <span className={`mic-badge ${micDenied ? 'off' : micActive ? 'on' : 'off'}`}>
            {micDenied ? '🚫 Mic blocked' : micActive ? '🎤 Microphone ready' : '⏳ Starting mic...'}
          </span>
        </div>
      </div>

      <div className="difficulty-section">
        <div className="difficulty-label">⭐ Beginner</div>
        <div className="songs-grid">
          {beginnerSongs.map(song => (
            <div key={song.id} className="song-card-home" onClick={() => onSelectSong(song)}>
  		<SongScene songId={song.id} height={80} />
 		 <div className="title">{song.title}</div>
              <div className="meta">
                <span className="note-count-badge">{song.notes.length} notes</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="difficulty-section">
        <div className="difficulty-label">⭐⭐ Intermediate</div>
        <div className="songs-grid">
          {intermediateSongs.map(song => (
            <div key={song.id} className="song-card-home" onClick={() => onSelectSong(song)}>
              <div className="title">{song.title}</div>
              <div className="meta">
                <span className="note-count-badge">{song.notes.length} notes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// NOTE HIGHWAY
// ═══════════════════════════════════════════════════════════════
interface NoteHighwayProps {
  song: Song;
  currentStep: number;
  playedSteps: Set<number>;
}

const NoteHighway: React.FC<NoteHighwayProps> = ({ song, currentStep, playedSteps }) => {
  const VISIBLE_BEFORE = 2;
  const VISIBLE_AFTER = 5;
  const start = Math.max(0, currentStep - VISIBLE_BEFORE);
  const end = Math.min(song.notes.length, currentStep + VISIBLE_AFTER + 1);
  const visible = song.notes.slice(start, end);

  return (
    <div className="highway-wrapper">
	<SongScene songId={song.id} height={120} />
      <div className="highway-label">Play the big note</div>
      <div className="note-highway">
        {visible.map((note, i) => {
          const actualIndex = start + i;
          const isCurrent = actualIndex === currentStep;
          const isPlayed = actualIndex < currentStep;
          const isUpcomingNear = actualIndex === currentStep + 1 || actualIndex === currentStep + 2;
          const wasCorrect = playedSteps.has(actualIndex);

          let className = 'highway-note';
          if (isCurrent) className += ' current';
          else if (isPlayed && wasCorrect) className += ' played-correct';
          else if (isPlayed) className += ' played';
          else if (isUpcomingNear) className += ' upcoming-near';

          return (
            <div
              key={actualIndex}
              className={className}
              style={{ backgroundColor: noteColor(note.pitch) }}
            >
              {noteLabel(note.pitch)}
            </div>
          );
        })}
      </div>
      <div className="play-prompt">
        {currentStep < song.notes.length ? (
          <>
            Play this note:
            <strong style={{ color: noteColor(song.notes[currentStep].pitch) }}>
              {noteLabel(song.notes[currentStep].pitch)}
            </strong>
          </>
        ) : (
          <strong>Song complete!</strong>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// COLORFUL KEYBOARD
// ═══════════════════════════════════════════════════════════════
const WHITE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];
const BLACK_POSITIONS: Record<number, number> = { 1: 31, 3: 81, 6: 177, 8: 227, 10: 277 };

interface KeyboardProps {
  targetMidi: number | null;
  detectedMidi: number | null;
}

const ColorKeyboard: React.FC<KeyboardProps> = ({ targetMidi, detectedMidi }) => {
  const startOctave = 3;
  const numOctaves = 3;
  const keyWidth = 46;
  const octaveWidth = 7 * keyWidth;

  return (
    <div className="keyboard-section">
      <div className="keyboard-scroll">
        <div className="piano" style={{ width: numOctaves * octaveWidth + 'px' }}>
          {Array.from({ length: numOctaves }, (_, octIdx) => {
            const oct = startOctave + octIdx;
            const baseLeft = octIdx * octaveWidth;

            return (
              <React.Fragment key={oct}>
                {/* White keys */}
                {WHITE_SEMITONES.map((semitone, i) => {
                  const midi = (oct + 1) * 12 + semitone;
                  const isTarget = targetMidi === midi;
                  const isDetected = detectedMidi === midi;
                  const isCorrectHit = isTarget && isDetected;
                  let cls = 'pk-white';
                  if (isCorrectHit) cls += ' detected';
                  else if (isTarget) cls += ' target';
                  else if (isDetected) cls += ' detected';

                  return (
                    <div
                      key={midi}
                      className={cls}
                      style={{
                        left: baseLeft + i * keyWidth,
                        position: 'absolute',
                        '--note-color': noteColor(midi),
                      } as React.CSSProperties}
                    >
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: noteColor(midi), opacity: 0.5,
                        marginBottom: 4, display: 'block',
                      }} />
                      {semitone === 0 && <span>C{oct + 1}</span>}
                    </div>
                  );
                })}
                {/* Black keys */}
                {[1, 3, 6, 8, 10].map(semitone => {
                  const midi = (oct + 1) * 12 + semitone;
                  const isTarget = targetMidi === midi;
                  const isDetected = detectedMidi === midi;
                  let cls = 'pk-black';
                  if (isTarget) cls += ' target';
                  if (isDetected) cls += ' detected';

                  return (
                    <div
                      key={midi}
                      className={cls}
                      style={{
                        left: baseLeft + (BLACK_POSITIONS[semitone] ?? 0),
                        '--note-color': noteColor(midi),
                      } as React.CSSProperties}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// FEEDBACK ANIMATION
// ═══════════════════════════════════════════════════════════════
interface FeedbackOverlayProps {
  trigger: number; // changes to re-trigger
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ trigger }) => {
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState('');
  const [cls, setCls] = useState('');

  useEffect(() => {
    if (trigger === 0) return;
    const options = [
      { text: 'Perfect!', cls: 'perfect' },
      { text: 'Great!', cls: 'great' },
      { text: 'Nice!', cls: 'nice' },
      { text: 'Awesome!', cls: 'perfect' },
    ];
    const pick = options[Math.floor(Math.random() * options.length)];
    setLabel(pick.text);
    setCls(pick.cls);
    setShow(true);
    const t = setTimeout(() => setShow(false), 800);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!show) return null;
  return <div className={`feedback-flash ${cls}`}>{label}</div>;
};

// ═══════════════════════════════════════════════════════════════
// RESULTS SCREEN
// ═══════════════════════════════════════════════════════════════
interface ResultsScreenProps {
  song: Song;
  correctCount: number;
  totalNotes: number;
  score: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  song, correctCount, totalNotes, score, onPlayAgain, onHome
}) => {
  const pct = totalNotes > 0 ? Math.round((correctCount / totalNotes) * 100) : 0;
  const stars = pct >= 90 ? '⭐⭐⭐' : pct >= 70 ? '⭐⭐' : pct >= 40 ? '⭐' : '🎵';
  const message = pct >= 90 ? 'Amazing job!' : pct >= 70 ? 'Great work!' : pct >= 40 ? 'Nice try!' : 'Keep practicing!';

  return (
    <div className="results-screen">
      <div className="results-stars">{stars}</div>
      <h1>{message}</h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>{song.title}</p>

      <div className="results-stats">
        <div className="results-stat">
          <div className="big" style={{ color: '#7B2FBE' }}>{score}</div>
          <div className="desc">Score</div>
        </div>
        <div className="results-stat">
          <div className="big" style={{ color: '#01C08B' }}>{pct}%</div>
          <div className="desc">Accuracy</div>
        </div>
        <div className="results-stat">
          <div className="big" style={{ color: '#FF851B' }}>{correctCount}/{totalNotes}</div>
          <div className="desc">Notes</div>
        </div>
      </div>

      <div className="results-buttons">
        <button className="btn btn-green" onClick={onPlayAgain}>🔄 Play Again</button>
        <button className="btn btn-purple" onClick={onHome}>🏠 Choose Another</button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// PRACTICE SCREEN (ties it all together)
// ═══════════════════════════════════════════════════════════════
interface PracticeScreenProps {
  song: Song;
  onBack: () => void;
  onComplete: (correct: number, total: number, score: number) => void;
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({ song, onBack, onComplete }) => {
  const { state, dispatch } = useGlobalStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [playedSteps, setPlayedSteps] = useState<Set<number>>(new Set());
  const [feedbackTrigger, setFeedbackTrigger] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCooldown, setWrongCooldown] = useState(false);
  const lastProcessedRef = useRef<number>(0);

  const detectedMidi = state.lastDetectedEvent?.pitch ?? null;
  const targetMidi = currentStep < song.notes.length ? song.notes[currentStep].pitch : null;

  // Set first target note
  useEffect(() => {
    if (song.notes.length > 0) {
      dispatch({
        type: 'SET_TARGET_NOTE',
        payload: { pitch: song.notes[0].pitch, keyName: noteLabel(song.notes[0].pitch) },
      });
    }
    return () => { dispatch({ type: 'END_LESSON' }); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Note detection logic — waits for correct note
  useEffect(() => {
    if (detectedMidi === null || targetMidi === null) return;
    if (currentStep >= song.notes.length) return;

    // Debounce — don't process the same detection timestamp twice
    const now = Date.now();
    if (now - lastProcessedRef.current < 200) return;

    if (detectedMidi === targetMidi) {
      lastProcessedRef.current = now;
      // Correct!
      setPlayedSteps(prev => new Set(prev).add(currentStep));
      setCorrectCount(prev => prev + 1);
      setFeedbackTrigger(prev => prev + 1);
      dispatch({ type: 'HANDLE_NOTE_DETECTED', payload: state.lastDetectedEvent });

      const nextStep = currentStep + 1;
      if (nextStep >= song.notes.length) {
        // Song done!
        setTimeout(() => {
          onComplete(correctCount + 1, song.notes.length, state.score.currentScore + 10);
        }, 800);
      } else {
        setCurrentStep(nextStep);
        dispatch({
          type: 'SET_TARGET_NOTE',
          payload: { pitch: song.notes[nextStep].pitch, keyName: noteLabel(song.notes[nextStep].pitch) },
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectedMidi]);

  const progress = Math.round((currentStep / song.notes.length) * 100);

  return (
    <div className="practice-screen">
      <FeedbackOverlay trigger={feedbackTrigger} />

      {/* Top bar */}
      <div className="practice-topbar">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="song-info">
          <h2>{song.title}</h2>
          <span className="progress-text">Note {currentStep + 1} of {song.notes.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: progress + '%' }} />
      </div>

      {/* Note Highway */}
      <NoteHighway song={song} currentStep={currentStep} playedSteps={playedSteps} />

      {/* Keyboard */}
      <ColorKeyboard targetMidi={targetMidi} detectedMidi={detectedMidi} />

      {/* Detected note + score */}
      <div className="detected-display">
        {detectedMidi ? (
          <span>Heard: <span className="heard">{noteLabel(detectedMidi)}</span></span>
        ) : (
          <span className="waiting-dots">Listening</span>
        )}
      </div>

      <div className="score-bar">
        <div className="score-box score">
          <div className="val">{state.score.currentScore}</div>
          <div className="label">Score</div>
        </div>
        <div className="score-box streak">
          <div className="val">{state.score.streak} 🔥</div>
          <div className="label">Streak</div>
        </div>
        <div className="score-box notes">
          <div className="val">{correctCount}</div>
          <div className="label">Correct</div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// APP CONTENT (screen router)
// ═══════════════════════════════════════════════════════════════
const AppContent: React.FC = () => {
  const { dispatch } = useGlobalStore();
  const { streamActive, permissionDenied } = useAudioContext();

  const [screen, setScreen] = useState<Screen>('home');
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [resultsData, setResultsData] = useState({ correct: 0, total: 0, score: 0 });

  const handleSelectSong = (song: Song) => {
    setActiveSong(song);
    dispatch({ type: 'END_LESSON' }); // reset state
    setScreen('practice');
  };

  const handleComplete = (correct: number, total: number, score: number) => {
    setResultsData({ correct, total, score });
    setScreen('results');
  };

  const handleBack = () => {
    dispatch({ type: 'END_LESSON' });
    setScreen('home');
  };

  const handlePlayAgain = () => {
    dispatch({ type: 'END_LESSON' });
    setScreen('practice');
  };

  return (
    <div className="app-shell">
      {screen === 'home' && (
        <HomeScreen
          onSelectSong={handleSelectSong}
          micActive={streamActive}
          micDenied={permissionDenied}
        />
      )}

      {screen === 'practice' && activeSong && (
        <PracticeScreen
          key={activeSong.id + Date.now()}
          song={activeSong}
          onBack={handleBack}
          onComplete={handleComplete}
        />
      )}

      {screen === 'results' && activeSong && (
        <ResultsScreen
          song={activeSong}
          correctCount={resultsData.correct}
          totalNotes={resultsData.total}
          score={resultsData.score}
          onPlayAgain={handlePlayAgain}
          onHome={handleBack}
        />
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════
const PianoPracticeApp: React.FC = () => (
  <GlobalStoreProvider>
    <AppContent />
  </GlobalStoreProvider>
);

export default PianoPracticeApp;
