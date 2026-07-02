import React, { useState, useEffect, useRef } from 'react';
import { GlobalStoreProvider, useGlobalStore } from '../store/GlobalStoreProvider';
import { useAudioContext } from '../hooks/useAudioContext';
import { kidsSongs, Song } from '../data/songs';
import { midiToNoteName } from '../utils/pitchDetector';
import '../scenes.css';

// ═══════════════════════════════════════════════════════════════
// Constants & Helpers
// ═══════════════════════════════════════════════════════════════
const NOTE_COLORS: Record<number, string> = {
  0:'#FF4136',1:'#FF6B35',2:'#FF851B',3:'#FFB700',4:'#FFDC00',
  5:'#2ECC40',6:'#01C08B',7:'#0074D9',8:'#5B7FFF',9:'#7B2FBE',
  10:'#B10DC9',11:'#FF69B4',
};

function noteColor(midi: number): string { return NOTE_COLORS[midi % 12] || '#888'; }
function noteLabel(midi: number): string { return midiToNoteName(midi); }

// Default C-major hand position fingering
function fingerForNote(midi: number): number {
  const n = midi % 12;
  const map: Record<number,number> = {0:1,2:2,4:3,5:4,7:5,9:1,11:2};
  return map[n] || 3;
}

const FINGER_NAMES = ['','Thumb','Index','Middle','Ring','Pinky'];

// Staff position: 0=C4 (ledger), 2=E4 (bottom line), 10=F5 (top line)
function staffPosition(midi: number): number {
  const noteMap: Record<number,number> = {0:0,2:1,4:2,5:3,7:4,9:5,11:6};
  const octOffset = (Math.floor(midi/12) - 5) * 7;
  const semitone = midi % 12;
  const nearest = noteMap[semitone] ?? noteMap[semitone-1] ?? 3;
  return nearest + octOffset;
}

type Screen = 'home' | 'practice' | 'results';

// ═══════════════════════════════════════════════════════════════
// Song Scene Backgrounds (inlined)
// ═══════════════════════════════════════════════════════════════
const SCENE_CONFIG: Record<string, { bg: string; emoji: string }> = {
  'twinkle-twinkle':     { bg: 'linear-gradient(180deg, #0f1638, #1a237e, #283593)', emoji: '🌙⭐✨' },
  'happy-birthday':      { bg: 'linear-gradient(135deg, #CE93D8, #F48FB1, #FFE082)', emoji: '🎂🎈🎉' },
  'mary-had-a-little-lamb': { bg: 'linear-gradient(180deg, #81D4FA 45%, #66BB6A 45%)', emoji: '🐑🌸🌿' },
  'hot-cross-buns':      { bg: 'linear-gradient(180deg, #FFCCBC, #D7CCC8, #8D6E63)', emoji: '🍞🧁🔥' },
  'old-macdonald':       { bg: 'linear-gradient(180deg, #81D4FA 45%, #66BB6A 45%)', emoji: '🐄🐔🏠' },
  'row-row-row':         { bg: 'linear-gradient(180deg, #81D4FA 40%, #0288D1)', emoji: '⛵🌊☀️' },
  'baa-baa-black-sheep': { bg: 'linear-gradient(180deg, #81D4FA 45%, #66BB6A 45%)', emoji: '🐑🐑🧶' },
  'itsy-bitsy-spider':   { bg: 'linear-gradient(180deg, #78909C, #90A4AE, #546E7A)', emoji: '🕷️🌧️☀️' },
  'london-bridge':       { bg: 'linear-gradient(180deg, #B0BEC5 35%, #4FC3F7 35%)', emoji: '🌉🏰🇬🇧' },
  'you-are-my-sunshine': { bg: 'linear-gradient(180deg, #FFF9C4, #FFECB3, #81D4FA)', emoji: '☀️🌻💛' },
  'jingle-bells':        { bg: 'linear-gradient(180deg, #B0BEC5, #CFD8DC, #ECEFF1)', emoji: '🔔❄️🎄' },
  'frere-jacques':       { bg: 'linear-gradient(180deg, #1a237e, #5C6BC0, #FFB74D)', emoji: '🔔⛪🌅' },
  'when-the-saints':     { bg: 'linear-gradient(135deg, #FFD54F, #FFB300, #FF8F00)', emoji: '🎺✨🎶' },
  'oh-susanna':          { bg: 'linear-gradient(180deg, #1a237e, #E65100, #FFD54F)', emoji: '🪕🌵🤠' },
  'skip-to-my-lou':      { bg: 'linear-gradient(180deg, #81D4FA 45%, #A5D6A7 45%)', emoji: '🦋🌼💃' },
  'this-old-man':        { bg: 'linear-gradient(180deg, #81D4FA 40%, #8D6E63 70%)', emoji: '👴🦯🎵' },
  'ring-around-the-rosie': { bg: 'linear-gradient(180deg, #81D4FA 45%, #A5D6A7 45%)', emoji: '🌹💐🌸' },
  'head-shoulders':      { bg: 'linear-gradient(180deg, #E3F2FD, #BBDEFB, #81D4FA)', emoji: '🙆‍♀️🌈👣' },
  'if-youre-happy':      { bg: 'linear-gradient(135deg, #FFF9C4, #FFECB3, #FFE082)', emoji: '😊👏🎉' },
  'wheels-on-the-bus':   { bg: 'linear-gradient(180deg, #81D4FA 45%, #757575 65%)', emoji: '🚌🛞🏙️' },
  'abc-song':            { bg: 'linear-gradient(135deg, #E8EAF6, #C5CAE9, #9FA8DA)', emoji: '🔤📖🎵' },
  'hickory-dickory-dock': { bg: 'linear-gradient(180deg, #D7CCC8, #BCAAA4)', emoji: '🕐🐭⏰' },
  'jack-and-jill':       { bg: 'linear-gradient(180deg, #81D4FA 40%, #66BB6A)', emoji: '⛰️🪣💧' },
  'pop-goes-the-weasel': { bg: 'linear-gradient(135deg, #CE93D8, #F48FB1, #FFCC02)', emoji: '🤡📦🎉' },
  'yankee-doodle':       { bg: 'linear-gradient(180deg, #E3F2FD, #BBDEFB, #A5D6A7)', emoji: '🪶🐴🎵' },
};

