"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function TopBarLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Start loading animation
    setLoading(true);
    setWidth(0);

    // Animate to ~80% quickly
    const t1 = setTimeout(() => setWidth(30), 50);
    const t2 = setTimeout(() => setWidth(60), 200);
    const t3 = setTimeout(() => setWidth(80), 400);

    // Complete & hide
    const t4 = setTimeout(() => {
      setWidth(100);
    }, 500);
    const t5 = setTimeout(() => {
      setLoading(false);
      setWidth(0);
    }, 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [pathname, searchParams]);

  if (!loading && width === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5">
      <div
        className="h-full bg-white/90 transition-all ease-out"
        style={{
          width: `${width}%`,
          transitionDuration: width === 100 ? "150ms" : "400ms",
          boxShadow: "0 0 8px rgba(255,255,255,0.7)",
        }}
      />
    </div>
  );
}

export default function AdminTopLoader() {
  return (
    <Suspense fallback={null}>
      <TopBarLoader />
    </Suspense>
  );
}
