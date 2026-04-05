# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Create optimized production build
npm run start    # Run production build
npm run lint     # Run ESLint (Next.js rules)
```

No test suite is currently configured.

## Architecture Overview

Zero2Lab is a full-stack Learning Management System (LMS) built on **Next.js 14 App Router**. It handles course enrollment, secure video streaming, progress tracking, admin management, and a blog system.

**Tech stack:** Next.js 14 · MongoDB + Mongoose · Clerk (auth) · AWS CloudFront (video CDN) · UploadThing (file uploads) · Tailwind CSS · Ant Design

### Path Alias

`@/*` resolves to the project root (configured in `jsconfig.json`). Use `@/lib/db` not `../../lib/db`.

## Authentication & Authorization

**Clerk** handles all authentication. The middleware in `middleware.js` enforces three tiers:

- **Public routes** — no auth (home, courses listing, blogs, marketing pages)
- **Protected routes** — require signed-in user (`/dashboard`, `/courses/[id]/learn`)
- **Admin routes** — require `sessionClaims.metadata.role === "admin"` (`/admin/*`)

Admin role is assigned in the Clerk dashboard under user metadata. API routes that are admin-only check `auth()` from `@clerk/nextjs/server` and validate the role claim server-side.

User records are synced to MongoDB via Clerk webhooks → `POST /api/webhooks/clerk` → `lib/actions/user.js`. The MongoDB `User` model uses `clerkId` as the unique identifier.

## Database

MongoDB via Mongoose. Connection is cached globally in `lib/db.js` for serverless/Vercel compatibility — always call `await dbConnect()` at the top of API routes before any model usage.

**Key models and their relationships:**

| Model | File | Purpose |
|-------|------|---------|
| `User` | `models/user.js` | Profile synced from Clerk via `clerkId` |
| `Course` | `models/course.js` | Course metadata + content array `[{day, videoUrl, notes}]` |
| `UserCourse` | `models/userCourse.js` | Enrollment record; status: `Pending → Approved → Completed` |
| `LessonProgress` | `models/lessonProgress.js` | Tracks completed lesson day numbers per user per course |
| `Blog` | `models/blog.js` | Blog posts with embedded comments and likes array |
| `PromoCode` | `models/promoCode.js` | Discount codes applied at enrollment |
| `Meeting` | `models/meeting.js` | Scheduled consultations |

Compound unique indexes on `(userId, courseId)` in both `UserCourse` and `LessonProgress` — never try to create duplicate enrollment or progress records; use upsert patterns instead.

## API Routes

All under `app/api/`. Pattern:
- `route.js` at resource root → `GET` (list) / `POST` (create)
- `[id]/route.js` → `GET` / `PUT` / `DELETE` by ID
- Admin-only routes live under `app/api/admin/`

**Key endpoints:**
- `/api/usercourses` — enrollment creation with promo code validation and price calculation (server-side)
- `/api/progress` — `GET` by `?userId=&courseId=`, `PUT` to mark lesson complete
- `/api/key/[courseID]` and `/api/get-key` — generate AWS CloudFront signed URLs for secure video access
- `/api/admin/progress` — aggregate student progress for admin dashboard
- `/api/uploadthing` — UploadThing file upload handler

## Secure Video Delivery

Videos are hosted behind AWS CloudFront with signed URL access. The flow:
1. Client requests `/api/key/[courseID]` (authenticated, enrollment verified)
2. Server signs a time-limited URL using `CLOUDFRONT_PRIVATE_KEY` + `CLOUDFRONT_KEY_PAIR_ID`
3. Client uses the signed URL with `hls.js` for HLS adaptive streaming in `SecureVideoPlayer.jsx` / `SecureVideoPlayerWrapper.jsx`

Never expose raw CloudFront video URLs to clients — always route through the signing API.

## Course Learning Interface

`app/courses/[id]/learn/` contains three co-located components:
- `page.jsx` — orchestrates data fetching and state
- `Sidebar.jsx` — lesson list with completion indicators
- `VideoSection.jsx` — wraps the secure video player

Progress is tracked by lesson `day` number stored in `LessonProgress.completedLessons` array.

## Required Environment Variables

```
MONGODB_URI
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
WEBHOOK_SECRET
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
UPLOADTHING_TOKEN
NEXT_PUBLIC_CLOUDFRONT_DOMAIN
CLOUDFRONT_KEY_PAIR_ID
CLOUDFRONT_PRIVATE_KEY
NEBIUS_API_KEY
NEBIUS_MODEL
```

## Blog System

Blogs use **TipTap** as the rich-text editor (in admin). Blog posts have a unique `slug` field used for SEO URLs (`/blogs/[slug]`). Likes are stored as an array of `userId` strings on the `Blog` document. Comments are embedded subdocuments (not a separate collection).

## Image Configuration

Remote image domains are whitelisted in `next.config.mjs` — add new external image hosts there if needed (Clerk, UploadThing, CloudFront are already configured).
