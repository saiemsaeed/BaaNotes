import { serverAuth } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = request.headers.get('Authorization');

    if (!session) {
      throw new Error('No Session Cookie');
    }

    const decodedClaims = await serverAuth().verifySessionCookie(session, true);

    if (!decodedClaims) {
      throw new Error('Error While Decoding Claims and Verifying Session');
    }

    return NextResponse.json({ isLogged: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
}