const SceneBanner: React.FC<{songId: string; height?: number; showTitle?: boolean}> = ({songId, height=80, showTitle=false}) => {
  const cfg = SCENE_CONFIG[songId] || { bg: 'linear-gradient(135deg, #7B2FBE, #0074D9)', emoji: '🎵🎶🎹' };
  return (
    <div style={{
      background: cfg.bg, height, borderRadius: 12, display: 'flex',
      alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
      marginBottom: 8,
    }}>
      <span style={{ fontSize: height > 100 ? 40 : 28, letterSpacing: 8, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
        {cfg.emoji}
      </span>
      {showTitle && (
        <div style={{
          position: 'absolute', bottom: 8, width: '100%', textAlign: 'center',
          fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)',
          textShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}>{kidsSongs.find(s=>s.id===songId)?.title}</div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Sheet Music Staff
// ═══════════════════════════════════════════════════════════════
const STAFF_LINE_POSITIONS = [2, 4, 6, 8, 10]; // E4, G4, B4, D5, F5

const SheetMusicStaff: React.FC<{song: Song; currentStep: number}> = ({song, currentStep}) => {
  const VISIBLE = 8;
  const start = Math.max(0, currentStep - 1);
  const end = Math.min(song.notes.length, start + VISIBLE);
  const notes = song.notes.slice(start, end);

  const staffTop = 20;
  const lineSpacing = 10;
  const noteStartX = 80;
  const noteSpacing = 60;

  const yForPosition = (pos: number) => {
    return staffTop + (10 - pos) * (lineSpacing / 2);
  };

  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 8px', marginBottom: 12, overflow: 'hidden' }}>
      <svg width="100%" viewBox="0 0 580 80" style={{ display: 'block' }}>
        {/* Staff lines */}
        {STAFF_LINE_POSITIONS.map((pos, i) => (
          <line key={i} x1="10" y1={yForPosition(pos)} x2="570" y2={yForPosition(pos)}
            stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        ))}

        {/* Treble clef symbol */}
        <text x="20" y={yForPosition(4) + 6} fill="rgba(255,255,255,0.5)" fontSize="32"
          fontFamily="serif" style={{userSelect:'none'}}>𝄞</text>

        {/* Notes */}
        {notes.map((note, i) => {
          const actualIdx = start + i;
          const isCurrent = actualIdx === currentStep;
          const isPast = actualIdx < currentStep;
          const pos = staffPosition(note.pitch);
          const x = noteStartX + i * noteSpacing;
          const y = yForPosition(pos);
          const color = noteColor(note.pitch);
          const needsLedger = pos < 2 || pos > 10;

          return (
            <g key={actualIdx}>
              {/* Ledger lines for notes below/above staff */}
              {pos <= 0 && <line x1={x-10} y1={yForPosition(0)} x2={x+18} y2={yForPosition(0)} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />}
              {pos >= 12 && <line x1={x-10} y1={yForPosition(12)} x2={x+18} y2={yForPosition(12)} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />}

              {/* Note head */}
              <ellipse cx={x+4} cy={y} rx={7} ry={5}
                fill={isCurrent ? color : isPast ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.4)'}
                stroke={isCurrent ? 'white' : 'none'} strokeWidth={isCurrent ? 1.5 : 0}
                transform={`rotate(-10 ${x+4} ${y})`}
              />

              {/* Stem */}
              <line x1={x+11} y1={y} x2={x+11} y2={y - 28}
                stroke={isCurrent ? color : isPast ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)'}
                strokeWidth="1.5" />

              {/* Note name label */}
              <text x={x+4} y={y + 18} textAnchor="middle" fontSize="9"
                fill={isCurrent ? color : 'rgba(255,255,255,0.35)'} fontWeight={isCurrent ? 700 : 400}>
                {noteLabel(note.pitch).replace(/[0-9]/g,'')}
              </text>

              {/* Finger number */}
              {isCurrent && (
                <text x={x+4} y={y - 32} textAnchor="middle" fontSize="11"
                  fill={color} fontWeight="700">
                  {fingerForNote(note.pitch)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Hand Diagram (shows active finger)
// ═══════════════════════════════════════════════════════════════
const HandDiagram: React.FC<{activeFinger: number; noteColor: string}> = ({activeFinger, noteColor: color}) => {
  const fingers = [
    { id: 1, label: '1', x: 18, y: 30, h: 22, name: 'Thumb' },
    { id: 2, label: '2', x: 34, y: 14, h: 32, name: 'Index' },
    { id: 3, label: '3', x: 50, y: 8,  h: 36, name: 'Middle' },
    { id: 4, label: '4', x: 66, y: 14, h: 32, name: 'Ring' },
    { id: 5, label: '5', x: 82, y: 22, h: 26, name: 'Pinky' },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="120" height="85" viewBox="0 0 120 85" style={{ display: 'block', margin: '0 auto' }}>
        {/* Palm */}
        <ellipse cx="55" cy="68" rx="35" ry="16" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {/* Fingers */}
        {fingers.map(f => {
          const isActive = f.id === activeFinger;
          return (
            <g key={f.id}>
              <rect x={f.x - 6} y={f.y} width={14} height={f.h} rx={6}
                fill={isActive ? color : 'rgba(255,255,255,0.08)'}
                stroke={isActive ? 'white' : 'rgba(255,255,255,0.15)'} strokeWidth={isActive ? 1.5 : 1}
              />
              <text x={f.x + 1} y={f.y + f.h/2 + 4} textAnchor="middle" fontSize="10"
                fill={isActive ? 'white' : 'rgba(255,255,255,0.4)'} fontWeight="700">
                {f.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ fontSize: 11, color: activeFinger ? color : 'rgba(255,255,255,0.4)', fontWeight: 700, marginTop: 2 }}>
        {activeFinger ? FINGER_NAMES[activeFinger] : ''}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Colorful Keyboard
// ═══════════════════════════════════════════════════════════════
const WHITE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];
const BLACK_POSITIONS: Record<number, number> = { 1: 31, 3: 81, 6: 177, 8: 227, 10: 277 };

const ColorKeyboard: React.FC<{targetMidi: number|null; detectedMidi: number|null}> = ({targetMidi, detectedMidi}) => {
  const startOctave = 3;
  const numOctaves = 3;
  const kw = 46;
  const ow = 7 * kw;

  return (
    <div className="keyboard-section">
      <div className="keyboard-scroll">
        <div className="piano" style={{ width: numOctaves * ow }}>
          {Array.from({length: numOctaves}, (_, oi) => {
            const oct = startOctave + oi;
            const bl = oi * ow;
            return (
              <React.Fragment key={oct}>
                {WHITE_SEMITONES.map((s, i) => {
                  const midi = (oct+1)*12+s;
                  const isT = targetMidi===midi;
                  const isD = detectedMidi===midi;
                  let cls = 'pk-white';
                  if (isT && isD) cls += ' detected';
                  else if (isT) cls += ' target';
                  else if (isD) cls += ' detected';
                  return (
                    <div key={midi} className={cls}
                      style={{left: bl+i*kw, position:'absolute', '--note-color': noteColor(midi)} as React.CSSProperties}>
                      <span style={{width:8,height:8,borderRadius:'50%',background:noteColor(midi),opacity:0.5,marginBottom:4,display:'block'}} />
                      {s===0 && <span>C{oct+1}</span>}
                    </div>
                  );
                })}
                {[1,3,6,8,10].map(s => {
                  const midi = (oct+1)*12+s;
                  const isT = targetMidi===midi;
                  const isD = detectedMidi===midi;
                  let cls = 'pk-black';
                  if (isT) cls += ' target';
                  if (isD) cls += ' detected';
                  return (
                    <div key={midi} className={cls}
                      style={{left: bl+(BLACK_POSITIONS[s]??0), '--note-color': noteColor(midi)} as React.CSSProperties} />
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
// Note Highway
// ═══════════════════════════════════════════════════════════════
const NoteHighway: React.FC<{song: Song; currentStep: number; playedSteps: Set<number>}> = ({song, currentStep, playedSteps}) => {
  const VB = 2, VA = 5;
  const start = Math.max(0, currentStep - VB);
  const end = Math.min(song.notes.length, currentStep + VA + 1);
  const visible = song.notes.slice(start, end);

  return (
    <div className="note-highway">
      {visible.map((note, i) => {
        const ai = start + i;
        const isCur = ai === currentStep;
        const isPast = ai < currentStep;
        const isNear = ai === currentStep+1 || ai === currentStep+2;
        const wasOk = playedSteps.has(ai);
        let cn = 'highway-note';
        if (isCur) cn += ' current';
        else if (isPast && wasOk) cn += ' played-correct';
        else if (isPast) cn += ' played';
        else if (isNear) cn += ' upcoming-near';
        return (
          <div key={ai} className={cn} style={{backgroundColor: noteColor(note.pitch)}}>
            <div>{noteLabel(note.pitch)}</div>
            {isCur && <div style={{fontSize:'0.6em',opacity:0.8}}>finger {fingerForNote(note.pitch)}</div>}
          </div>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Feedback Overlay
// ═══════════════════════════════════════════════════════════════
const FeedbackOverlay: React.FC<{trigger: number}> = ({trigger}) => {
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState('');
  const [cls, setCls] = useState('');
  useEffect(() => {
    if (!trigger) return;
    const opts = [{t:'Perfect!',c:'perfect'},{t:'Great!',c:'great'},{t:'Nice!',c:'nice'},{t:'Awesome!',c:'perfect'}];
    const p = opts[Math.floor(Math.random()*opts.length)];
    setLabel(p.t); setCls(p.c); setShow(true);
    const tm = setTimeout(()=>setShow(false), 800);
    return ()=>clearTimeout(tm);
  }, [trigger]);
  if (!show) return null;
  return <div className={`feedback-flash ${cls}`}>{label}</div>;
};

// ═══════════════════════════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════════════════════════
const HomeScreen: React.FC<{onSelectSong:(s:Song)=>void; micActive:boolean; micDenied:boolean}> = ({onSelectSong, micActive, micDenied}) => {
  const beginnerSongs = kidsSongs.filter(s => s.difficulty === 'beginner');
  const intermediateSongs = kidsSongs.filter(s => s.difficulty === 'intermediate');

  const renderGrid = (songs: Song[]) => (
    <div className="songs-grid">
      {songs.map(song => (
        <div key={song.id} className="song-card-home" onClick={() => onSelectSong(song)}>
          <SceneBanner songId={song.id} height={80} />
          <div className="title">{song.title}</div>
          <div className="meta"><span className="note-count-badge">{song.notes.length} notes</span></div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="home-header">
        <h1>Kitty War's Piano Playground</h1>
        <p>Pick a song and play along!</p>
        <div style={{marginTop:12}}>
          <span className={`mic-badge ${micDenied ? 'off' : micActive ? 'on' : 'off'}`}>
            {micDenied ? '🚫 Mic blocked' : micActive ? '🎤 Microphone ready' : '⏳ Starting mic...'}
          </span>
        </div>
      </div>
      <div className="difficulty-section">
        <div className="difficulty-label">⭐ Beginner</div>
        {renderGrid(beginnerSongs)}
      </div>
      <div className="difficulty-section">
        <div className="difficulty-label">⭐⭐ Intermediate</div>
        {renderGrid(intermediateSongs)}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// PRACTICE SCREEN
// ═══════════════════════════════════════════════════════════════
const PracticeScreen: React.FC<{song:Song; onBack:()=>void; onComplete:(c:number,t:number,s:number)=>void}> = ({song, onBack, onComplete}) => {
  const {state, dispatch} = useGlobalStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [playedSteps, setPlayedSteps] = useState<Set<number>>(new Set());
  const [feedbackTrigger, setFeedbackTrigger] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const lastRef = useRef<number>(0);

  const detectedMidi = state.lastDetectedEvent?.pitch ?? null;
  const targetMidi = currentStep < song.notes.length ? song.notes[currentStep].pitch : null;
  const activeFinger = targetMidi !== null ? fingerForNote(targetMidi) : 0;

  useEffect(() => {
    if (song.notes.length > 0) {
      dispatch({type:'SET_TARGET_NOTE', payload:{pitch:song.notes[0].pitch, keyName:noteLabel(song.notes[0].pitch)}});
    }
    return () => { dispatch({type:'END_LESSON'}); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (detectedMidi===null || targetMidi===null || currentStep>=song.notes.length) return;
    const now = Date.now();
    if (now - lastRef.current < 200) return;
    if (detectedMidi === targetMidi) {
      lastRef.current = now;
      setPlayedSteps(prev => new Set(prev).add(currentStep));
      setCorrectCount(prev => prev + 1);
      setFeedbackTrigger(prev => prev + 1);
      dispatch({type:'HANDLE_NOTE_DETECTED', payload:state.lastDetectedEvent});
      const next = currentStep + 1;
      if (next >= song.notes.length) {
        setTimeout(() => onComplete(correctCount+1, song.notes.length, state.score.currentScore+10), 800);
      } else {
        setCurrentStep(next);
        dispatch({type:'SET_TARGET_NOTE', payload:{pitch:song.notes[next].pitch, keyName:noteLabel(song.notes[next].pitch)}});
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
          <span className="progress-text">Note {currentStep+1} of {song.notes.length}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{width: progress+'%'}} />
      </div>

      {/* Scene banner */}
      <SceneBanner songId={song.id} height={100} showTitle />

      {/* Sheet Music Staff */}
      <SheetMusicStaff song={song} currentStep={currentStep} />

      {/* Highway + Hand side by side */}
      <div className="highway-wrapper">
        <div style={{display:'flex', alignItems:'center', gap: 16}}>
          <div style={{flex:1}}>
            <div className="highway-label">Play the big note</div>
            <NoteHighway song={song} currentStep={currentStep} playedSteps={playedSteps} />
            {targetMidi !== null && (
              <div className="play-prompt">
                Play: <strong style={{color: noteColor(targetMidi), fontSize:'1.4rem'}}>{noteLabel(targetMidi)}</strong>
                <span style={{marginLeft:8, fontSize:'0.9rem', opacity:0.6}}>
                  (finger {fingerForNote(targetMidi)} — {FINGER_NAMES[fingerForNote(targetMidi)]})
                </span>
              </div>
            )}
          </div>
          <HandDiagram activeFinger={activeFinger} noteColor={targetMidi ? noteColor(targetMidi) : '#888'} />
        </div>
      </div>

      {/* Keyboard */}
      <ColorKeyboard targetMidi={targetMidi} detectedMidi={detectedMidi} />

      {/* Status */}
      <div className="detected-display">
        {detectedMidi ? <span>Heard: <span className="heard">{noteLabel(detectedMidi)}</span></span>
         : <span className="waiting-dots">Listening</span>}
      </div>

      <div className="score-bar">
        <div className="score-box score"><div className="val">{state.score.currentScore}</div><div className="label">Score</div></div>
        <div className="score-box streak"><div className="val">{state.score.streak} 🔥</div><div className="label">Streak</div></div>
        <div className="score-box notes"><div className="val">{correctCount}</div><div className="label">Correct</div></div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// RESULTS SCREEN
// ═══════════════════════════════════════════════════════════════
const ResultsScreen: React.FC<{song:Song; correctCount:number; totalNotes:number; score:number; onPlayAgain:()=>void; onHome:()=>void}> = ({
  song, correctCount, totalNotes, score, onPlayAgain, onHome
}) => {
  const pct = totalNotes > 0 ? Math.round((correctCount/totalNotes)*100) : 0;
  const stars = pct>=90 ? '⭐⭐⭐' : pct>=70 ? '⭐⭐' : pct>=40 ? '⭐' : '🎵';
  const msg = pct>=90 ? 'Amazing job!' : pct>=70 ? 'Great work!' : pct>=40 ? 'Nice try!' : 'Keep practicing!';
  return (
    <div className="results-screen">
      <SceneBanner songId={song.id} height={140} showTitle />
      <div className="results-stars">{stars}</div>
      <h1>{msg}</h1>
      <p style={{color:'rgba(255,255,255,0.6)',fontSize:'1.1rem'}}>{song.title}</p>
      <div className="results-stats">
        <div className="results-stat"><div className="big" style={{color:'#7B2FBE'}}>{score}</div><div className="desc">Score</div></div>
        <div className="results-stat"><div className="big" style={{color:'#01C08B'}}>{pct}%</div><div className="desc">Accuracy</div></div>
        <div className="results-stat"><div className="big" style={{color:'#FF851B'}}>{correctCount}/{totalNotes}</div><div className="desc">Notes</div></div>
      </div>
      <div className="results-buttons">
        <button className="btn btn-green" onClick={onPlayAgain}>🔄 Play Again</button>
        <button className="btn btn-purple" onClick={onHome}>🏠 Choose Another</button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// APP CONTENT (screen router)
// ═══════════════════════════════════════════════════════════════
const AppContent: React.FC = () => {
  const {dispatch} = useGlobalStore();
  const {streamActive, permissionDenied} = useAudioContext();
  const [screen, setScreen] = useState<Screen>('home');
  const [activeSong, setActiveSong] = useState<Song|null>(null);
  const [resultsData, setResultsData] = useState({correct:0,total:0,score:0});

  const handleSelectSong = (song: Song) => {
    setActiveSong(song); dispatch({type:'END_LESSON'}); setScreen('practice');
  };
  const handleComplete = (c:number,t:number,s:number) => {
    setResultsData({correct:c,total:t,score:s}); setScreen('results');
  };
  const handleBack = () => { dispatch({type:'END_LESSON'}); setScreen('home'); };
  const handlePlayAgain = () => { dispatch({type:'END_LESSON'}); setScreen('practice'); };

  return (
    <div className="app-shell">
      {screen==='home' && <HomeScreen onSelectSong={handleSelectSong} micActive={streamActive} micDenied={permissionDenied} />}
      {screen==='practice' && activeSong && <PracticeScreen key={activeSong.id+Date.now()} song={activeSong} onBack={handleBack} onComplete={handleComplete} />}
      {screen==='results' && activeSong && <ResultsScreen song={activeSong} correctCount={resultsData.correct} totalNotes={resultsData.total} score={resultsData.score} onPlayAgain={handlePlayAgain} onHome={handleBack} />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════
const PianoPracticeApp: React.FC = () => (
  <GlobalStoreProvider><AppContent /></GlobalStoreProvider>
);

export default PianoPracticeApp;
