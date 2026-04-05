# Zero2Lab Education — Design Style Guide

> A complete reference for the visual language, design system, and frontend architecture of the **zero2lab** Learning Management System.

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Typography](#2-typography)
3. [Color Palette](#3-color-palette)
4. [CSS Variables & Theming](#4-css-variables--theming)
5. [Layout & Spacing](#5-layout--spacing)
6. [Border Radius Tokens](#6-border-radius-tokens)
7. [Component Design Patterns](#7-component-design-patterns)
8. [Animations & Motion](#8-animations--motion)
9. [Home Page Architecture](#9-home-page-architecture)
10. [Navigation (Header)](#10-navigation-header)
11. [Footer](#11-footer)
12. [Blog / Rich Text Content](#12-blog--rich-text-content)
13. [Interactive States & Micro-interactions](#13-interactive-states--micro-interactions)
14. [Tailwind Plugins](#14-tailwind-plugins)

---

## 1. Technology Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 14+** (App Router) |
| Language | React / JSX |
| Styling | **Tailwind CSS v3** |
| CSS Variables | shadcn/ui-style HSL token system |
| Animations | `framer-motion` + custom CSS keyframes |
| Fonts | Google Fonts (Poppins, Montserrat, Space Grotesk) + Local Geist |
| Auth | Clerk (`@clerk/nextjs`) |
| Notifications | Sonner (`<Toaster />`) |
| Rich Text | TipTap Editor |
| Tailwind Plugins | `tailwindcss-animate`, `tailwind-scrollbar` |

---

## 2. Typography

### Font Families

```css
/* Body — applied globally via globals.css */
body {
  font-family: "Poppins", sans-serif;
}
```

| Font | Usage | Import Method |
|---|---|---|
| **Poppins** | Global body fallback | `globals.css` |
| **Montserrat** | Hero, Features, FAQ, Footer, StruggleBanner sections | `next/font/google` |
| **Space Grotesk** | Header logo wordmark (`zero2lab`) | `next/font/google` |
| **Geist Sans** | Body antialiased base (root layout) | `localFont` (woff) |
| **Geist Mono** | Monospace for code blocks | `localFont` (woff) |

### Type Scale (Heading Hierarchy)

| Level | Classes | Approximate Size |
|---|---|---|
| `h1` Hero | `text-[1.8rem] md:text-[3rem] xl:text-5xl font-bold` | 1.8rem → 3rem → 3.75rem |
| `h2` Section | `text-2xl md:text-4xl font-extrabold` | 1.5rem → 2.25rem |
| `h2` Large | `text-3xl md:text-4xl font-extrabold` | 1.875rem → 2.25rem |
| `h3` Card/Sub | `text-base md:text-lg font-bold` | 1rem → 1.125rem |
| Body / Para | `text-base md:text-[1.1rem] font-medium leading-relaxed` | 1rem → 1.1rem |
| Small / Caption | `text-sm font-medium` | 0.875rem |
| Logo wordmark | `text-[19px] font-bold tracking-tight` | 19px fixed |

### Font Weights Used

- `font-medium` (500) — Body text
- `font-semibold` (600) — Subheadings, nav links
- `font-bold` (700) — Cards, labels
- `font-extrabold` (800) — Section headings
- `font-black` (900) — Blog h1, StruggleBanner headline

### Line Heights

- Headings: `leading-tight` (`1.25`) or `leading-[1.12]`
- Body text: `leading-relaxed` (`1.625`)
- Subheadings: `leading-snug` (`1.375`)

---

## 3. Color Palette

### Brand Colors (Hardcoded)

| Name | Hex | Usage |
|---|---|---|
| **Brand Navy** | `#090D24` | Primary headings, borders, buttons, FAQ icons, footer text |
| **Lime Green** | `#D9FFA5` | StruggleBanner background, FAQ chevron button fill, blog `<mark>` highlight |
| **Dashboard Dark** | `#121826` | Header "Dashboard" CTA button background |
| **WhatsApp Green** | `#128C7E` | Floating chat button background |
| **WhatsApp Hover** | `#1b6159` | Floating chat button hover state |
| **Code Background** | `#0f1117` | Blog `<pre>` code block backgrounds |

### Contextual / Semantic Colors (Tailwind)

| Usage | Tailwind Class | Approximate Color |
|---|---|---|
| Body text | `text-slate-700` | #334155 |
| Muted text | `text-gray-500` | #6B7280 |
| Active nav link | `text-gray-900` | #111827 |
| Links (blog) | `text-indigo-600` | #4F46E5 |
| Link hover (blog) | `text-indigo-800` | #3730A3 |
| Read More button | `text-blue-600` | #2563EB |
| Card borders | `border-[#090D24]` | Brand Navy |
| Blockquote border | `border-l-4 border-[#090D24]` | Brand Navy |
| Inline code text | `text-rose-600` | #E11D48 |
| Wave gradient start | `#eaf3fc` | Light blue |
| Wave gradient end | `#f8faff` | Near white |
| Course image bg | `bg-[#f8ffec]` | Very light green |

### Background Patterns

```css
/* Wave Background — used for decorative sections */
.bg-wave {
  background: linear-gradient(180deg, #eaf3fc 0%, #f8faff 100%);
  position: relative;
  overflow: hidden;
}

/* After pseudo-element: SVG wave overlay at 20% opacity */
.bg-wave::after {
  opacity: 0.2;
  /* inline SVG with two wave path layers */
}
```

---

## 4. CSS Variables & Theming

The project uses an **HSL-based CSS Variable** system mapped to Tailwind color tokens (similar to shadcn/ui). This enables consistent theming and future dark mode support.

### Light Mode Tokens (`:root`)

```css
:root {
  --background:           0 0% 100%;       /* white */
  --foreground:           224 71.4% 4.1%;  /* near black */
  --card:                 0 0% 100%;
  --card-foreground:      224 71.4% 4.1%;
  --primary:              220.9 39.3% 11%; /* dark navy */
  --primary-foreground:   210 20% 98%;
  --secondary:            220 14.3% 95.9%;
  --muted:                220 14.3% 95.9%;
  --muted-foreground:     220 8.9% 46.1%;
  --accent:               220 14.3% 95.9%;
  --destructive:          0 84.2% 60.2%;   /* red */
  --border:               220 13% 91%;
  --input:                220 13% 91%;
  --ring:                 224 71.4% 4.1%;
  --radius:               0.5rem;
}
```

### Dark Mode Tokens (`.dark`)

Dark mode is supported via the `darkMode: ["class"]` Tailwind strategy. The palette shifts to deep navy backgrounds with near-white text. Dark mode is **configured but not actively toggled** in the UI at this time.

### Sidebar Tokens

Specific tokens prefixed with `--sidebar-*` are provided for the admin dashboard sidebar component:

```css
--sidebar-background:   0 0% 98%;
--sidebar-foreground:   240 5.3% 26.1%;
--sidebar-primary:      240 5.9% 10%;
--sidebar-ring:         217.2 91.2% 59.8%;
```

---

## 5. Layout & Spacing

### Container Width

The application uses a **max-width of 1300px** for main content containers, combined with responsive horizontal padding:

```
max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24
```

| Breakpoint | Side Padding | Tailwind Class |
|---|---|---|
| Mobile (< md) | 24px | `px-6` |
| Tablet (md) | 48px | `md:px-12` |
| Desktop (lg) | 64px | `lg:px-16` |
| Large Desktop (xl) | 96px | `xl:px-24` |

### Section Spacing

| Gap Type | Class | Value |
|---|---|---|
| Between major sections | `mt-12 md:mt-20` | 48px → 80px |
| Between FAQ items | `space-y-4 md:space-y-6` | 16px → 24px |
| Section padding | `py-12 md:py-20` | 48px → 80px |
| Card grid gap | `gap-8` | 32px |

### Grid System

- **Course Cards**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Hero**: `grid-cols-1 lg:grid-cols-12` (content = col-span-5, image = col-span-7)
- **Footer columns**: `flex flex-wrap` with `w-full sm:w-1/2 lg:w-1/4`
- **Benefit Pills**: `grid grid-cols-1 sm:grid-cols-2`

---

## 6. Border Radius Tokens

| Token | Value | Example Usage |
|---|---|---|
| `rounded-sm` | `0.125rem` | — |
| `rounded-md` | `0.375rem` | — |
| `rounded-lg` | `0.5rem` | Default `--radius` |
| `rounded-xl` | `0.75rem` | Blog images, blockquotes, code blocks |
| `rounded-2xl` | `1rem` | Course cards (mobile) |
| `rounded-[2rem]` | `32px` | Review cards, FAQ items |
| `rounded-[2.5rem]` | `40px` | StruggleBanner (desktop) |
| `rounded-full` | `9999px` | Buttons (CTAs), pills, avatar images |
| `rounded-[14px]` | `14px` | Header navbar pill |

> **Pattern:** Cards and banners use `rounded-2xl md:rounded-[2rem]` for a "soft but structured" feel. CTA buttons use `rounded-full` for a pill shape.

---

## 7. Component Design Patterns

### CTA Buttons

```html
<!-- Primary CTA (Dark) -->
<button class="bg-[#090D24] text-white px-8 py-4 rounded-full text-lg font-bold
               hover:bg-black transition-all shadow-md active:scale-95 inline-block">
  Explore programs
</button>

<!-- Dashboard Button (slightly lighter) -->
<button class="bg-[#121826] text-white px-6 py-2.5 rounded-xl text-sm font-semibold
               hover:bg-black transition-all shadow-md active:scale-95">
  Dashboard
</button>
```

**Button conventions:**
- Background: `#090D24` or `#121826`
- Shape: `rounded-full` (pill) for primary, `rounded-xl` for secondary
- Hover: `hover:bg-black`
- Press feedback: `active:scale-95`
- Shadow: `shadow-md`

### Cards

```html
<!-- Course / Review / FAQ card template -->
<div class="bg-white border-2 border-[#090D24] rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-md
            transition-all duration-300">
  <!-- content -->
</div>
```

**Card conventions:**
- Background: `bg-white`
- Border: `border-2 border-[#090D24]` — **always a 2px brand navy border**
- Corner radius: `rounded-2xl md:rounded-[2rem]`
- Shadow: `shadow-sm` default, `hover:shadow-md` on hover

### StruggleBanner

A standout promotional banner using the **lime green** accent:

```html
<div class="bg-[#D9FFA5] border-2 border-[#090D24] rounded-[1.5rem] md:rounded-[2.5rem]
            px-4 py-8 md:px-12 md:py-10 shadow-sm overflow-hidden relative">
  <!-- Decorative character images positioned absolute left-0 / right-0 -->
</div>
```

### Benefit Pills (inside StruggleBanner)

```html
<div class="bg-white text-[#090D24] font-bold text-sm rounded-full py-2.5 px-4
            shadow-sm hover:shadow-md hover:border-gray-200 border border-transparent
            transition-all select-none">
  Build Apps from Scratch
</div>
```

### FAQ Accordion

```html
<div class="bg-white border-2 border-[#090D24] rounded-2xl md:rounded-[2rem] overflow-hidden">
  <button class="hover:bg-[#f8ffec] transition-colors">
    <!-- chevron icon in #D9FFA5 circle -->
    <div class="w-8 h-8 rounded-full border-2 border-[#090D24] bg-[#D9FFA5]">
      <!-- SVG chevron, rotates 180deg when open -->
    </div>
  </button>
  <!-- Answer panel: max-h transition for accordion effect -->
</div>
```

---

## 8. Animations & Motion

### CSS Keyframe Animations

| Class | Keyframe | Duration | Usage |
|---|---|---|---|
| `.animate-scroll` | `translateX(0 → -50%)` | 40s linear infinite | Tech Scroll, horizontal carousels |
| `.animate-scroll-reverse` | `translateX(-50% → 0)` | 40s linear infinite | Reverse carousel rows |
| `.animate-spin-slow` | `rotate(0 → 360deg)` | 8s linear infinite | Decorative rotating elements |
| `animate-bounce-slow` | Tailwind extended bounce | — | WhatsApp floating button |

> **Hover pause:** Both scroll animations pause on hover:
> ```css
> .animate-scroll:hover, .animate-scroll-reverse:hover {
>   animation-play-state: paused;
> }
> ```

### Scroll Fade Mask (Tech Scroll Container)

```css
.tech-scroll-container {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
```

### Framer Motion

Used in `Hero.jsx` and `Features.jsx` for entry animations:

```jsx
// Hero left column — slide in from left
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>

// Hero right image — scale in
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
>

// Features stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
};
```

### Reviews Marquee

The Reviews section uses Framer Motion for a continuous infinite horizontal marquee:

```jsx
<motion.div
  animate={{ x: ["0%", "-100%"] }}
  transition={{ ease: "linear", duration: 60, repeat: Infinity }}
>
```

---

## 9. Home Page Architecture

File: `app/page.jsx`

The home page is a **vertical sequence of full-width modular sections**:

```
┌─────────────────────────────────┐
│   <Header />   (fixed, floating) │  ← layout.js
├─────────────────────────────────┤
│   mt-12 top margin              │
│   ┌─────────────────────────┐   │
│   │  <Hero />               │   │  ← 12-col grid, framer-motion
│   └─────────────────────────┘   │
│   ┌─────────────────────────┐   │
│   │  <StruggleBanner />     │   │  ← #D9FFA5 lime banner
│   └─────────────────────────┘   │
│   ┌─────────────────────────┐   │
│   │  <Features />           │   │  ← 3-col course cards
│   └─────────────────────────┘   │
│   mt-12 md:mt-20 gap            │
│   ┌─────────────────────────┐   │
│   │  Section Heading (h2)   │   │  ← "See for yourself..."
│   │  <Reviews />            │   │  ← infinite marquee
│   └─────────────────────────┘   │
│   ┌─────────────────────────┐   │
│   │  <FAQSection />         │   │  ← accordion
│   └─────────────────────────┘   │
│   💬 WhatsApp FAB (fixed)       │  ← z-50 bottom-8 right-8
├─────────────────────────────────┤
│   <Footer />                    │  ← layout.js
└─────────────────────────────────┘
```

### Floating Action Button (WhatsApp)

```jsx
<Link
  href="https://wa.me/message/..."
  className="fixed bottom-8 right-8 z-50
             flex items-center space-x-3
             bg-[#128C7E] px-6 py-3 rounded-full
             shadow-lg hover:bg-[#1b6159]
             transition-all duration-300
             animate-bounce-slow"
>
  <span>Chat with us</span>
  <WhatsAppSVGIcon />
</Link>
```

---

## 10. Navigation (Header)

File: `app/components/Header.jsx`

### Visual Behavior

| Scroll State | Appearance |
|---|---|
| At top (< 50px) | `top-6`, white border `border-gray-400/80`, no blur |
| Scrolled (> 50px) | `top-3`, `bg-white/85 backdrop-blur-md`, `border-gray-200/60`, `shadow-md shadow-gray-200/40` |
| Scrolling down (> 8px) | Slides out upward (`-translate-y-[110%]`), hidden with `opacity-0` |
| Scrolling up | Slides back in |

### Structure

```
Fixed floating pill navbar
  ├─ Logo: image + "zero2lab" (Space Grotesk 700, 19px)
  ├─ Desktop links (hidden md:flex, gap-8)
  │   ├─ home / course / blogs — text-sm font-medium text-gray-500
  │   ├─ Active state: font-bold text-gray-900 + underline bar after:
  │   ├─ Sign In (SignedOut)
  │   └─ Dashboard pill + UserButton (SignedIn)
  └─ Mobile hamburger (Menu icon, 26px)
       └─ Full-screen overlay menu
           ├─ bg-white/97 backdrop-blur-xl
           ├─ Links: text-2xl font-extrabold (active) / text-2xl font-bold text-gray-400
           └─ X close button (absolute top-8 right-8)
```

> **Admin pages**: Header returns `null` for any path starting with `/admin`.

---

## 11. Footer

File: `app/components/Footer.jsx`  
Font: **Montserrat** (weights 400–800)

```
pt-16 pb-8 bg-white border-t-2 border-gray-100

4-column layout (flex-wrap):
  ├─ Brand column (w-full sm:w-1/2 lg:w-1/4)
  │   ├─ "zero2lab" — text-3xl font-extrabold text-[#090D24]
  │   ├─ Tagline — text-base font-medium text-gray-500
  │   └─ Social icons (Facebook, LinkedIn, TikTok) — hover:scale-110
  ├─ Products column
  ├─ Legal column
  └─ Company column
      └─ h3: text-lg font-bold text-[#090D24]
         li: font-medium text-gray-500 → hover:text-[#090D24]

Copyright bar:
  border-t border-gray-200 mt-12 pt-8
  text-sm font-medium text-center text-gray-500
```

> **Admin pages**: Footer returns `null` for `/admin/*` routes.

---

## 12. Blog / Rich Text Content

Scoped under the `.blog-content` CSS class. All styles are applied via `@apply` in `globals.css`.

```css
.blog-content h1  { text-3xl font-black text-slate-900 mt-8 mb-4 leading-tight }
.blog-content h2  { text-2xl font-bold text-slate-900 mt-7 mb-3 leading-tight }
.blog-content h3  { text-xl font-bold text-slate-800 mt-6 mb-2.5 leading-snug }
.blog-content p   { text-base text-slate-700 leading-relaxed mb-4 }
.blog-content a   { text-indigo-600 underline underline-offset-2 hover:text-indigo-800 }
.blog-content blockquote {
  border-l-4 border-[#090D24] pl-5 py-2 my-6
  bg-slate-50 rounded-r-xl text-slate-600 italic
}
.blog-content code { bg-slate-100 text-rose-600 px-1.5 py-0.5 rounded-md text-sm font-mono }
.blog-content pre  { bg-[#0f1117] text-slate-100 rounded-xl p-5 my-5 overflow-x-auto }
.blog-content img  { max-w-full rounded-xl shadow-md my-6 mx-auto block }
.blog-content mark { bg-[#D9FFA5] text-slate-800 px-0.5 rounded }
```

### TipTap Editor Placeholder

```css
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
```

---

## 13. Interactive States & Micro-interactions

| Pattern | Implementation |
|---|---|
| Button press feedback | `active:scale-95` |
| Image hover zoom | `group-hover:scale-105 transition-transform duration-300` |
| Social icon hover | `hover:scale-110 transition-transform` |
| Nav link active indicator | `after:` pseudo-element underline bar |
| FAQ accordion toggle | `max-h` + `opacity` transition (`duration-300`) |
| FAQ chevron rotation | `rotate-180` class toggled with state |
| FAQ row hover background | `hover:bg-[#f8ffec]` (very light lime) |
| Card shadow elevation | `shadow-sm` → `hover:shadow-md` |
| Header scroll hide/show | `translate-y` + `opacity` — rAF throttled |
| Mobile menu open/close | `translate-y` + `opacity` slide-down overlay |
| WhatsApp button | `animate-bounce-slow` + `hover:bg-[#1b6159]` |
| Carousel pause | `animation-play-state: paused` on hover |

---

## 14. Tailwind Plugins

```js
plugins: [
  require("tailwindcss-animate"),  // extends Tailwind with animation utilities
  require("tailwind-scrollbar"),   // custom scrollbar styling utilities
]
```

### Dark Mode Config

```js
darkMode: ["class"]  // Toggled by adding .dark class to <html>
```

### Custom Keyframes & Animations (tailwind.config.js)

```js
keyframes: {
  scroll: {
    '0%':   { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
  'scroll-reverse': {
    '0%':   { transform: 'translateX(-50%)' },
    '100%': { transform: 'translateX(0)' },
  },
},
animation: {
  scroll:          'scroll 40s linear infinite',
  'scroll-reverse': 'scroll-reverse 40s linear infinite',
}
```

---

## Quick Reference Cheatsheet

### Brand Color Tokens

```
#090D24  →  Brand Navy   (headings, borders, buttons)
#D9FFA5  →  Lime Green   (accent fills, highlights, mark)
#121826  →  Dark Navy    (dashboard button)
#128C7E  →  WhatsApp     (floating CTA)
#0f1117  →  Code Dark    (pre block background)
#eaf3fc  →  Sky Blue     (wave gradient from)
#f8ffec  →  Lime White   (course image bg, FAQ hover)
```

### Key Utilities Snapshot

```
Headings:   font-extrabold text-[#090D24]
Body:       font-medium text-gray-500 leading-relaxed
Cards:      bg-white border-2 border-[#090D24] rounded-2xl md:rounded-[2rem] shadow-sm
Buttons:    bg-[#090D24] text-white rounded-full px-8 py-4 font-bold active:scale-95
Container:  max-w-[1300px] mx-auto px-6 md:px-12
Sections:   mt-12 md:mt-20 / py-12 md:py-20
```

---

*Last updated: April 2026 — zero2lab Education*
