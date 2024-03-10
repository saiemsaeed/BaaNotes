import { serverAuth } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.headers.get('Authorization');

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const decodedClaims = await serverAuth.verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}
