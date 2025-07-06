import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../Context/Auth";

const Navbar = ({ onToggleSidebar }) => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout(); // Call logout function from auth context
  };

  return (
    <nav className="flex items-center justify-between px-2 py-2 bg-white shadow-md md:px-6">
      {/* Sidebar Toggle Button */}
      <button className="flex items-center gap-3 text-2xl text-gray-600" onClick={onToggleSidebar}>
        <FaBars />
        <h1 className="text-xl font-semibold text-gray-700">
          Hello, <span>{auth.user.name}</span>
        </h1>
      </button>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded hover:bg-gray-100">Profile</button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-white transition rounded-md bg-mainColor hover:bg-white hover:text-mainColor"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
