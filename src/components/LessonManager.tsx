import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../store/GlobalStoreProvider';

const getNoteNameFromMidi = (midi: number): string => {
  const notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  const octave = Math.floor(midi / 12) - 1;
  return notes[midi % 12] + octave;
};

const LessonManager: React.FC = () => {
  const { dispatch, state } = useGlobalStore();
  const [currentStep, setCurrentStep] = useState(0);
  const scaleSequence = [60, 62, 64, 65, 67];

  useEffect(() => {
    if (state.appMode !== 'lesson' || !state.isLessonActive) return;
    let step = 0;
    dispatch({ type: 'SET_TARGET_NOTE', payload: { pitch: scaleSequence[0], keyName: getNoteNameFromMidi(scaleSequence[0]) } });
    const intervalId = setInterval(() => {
      step++;
      if (step >= scaleSequence.length) { clearInterval(intervalId); return; }
      dispatch({ type: 'SET_TARGET_NOTE', payload: { pitch: scaleSequence[step], keyName: getNoteNameFromMidi(scaleSequence[step]) } });
      setCurrentStep(step);
    }, 800);
    return () => clearInterval(intervalId);
  }, [state.appMode, state.isLessonActive]);

  return (
    <div>
      <h3>Guided Lesson: C Major Scale</h3>
      <p>Step: {currentStep + 1} / {scaleSequence.length}</p>
      <button onClick={() => dispatch({ type: 'SET_MODE', payload: 'lesson' })}>Lesson Mode</button>
      <button onClick={() => dispatch({ type: 'SET_MODE', payload: 'freeplay' })}>Free Play Mode</button>
      <button onClick={() => dispatch({ type: 'SET_TARGET_NOTE', payload: { pitch: scaleSequence[0], keyName: 'C4' } })}>Start Lesson</button>
    </div>
  );
};

export default LessonManager;
