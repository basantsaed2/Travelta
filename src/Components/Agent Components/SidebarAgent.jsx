import React from "react";
import { FaTimes } from "react-icons/fa";
import MenuSideAgent from "./MenuSideAgent";
import Logo from "../../Assets/Images/Logo";

const SidebarAgent = ({ isSidebarCollapsed, onToggleSidebar, isSidebarVisible ,  onLinkClick}) => {
  return (
    <div
      className={`fixed lg:relative top-0 left-0 min-h-screen bg-mainColor text-white transition-all duration-300 
      ${isSidebarCollapsed ? "lg:w-20" : "lg:w-64"} w-64 ${isSidebarVisible ? "block" : "hidden"}`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-white">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <Logo />
          </div>
          {isSidebarVisible && (
            <span className="text-xl font-semibold block lg:hidden">Travelta</span>
          )}
          {!isSidebarCollapsed && (
            <span className="text-xl font-semibold hidden lg:block ">Travelta</span>
          )}
        </div>
        {/* Close Sidebar Button */}
        <button className="lg:hidden text-white text-2xl" onClick={onToggleSidebar}>
          <FaTimes />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="p-4">
        <MenuSideAgent onLinkClick={onLinkClick} // Pass the link click handler here
        isSidebarCollapsed={isSidebarCollapsed} />
      </div>
    </div>
  );
};

export default SidebarAgent;
