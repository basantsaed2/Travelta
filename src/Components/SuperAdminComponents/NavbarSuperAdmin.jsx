import React from "react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../Context/Auth";
import { useGet } from "../../Hooks/useGet";
import { useNavigate } from 'react-router-dom';

const NavbarSuperAdmin = ({ onToggleSidebar }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const { refetch: logoutRequest } = useGet({
    url: "https://travelta.online/api/logout",
    enabled: false,
  });

  const handleLogout = async () => {
    try {
      await logoutRequest();

      auth.logout();
    } catch {
      auth.toastError("Logout failed");
    }
  };
  return (
    <nav className="flex items-center justify-between px-6 py-2 bg-white shadow-md">
      <button
        className="flex items-center gap-3 text-2xl text-gray-600"
        onClick={onToggleSidebar}
      >
        <FaBars />
        <h1 className="text-xl font-semibold text-gray-700">
          Hello, <span>{auth.user.name}</span>
        </h1>
      </button>

      <div className="flex items-center space-x-4">
        <button 
              onClick={() => navigate('profile')}

        className="p-2 rounded hover:bg-gray-100">Profile</button>

        <button
          onClick={handleLogout}
          className="p-2 border rounded text-mainColor border-mainColor hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarSuperAdmin;
