import React from 'react';

interface SongSceneProps {
  songId: string;
  height?: number;
}

const SongScene: React.FC<SongSceneProps> = ({ songId, height = 180 }) => {
  const scene = SCENES[songId] || SCENES['default'];
  return (
    <div className={`song-scene ${scene.className}`} style={{ height }}>
      {scene.elements}
      <div className="scene-title">{scene.label}</div>
    </div>
  );
};

const star = (top: string, left: string, size: number, delay: string) => (
  <div key={`s${top}${left}`} className="ss-star" style={{ top, left, width: size, height: size, animationDelay: delay }} />
);

const balloon = (color: string, left: string, top: string, delay: string) => (
  <div key={`b${left}${color}`} className="ss-balloon" style={{ background: color, left, top, animationDelay: delay }} />
);

const cloud = (top: string, left: string, w: number) => (
  <div key={`c${top}${left}`} className="ss-cloud" style={{ top, left, width: w, height: w * 0.35 }} />
);

const wave = (bottom: string, delay: string, opacity: number) => (
  <div key={`w${bottom}${delay}`} className="ss-wave" style={{ bottom, animationDelay: delay, opacity }} />
);

const snowflake = (left: string, delay: string, size: number) => (
  <div key={`sf${left}${delay}`} className="ss-snow" style={{ left, animationDelay: delay, width: size, height: size }} />
);

const confetti = (left: string, color: string, delay: string, shape?: string) => (
  <div key={`cf${left}${delay}`} className="ss-confetti" style={{ left, background: color, animationDelay: delay, borderRadius: shape === 'round' ? '50%' : '2px' }} />
);

const flower = (left: string, bottom: string, color: string) => (
  <div key={`f${left}${bottom}`} className="ss-flower" style={{ left, bottom }}>
    <div className="ss-petal" style={{ background: color, transform: 'rotate(0deg) translateY(-6px)' }} />
    <div className="ss-petal" style={{ background: color, transform: 'rotate(72deg) translateY(-6px)' }} />
    <div className="ss-petal" style={{ background: color, transform: 'rotate(144deg) translateY(-6px)' }} />
    <div className="ss-petal" style={{ background: color, transform: 'rotate(216deg) translateY(-6px)' }} />
    <div className="ss-petal" style={{ background: color, transform: 'rotate(288deg) translateY(-6px)' }} />
    <div className="ss-flower-center" />
  </div>
);

