import { atomWithStorage } from 'jotai/utils';
export type FontOptions = 'sans' | 'mono';

export const fontAtom = atomWithStorage<FontOptions>('font', 'sans');
