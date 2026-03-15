export type EmotionId = 'neutral' | 'exhausted' | 'alert' | 'anxious' | 'hostile' | 'melancholy';

export interface EmotionColors {
  primary: string;
  accent: string;
  glow: string;
  background: string;
  text: string;
}

export interface Emotion {
  id: EmotionId;
  label: string;
  title: string;
  subtitle: string;
  runic: string;
  colors: EmotionColors;
  faceMap: Record<number, string>;
}

export const CHAR_POOL = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=~;:.,/-';

export const EMOTIONS: Record<EmotionId, Emotion> = {
  neutral: {
    id: 'neutral',
    label: 'NEUTRAL',
    title: 'AWAITING INPUT',
    subtitle: 'Watching...',
    runic: 'ᚺᚨᚾᛞ ᛒᛁᛏᚾᛁᛏᚲ',
    colors: {
      primary: '#2a2a2a',
      accent: '#888888',
      glow: 'rgba(150, 150, 150, 0.12)',
      background: 'rgba(15, 15, 15, 0.8)',
      text: '#999999',
    },
    faceMap: {
      163: 'O', 164: 'O',
      183: 'O', 184: 'O',
      168: 'O', 169: 'O',
      188: 'O', 189: 'O',
    },
  },
  exhausted: {
    id: 'exhausted',
    label: 'EXHAUSTED',
    title: 'SOUL BINDING ACTIVE',
    subtitle: 'Where... am I?',
    runic: 'ᚺᚨᚾᛞ ᛒᛁᛏᚾᛁᛏᚲ',
    colors: {
      primary: '#3a3a4a',
      accent: '#666677',
      glow: 'rgba(100, 100, 120, 0.15)',
      background: 'rgba(20, 20, 30, 0.8)',
      text: '#888899',
    },
    faceMap: {
      164: '-', 165: '-',
      168: '-', 169: '-',
    },
  },
  alert: {
    id: 'alert',
    label: 'ALERT',
    title: 'SCANNING PERIMETER',
    subtitle: 'Something is near.',
    runic: 'ᚺᚨᚾᛞ ᛒᛁᛏᚾᛁᛏᚲ',
    colors: {
      primary: '#2a4a2a',
      accent: '#44cc44',
      glow: 'rgba(0, 255, 0, 0.15)',
      background: 'rgba(10, 20, 10, 0.8)',
      text: '#66bb66',
    },
    faceMap: {
      143: 'O', 144: 'O', 145: 'O',
      163: 'O', 165: 'O',
      183: 'O', 184: 'O', 185: 'O',
      148: 'O', 149: 'O', 150: 'O',
      168: 'O', 170: 'O',
      188: 'O', 189: 'O', 190: 'O',
    },
  },
  anxious: {
    id: 'anxious',
    label: 'ANXIOUS',
    title: 'SIGNAL FRAGMENTED',
    subtitle: 'Too many inputs...',
    runic: 'ᚺᚨᚾᛞ ᛒᛁᛏᚾᛁᛏᚲ',
    colors: {
      primary: '#4a3a1a',
      accent: '#cc9922',
      glow: 'rgba(200, 150, 0, 0.15)',
      background: 'rgba(20, 15, 5, 0.8)',
      text: '#bbaa44',
    },
    faceMap: {
      162: '?', 163: '!',
      182: '!',
      169: '#', 170: '?',
      189: '!',
      205: '~', 206: '~', 207: '~',
    },
  },
  hostile: {
    id: 'hostile',
    label: 'HOSTILE',
    title: 'DEFENSE PROTOCOL',
    subtitle: "You shouldn't be here.",
    runic: 'ᚺᚨᚾᛞ ᛒᛁᛏᚾᛁᛏᚲ',
    colors: {
      primary: '#5a1a1a',
      accent: '#cc2222',
      glow: 'rgba(200, 0, 0, 0.25)',
      background: 'rgba(20, 5, 5, 0.8)',
      text: '#cc4444',
    },
    faceMap: {
      144: 'X', 145: '!', 146: '#',
      150: 'D', 151: '*', 152: '&',
      164: 'M', 165: '!',
      169: '$', 170: 'B',
      184: '$', 186: '*',
      205: '~', 206: '~', 207: '~',
    },
  },
  melancholy: {
    id: 'melancholy',
    label: 'MELANCHOLY',
    title: 'CONNECTION SEVERED',
    subtitle: 'Lost again...',
    runic: 'ᚺᚨᚾᛞ ᛒᛁᛏᚾᛁᛏᚲ',
    colors: {
      primary: '#1a2a4a',
      accent: '#3366bb',
      glow: 'rgba(0, 80, 200, 0.2)',
      background: 'rgba(5, 10, 20, 0.8)',
      text: '#4477bb',
    },
    faceMap: {
      163: '#', 164: '#',
      183: '#', 184: '#',
      167: '#', 168: '#',
      187: '#', 188: '#',
    },
  },
};

export const EMOTION_ORDER: EmotionId[] = ['neutral', 'exhausted', 'alert', 'anxious', 'hostile', 'melancholy'];
