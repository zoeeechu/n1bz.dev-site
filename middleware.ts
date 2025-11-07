import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const referrer = request.headers.get('referer') || ''
  

 if (referrer.includes('google.')) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>502 Bad Gateway</title>
          <style>
            body { background-color: #fff; color: #000; font-family: sans-serif; margin: 40px; }
            h1 { font-size: 1.5em; margin-bottom: 10px; }
            hr { border: none; border-top: 1px solid #ccc; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>502 Bad Gateway</h1>
          <p>nginx/1.18.0 (Ubuntu)</p>
          <hr>
        </body>
      </html>
    `
    return new NextResponse(html, {
      status: 502,
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
