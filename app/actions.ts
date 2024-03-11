'use server';

import { serverAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function verifyAndCreateCookie(idToken: string) {
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const cookie = await serverAuth().createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set({
      name: 'session',
      value: cookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });

    return true;
  } catch (e) {
    console.error(e);
  }
  return false;
}

// TODO: Make Typing Better
export type USER = typeof verifyAndCreateCookie;
