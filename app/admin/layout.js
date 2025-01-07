"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
        router.push("/"); // Redirect unauthorized users to home
      } else {
        setLoading(false); // Stop loading once authorized
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (loading) {
    return <div className="mt-14">Loading...</div>; // Show a loading screen
  }

  return (
    <div className="flex h-screen mt-12">
      {/* Sidebar remains static on the left */}
      <Sidebar />
      {/* Dynamic content on the right */}
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
}
