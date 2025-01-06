import React, { useState } from "react";

function Sidebar({ onMenuSelect }) {
  const [activeMenu, setActiveMenu] = useState("courses"); // Track the active menu item

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Update the active menu
    onMenuSelect(menu); // Notify the parent component
  };

  return (
    <div className="w-1/4 h-screen p-4 text-white bg-gray-800">
      <ul className="space-y-4">
        {["courses", "users", "settings"].map((menu) => (
          <li
            key={menu}
            className={`cursor-pointer p-4 rounded-md text-center ${
              activeMenu === menu
                ? "bg-blue-500 shadow-lg" // Highlight active menu
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => handleMenuClick(menu)}
          >
            {menu.charAt(0).toUpperCase() + menu.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
