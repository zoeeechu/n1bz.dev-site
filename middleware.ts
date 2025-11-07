import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const referrer = request.headers.get('referer') || ''
  

 if (referrer.includes('google.')) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>403 Forbidden</title>
          <style>
            body { background-color: #fff; color: #000; font-family: sans-serif; }
            h1 { font-size: 1.5em; margin: 20px 0; }
            hr { border: none; border-top: 1px solid #ccc; }
          </style>
        </head>
        <body>
          <h1>403 Forbidden</h1>
          <p>nginx/1.18.0 (Ubuntu)</p>
          <hr>
        </body>
      </html>
    `
    return new NextResponse(html, {
      status: 403,
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }


  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // Apply to all pages except assets
  ],
}
