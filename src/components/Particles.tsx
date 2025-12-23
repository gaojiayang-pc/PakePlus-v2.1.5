
import React, { useMemo } from 'react';
import { ThemeID } from '../types';

interface Props {
  themeId: ThemeID;
  customChars?: string;
  count?: number;
}

const Particles: React.FC<Props> = ({ themeId, customChars, count = 20 }) => {
  const particles = useMemo(() => {
    // Extensive mapping for all themes
    const themeEmojis: Record<string, string[]> = {
      glass_pro: ['✨', '❄️', '🫧', '🔷'],
      cyberpunk: ['👾', '⚡', '💾', '🟢', '🔋'],
      minimalism: ['▪️', '▫️', '•', '◦'],
      material: ['🔺', '🟦', '🟡', '🟣'],
      flat: ['🎈', '🍦', '🍭'],
      hig: ['🍎', '⚪', '🖱️'],
      fluent: ['🪟', '🟦', '✨'],
      neumorphism: ['⚪', '☁️', '🌑'],
      skeuomorphism: ['🕰️', '📜', '🖋️'],
      swiss: ['🟥', '🔲', '➕'],
      bauhaus: ['📐', '🟥', '🟨', '🟦'],
      popart: ['💥', '👄', '🍌', '💬'],
      artdeco: ['💎', '🍸', '⚜️', '🏛️'],
      memphis: ['〰️', '🔺', '🔵', '🟧'],
      vaporwave: ['🌴', '💿', '🗿', '🐬', '🌇'],
      steampunk: ['⚙️', '🕰️', '🕯️', '🗝️'],
      gothic: ['🦇', '🕸️', '🥀', '🌑'],
      zen: ['🍃', '🎋', '🪷', '🍵', '⚪'],
      organic: ['🌿', '🦋', '🍄', '🌱'],
      tropical: ['🌴', '🥥', '🌺', '🍍', '🦜'],
      hightech: ['📡', '🔭', '🛰️', '🌐'],
      industrial: ['🏗️', '🧱', '🔩', '🔧'],
      scandinavian: ['🌨️', '🦌', '🔥', '🌲'],
      wabisabi: ['🍵', '🍂', '🏺', '🪵'],
      brutalism: ['⬛', '🧱', '🛑', '🏗️'],
      default: ['✨', '🎈', '🫧']
    };

    let set: string[] = [];

    // Prioritize user custom input
    if (customChars && customChars.trim().length > 0) {
      // Split by comma if present, otherwise split by characters if no comma
      if (customChars.includes(',')) {
        set = customChars.split(',').map(s => s.trim()).filter(s => s);
      } else {
        // Simple iterator for string to handle emojis correctly (mostly)
        set = Array.from(customChars).filter(s => s.trim());
      }
    } 
    
    // Fallback to theme specific or default
    if (set.length === 0) {
      set = themeEmojis[themeId] || themeEmojis.default;
    }

    // Use the count prop (defaults to 20 if not provided, though App.tsx provides it)
    return Array.from({ length: Math.max(1, count) }).map((_, i) => ({
      id: i,
      char: set[Math.floor(Math.random() * set.length)],
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 20}s`,
      size: `${0.5 + Math.random() * 2}rem`,
      initialRotation: Math.random() * 360
    }));
  }, [themeId, customChars, count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle opacity-40 hover:opacity-80 transition-opacity"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
            transform: `rotate(${p.initialRotation}deg)`
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
};

export default Particles;
