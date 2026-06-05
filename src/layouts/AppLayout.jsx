import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex gap-6 p-6">
        <Sidebar />

        <main className="flex-1 rounded-[2.5rem] shadow-sm border border-stone-200 bg-white p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
