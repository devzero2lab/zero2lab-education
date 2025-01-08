import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, request) => {
  if (request.url.includes('__clerk')) {
    const proxyHeaders = new Headers(request.headers);
    proxyHeaders.set('Clerk-Proxy-Url', process.env.NEXT_PUBLIC_CLERK_PROXY_URL || 'https://www.zero2learn.com/__clerk');
    proxyHeaders.set('Clerk-Secret-Key', process.env.CLERK_SECRET_KEY || '');
    proxyHeaders.set('X-Forwarded-For', request.ip || request.headers.get('X-Forwarded-For') || '');

    const proxyUrl = new URL(request.url);
    proxyUrl.host = 'frontend-api.clerk.dev';
    proxyUrl.protocol = 'https';
    proxyUrl.pathname = proxyUrl.pathname.replace('/__clerk', '');

    return NextResponse.rewrite(proxyUrl, {
      request: {
        headers: proxyHeaders,
      },
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};


