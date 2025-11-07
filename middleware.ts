import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const referrer = request.headers.get('referer') || ''
  
  // Check if visitor came from Google
  if (referrer.includes('google.')) {
    // Option 1: Send them to an error page
   // return NextResponse.redirect(new URL('/error', request.url))
    
    // Option 2: Return 403 forbidden instead
     return new NextResponse('Forbidden', { status: 403 })
  }

  // Otherwise, allow the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // Apply to all pages except assets
  ],
}
