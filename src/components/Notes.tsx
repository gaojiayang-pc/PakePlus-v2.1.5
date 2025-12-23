
import React, { useState, useEffect } from 'react';
import { ThemeDefinition } from '../types';

const Notes: React.FC<{ theme: ThemeDefinition }> = ({ theme }) => {
  const [notes, setNotes] = useState(() => localStorage.getItem('notes_v36') || '');

  useEffect(() => {
    localStorage.setItem('notes_v36', notes);
  }, [notes]);

  return (
    <div 
      className="h-[60vh] flex flex-col p-8" 
      style={{ 
        backgroundColor: theme.card, 
        border: theme.border, 
        backdropFilter: theme.backdrop,
        borderRadius: theme.radius 
      }}
    >
      <h2 className="text-2xl font-bold mb-6">🗒️ 随手笔记</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="在此输入内容... (系统将自动保存)"
        className="flex-1 bg-transparent text-xl leading-relaxed outline-none resize-none"
        style={{ color: theme.text }}
      />
    </div>
  );
};

export default Notes;
