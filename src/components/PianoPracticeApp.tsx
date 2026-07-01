import React from 'react';
import { GlobalStoreProvider } from '../store/GlobalStoreProvider';
import LessonManager from './LessonManager';
import PlaylistManager from './PlaylistManager';
import KeyboardView from './KeyboardView';
import FeedbackPanel from './FeedbackPanel';

const PianoPracticeApp: React.FC = () => {
  return (
    <GlobalStoreProvider>
      <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <h1>🎹 Piano Practice Companion</h1>
        <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
          <div style={{ flex: 1 }}><LessonManager /></div>
          <div style={{ flex: 1 }}><PlaylistManager /></div>
        </div>
        <div style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '30px' }}>
          <KeyboardView />
          <FeedbackPanel />
        </div>
      </div>
    </GlobalStoreProvider>
  );
};

export default PianoPracticeApp;
