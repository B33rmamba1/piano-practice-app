// src/utils/midiParser.ts
/**
 * Utility module responsible for parsing MIDI file data into a structured, time-based sequence of notes.
 * NOTE: Real-world MIDI parsing is complex and often requires dedicated libraries (e.g., Mido).
 * This implementation provides a simplified mock structure to demonstrate the required output format.
 */

export interface NoteEvent {
  timeSeconds: number; // Time relative to the start of the track
  pitch: number;      // MIDI note number
  keyName: string;    // e.g., "C4"
}

/**
 * Mocks parsing a raw MIDI file buffer into an array of NoteEvents.
 * @param midiData - The raw data from the uploaded MIDI file (e.g., ArrayBuffer).
 * @returns A promise that resolves to an array of structured note events.
 */
export const parseMidiFile = async (midiData: ArrayBuffer): Promise<NoteEvent[]> => {
  console.log("--- Starting mock MIDI parsing ---");

  // In a real application, we would use a library like 'mido-parser' here.
  // For this prototype, we will return a hardcoded sequence representing C Major scale over 5 seconds.
  const mockNotes: NoteEvent[] = [
    { timeSeconds: 0.5, pitch: 60, keyName: "C3" }, // Start note
    { timeSeconds: 1.2, pitch: 62, keyName: "D3" },
    { timeSeconds: 1.9, pitch: 64, keyName: "E3" },
    { timeSeconds: 2.6, pitch: 65, keyName: "F3" },
    { timeSeconds: 3.3, pitch: 67, keyName: "G3" },
  ];

  console.log(`Successfully mocked parsing of MIDI data into ${mockNotes.length} events.`);
  return mockNotes;
};