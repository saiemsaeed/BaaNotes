import { Dodo } from '@/models/doto';
import { atomWithStorage } from 'jotai/utils';

export const dodoAtom = atomWithStorage<Dodo[]>('dodo', []);
