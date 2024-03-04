import { atomWithStorage } from 'jotai/utils';
export type ThemeOptions = 'light' | 'dark' | 'system';

export const themeAtom = atomWithStorage<ThemeOptions>('font', 'dark');
