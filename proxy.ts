import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Set the X-Robots-Tag header for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  if (request.nextUrl.pathname.startsWith('/widget/')) {
    // No X-Frame-Options header is set here: the widget route exists specifically to be
    // iframed on third-party sites, and there's no spec-valid value that means "allow
    // everyone" (only DENY/SAMEORIGIN/ALLOW-FROM) — omitting it is what actually allows framing.
    response.headers.set('Access-Control-Allow-Origin', '*');
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/widget/:path*'],
};