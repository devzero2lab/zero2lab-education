"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn || user.publicMetadata.role !== "admin") {
        router.push("/");
      } else {
        setLoading(false); // Stop loading once authorized
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen
  }

  return (
    <div className="admin-layout">
      <main>{children}</main>
    </div>
  );
}
