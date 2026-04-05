'use client';

import dynamic from 'next/dynamic';

// Next.js SSR දෝෂ (DOM API errors) මඟ හැරීම සඳහා Plyr අඩංගු වීඩියෝ ප්ලේයරය ගතිකව (Dynamically) Client පැත්තේ පමණක් load කිරීම
const SecureVideoPlayer = dynamic(() => import('./SecureVideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video rounded-2xl bg-zinc-950/80 shadow-2xl ring-1 ring-white/10 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-emerald-500 text-sm font-medium animate-pulse">Starting Player...</p>
      </div>
    </div>
  )
});

export default function SecureVideoPlayerWrapper(props) {
  return <SecureVideoPlayer {...props} />;
}
