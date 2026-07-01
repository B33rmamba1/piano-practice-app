export interface Note {
  pitch: number;
  duration: number;
}

export interface Song {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate';
  notes: Note[];
}

// MIDI Reference: C4=60, D4=62, E4=64, F4=65, G4=67, A4=69, B4=71, C5=72
// C3=48, D3=50, E3=52, F3=53, G3=55, A3=57, B3=59

export const kidsSongs: Song[] = [
  {
    id: 'twinkle-twinkle',
    title: 'Twinkle Twinkle Little Star',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - Twin-
      { pitch: 60, duration: 500 }, // C - -kle
      { pitch: 67, duration: 500 }, // G - Twin-
      { pitch: 67, duration: 500 }, // G - -kle
      { pitch: 69, duration: 500 }, // A - Lit-
      { pitch: 69, duration: 500 }, // A - -tle
      { pitch: 67, duration: 1000 },// G - Star
      { pitch: 65, duration: 500 }, // F - How
      { pitch: 65, duration: 500 }, // F - I
      { pitch: 64, duration: 500 }, // E - won-
      { pitch: 64, duration: 500 }, // E - -der
      { pitch: 62, duration: 500 }, // D - what
      { pitch: 62, duration: 500 }, // D - you
      { pitch: 60, duration: 1000 },// C - are
    ],
  },
  {
    id: 'happy-birthday',
    title: 'Happy Birthday',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 375 }, // C - Hap-
      { pitch: 60, duration: 125 }, // C - -py
      { pitch: 62, duration: 500 }, // D - Birth-
      { pitch: 60, duration: 500 }, // C - -day
      { pitch: 65, duration: 500 }, // F - to
      { pitch: 64, duration: 1000 },// E - you
      { pitch: 60, duration: 375 }, // C - Hap-
      { pitch: 60, duration: 125 }, // C - -py
      { pitch: 62, duration: 500 }, // D - Birth-
      { pitch: 60, duration: 500 }, // C - -day
      { pitch: 67, duration: 500 }, // G - to
      { pitch: 65, duration: 1000 },// F - you
      { pitch: 60, duration: 375 }, // C - Hap-
      { pitch: 60, duration: 125 }, // C - -py
      { pitch: 72, duration: 500 }, // C5 - Birth-
      { pitch: 69, duration: 500 }, // A - -day
      { pitch: 65, duration: 500 }, // F - dear
      { pitch: 64, duration: 500 }, // E - [name]
      { pitch: 62, duration: 1000 },// D - ...
      { pitch: 70, duration: 375 }, // Bb - Hap-
      { pitch: 70, duration: 125 }, // Bb - -py
      { pitch: 69, duration: 500 }, // A - Birth-
      { pitch: 65, duration: 500 }, // F - -day
      { pitch: 67, duration: 500 }, // G - to
      { pitch: 65, duration: 1000 },// F - you
    ],
  },
  {
    id: 'mary-had-a-little-lamb',
    title: 'Mary Had a Little Lamb',
    difficulty: 'beginner',
    notes: [
      { pitch: 64, duration: 500 }, // E - Ma-
      { pitch: 62, duration: 500 }, // D - -ry
      { pitch: 60, duration: 500 }, // C - had
      { pitch: 62, duration: 500 }, // D - a
      { pitch: 64, duration: 500 }, // E - lit-
      { pitch: 64, duration: 500 }, // E - -tle
      { pitch: 64, duration: 1000 },// E - lamb
      { pitch: 62, duration: 500 }, // D - lit-
      { pitch: 62, duration: 500 }, // D - -tle
      { pitch: 62, duration: 1000 },// D - lamb
      { pitch: 64, duration: 500 }, // E - lit-
      { pitch: 67, duration: 500 }, // G - -tle
      { pitch: 67, duration: 1000 },// G - lamb
      { pitch: 64, duration: 500 }, // E - Ma-
      { pitch: 62, duration: 500 }, // D - -ry
      { pitch: 60, duration: 500 }, // C - had
      { pitch: 62, duration: 500 }, // D - a
      { pitch: 64, duration: 500 }, // E - lit-
      { pitch: 64, duration: 500 }, // E - -tle
      { pitch: 64, duration: 500 }, // E - lamb
      { pitch: 64, duration: 500 }, // E - its
      { pitch: 62, duration: 500 }, // D - fleece
      { pitch: 62, duration: 500 }, // D - was
      { pitch: 64, duration: 500 }, // E - white
      { pitch: 62, duration: 500 }, // D - as
      { pitch: 60, duration: 1000 },// C - snow
    ],
  },
  {
    id: 'hot-cross-buns',
    title: 'Hot Cross Buns',
    difficulty: 'beginner',
    notes: [
      { pitch: 64, duration: 500 }, // E - Hot
      { pitch: 62, duration: 500 }, // D - cross
      { pitch: 60, duration: 1000 },// C - buns
      { pitch: 64, duration: 500 }, // E - Hot
      { pitch: 62, duration: 500 }, // D - cross
      { pitch: 60, duration: 1000 },// C - buns
      { pitch: 60, duration: 250 }, // C - one
      { pitch: 60, duration: 250 }, // C - a
      { pitch: 60, duration: 250 }, // C - pen-
      { pitch: 60, duration: 250 }, // C - -ny
      { pitch: 62, duration: 250 }, // D - two
      { pitch: 62, duration: 250 }, // D - a
      { pitch: 62, duration: 250 }, // D - pen-
      { pitch: 62, duration: 250 }, // D - -ny
      { pitch: 64, duration: 500 }, // E - Hot
      { pitch: 62, duration: 500 }, // D - cross
      { pitch: 60, duration: 1000 },// C - buns
    ],
  },
  {
    id: 'old-macdonald',
    title: 'Old MacDonald Had a Farm',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - Old
      { pitch: 60, duration: 500 }, // C - Mac-
      { pitch: 60, duration: 500 }, // C - -don-
      { pitch: 57, duration: 500 }, // A - -ald
      { pitch: 62, duration: 750 }, // D - had
      { pitch: 62, duration: 250 }, // D - a
      { pitch: 60, duration: 1000 },// C - farm
      { pitch: 64, duration: 500 }, // E - E-I-
      { pitch: 64, duration: 500 }, // E - E-I-
      { pitch: 62, duration: 1000 },// D - O
      { pitch: 60, duration: 500 }, // C - And
      { pitch: 60, duration: 500 }, // C - on
      { pitch: 60, duration: 500 }, // C - that
      { pitch: 57, duration: 500 }, // A - farm
      { pitch: 62, duration: 750 }, // D - he
      { pitch: 62, duration: 250 }, // D - had
      { pitch: 60, duration: 1000 },// C - cows
      { pitch: 64, duration: 500 }, // E - E-I-
      { pitch: 64, duration: 500 }, // E - E-I-
      { pitch: 62, duration: 1000 },// D - O
    ],
  },
  {
    id: 'row-row-row',
    title: 'Row Row Row Your Boat',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 750 }, // C - Row
      { pitch: 60, duration: 250 }, // C - row
      { pitch: 60, duration: 500 }, // C - row
      { pitch: 62, duration: 250 }, // D - your
      { pitch: 64, duration: 750 }, // E - boat
      { pitch: 64, duration: 250 }, // E - gent-
      { pitch: 62, duration: 250 }, // D - -ly
      { pitch: 64, duration: 250 }, // E - down
      { pitch: 65, duration: 500 }, // F - the
      { pitch: 67, duration: 1000 },// G - stream
      { pitch: 72, duration: 250 }, // C5 - Mer-
      { pitch: 72, duration: 250 }, // C5 - -ri-
      { pitch: 72, duration: 250 }, // C5 - -ly
      { pitch: 67, duration: 250 }, // G - mer-
      { pitch: 67, duration: 250 }, // G - -ri-
      { pitch: 67, duration: 250 }, // G - -ly
      { pitch: 64, duration: 250 }, // E - mer-
      { pitch: 64, duration: 250 }, // E - -ri-
      { pitch: 64, duration: 250 }, // E - -ly
      { pitch: 60, duration: 250 }, // C - life
      { pitch: 60, duration: 250 }, // C - is
      { pitch: 60, duration: 250 }, // C - but
      { pitch: 62, duration: 250 }, // D - a
      { pitch: 64, duration: 250 }, // E - dream
      { pitch: 67, duration: 1000 },// G - ...
    ],
  },
  {
    id: 'baa-baa-black-sheep',
    title: 'Baa Baa Black Sheep',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - Baa
      { pitch: 60, duration: 500 }, // C - baa
      { pitch: 67, duration: 500 }, // G - black
      { pitch: 67, duration: 500 }, // G - sheep
      { pitch: 69, duration: 500 }, // A - have
      { pitch: 69, duration: 500 }, // A - you
      { pitch: 67, duration: 1000 },// G - wool
      { pitch: 65, duration: 500 }, // F - Yes
      { pitch: 65, duration: 500 }, // F - sir
      { pitch: 64, duration: 500 }, // E - yes
      { pitch: 64, duration: 500 }, // E - sir
      { pitch: 62, duration: 500 }, // D - three
      { pitch: 62, duration: 500 }, // D - bags
      { pitch: 60, duration: 1000 },// C - full
    ],
  },
  {
    id: 'itsy-bitsy-spider',
    title: 'Itsy Bitsy Spider',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - It-
      { pitch: 64, duration: 500 }, // E - -sy
      { pitch: 64, duration: 500 }, // E - bit-
      { pitch: 64, duration: 500 }, // E - -sy
      { pitch: 65, duration: 500 }, // F - spi-
      { pitch: 64, duration: 500 }, // E - -der
      { pitch: 62, duration: 500 }, // D - went
      { pitch: 60, duration: 500 }, // C - up
      { pitch: 62, duration: 500 }, // D - the
      { pitch: 64, duration: 500 }, // E - wa-
      { pitch: 62, duration: 500 }, // D - -ter
      { pitch: 60, duration: 1000 },// C - spout
    ],
  },
  {
    id: 'london-bridge',
    title: 'London Bridge',
    difficulty: 'beginner',
    notes: [
      { pitch: 67, duration: 500 }, // G - Lon-
      { pitch: 65, duration: 250 }, // F - -don
      { pitch: 67, duration: 250 }, // G - bridge
      { pitch: 69, duration: 500 }, // A - is
      { pitch: 67, duration: 500 }, // G - fall-
      { pitch: 65, duration: 1000 },// F - -ing
      { pitch: 64, duration: 500 }, // E - down
      { pitch: 62, duration: 250 }, // D - fall-
      { pitch: 64, duration: 250 }, // E - -ing
      { pitch: 65, duration: 500 }, // F - down
      { pitch: 64, duration: 500 }, // E - fall-
      { pitch: 62, duration: 1000 },// D - -ing
      { pitch: 60, duration: 500 }, // C - down
      { pitch: 67, duration: 500 }, // G - Lon-
      { pitch: 65, duration: 250 }, // F - -don
      { pitch: 67, duration: 250 }, // G - bridge
      { pitch: 69, duration: 500 }, // A - is
      { pitch: 67, duration: 500 }, // G - fall-
      { pitch: 65, duration: 1000 },// F - -ing
      { pitch: 64, duration: 500 }, // E - down
      { pitch: 65, duration: 500 }, // F - my
      { pitch: 60, duration: 1000 },// C - lady
    ],
  },
  {
    id: 'you-are-my-sunshine',
    title: 'You Are My Sunshine',
    difficulty: 'intermediate',
    notes: [
      { pitch: 55, duration: 500 }, // G3 - You
      { pitch: 60, duration: 500 }, // C - are
      { pitch: 60, duration: 500 }, // C - my
      { pitch: 60, duration: 500 }, // C - sun-
      { pitch: 62, duration: 500 }, // D - -shine
      { pitch: 64, duration: 750 }, // E - my
      { pitch: 62, duration: 250 }, // D - on-
      { pitch: 60, duration: 1000 },// C - -ly
      { pitch: 55, duration: 500 }, // G3 - sun-
      { pitch: 60, duration: 500 }, // C - -shine
      { pitch: 62, duration: 500 }, // D - you
      { pitch: 64, duration: 500 }, // E - make
      { pitch: 65, duration: 750 }, // F - me
      { pitch: 64, duration: 250 }, // E - hap-
      { pitch: 62, duration: 1000 },// D - -py
    ],
  },
  {
    id: 'jingle-bells',
    title: 'Jingle Bells',
    difficulty: 'intermediate',
    notes: [
      { pitch: 64, duration: 500 }, // E - Jin-
      { pitch: 64, duration: 500 }, // E - -gle
      { pitch: 64, duration: 1000 },// E - bells
      { pitch: 64, duration: 500 }, // E - jin-
      { pitch: 64, duration: 500 }, // E - -gle
      { pitch: 64, duration: 1000 },// E - bells
      { pitch: 64, duration: 500 }, // E - jin-
      { pitch: 67, duration: 500 }, // G - -gle
      { pitch: 60, duration: 500 }, // C - all
      { pitch: 62, duration: 500 }, // D - the
      { pitch: 64, duration: 2000 },// E - way
      { pitch: 65, duration: 500 }, // F - Oh
      { pitch: 65, duration: 500 }, // F - what
      { pitch: 65, duration: 750 }, // F - fun
      { pitch: 65, duration: 250 }, // F - it
      { pitch: 64, duration: 500 }, // E - is
      { pitch: 64, duration: 500 }, // E - to
      { pitch: 64, duration: 500 }, // E - ride
      { pitch: 62, duration: 500 }, // D - in
      { pitch: 62, duration: 500 }, // D - a
      { pitch: 65, duration: 500 }, // F - one
      { pitch: 67, duration: 2000 },// G - horse
    ],
  },
  {
    id: 'frere-jacques',
    title: 'Frère Jacques',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - Frè-
      { pitch: 62, duration: 500 }, // D - -re
      { pitch: 64, duration: 500 }, // E - Jac-
      { pitch: 60, duration: 500 }, // C - -ques
      { pitch: 60, duration: 500 }, // C - Frè-
      { pitch: 62, duration: 500 }, // D - -re
      { pitch: 64, duration: 500 }, // E - Jac-
      { pitch: 60, duration: 500 }, // C - -ques
      { pitch: 64, duration: 500 }, // E - dor-
      { pitch: 65, duration: 500 }, // F - -mez
      { pitch: 67, duration: 1000 },// G - vous
      { pitch: 64, duration: 500 }, // E - dor-
      { pitch: 65, duration: 500 }, // F - -mez
      { pitch: 67, duration: 1000 },// G - vous
      { pitch: 67, duration: 250 }, // G - son-
      { pitch: 69, duration: 250 }, // A - -nez
      { pitch: 67, duration: 250 }, // G - les
      { pitch: 65, duration: 250 }, // F - ma-
      { pitch: 64, duration: 1000 },// E - -tines
      { pitch: 67, duration: 250 }, // G - din
      { pitch: 69, duration: 250 }, // A - din
      { pitch: 67, duration: 250 }, // G - don
      { pitch: 65, duration: 250 }, // F - din
      { pitch: 64, duration: 1000 },// E - din
      { pitch: 60, duration: 500 }, // C - don
      { pitch: 60, duration: 500 }, // C - ...
    ],
  },
  {
    id: 'when-the-saints',
    title: 'When The Saints Go Marching In',
    difficulty: 'intermediate',
    notes: [
      { pitch: 60, duration: 500 }, // C - Oh
      { pitch: 64, duration: 500 }, // E - when
      { pitch: 65, duration: 500 }, // F - the
      { pitch: 67, duration: 1000 },// G - saints
      { pitch: 60, duration: 500 }, // C - go
      { pitch: 64, duration: 500 }, // E - mar-
      { pitch: 65, duration: 500 }, // F - -ching
      { pitch: 67, duration: 2000 },// G - in
      { pitch: 60, duration: 500 }, // C - Oh
      { pitch: 64, duration: 500 }, // E - when
      { pitch: 65, duration: 500 }, // F - the
      { pitch: 67, duration: 500 }, // G - saints
      { pitch: 64, duration: 500 }, // E - go
      { pitch: 67, duration: 500 }, // G - mar-
      { pitch: 69, duration: 500 }, // A - -ching
      { pitch: 65, duration: 2000 },// F - in
    ],
  },
  {
    id: 'oh-susanna',
    title: 'Oh Susanna',
    difficulty: 'intermediate',
    notes: [
      { pitch: 60, duration: 500 }, // C - I
      { pitch: 62, duration: 500 }, // D - come
      { pitch: 64, duration: 500 }, // E - from
      { pitch: 65, duration: 500 }, // F - Al-
      { pitch: 67, duration: 750 }, // G - -a-
      { pitch: 67, duration: 250 }, // G - -bam-
      { pitch: 65, duration: 500 }, // F - -a
      { pitch: 64, duration: 500 }, // E - with
      { pitch: 62, duration: 500 }, // D - my
      { pitch: 60, duration: 500 }, // C - ban-
      { pitch: 62, duration: 750 }, // D - -jo
      { pitch: 62, duration: 250 }, // D - on
      { pitch: 60, duration: 1000 },// C - my
      { pitch: 67, duration: 500 }, // G - knee
      { pitch: 67, duration: 500 }, // G - Oh
      { pitch: 69, duration: 500 }, // A - Su-
      { pitch: 67, duration: 500 }, // G - -san-
      { pitch: 65, duration: 750 }, // F - -na
      { pitch: 64, duration: 250 }, // E - oh
      { pitch: 62, duration: 500 }, // D - don't
      { pitch: 60, duration: 500 }, // C - you
      { pitch: 62, duration: 500 }, // D - cry
      { pitch: 60, duration: 1000 },// C - for
    ],
  },
  {
    id: 'skip-to-my-lou',
    title: 'Skip To My Lou',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - Skip
      { pitch: 60, duration: 500 }, // C - skip
      { pitch: 60, duration: 500 }, // C - skip
      { pitch: 62, duration: 500 }, // D - to
      { pitch: 64, duration: 500 }, // E - my
      { pitch: 64, duration: 500 }, // E - Lou
      { pitch: 64, duration: 500 }, // E - skip
      { pitch: 62, duration: 500 }, // D - to
      { pitch: 60, duration: 500 }, // C - my
      { pitch: 60, duration: 500 }, // C - Lou
      { pitch: 60, duration: 500 }, // C - skip
      { pitch: 62, duration: 500 }, // D - to
      { pitch: 64, duration: 500 }, // E - my
      { pitch: 62, duration: 500 }, // D - Lou
      { pitch: 60, duration: 1000 },// C - darling
    ],
  },
  {
    id: 'this-old-man',
    title: 'This Old Man',
    difficulty: 'beginner',
    notes: [
      { pitch: 64, duration: 500 }, // E - This
      { pitch: 64, duration: 500 }, // E - old
      { pitch: 64, duration: 500 }, // E - man
      { pitch: 65, duration: 500 }, // F - he
      { pitch: 67, duration: 1000 },// G - played
      { pitch: 67, duration: 500 }, // G - one
      { pitch: 65, duration: 500 }, // F - he
      { pitch: 67, duration: 500 }, // G - played
      { pitch: 69, duration: 500 }, // A - knick
      { pitch: 67, duration: 1000 },// G - knack
      { pitch: 65, duration: 500 }, // F - pad-
      { pitch: 64, duration: 500 }, // E - -dy
      { pitch: 62, duration: 500 }, // D - whack
      { pitch: 60, duration: 500 }, // C - give
      { pitch: 62, duration: 500 }, // D - a
      { pitch: 64, duration: 500 }, // E - dog
      { pitch: 65, duration: 500 }, // F - a
      { pitch: 67, duration: 1000 },// G - bone
    ],
  },
  {
    id: 'ring-around-the-rosie',
    title: 'Ring Around The Rosie',
    difficulty: 'beginner',
    notes: [
      { pitch: 64, duration: 500 }, // E - Ring
      { pitch: 65, duration: 500 }, // F - a-
      { pitch: 67, duration: 500 }, // G - -round
      { pitch: 67, duration: 500 }, // G - the
      { pitch: 65, duration: 500 }, // F - ro-
      { pitch: 64, duration: 1000 },// E - -sie
      { pitch: 62, duration: 500 }, // D - pock-
      { pitch: 60, duration: 500 }, // C - -et
      { pitch: 62, duration: 500 }, // D - full
      { pitch: 60, duration: 500 }, // C - of
      { pitch: 64, duration: 500 }, // E - po-
      { pitch: 62, duration: 1000 },// D - -sies
      { pitch: 60, duration: 500 }, // C - ash-
      { pitch: 60, duration: 500 }, // C - -es
      { pitch: 60, duration: 500 }, // C - ash-
      { pitch: 62, duration: 500 }, // D - -es
      { pitch: 60, duration: 2000 },// C - down
    ],
  },
  {
    id: 'head-shoulders',
    title: 'Head Shoulders Knees and Toes',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 375 }, // C - Head
      { pitch: 60, duration: 125 }, // C - shoul-
      { pitch: 60, duration: 375 }, // C - -ders
      { pitch: 62, duration: 125 }, // D - knees
      { pitch: 64, duration: 375 }, // E - and
      { pitch: 64, duration: 125 }, // E - toes
      { pitch: 64, duration: 375 }, // E - knees
      { pitch: 64, duration: 125 }, // E - and
      { pitch: 65, duration: 500 }, // F - toes
      { pitch: 65, duration: 500 }, // F - knees
      { pitch: 64, duration: 500 }, // E - and
      { pitch: 62, duration: 500 }, // D - toes
      { pitch: 60, duration: 500 }, // C - eyes
      { pitch: 62, duration: 500 }, // D - and
      { pitch: 64, duration: 500 }, // E - ears
      { pitch: 65, duration: 500 }, // F - and
      { pitch: 67, duration: 1000 },// G - mouth
    ],
  },
  {
    id: 'if-youre-happy',
    title: "If You're Happy and You Know It",
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - If
      { pitch: 60, duration: 500 }, // C - you're
      { pitch: 65, duration: 500 }, // F - hap-
      { pitch: 65, duration: 500 }, // F - -py
      { pitch: 65, duration: 500 }, // F - and
      { pitch: 65, duration: 500 }, // F - you
      { pitch: 65, duration: 500 }, // F - know
      { pitch: 64, duration: 500 }, // E - it
      { pitch: 62, duration: 500 }, // D - clap
      { pitch: 60, duration: 500 }, // C - your
      { pitch: 62, duration: 500 }, // D - hands
      { pitch: 64, duration: 1000 },// E - ...
      { pitch: 65, duration: 500 }, // F - if
      { pitch: 65, duration: 500 }, // F - you're
      { pitch: 67, duration: 500 }, // G - hap-
      { pitch: 65, duration: 500 }, // F - -py
      { pitch: 64, duration: 500 }, // E - and
      { pitch: 62, duration: 500 }, // D - you
      { pitch: 60, duration: 1000 },// C - know
    ],
  },
  {
    id: 'wheels-on-the-bus',
    title: 'The Wheels on the Bus',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - The
      { pitch: 60, duration: 500 }, // C - wheels
      { pitch: 62, duration: 500 }, // D - on
      { pitch: 64, duration: 500 }, // E - the
      { pitch: 64, duration: 500 }, // E - bus
      { pitch: 65, duration: 500 }, // F - go
      { pitch: 64, duration: 500 }, // E - round
      { pitch: 62, duration: 500 }, // D - and
      { pitch: 60, duration: 1000 },// C - round
      { pitch: 65, duration: 500 }, // F - round
      { pitch: 64, duration: 500 }, // E - and
      { pitch: 62, duration: 1000 },// D - round
      { pitch: 60, duration: 500 }, // C - the
      { pitch: 60, duration: 500 }, // C - wheels
      { pitch: 62, duration: 500 }, // D - on
      { pitch: 64, duration: 500 }, // E - the
      { pitch: 65, duration: 500 }, // F - bus
      { pitch: 67, duration: 500 }, // G - go
      { pitch: 65, duration: 500 }, // F - round
      { pitch: 64, duration: 500 }, // E - and
      { pitch: 60, duration: 1000 },// C - round
    ],
  },
  {
    id: 'abc-song',
    title: 'ABC Song',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - A
      { pitch: 60, duration: 500 }, // C - B
      { pitch: 67, duration: 500 }, // G - C
      { pitch: 67, duration: 500 }, // G - D
      { pitch: 69, duration: 500 }, // A - E
      { pitch: 69, duration: 500 }, // A - F
      { pitch: 67, duration: 1000 },// G - G
      { pitch: 65, duration: 500 }, // F - H
      { pitch: 65, duration: 500 }, // F - I
      { pitch: 64, duration: 500 }, // E - J
      { pitch: 64, duration: 500 }, // E - K
      { pitch: 62, duration: 500 }, // D - L
      { pitch: 62, duration: 500 }, // D - M
      { pitch: 60, duration: 1000 },// C - N
      { pitch: 67, duration: 500 }, // G - O
      { pitch: 65, duration: 500 }, // F - P
      { pitch: 64, duration: 500 }, // E - Q
      { pitch: 62, duration: 500 }, // D - R
      { pitch: 60, duration: 500 }, // C - S
      { pitch: 67, duration: 500 }, // G - T
      { pitch: 65, duration: 500 }, // F - U
      { pitch: 64, duration: 500 }, // E - V
      { pitch: 62, duration: 500 }, // D - W
      { pitch: 60, duration: 500 }, // C - X
      { pitch: 67, duration: 500 }, // G - Y
      { pitch: 65, duration: 500 }, // F - Z
      { pitch: 64, duration: 500 }, // E - Now
      { pitch: 62, duration: 500 }, // D - I
      { pitch: 60, duration: 1000 },// C - know
    ],
  },
  {
    id: 'hickory-dickory-dock',
    title: 'Hickory Dickory Dock',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 250 }, // C - Hick-
      { pitch: 60, duration: 250 }, // C - -o-
      { pitch: 62, duration: 250 }, // D - -ry
      { pitch: 60, duration: 250 }, // C - dick-
      { pitch: 64, duration: 250 }, // E - -o-
      { pitch: 62, duration: 250 }, // D - -ry
      { pitch: 60, duration: 500 }, // C - dock
      { pitch: 60, duration: 250 }, // C - the
      { pitch: 62, duration: 250 }, // D - mouse
      { pitch: 64, duration: 250 }, // E - ran
      { pitch: 65, duration: 250 }, // F - up
      { pitch: 67, duration: 500 }, // G - the
      { pitch: 67, duration: 1000 },// G - clock
      { pitch: 67, duration: 500 }, // G - the
      { pitch: 65, duration: 500 }, // F - clock
      { pitch: 64, duration: 500 }, // E - struck
      { pitch: 62, duration: 500 }, // D - one
      { pitch: 60, duration: 1000 },// C - ...
    ],
  },
  {
    id: 'jack-and-jill',
    title: 'Jack and Jill',
    difficulty: 'beginner',
    notes: [
      { pitch: 60, duration: 500 }, // C - Jack
      { pitch: 62, duration: 500 }, // D - and
      { pitch: 64, duration: 500 }, // E - Jill
      { pitch: 65, duration: 500 }, // F - went
      { pitch: 67, duration: 750 }, // G - up
      { pitch: 65, duration: 250 }, // F - the
      { pitch: 64, duration: 500 }, // E - hill
      { pitch: 62, duration: 500 }, // D - to
      { pitch: 60, duration: 1000 },// C - fetch
      { pitch: 67, duration: 500 }, // G - a
      { pitch: 65, duration: 500 }, // F - pail
      { pitch: 64, duration: 500 }, // E - of
      { pitch: 62, duration: 500 }, // D - wa-
      { pitch: 60, duration: 1000 },// C - -ter
    ],
  },
  {
    id: 'pop-goes-the-weasel',
    title: 'Pop Goes the Weasel',
    difficulty: 'intermediate',
    notes: [
      { pitch: 60, duration: 500 }, // C - All
      { pitch: 65, duration: 250 }, // F - a-
      { pitch: 65, duration: 250 }, // F - -round
      { pitch: 65, duration: 500 }, // F - the
      { pitch: 67, duration: 500 }, // G - mul-
      { pitch: 65, duration: 500 }, // F - -ber-
      { pitch: 64, duration: 500 }, // E - -ry
      { pitch: 60, duration: 500 }, // C - bush
      { pitch: 65, duration: 250 }, // F - the
      { pitch: 65, duration: 250 }, // F - mon-
      { pitch: 65, duration: 500 }, // F - -key
      { pitch: 67, duration: 500 }, // G - chased
      { pitch: 69, duration: 500 }, // A - the
      { pitch: 65, duration: 1000 },// F - wea-sel
      { pitch: 60, duration: 500 }, // C - the
      { pitch: 64, duration: 500 }, // E - mon-
      { pitch: 62, duration: 500 }, // D - -key
      { pitch: 60, duration: 500 }, // C - thought
      { pitch: 64, duration: 500 }, // E - twas
      { pitch: 65, duration: 500 }, // F - all
      { pitch: 67, duration: 750 }, // G - in
      { pitch: 65, duration: 250 }, // F - fun
      { pitch: 72, duration: 1000 },// C5 - POP!
      { pitch: 67, duration: 500 }, // G - goes
      { pitch: 65, duration: 500 }, // F - the
      { pitch: 60, duration: 1000 },// C - wea-sel
    ],
  },
  {
    id: 'yankee-doodle',
    title: 'Yankee Doodle',
    difficulty: 'intermediate',
    notes: [
      { pitch: 60, duration: 500 }, // C - Yan-
      { pitch: 60, duration: 500 }, // C - -kee
      { pitch: 62, duration: 500 }, // D - Doo-
      { pitch: 64, duration: 500 }, // E - -dle
      { pitch: 60, duration: 500 }, // C - went
      { pitch: 64, duration: 500 }, // E - to
      { pitch: 62, duration: 1000 },// D - town
      { pitch: 60, duration: 500 }, // C - rid-
      { pitch: 60, duration: 500 }, // C - -ing
      { pitch: 62, duration: 500 }, // D - on
      { pitch: 64, duration: 500 }, // E - a
      { pitch: 65, duration: 500 }, // F - po-
      { pitch: 64, duration: 500 }, // E - -ny
      { pitch: 62, duration: 500 }, // D - stuck
      { pitch: 64, duration: 500 }, // E - a
      { pitch: 65, duration: 500 }, // F - fea-
      { pitch: 67, duration: 1000 },// G - -ther
      { pitch: 60, duration: 500 }, // C - in
      { pitch: 60, duration: 500 }, // C - his
      { pitch: 62, duration: 500 }, // D - cap
      { pitch: 64, duration: 500 }, // E - and
      { pitch: 60, duration: 500 }, // C - called
      { pitch: 64, duration: 500 }, // E - it
      { pitch: 62, duration: 500 }, // D - mac-
      { pitch: 60, duration: 1000 },// C - -a-ro-ni
    ],
  },
];
