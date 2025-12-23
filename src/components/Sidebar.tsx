
import React from 'react';
import { ThemeDefinition } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeDefinition;
  onNavigate: (page: string) => void;
  showParticles: boolean;
  setShowParticles: (show: boolean) => void;
  particleCount: number;
  setParticleCount: (count: number) => void;
  customParticles: string;
  setCustomParticles: (chars: string) => void;
  customRadius: number;
  setCustomRadius: (radius: number) => void;
  quoteStyle: { fontSize: number; color: string };
  setQuoteStyle: (style: { fontSize: number; color: string }) => void;
  quoteLanguage: 'en' | 'cn' | 'both';
  setQuoteLanguage: (lang: 'en' | 'cn' | 'both') => void;
  customQuote: { en: string; cn: string; author: string };
  setCustomQuote: (q: { en: string; cn: string; author: string }) => void;
  useCustomQuote: boolean;
  setUseCustomQuote: (use: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  theme, 
  onNavigate,
  showParticles,
  setShowParticles,
  particleCount,
  setParticleCount,
  customParticles,
  setCustomParticles,
  customRadius,
  setCustomRadius,
  quoteStyle,
  setQuoteStyle,
  quoteLanguage,
  setQuoteLanguage,
  customQuote,
  setCustomQuote,
  useCustomQuote,
  setUseCustomQuote
}) => {
  const isAutoColor = quoteStyle.color === 'auto';
  // If auto, display theme text color, otherwise display custom color
  const displayColor = isAutoColor ? theme.text : quoteStyle.color;

  return (
    <>
      <div 
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 left-0 h-full w-80 z-[70] transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: theme.bg.includes('gradient') ? '#1a1a1a' : theme.bg, color: theme.text }}
      >
        <div className="p-8 flex flex-col h-full overflow-y-auto hide-scrollbar">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold">系统设置</h2>
            <button onClick={onClose} className="text-xl opacity-50 hover:opacity-100">✕</button>
          </div>
          
          <button 
            onClick={() => { onNavigate('themes'); onClose(); }}
            className="w-full py-4 mb-6 rounded-2xl font-bold text-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg active:scale-95 transition-transform"
          >
            🎨 进入主题画廊
          </button>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <label className="block mb-3 text-sm font-bold opacity-80">全局界面</label>
              
              <div className="mb-2">
                <div className="flex justify-between text-xs opacity-60 mb-2">
                  <span>卡片圆角</span>
                  <span>{customRadius}px</span>
                </div>
                <input 
                  type="range" min="0" max="50" 
                  value={customRadius} 
                  onChange={(e) => setCustomRadius(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <label className="block mb-3 text-sm font-bold opacity-80">激励名言设置</label>
              
              <div className="mb-4">
                <label className="text-xs opacity-60 block mb-2">显示语言 (Language)</label>
                <div className="flex bg-black/20 rounded-lg p-1">
                  {[
                    { id: 'both', label: '双语' },
                    { id: 'cn', label: '中文' },
                    { id: 'en', label: 'English' }
                  ].map((opt) => (
                    <button 
                      key={opt.id}
                      onClick={() => setQuoteLanguage(opt.id as any)} 
                      className={`flex-1 py-1.5 text-xs rounded-md transition-all font-medium ${quoteLanguage === opt.id ? 'bg-white/20 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs opacity-60 mb-2">
                  <span>字体大小</span>
                  <span>{quoteStyle.fontSize}px</span>
                </div>
                <input 
                  type="range" min="20" max="80" 
                  value={quoteStyle.fontSize} 
                  onChange={(e) => setQuoteStyle({...quoteStyle, fontSize: Number(e.target.value)})}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-xs opacity-60">文字颜色</span>
                  <button 
                    onClick={() => setQuoteStyle({...quoteStyle, color: 'auto'})}
                    className={`text-[10px] mt-1 px-2 py-0.5 rounded border transition-colors ${isAutoColor ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/20 opacity-50 hover:opacity-100'}`}
                  >
                    跟随主题
                  </button>
                </div>
                <div className="relative">
                   <input 
                    type="color" 
                    value={displayColor.length === 4 || displayColor.length === 7 ? displayColor : '#ffffff'} 
                    onChange={(e) => setQuoteStyle({...quoteStyle, color: e.target.value})}
                    className="w-8 h-8 rounded-full cursor-pointer overflow-hidden opacity-0 absolute inset-0 z-10"
                  />
                  <div 
                    className="w-8 h-8 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: displayColor }}
                  />
                </div>
              </div>

              {/* Custom Quote Settings */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs opacity-60">内容来源</label>
                  <div className="flex bg-black/20 rounded-lg p-1">
                    <button
                      onClick={() => setUseCustomQuote(false)}
                      className={`px-3 py-1 text-xs rounded-md transition-all ${!useCustomQuote ? 'bg-white/20 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                    >
                      系统
                    </button>
                    <button
                      onClick={() => setUseCustomQuote(true)}
                      className={`px-3 py-1 text-xs rounded-md transition-all ${useCustomQuote ? 'bg-white/20 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                    >
                      自定义
                    </button>
                  </div>
                </div>

                {useCustomQuote && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className="block text-[10px] opacity-40 mb-1 uppercase tracking-wider">中文内容</label>
                      <input 
                        type="text" 
                        value={customQuote.cn}
                        onChange={(e) => setCustomQuote({...customQuote, cn: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-white/20"
                        placeholder="输入中文座右铭..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] opacity-40 mb-1 uppercase tracking-wider">English Content</label>
                      <input 
                        type="text" 
                        value={customQuote.en}
                        onChange={(e) => setCustomQuote({...customQuote, en: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-white/20"
                        placeholder="Type English quote..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] opacity-40 mb-1 uppercase tracking-wider">作者 / Author</label>
                      <input 
                        type="text" 
                        value={customQuote.author}
                        onChange={(e) => setCustomQuote({...customQuote, author: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-white/20"
                        placeholder="作者 / Author"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <label className="block mb-3 text-sm font-bold opacity-80">环境视觉效果</label>
              
              <div className="flex items-center justify-between mb-4">
                <span>粒子动画</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showParticles}
                    onChange={(e) => setShowParticles(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {showParticles && (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs opacity-60 mb-2">
                      <span>粒子数量</span>
                      <span>{particleCount}</span>
                    </div>
                    <input 
                      type="range" min="5" max="100" 
                      value={particleCount} 
                      onChange={(e) => setParticleCount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                  
                  <div className="mt-2">
                    <label className="block text-xs mb-2 opacity-60">自定义粒子 (留空使用默认)</label>
                    <input 
                      type="text" 
                      value={customParticles}
                      onChange={(e) => setCustomParticles(e.target.value)}
                      placeholder="例如: ✨,🌙,🚀"
                      className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-auto pt-6">
            <button 
              onClick={() => { if(confirm('确定要清除所有本地数据并重置吗？')) { localStorage.clear(); window.location.reload(); } }}
              className="w-full py-3 text-red-400 font-semibold hover:bg-red-400/10 rounded-lg transition-colors"
            >
              重置应用数据
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
