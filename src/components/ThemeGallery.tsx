
import React, { useState } from 'react';
import { THEMES } from '../constants';
import { ThemeDefinition, ThemeID } from '../types';

interface Props {
  theme: ThemeDefinition;
  onSelect: (id: ThemeID) => void;
  hideHeader?: boolean;
}

const ThemeGallery: React.FC<Props> = ({ theme, onSelect, hideHeader = false }) => {
  const [search, setSearch] = useState('');

  const filteredThemes = THEMES.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div 
        className="p-6 sm:p-8"
        style={{ 
          backgroundColor: theme.card, 
          backdropFilter: theme.backdrop, 
          border: theme.border,
          borderRadius: theme.radius 
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">主题画廊</h2>
        <input 
          type="text" 
          placeholder="搜索主题风格..."
          className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 outline-none focus:ring-2 ring-blue-400 transition-all text-base sm:text-lg backdrop-blur-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ 
            color: theme.text,
            backgroundColor: 'rgba(255,255,255,0.05)'
          }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
        {filteredThemes.map(t => (
          <div 
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="group relative h-32 sm:h-40 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: t.bg.includes('gradient') ? '#1a1a1a' : t.bg, 
              borderRadius: theme.radius, 
              border: t.border || '2px solid rgba(255,255,255,0.1)',
              boxShadow: theme.shadow
            }}
          >
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2 sm:mb-3 shadow-lg text-sm sm:text-base"
              style={{ background: t.card, color: t.text, border: t.border }}
            >
              Aa
            </div>
            <div className="absolute bottom-0 left-0 w-full p-1.5 sm:p-2 text-center bg-white/90 text-black">
              <p className="text-[10px] sm:text-xs font-bold leading-tight truncate">{t.name}</p>
              <p className="text-[8px] sm:text-[10px] opacity-60 truncate">{t.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeGallery;
