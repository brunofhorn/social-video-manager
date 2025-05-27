import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_TOKEN_SECRET = process.env.NEXT_JWT_TOKEN_SECRET!;

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  console.log(token)

  const isAuth = !!token && (() => {
    try {
      jwt.verify(token, JWT_TOKEN_SECRET);
      return true;
    } catch {
      return false;
    }
  })();

  const isLoginPage = request.nextUrl.pathname === '/';

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard/videos', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
