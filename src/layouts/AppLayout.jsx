import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* Main Layout */}
      <div className="flex p-4 lg:p-6 gap-6 relative">
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="
      fixed
      inset-0
      bg-black/30
      z-40
      lg:hidden
    "
          />
        )}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main
          className="
    flex-1
    rounded-[2.5rem]
    border
    border-stone-200
    bg-white
    shadow-sm
    p-4
    md:p-6
  "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
