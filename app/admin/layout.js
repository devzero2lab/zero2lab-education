"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Loader from "../components/Loader";
import AdminTopLoader from "./components/AdminTopLoader";
import { Menu } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function AdminLayout({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen bg-slate-100 ${montserrat.className}`}>
      <AdminTopLoader />
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div>
            <p className="font-semibold text-slate-800 text-sm">Zero2Lab Admin</p>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
