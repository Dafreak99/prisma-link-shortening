// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/get-url')) {
    console.log('returning early');
    return;
  }

  const slug = req.nextUrl.pathname.split('/').pop();

  const data = await (
    await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
  ).json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/api/get-url/:path*',
// };
