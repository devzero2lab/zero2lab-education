"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Clock,
  CheckCircle,
  Award,
  Calendar,
  MessageSquare,
  UserX,
  X,
  LayoutDashboard,
  FileText,
  Tag,
} from "lucide-react";

const menuItems = [
  { menu: "Courses", path: "/admin/course", icon: BookOpen },
  { menu: "Blogs", path: "/admin/blogs", icon: FileText },
  { menu: "Promo Codes", path: "/admin/promocodes", icon: Tag },
  { menu: "Pending Access", path: "/admin/pending", icon: Clock },
  { menu: "Approved Access", path: "/admin/approved", icon: CheckCircle },
  { menu: "Completed", path: "/admin/completed", icon: Award },
  { menu: "Meetings", path: "/admin/schedule-meetings", icon: Calendar },
  { menu: "Feedbacks", path: "/admin/feedbacks", icon: MessageSquare },
  { menu: "Not Enrolled", path: "/admin/noenrolls", icon: UserX },
];

function Sidebar({ isOpen, setOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 flex flex-col
          bg-[#090D24]
          shadow-2xl transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo / branding */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#121826] border border-white/10 flex items-center justify-center">
              <LayoutDashboard size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">zero2lab</p>
              <p className="text-slate-400 text-xs">Admin Panel</p>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map(({ menu, path, icon: Icon }) => {
            const isActive = pathname === path || pathname.startsWith(path + "/");
            return (
              <Link
                key={path}
                href={path}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-150 group border-l-4
                  ${
                    isActive
                      ? "bg-white/10 text-white shadow-lg border-white"
                      : "border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-slate-500 group-hover:text-white"
                  }`}
                />
                <span>{menu}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-xs text-slate-500 text-center">© 2026 zero2lab</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
