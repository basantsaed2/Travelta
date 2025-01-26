import React from 'react'
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../Context/Auth";
const NavbarSuperAdmin = ({ onToggleSidebar }) => {
  const auth = useAuth()

  return (
    <nav className="bg-white shadow-md px-6 py-2 flex justify-between items-center">
      {/* Sidebar Toggle Button */}
      <button className="text-gray-600 text-2xl flex gap-3 items-center" onClick={onToggleSidebar}>
        <FaBars />
        <h1 className="text-xl font-semibold text-gray-700">Hello, <span>{auth.user.name}</span></h1>
      </button>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded hover:bg-gray-100">Profile</button>
      </div>
    </nav>
  );
};

export default NavbarSuperAdmin