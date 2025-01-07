"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/course"); // Redirect to the courses page
  }, [router]);

  return null; // Render nothing while redirecting
}
