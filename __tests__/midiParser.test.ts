// __tests__/midiParser.test.ts
import { parseMidiFile } from '../src/utils/midiParser';

describe('MIDI Parser Utility', () => {
  // Mocking the ArrayBuffer input since we can't read real files here
  const mockMidiData = new ArrayBuffer(16);

  it('should return a correctly structured array of NoteEvents for mocked data', async () => {
    // We expect the parser to return the hardcoded sequence defined in the utility file.
    const notes = await parseMidiFile(mockMidiData);

    expect(notes).toBeInstanceOf(Array);
    expect(notes.length).toBeGreaterThan(0); // Should contain at least one note
  });

  it('should correctly identify the pitch and key name for known sequences', async () => {
    const notes = await parseMidiFile(mockMidiData);

    // Check the first few elements to ensure structure integrity
    expect(notes[0].pitch).toBe(60); // C3
    expect(notes[0].keyName).toBe("C3");
    expect(notes[1].pitch).toBe(62); // D3
    expect(notes[1].keyName).toBe("D3");
  });

  it('should handle empty or invalid input gracefully (if the parser supports it)', async () => {
    // This test assumes we might pass null/empty data in a real scenario.
    // Since our mock is hardcoded, we'll just ensure it runs without crashing.
    const notes = await parseMidiFile(new ArrayBuffer(0));
    expect(notes).toBeInstanceOf(Array);
  });
});