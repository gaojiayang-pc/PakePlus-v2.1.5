
import React, { useState } from 'react';
import { SEARCH_ENGINES } from '../constants';
import { ThemeDefinition } from '../types';

interface Props {
  theme: ThemeDefinition;
}

const SearchModule: React.FC<Props> = ({ theme }) => {
  const [engine, setEngine] = useState<keyof typeof SEARCH_ENGINES>('google');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;
    window.open(`${SEARCH_ENGINES[engine].url}${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-500">
      <div className="flex gap-4 mb-10 flex-wrap justify-center">
        {(Object.keys(SEARCH_ENGINES) as Array<keyof typeof SEARCH_ENGINES>).map(k => (
          <button
            key={k}
            onClick={() => setEngine(k)}
            className={`px-8 py-3 rounded-full font-bold transition-all ${engine === k ? 'scale-110 opacity-100' : 'opacity-40 hover:opacity-70'}`}
            style={{ 
              backgroundColor: theme.card, 
              boxShadow: engine === k ? `0 0 0 2px ${theme.accent}` : 'none',
              borderRadius: theme.radius
            }}
          >
            {SEARCH_ENGINES[k].name}
          </button>
        ))}
      </div>

      <div 
        className="w-full max-w-3xl p-12 shadow-2xl flex flex-col items-center"
        style={{ 
          backgroundColor: theme.card, 
          backdropFilter: theme.backdrop, 
          border: theme.border,
          borderRadius: theme.radius
        }}
      >
        <div className="text-8xl mb-8 opacity-90">{SEARCH_ENGINES[engine].logo}</div>
        <input 
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={`使用 ${SEARCH_ENGINES[engine].name} 进行搜索...`}
          className="w-full text-3xl bg-transparent border-b-2 border-white/20 py-4 px-2 outline-none focus:border-blue-400 transition-colors text-center font-light"
          style={{ color: theme.text }}
        />
        <button 
          onClick={handleSearch}
          className="mt-10 px-16 py-4 rounded-full font-bold text-xl transition-transform active:scale-95 shadow-lg"
          style={{ backgroundColor: theme.accent, color: '#fff' }}
        >
          立即搜索
        </button>
      </div>
      
      <p className="mt-12 opacity-40 text-sm">向下滑动或点击主页图标返回</p>
    </div>
  );
};

export default SearchModule;
