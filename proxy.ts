import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Set the X-Robots-Tag header for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  if (request.nextUrl.pathname.startsWith('/widget/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('X-Frame-Options', 'ALLOWALL');
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/widget/:path*'],
};