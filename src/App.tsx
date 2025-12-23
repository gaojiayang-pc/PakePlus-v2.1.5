
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { THEMES, INITIAL_APPS } from './constants';
import { ThemeDefinition, AppConfig, ThemeID, FolderConfig } from './types';
import Sidebar from './components/Sidebar';
import HomeGrid from './components/HomeGrid';
import ThemeGallery from './components/ThemeGallery';
import SearchModule from './components/SearchModule';
import Calculator from './components/Calculator';
import Notes from './components/Notes';
import Particles from './components/Particles';
import FloatingWindow from './components/FloatingWindow';

// Bilingual Quotes Data
const BILINGUAL_QUOTES = [
  { en: "Stay hungry, stay foolish.", cn: "求知若饥，虚心若愚。", author: "Steve Jobs" },
  { en: "Innovation distinguishes between a leader and a follower.", cn: "领袖和跟风者的区别就在于创新。", author: "Steve Jobs" },
  { en: "The only way to do great work is to love what you do.", cn: "成就伟业的唯一途径是热爱你的工作。", author: "Steve Jobs" },
  { en: "Patience is a key element of success.", cn: "耐心是成功的关键要素。", author: "Bill Gates" },
  { en: "Success is a lousy teacher. It seduces smart people into thinking they can't lose.", cn: "成功是糟糕的老师，它诱使聪明人以为自己不会失败。", author: "Bill Gates" },
  { en: "Talk is cheap. Show me the code.", cn: "空谈误国，实干兴邦。", author: "Linus Torvalds" },
  { en: "The best way to predict the future is to invent it.", cn: "预测未来的最好方式就是去创造它。", author: "Alan Kay" },
  { en: "When something is important enough, you do it even if the odds are not in your favor.", cn: "当一件事足够重要时，即使胜算不大，你也要去做。", author: "Elon Musk" },
  { en: "Life is what happens when you're busy making other plans.", cn: "生活总是发生在你忙于制定其他计划的时候。", author: "John Lennon" }
];

