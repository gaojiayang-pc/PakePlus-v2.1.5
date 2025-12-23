
import React, { useState } from 'react';
import { ThemeDefinition } from '../types';

const Calculator: React.FC<{ theme: ThemeDefinition }> = ({ theme }) => {
  const [display, setDisplay] = useState('0');

  const append = (v: string) => {
    setDisplay(prev => prev === '0' || prev === 'Error' ? v : prev + v);
  };

  const clear = () => setDisplay('0');

  const evaluate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(display.replace('×', '*').replace('÷', '/'));
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
  };

  const buttons = [
    'C', '(', ')', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <div className="w-full max-w-sm p-4">
      <div className="bg-black/10 p-4 rounded-xl mb-4 text-right">
        <div className="text-3xl font-mono overflow-x-auto whitespace-nowrap hide-scrollbar">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map(btn => (
          <button
            key={btn}
            onClick={() => {
              if (btn === 'C') clear();
              else if (btn === '=') evaluate();
              else append(btn);
            }}
            className={`h-12 rounded-xl text-lg font-bold transition-transform active:scale-90 ${btn === '=' ? 'col-span-2' : ''}`}
            style={{ 
              backgroundColor: btn === '=' ? theme.accent : 'rgba(255,255,255,0.05)',
              color: btn === '=' ? '#fff' : theme.text,
              border: theme.border
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
