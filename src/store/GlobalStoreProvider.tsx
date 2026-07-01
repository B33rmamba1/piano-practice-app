import React, { createContext, useContext, useReducer } from 'react';

export type NoteDetectedEvent = { pitch: number; time: Date; confidence: number; };
export type ScoreState = { currentScore: number; streak: number; totalNotesPlayed: number; };

interface GlobalState {
  targetNote: { pitch: number; keyName: string } | null;
  score: ScoreState;
  isLessonActive: boolean;
  appMode: 'lesson' | 'freeplay';
  lastDetectedEvent: NoteDetectedEvent | null;
}

const initialState: GlobalState = {
  targetNote: null,
  score: { currentScore: 0, streak: 0, totalNotesPlayed: 0 },
  isLessonActive: false,
  appMode: 'lesson',
  lastDetectedEvent: null,
};

const globalReducer = (state: GlobalState, action: any): GlobalState => {
  switch (action.type) {
    case 'SET_TARGET_NOTE':
      return { ...state, targetNote: action.payload, isLessonActive: true };
    case 'SET_MODE':
      return { ...state, appMode: action.payload };
    case 'HANDLE_NOTE_DETECTED':
      const detected = action.payload;
      if (detected && state.targetNote) {
        if (Math.abs(detected.pitch - state.targetNote.pitch) < 1 && detected.confidence > 0.7) {
          return { ...state, score: { currentScore: state.score.currentScore + 10, streak: state.score.streak + 1, totalNotesPlayed: state.score.totalNotesPlayed + 1 }, lastDetectedEvent: detected };
        } else {
          return { ...state, score: { currentScore: Math.max(0, state.score.currentScore - 5), streak: 0, totalNotesPlayed: state.score.totalNotesPlayed + 1 }, lastDetectedEvent: detected };
        }
      }
      return { ...state, lastDetectedEvent: detected };
    case 'END_LESSON':
      return { ...initialState };
    default:
      return state;
  }
};

interface GlobalStoreContextType { state: GlobalState; dispatch: React.Dispatch<any>; }
const GlobalStateContext = createContext<GlobalStoreContextType>({ state: initialState, dispatch: () => {} });

export const GlobalStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return <GlobalStateContext.Provider value={{ state, dispatch }}>{children}</GlobalStateContext.Provider>;
};

export const useGlobalStore = () => useContext(GlobalStateContext);
