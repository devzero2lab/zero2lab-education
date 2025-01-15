"use client";
import React, { useState } from "react";
import Link from "next/link";

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("courses"); // Track the active menu item

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Update the active menu
  };

  return (
    <div className="w-64 h-screen p-4 text-white bg-gray-800">
      <ul className="space-y-4">
        {/* Add more links as needed */}
        {[
          { menu: "courses", path: "/admin/course" },
          { menu: "Pending Access", path: "/admin/pending" },
          { menu: "Approved Access", path: "/admin/approved" },
          { menu: "Not Enrolled users", path: "/admin/notenroll" },
        ].map(({ menu, path }) => (
          <Link key={menu} href={path}>
            <li
              className={`cursor-pointer p-4 rounded-md text-center my-4 ${
                activeMenu === menu
                  ? "bg-blue-500 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => handleMenuClick(menu)}
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
