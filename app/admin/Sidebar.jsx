"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { menu: "courses", path: "/admin/course" },
    { menu: "Pending Access", path: "/admin/pending" },
    { menu: "Approved Access", path: "/admin/approved" },
    { menu: "Meetings", path: "/admin/schedule-meetings" },
    { menu: "Feedbacks", path: "/admin/feedbacks" },
    { menu: "Not Enroll Users", path: "/admin/noenrolls" },
  ];

  return (
    <div className="w-64 p-4 text-white bg-gray-800">
      <ul className="space-y-4">
        {menuItems.map(({ menu, path }) => (
          <Link key={menu} href={path}>
            <li
              className={`cursor-pointer p-4 rounded-md text-center my-4 ${
                pathname === path
                  ? "bg-blue-500 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <span>{menu.charAt(0).toUpperCase() + menu.slice(1)}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
