
import { ThemeDefinition, AppConfig, ThemeID } from './types';

export const THEMES: ThemeDefinition[] = [
  { id: 'glass_pro', name: '极光玻璃', tag: 'Glass Pro', bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', card: 'rgba(255, 255, 255, 0.1)', text: '#ffffff', accent: '#00d2ff', radius: '24px', backdrop: 'blur(20px) saturate(180%)', border: '1px solid rgba(255, 255, 255, 0.2)', shadow: '0 8px 32px rgba(0,0,0,0.3)' },
  { id: 'cyberpunk', name: '赛博朋克', tag: 'Cyberpunk', bg: '#000', card: 'rgba(20, 20, 20, 0.9)', text: '#0ff', accent: '#f0f', radius: '0px', font: 'Orbitron', border: '2px solid #f0f', shadow: '0 0 15px #f0f' },
  { id: 'minimalism', name: '极简主义', tag: 'Minimal', bg: '#ffffff', card: '#ffffff', text: '#111111', accent: '#000', radius: '0px', border: '1px solid #eee' },
  { id: 'material', name: '材料设计', tag: 'Material', bg: '#f5f5f5', card: '#ffffff', text: '#212121', accent: '#6200ee', radius: '8px', shadow: '0 2px 5px rgba(0,0,0,0.1)' },
  { id: 'neumorphism', name: '新拟态', tag: 'Neumorphism', bg: '#e0e5ec', card: '#e0e5ec', text: '#4d6d8a', accent: '#6d5dfc', radius: '30px', shadow: '9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)' },
  { id: 'vaporwave', name: '蒸汽波', tag: 'Vaporwave', bg: '#2e003e', card: 'rgba(255,255,255,0.05)', text: '#ff71ce', accent: '#01cdfe', radius: '0px', font: 'Orbitron', border: '1px solid #ff71ce', backdrop: 'blur(10px)' },
  { id: 'zen', name: '禅意', tag: 'Zen', bg: '#efebe9', card: '#fdfbf7', text: '#5d4037', accent: '#8d6e63', radius: '40px', shadow: '0 10px 30px rgba(0,0,0,0.05)' },
  { id: 'bauhaus', name: '包豪斯', tag: 'Bauhaus', bg: '#eaeaea', card: '#fdfdfd', text: '#111', accent: '#c0392b', radius: '0px', border: '4px solid #111' },
  { id: 'popart', name: '波普艺术', tag: 'Pop Art', bg: '#ffe600', card: '#ffffff', text: '#000', accent: '#e74c3c', radius: '0px', border: '4px solid #000' },
  { id: 'steampunk', name: '蒸汽朋克', tag: 'Steampunk', bg: '#2b2b2b', card: '#4b3621', text: '#d4c4a8', accent: '#cd853f', radius: '8px', border: '3px double #b8860b' },
  { id: 'brutalism', name: '粗野主义', tag: 'Brutalism', bg: '#0000ff', card: '#c0c0c0', text: '#000', accent: '#ff0000', radius: '0px', border: '4px solid #000' },
  { id: 'organic', name: '有机生态', tag: 'Organic', bg: '#f1f8e9', card: '#ffffff', text: '#33691e', accent: '#7cb342', radius: '25px 5px 25px 5px' },
];

export const INITIAL_APPS: AppConfig[] = [
  { id: 'themes', name: '主题画廊', emoji: '🎨', type: 'system' },
  { id: 'calculator', name: '计算器', emoji: '🧮', type: 'app' },
  { id: 'notes', name: '笔记', emoji: '🗒️', type: 'app' },
  { id: 'search', name: '全网搜索', emoji: '🔍', type: 'system' },
];

export const SEARCH_ENGINES = {
  google: { name: '谷歌', url: 'https://google.com/search?q=', logo: '🔍' },
  bing: { name: '必应', url: 'https://bing.com/search?q=', logo: '🦋' },
  wiki: { name: '维基百科', url: 'https://zh.wikipedia.org/wiki/', logo: '📖' },
};
