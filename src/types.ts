
export type ThemeID = 
  | 'glass_pro' | 'cyberpunk' | 'minimalism' | 'material' | 'flat' 
  | 'hig' | 'fluent' | 'neumorphism' | 'skeuomorphism' | 'swiss' 
  | 'bauhaus' | 'popart' | 'artdeco' | 'memphis' | 'vaporwave' 
  | 'steampunk' | 'gothic' | 'zen' | 'organic' | 'tropical' 
  | 'hightech' | 'industrial' | 'scandinavian' | 'wabisabi' | 'brutalism';

export interface ThemeDefinition {
  id: ThemeID;
  name: string;
  tag: string;
  bg: string;
  card: string;
  text: string;
  accent: string;
  radius: string;
  font?: string;
  backdrop?: string;
  border?: string;
  shadow?: string;
}

export interface AppConfig {
  id: string;
  name: string;
  emoji: string;
  type?: 'app' | 'folder' | 'system';
  hidden?: boolean;
}

export interface FolderConfig {
  id: string;
  name: string;
  apps: string[];
}