const App: React.FC = () => {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeID>(() => (localStorage.getItem('theme') as ThemeID) || 'glass_pro');
  const [activePage, setActivePage] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [apps, setApps] = useState<AppConfig[]>(INITIAL_APPS);
  const [openAppIds, setOpenAppIds] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Header Auto-Hide State
  const [showHeader, setShowHeader] = useState(true);

  // Particle Settings
  const [showParticles, setShowParticles] = useState<boolean>(() => {
    const saved = localStorage.getItem('showParticles');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [particleCount, setParticleCount] = useState<number>(() => {
    const saved = localStorage.getItem('particleCount');
    return saved ? Number(saved) : 20;
  });
  const [customParticles, setCustomParticles] = useState<string>(() => localStorage.getItem('customParticles') || '');

  // Global Radius Setting
  const [customRadius, setCustomRadius] = useState<number>(() => {
    const saved = localStorage.getItem('customRadius');
    return saved ? Number(saved) : 24;
  });

  // Quote Settings
  const [quote, setQuote] = useState(BILINGUAL_QUOTES[0]);
  
  // Custom Quote State
  const [customQuote, setCustomQuote] = useState<{en: string, cn: string, author: string}>(() => {
    const saved = localStorage.getItem('customQuote');
    return saved ? JSON.parse(saved) : { en: "Believe you can and you're halfway there.", cn: "相信你自己，你已完成了一半。", author: "Theodore Roosevelt" };
  });
  const [useCustomQuote, setUseCustomQuote] = useState<boolean>(() => {
    return localStorage.getItem('useCustomQuote') === 'true';
  });

  const [quoteLanguage, setQuoteLanguage] = useState<'en' | 'cn' | 'both'>(() => {
    return (localStorage.getItem('quoteLanguage') as 'en' | 'cn' | 'both') || 'both';
  });
  const [quoteStyle, setQuoteStyle] = useState<{ fontSize: number; color: string }>(() => {
    const saved = localStorage.getItem('quoteStyle');
    // Default to 'auto' for color so it adapts to light/dark themes out of the box
    return saved ? JSON.parse(saved) : { fontSize: 32, color: 'auto' };
  });

  const currentTheme = useMemo(() => {
    const base = THEMES.find(t => t.id === currentThemeId) || THEMES[0];
    return {
      ...base,
      radius: `${customRadius}px` // Override theme radius with global setting
    };
  }, [currentThemeId, customRadius]);

  // Determine active quote color: if 'auto', use theme text color; otherwise use custom color
  const activeQuoteColor = quoteStyle.color === 'auto' ? currentTheme.text : quoteStyle.color;

  // Determine which quote to display
  const displayQuote = useCustomQuote ? customQuote : quote;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll Handler for Header Auto-hide
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header if at top or scrolling up
      if (currentScrollY <= 0) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Hide if scrolling down and past threshold
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        // Show if scrolling up
        setShowHeader(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('showParticles', JSON.stringify(showParticles));
    localStorage.setItem('particleCount', String(particleCount));
    localStorage.setItem('customParticles', customParticles);
  }, [showParticles, particleCount, customParticles]);

  useEffect(() => {
    localStorage.setItem('customRadius', String(customRadius));
  }, [customRadius]);

  useEffect(() => {
    localStorage.setItem('quoteStyle', JSON.stringify(quoteStyle));
  }, [quoteStyle]);

  useEffect(() => {
    localStorage.setItem('quoteLanguage', quoteLanguage);
  }, [quoteLanguage]);

  useEffect(() => {
    localStorage.setItem('customQuote', JSON.stringify(customQuote));
    localStorage.setItem('useCustomQuote', String(useCustomQuote));
  }, [customQuote, useCustomQuote]);

  // Randomize Quote on Mount
  useEffect(() => {
    const random = BILINGUAL_QUOTES[Math.floor(Math.random() * BILINGUAL_QUOTES.length)];
    setQuote(random);
  }, []);

  const handleThemeChange = (id: ThemeID) => {
    setCurrentThemeId(id);
    localStorage.setItem('theme', id);
    setActivePage('home');
  };

  const toggleApp = useCallback((appId: string) => {
    // Mobile specific behavior for calculator: Try to open system calculator
    // Check if device width implies mobile (< 768px)
    if (appId === 'calculator' && window.innerWidth < 768) {
      window.location.href = 'calculator://';
      return;
    }

    if (appId === 'themes' || appId === 'search') {
      setActivePage(appId);
      return;
    }
    
    setOpenAppIds(prev => {
      if (prev.includes(appId)) return prev;
      return [...prev, appId];
    });
  }, []);

  const closeApp = useCallback((appId: string) => {
    setOpenAppIds(prev => prev.filter(id => id !== appId));
  }, []);

  const navigate = useCallback((page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden page-transition"
      style={{ 
        background: currentTheme.bg,
        fontFamily: currentTheme.font || 'Inter, sans-serif',
        color: currentTheme.text
      }}
    >
      {showParticles && (
        <Particles themeId={currentThemeId} count={particleCount} customChars={customParticles} />
      )}
      
      {/* Top Bar */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none transition-transform duration-300 ease-in-out ${showHeader ? 'translate-y-0' : '-translate-y-[150%]'}`}
      >
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={toggleSidebar}
            className="px-5 py-2.5 rounded-full font-semibold backdrop-blur-md transition-all active:scale-95 hover:brightness-110 shadow-lg"
            style={{ backgroundColor: currentTheme.card, border: currentTheme.border, color: currentTheme.text, boxShadow: currentTheme.shadow }}
          >
            ☰
          </button>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`px-5 py-2.5 rounded-full font-semibold backdrop-blur-md transition-all active:scale-95 hover:brightness-110 shadow-lg ${isEditing ? 'bg-red-500 text-white' : ''}`}
            style={{ backgroundColor: isEditing ? undefined : currentTheme.card, border: currentTheme.border, color: isEditing ? '#fff' : currentTheme.text }}
          >
            {isEditing ? '完成' : '编辑'}
          </button>
        </div>
        
        <div className="flex items-center gap-4 pointer-events-auto">
          {activePage !== 'home