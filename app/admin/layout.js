"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect non-admin users or unauthenticated users
    if (isLoaded && (!isSignedIn || user.publicMetadata.role !== "admin")) {
      router.push("/"); // Redirect to home page
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-layout">
      <main>{children}</main>
    </div>
  );
}
