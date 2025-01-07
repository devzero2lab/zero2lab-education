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
          { menu: "users", path: "/admin/users" },
          { menu: "settings", path: "/admin/settings" },
        ].map(({ menu, path }) => (
          <Link href={path}>
            <li
              key={menu}
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
