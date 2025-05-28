import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_TOKEN_SECRET = process.env.NEXT_JWT_TOKEN_SECRET!;

export function middleware(request: NextRequest) {
  return NextResponse.next();
}


export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
