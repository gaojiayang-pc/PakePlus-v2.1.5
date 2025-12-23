
import React from 'react';
import { AppConfig, ThemeDefinition } from '../types';

interface Props {
  apps: AppConfig[];
  theme: ThemeDefinition;
  isEditing: boolean;
  onNavigate: (id: string) => void;
}

const HomeGrid: React.FC<Props> = ({ apps, theme, isEditing, onNavigate }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-6 md:gap-8">
      {apps.filter(app => !app.hidden).map(app => (
        <div 
          key={app.id}
          onClick={() => onNavigate(app.id)}
          className={`group relative flex flex-col items-center justify-center aspect-square p-2 sm:p-4 cursor-pointer transition-all duration-300 active:scale-95
            ${isEditing ? 'animate-bounce' : 'hover:-translate-y-2 hover:shadow-xl'}`}
          style={{ 
            backgroundColor: theme.card, 
            borderRadius: theme.radius,
            border: theme.id === 'minimalism' ? '2px solid black' : theme.border,
            boxShadow: theme.shadow,
            backdropFilter: theme.backdrop
          }}
        >
          {isEditing && (
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-left-3 w-5 h-5 sm:w-7 sm:h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold border-2 border-white shadow-md z-10">
              -
            </div>
          )}
          <span className="text-3xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 drop-shadow-sm transition-transform duration-300 group-hover:scale-110 filter group-hover:brightness-110">{app.emoji}</span>
          <strong className="text-[10px] sm:text-sm font-semibold opacity-90 tracking-wide text-center px-1 truncate w-full leading-tight">{app.name}</strong>
          
          {/* Subtle shine effect on hover */}
          <div className="absolute inset-0 rounded-[inherit] bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

export default HomeGrid;
