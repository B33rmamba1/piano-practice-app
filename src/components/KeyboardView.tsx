import React from 'react';
import { useGlobalStore } from '../store/GlobalStoreProvider';

const getNoteNameFromMidi = (midi: number): string => {
  const notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  return notes[midi % 12];
};

const KeyboardView: React.FC = () => {
  const { state } = useGlobalStore();
  const targetKeyName = state.targetNote ? getNoteNameFromMidi(state.targetNote.pitch) : null;
  const playedKeyName = state.lastDetectedEvent ? getNoteNameFromMidi(state.lastDetectedEvent.pitch) : null;
  const whiteKeys = ['C','D','E','F','G','A','B'];

  return (
    <div style={{ display: 'flex', gap: '4px', marginTop: '20px' }}>
      {whiteKeys.map(key => (
        <button key={key} style={{
          width: '50px', height: '150px', backgroundColor:
            key === targetKeyName ? '#90EE90' :
            key === playedKeyName ? '#87CEEB' : 'white',
          border: '1px solid #333', borderRadius: '0 0 4px 4px', cursor: 'default'
        }}>
          {key}
        </button>
      ))}
    </div>
  );
};

export default KeyboardView;
