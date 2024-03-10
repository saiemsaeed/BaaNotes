import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionCookieValue = request.cookies.get('session')?.value || '';

  const apiResponse = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Authorization: sessionCookieValue,
    },
  });

  const shouldRedirectToLogin =
    apiResponse.status !== 200 && request.nextUrl.pathname === '/';

  const shouldRedirectToHome =
    apiResponse.status === 200 && request.nextUrl.pathname === '/login';

  if (shouldRedirectToHome) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (shouldRedirectToLogin) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('session');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)',
  ],
};
