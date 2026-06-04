import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Check for Better Auth session cookie
    const sessionToken = request.cookies.get('better-auth.session_token')?.value;
    
    if (!sessionToken) {
      // Redirect to login if no session
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Note: Full admin role check happens in the admin layout (server component)
    // Middleware only checks if user is authenticated at all
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
