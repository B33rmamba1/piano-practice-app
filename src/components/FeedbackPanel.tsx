// src/components/FeedbackPanel.tsx
import React from 'react';
import { useGlobalStore } from '../store/GlobalStoreProvider';

/**
 * Displays immediate feedback (score, streak, accuracy messages).
 */
const FeedbackPanel: React.FC = () => {
  const { state } = useGlobalStore();

  return (
    <div className="feedback-panel">
      <h2>Feedback</h2>
      <p>Score: {state.score.currentScore}</p>
      <p>Streak: 🔥 {state.score.streak}</p>
      <p>Total Notes: {state.score.totalNotesPlayed}</p>

      {/* Displaying real-time feedback message */}
      {state.lastDetectedEvent && (
        <div className={`feedback-message ${state.lastDetectedEvent.confidence > 0.8 ? 'perfect' : 'needs-work'}`}>
          {state.lastDetectedEvent.pitch === state.targetNote?.pitch ? "Perfect!" : "Try again."}
        </div>
      )}
    </div>
  );
};

export default FeedbackPanel;