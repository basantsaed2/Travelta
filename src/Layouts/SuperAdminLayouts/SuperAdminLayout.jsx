import React, { useEffect, useState } from 'react'

import { Outlet } from "react-router-dom";
import SidebarAdmin from '../../Components/SuperAdminComponents/SidebarAdmin';
import NavbarSuperAdmin from '../../Components/SuperAdminComponents/NavbarSuperAdmin';

const SuperAdminLayout = () => {
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
    <div className="relative flex min-h-screen ">
      <SidebarAdmin
        isSidebarCollapsed={isSidebarCollapsed}
        isSidebarVisible={isSidebarVisible}
        onToggleSidebar={handleToggleSidebar}
        onLinkClick={handleLinkClick} // Pass the link click handler
      />
      <div className="flex flex-col w-full overflow-hidden">
        <NavbarSuperAdmin onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout