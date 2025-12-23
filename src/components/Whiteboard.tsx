
import React, { useRef, useEffect, useState } from 'react';
import { ThemeDefinition } from '../types';

const Whiteboard: React.FC<{ theme: ThemeDefinition }> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 400;
      }
    };

    resize();
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  }, [theme.accent]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="p-8 rounded-3xl" style={{ backgroundColor: theme.card, border: theme.border, backdropFilter: theme.backdrop }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🖍️ Whiteboard</h2>
        <button onClick={clear} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold">Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-[400px] bg-white/5 rounded-xl cursor-crosshair touch-none"
      />
    </div>
  );
};

export default Whiteboard;