const SCENES: Record<string, { className: string; label: string; elements: React.ReactNode }> = {

  'twinkle-twinkle': {
    className: 'sc-night',
    label: 'Twinkle Twinkle Little Star',
    elements: <>
      {star('10%','15%',4,'0s')}{star('8%','45%',3,'0.4s')}{star('22%','72%',5,'0.8s')}
      {star('35%','30%',3,'1.2s')}{star('15%','85%',4,'0.6s')}{star('28%','55%',6,'1s')}
      {star('18%','5%',3,'1.4s')}{star('40%','65%',4,'0.2s')}
      <div className="ss-moon" /><div className="ss-moon-shadow" />
      <div className="ss-hill" />
    </>
  },

  'happy-birthday': {
    className: 'sc-party',
    label: 'Happy Birthday',
    elements: <>
      {balloon('#EF5350','15%','12%','0s')}{balloon('#42A5F5','35%','22%','0.5s')}
      {balloon('#66BB6A','58%','8%','1s')}{balloon('#FFA726','78%','18%','1.5s')}
      {balloon('#AB47BC','48%','15%','0.8s')}
      <div className="ss-cake">
        <div className="ss-flame" /><div className="ss-candle" />
        <div className="ss-cake-frost" /><div className="ss-cake-base" />
      </div>
      {confetti('10%','#EF5350','0s')}{confetti('30%','#42A5F5','0.6s','round')}
      {confetti('50%','#FFD54F','1.2s')}{confetti('70%','#66BB6A','0.3s')}
      {confetti('85%','#AB47BC','0.9s','round')}
    </>
  },

  'mary-had-a-little-lamb': {
    className: 'sc-meadow',
    label: 'Mary Had a Little Lamb',
    elements: <>
      {cloud('8%','15%',55)}{cloud('12%','65%',40)}
      <div className="ss-sun-small" />
      <div className="ss-lamb" style={{ left: '55%', bottom: '30px' }}>
        <div className="ss-lamb-body" /><div className="ss-lamb-head" />
        <div className="ss-lamb-leg" style={{ left: '6px' }} /><div className="ss-lamb-leg" style={{ left: '22px' }} />
      </div>
      {flower('20%','28px','#F48FB1')}{flower('35%','32px','#CE93D8')}{flower('75%','26px','#EF9A9A')}
      <div className="ss-ground-meadow" />
    </>
  },

  'hot-cross-buns': {
    className: 'sc-bakery',
    label: 'Hot Cross Buns',
    elements: <>
      <div className="ss-oven" />
      <div className="ss-bun" style={{ left: '30%', bottom: '55px' }} />
      <div className="ss-bun" style={{ left: '48%', bottom: '58px' }} />
      <div className="ss-bun" style={{ left: '66%', bottom: '52px' }} />
      <div className="ss-steam" style={{ left: '35%', animationDelay: '0s' }} />
      <div className="ss-steam" style={{ left: '53%', animationDelay: '0.5s' }} />
      <div className="ss-steam" style={{ left: '71%', animationDelay: '1s' }} />
      <div className="ss-counter" />
    </>
  },

  'old-macdonald': {
    className: 'sc-farm',
    label: 'Old MacDonald Had a Farm',
    elements: <>
      <div className="ss-sun-small" style={{ right: '15%' }} />
      {cloud('10%','20%',50)}{cloud('18%','60%',35)}
      <div className="ss-barn"><div className="ss-barn-roof" /><div className="ss-barn-door" /></div>
      <div className="ss-fence" />
      <div className="ss-ground-farm" />
    </>
  },

  'row-row-row': {
    className: 'sc-river',
    label: 'Row Row Row Your Boat',
    elements: <>
      {cloud('8%','20%',50)}{cloud('5%','70%',40)}
      <div className="ss-sun-small" />
      <div className="ss-boat">
        <div className="ss-boat-hull" /><div className="ss-boat-sail" />
      </div>
      {wave('-2px','0s',0.6)}{wave('4px','0.5s',0.4)}{wave('10px','1s',0.3)}
    </>
  },

  'baa-baa-black-sheep': {
    className: 'sc-meadow',
    label: 'Baa Baa Black Sheep',
    elements: <>
      {cloud('10%','25%',45)}{cloud('15%','70%',35)}
      <div className="ss-sheep" style={{ left: '40%' }}>
        <div className="ss-sheep-body" /><div className="ss-sheep-head" />
        <div className="ss-sheep-leg" style={{ left: '8px' }} /><div className="ss-sheep-leg" style={{ left: '26px' }} />
      </div>
      <div className="ss-sheep" style={{ left: '65%' }}>
        <div className="ss-sheep-body" /><div className="ss-sheep-head" />
        <div className="ss-sheep-leg" style={{ left: '8px' }} /><div className="ss-sheep-leg" style={{ left: '26px' }} />
      </div>
      <div className="ss-ground-meadow" />
    </>
  },

  'itsy-bitsy-spider': {
    className: 'sc-rain',
    label: 'Itsy Bitsy Spider',
    elements: <>
      <div className="ss-spout" />
      <div className="ss-web" />
      <div className="ss-spider" />
      <div className="ss-raindrop" style={{ left: '20%', animationDelay: '0s' }} />
      <div className="ss-raindrop" style={{ left: '40%', animationDelay: '0.3s' }} />
      <div className="ss-raindrop" style={{ left: '60%', animationDelay: '0.6s' }} />
      <div className="ss-raindrop" style={{ left: '80%', animationDelay: '0.9s' }} />
      <div className="ss-raindrop" style={{ left: '30%', animationDelay: '1.2s' }} />
    </>
  },

  'london-bridge': {
    className: 'sc-bridge',
    label: 'London Bridge',
    elements: <>
      <div className="ss-bridge-tower" style={{ left: '25%' }} />
      <div className="ss-bridge-tower" style={{ left: '65%' }} />
      <div className="ss-bridge-span" />
      <div className="ss-bridge-water" />
      {wave('-2px','0s',0.4)}{wave('4px','0.6s',0.3)}
    </>
  },

  'you-are-my-sunshine': {
    className: 'sc-sunshine',
    label: 'You Are My Sunshine',
    elements: <>
      <div className="ss-big-sun">
        <div className="ss-sun-ray" style={{ transform: 'rotate(0deg)' }} />
        <div className="ss-sun-ray" style={{ transform: 'rotate(45deg)' }} />
        <div className="ss-sun-ray" style={{ transform: 'rotate(90deg)' }} />
        <div className="ss-sun-ray" style={{ transform: 'rotate(135deg)' }} />
      </div>
      {cloud('55%','10%',50)}{cloud('60%','75%',40)}
      {flower('15%','24px','#FFA726')}{flower('40%','28px','#FFD54F')}{flower('70%','22px','#FF7043')}
      <div className="ss-ground-sunny" />
    </>
  },

  'jingle-bells': {
    className: 'sc-snow',
    label: 'Jingle Bells',
    elements: <>
      {snowflake('10%','0s',5)}{snowflake('25%','0.5s',4)}{snowflake('40%','1s',6)}
      {snowflake('55%','1.5s',4)}{snowflake('70%','0.3s',5)}{snowflake('85%','0.8s',3)}
      <div className="ss-tree" style={{ left: '20%' }} />
      <div className="ss-tree" style={{ left: '75%' }} />
      <div className="ss-sleigh" />
      <div className="ss-snow-ground" />
    </>
  },

  'frere-jacques': {
    className: 'sc-morning',
    label: 'Frere Jacques',
    elements: <>
      <div className="ss-bell" style={{ left: '40%', animationDelay: '0s' }} />
      <div className="ss-bell" style={{ left: '55%', animationDelay: '0.5s' }} />
      <div className="ss-church-tower" />
      <div className="ss-sunrise" />
    </>
  },

  'when-the-saints': {
    className: 'sc-golden',
    label: 'When The Saints',
    elements: <>
      <div className="ss-trumpet" style={{ left: '25%', transform: 'rotate(-15deg)' }} />
      <div className="ss-trumpet" style={{ left: '60%', transform: 'rotate(15deg)' }} />
      <div className="ss-music-note" style={{ top: '15%', left: '35%', animationDelay: '0s' }} />
      <div className="ss-music-note" style={{ top: '25%', left: '55%', animationDelay: '0.5s' }} />
      <div className="ss-music-note" style={{ top: '10%', left: '75%', animationDelay: '1s' }} />
      <div className="ss-golden-rays" />
    </>
  },

  'oh-susanna': {
    className: 'sc-sunset',
    label: 'Oh Susanna',
    elements: <>
      <div className="ss-sunset-sun" />
      <div className="ss-cactus" style={{ left: '20%' }} />
      <div className="ss-cactus" style={{ left: '75%', transform: 'scaleX(-1)' }} />
      <div className="ss-desert-ground" />
    </>
  },

  'skip-to-my-lou': {
    className: 'sc-garden',
    label: 'Skip To My Lou',
    elements: <>
      {cloud('8%','30%',45)}{cloud('12%','70%',35)}
      <div className="ss-butterfly" style={{ top: '20%', left: '30%', animationDelay: '0s' }} />
      <div className="ss-butterfly" style={{ top: '30%', left: '65%', animationDelay: '1s' }} />
      {flower('15%','26px','#F48FB1')}{flower('35%','30px','#CE93D8')}{flower('55%','24px','#81D4FA')}
      {flower('75%','28px','#FFD54F')}{flower('90%','22px','#A5D6A7')}
      <div className="ss-ground-meadow" />
    </>
  },

  'this-old-man': {
    className: 'sc-path',
    label: 'This Old Man',
    elements: <>
      {cloud('10%','20%',50)}{cloud('8%','65%',40)}
      <div className="ss-sun-small" />
      <div className="ss-walking-stick" />
      <div className="ss-path-road" />
      <div className="ss-ground-path" />
    </>
  },

  'ring-around-the-rosie': {
    className: 'sc-garden',
    label: 'Ring Around The Rosie',
    elements: <>
      <div className="ss-sun-small" />
      <div className="ss-flower-ring">
        {flower('-12px','0','#EF9A9A')}{flower('20px','0','#CE93D8')}
        {flower('52px','0','#FFD54F')}{flower('84px','0','#81D4FA')}
        {flower('116px','0','#A5D6A7')}
      </div>
      <div className="ss-ground-meadow" />
    </>
  },

  'head-shoulders': {
    className: 'sc-rainbow',
    label: 'Head Shoulders Knees and Toes',
    elements: <>
      <div className="ss-rainbow" />
      <div className="ss-figure" />
    </>
  },

  'if-youre-happy': {
    className: 'sc-happy',
    label: "If You're Happy",
    elements: <>
      <div className="ss-smiley" style={{ left: '25%', top: '20%', animationDelay: '0s' }} />
      <div className="ss-smiley" style={{ left: '50%', top: '15%', animationDelay: '0.3s' }} />
      <div className="ss-smiley" style={{ left: '70%', top: '25%', animationDelay: '0.6s' }} />
      <div className="ss-clap-hands" style={{ left: '40%' }} />
      {confetti('15%','#EF5350','0s')}{confetti('35%','#42A5F5','0.4s','round')}
      {confetti('55%','#66BB6A','0.8s')}{confetti('75%','#FFD54F','1.2s','round')}
    </>
  },

  'wheels-on-the-bus': {
    className: 'sc-road',
    label: 'Wheels on the Bus',
    elements: <>
      {cloud('8%','25%',45)}{cloud('12%','70%',35)}
      <div className="ss-bus">
        <div className="ss-bus-body" />
        <div className="ss-bus-window" style={{ left: '8px' }} />
        <div className="ss-bus-window" style={{ left: '28px' }} />
        <div className="ss-bus-window" style={{ left: '48px' }} />
        <div className="ss-bus-wheel" style={{ left: '10px' }} />
        <div className="ss-bus-wheel" style={{ left: '55px' }} />
      </div>
      <div className="ss-road-line" />
    </>
  },

  'abc-song': {
    className: 'sc-letters',
    label: 'ABC Song',
    elements: <>
      <div className="ss-letter" style={{ left: '10%', top: '15%', color: '#EF5350', animationDelay: '0s' }}>A</div>
      <div className="ss-letter" style={{ left: '25%', top: '30%', color: '#FF9800', animationDelay: '0.2s' }}>B</div>
      <div className="ss-letter" style={{ left: '40%', top: '12%', color: '#FFEB3B', animationDelay: '0.4s' }}>C</div>
      <div className="ss-letter" style={{ left: '55%', top: '28%', color: '#4CAF50', animationDelay: '0.6s' }}>D</div>
      <div className="ss-letter" style={{ left: '70%', top: '18%', color: '#2196F3', animationDelay: '0.8s' }}>E</div>
      <div className="ss-letter" style={{ left: '85%', top: '35%', color: '#9C27B0', animationDelay: '1s' }}>F</div>
    </>
  },

  'hickory-dickory-dock': {
    className: 'sc-clock',
    label: 'Hickory Dickory Dock',
    elements: <>
      <div className="ss-clock-face">
        <div className="ss-clock-hand ss-hour-hand" />
        <div className="ss-clock-hand ss-minute-hand" />
        <div className="ss-clock-center" />
      </div>
      <div className="ss-clock-body" />
      <div className="ss-mouse" />
    </>
  },

  'jack-and-jill': {
    className: 'sc-hill',
    label: 'Jack and Jill',
    elements: <>
      {cloud('8%','20%',50)}{cloud('12%','65%',35)}
      <div className="ss-sun-small" />
      <div className="ss-big-hill" />
      <div className="ss-well" />
      <div className="ss-pail" />
    </>
  },

  'pop-goes-the-weasel': {
    className: 'sc-circus',
    label: 'Pop Goes the Weasel',
    elements: <>
      <div className="ss-jack-box">
        <div className="ss-box-base" />
        <div className="ss-spring" />
        <div className="ss-jack-head" />
      </div>
      {confetti('15%','#EF5350','0s')}{confetti('30%','#42A5F5','0.3s','round')}
      {confetti('50%','#FFD54F','0.6s')}{confetti('70%','#66BB6A','0.9s')}
      {confetti('85%','#AB47BC','1.2s','round')}
      <div className="ss-stars-burst" />
    </>
  },

  'yankee-doodle': {
    className: 'sc-patriot',
    label: 'Yankee Doodle',
    elements: <>
      <div className="ss-feather" />
      <div className="ss-hat" />
      <div className="ss-horse" />
      <div className="ss-path-road" style={{ bottom: 0 }} />
    </>
  },

  'default': {
    className: 'sc-default',
    label: 'Music Time',
    elements: <>
      <div className="ss-music-note" style={{ top: '20%', left: '25%', animationDelay: '0s' }} />
      <div className="ss-music-note" style={{ top: '30%', left: '50%', animationDelay: '0.5s' }} />
      <div className="ss-music-note" style={{ top: '15%', left: '75%', animationDelay: '1s' }} />
    </>
  },
};

export default SongScene;
