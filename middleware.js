import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Admin routes — server-side protection
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// Authenticated routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/courses/:id/learn(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Clerk proxy handling
  if (request.url.includes("__clerk")) {
    const proxyHeaders = new Headers(request.headers);
    proxyHeaders.set(
      "Clerk-Proxy-Url",
      process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "https://www.zero2lab.com/__clerk"
    );
    proxyHeaders.set("Clerk-Secret-Key", process.env.CLERK_SECRET_KEY || "");
    proxyHeaders.set(
      "X-Forwarded-For",
      request.ip || request.headers.get("X-Forwarded-For") || ""
    );

    const proxyUrl = new URL(request.url);
    proxyUrl.host = "frontend-api.clerk.dev";
    proxyUrl.protocol = "https";
    proxyUrl.pathname = proxyUrl.pathname.replace("/__clerk", "");

    return NextResponse.rewrite(proxyUrl, { request: { headers: proxyHeaders } });
  }

  const { userId, sessionClaims } = await auth();

  // Admin routes — server-side redirect (no client-side bypass possible)
  if (isAdminRoute(request)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect_url", request.url);
      return NextResponse.redirect(signInUrl);
    }

    const role = sessionClaims?.metadata?.role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protected routes — must be signed in
  if (isProtectedRoute(request) && !userId) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
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