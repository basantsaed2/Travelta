import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Agent Components/Navbar";
import SidebarAgent from "../../Components/Agent Components/SidebarAgent";
import { Outlet } from "react-router-dom";

const AgentLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 740);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 740) {
      setIsSidebarVisible((prev) => !prev);
      setIsSidebarCollapsed(window.innerWidth >= 740)
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsSidebarVisible(window.innerWidth >= 740);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth < 740) {
      setIsSidebarVisible(false); // Close the sidebar only on small screens
    }
  };

  return (
    <div className=" relative flex min-h-screen">
      <SidebarAgent
        isSidebarCollapsed={isSidebarCollapsed}
        isSidebarVisible={isSidebarVisible}
        onToggleSidebar={handleToggleSidebar}
        onLinkClick={handleLinkClick} // Pass the link click handler
      />
      <div className="flex-1 flex flex-col md:w-full sm:w-full min-h-screen">
        <Navbar onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;
