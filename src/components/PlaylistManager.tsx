// src/components/PlaylistManager.tsx
import React, { useState } from 'react';
import { useGlobalStore } from '../store/GlobalStoreProvider';
import { parseMidiFile, NoteEvent } from '../utils/midiParser';

/**
 * Component responsible for handling file uploads and managing the free play content timeline.
 */
const PlaylistManager: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const { dispatch } = useGlobalStore();

  // State to hold the parsed timeline data (this would ideally be part of GlobalState)
  const [timelineNotes, setTimelineNotes] = useState<NoteEvent[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
      // Reset timeline when a new file is selected
      setTimelineNotes([]);
    }
  };

  const handleProcessFile = async () => {
    if (!uploadedFile) return;

    setIsParsing(true);
    try {
      // Simulate reading the file into an ArrayBuffer for the parser
      const reader = new FileReader();
      reader.readAsArrayBuffer(uploadedFile);
      reader.onload = async (e) => {
        const midiData: ArrayBuffer = e.target?.result as ArrayBuffer;

        // 1. Parse the file using our utility
        const notes = await parseMidiFile(midiData);
        setTimelineNotes(notes);

        // 2. Dispatch an action to set the timeline in the global store (Placeholder for now)
        console.log("Playlist loaded successfully:", notes);
        // TODO: Dispatch a new action type like 'SET_PLAYLIST_TIMELINE'
      };
      reader.onerror = () => {
        alert("Error reading file.");
      };

    } catch (error) {
      console.error("Failed to process file:", error);
      alert("Could not parse the file. Check console for details.");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="playlist-manager">
      <h3>Playlist & Content Source</h3>

      {/* File Input */}
      <input
        type="file"
        accept=".mid, .wav, .mp3" // Accept common music formats
        onChange={handleFileChange}
        disabled={isParsing}
      />
      <button
        onClick={handleProcessFile}
        disabled={!uploadedFile || isParsing}
      >
        {isParsing ? 'Parsing...' : 'Load & Analyze Music'}
      </button>

      {/* Timeline Display */}
      <div style={{marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px'}}>
        <h4>Loaded Content Timeline ({timelineNotes.length} notes)</h4>
        {timelineNotes.length > 0 ? (
            <ul>
                {timelineNotes.map((note, index) => (
                    <li key={index}>
                        Time: {note.timeSeconds.toFixed(1)}s | Note: {note.keyName} ({note.pitch})
                    </li>
                ))}
            </ul>
        ) : <p>No content loaded yet.</p>}
      </div>
    </div>
  );
};

export default PlaylistManager;