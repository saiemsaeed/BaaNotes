import { Dodo } from '@/models/doto';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const dodoAtom = atomWithStorage<Dodo[]>('dodo', []);
