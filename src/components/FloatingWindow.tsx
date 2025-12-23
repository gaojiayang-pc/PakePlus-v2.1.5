
import React, { useState, useRef, useEffect } from 'react';
import { ThemeDefinition } from '../types';

interface Props {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  theme: ThemeDefinition;
  index: number;
}

const FloatingWindow: React.FC<Props> = ({ title, children, onClose, theme, index }) => {
  const [position, setPosition] = useState({ x: 50 + index * 40, y: 150 + index * 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };
    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div 
      ref={windowRef}
      className="absolute pointer-events-auto flex flex-col shadow-2xl transition-shadow"
      style={{
        left: position.x,
        top: position.y,
        minWidth: 'min(360px, 85vw)', // Mobile friendly responsive width
        maxWidth: '90vw',
        zIndex: 100 + index,
        backgroundColor: theme.card,
        border: theme.border,
        borderRadius: theme.radius,
        backdropFilter: theme.backdrop,
        boxShadow: isDragging ? '0 40px 80px rgba(0,0,0,0.4)' : theme.shadow,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div 
        className="px-5 py-4 flex justify-between items-center cursor-move border-b border-white/10"
        onMouseDown={onMouseDown}
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.03)',
          borderTopLeftRadius: theme.radius,
          borderTopRightRadius: theme.radius
        }}
      >
        <span className="font-bold text-base tracking-wide opacity-90">{title}</span>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition-colors text-sm"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-auto max-h-[70vh] hide-scrollbar p-1">
        {children}
      </div>
    </div>
  );
};

export default FloatingWindow;
