import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Moon, ChevronDown, User, LogOut } from "lucide-react";
import { PiStudentBold } from "react-icons/pi";
import { HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="px-3 sm:px-4 lg:px-6 pt-3 lg:pt-4">
      <div
        className="
        min-h-[56px]
        rounded-[2rem]
        bg-white
        border border-stone-200
        shadow-sm
        px-6
        flex items-center justify-between
      "
      >
        {/* Left */}

        <div className="flex items-center gap-3">
          {/* Hamburger - Mobile Only */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-2xl text-zinc-700"
          >
            <HiOutlineMenu />
          </button>

          <div className="flex items-center gap-2">
            <PiStudentBold className="text-2xl sm:text-3xl text-emerald-600 flex-shrink-0" />

            <h1 className="font-semibold text-zinc-800 leading-tight">
              <span className="block text-base sm:hidden">Student</span>

              <span className="block text-base sm:hidden">Dashboard</span>

              <span className="hidden sm:block text-xl lg:text-2xl">
                Student Dashboard
              </span>
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
          <button className="text-zinc-700 hover:text-black transition">
            <Bell size={24} />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium">
                  {user?.name?.charAt(0).toUpperCase() || "D"}
                </div>

                <ChevronDown size={18} className="text-zinc-600" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl border border-stone-200 shadow-lg p-2 z-50">
                  <button
                    onClick={() => navigate("/dashboard/profile")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#0f172a] hover:bg-emerald-50 transition-colors"
                  >
                    <User size={19} className="text-emerald-600" />
                    <span className="font-medium">Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      window.location.href = "/";
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={19} />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
