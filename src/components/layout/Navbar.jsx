import { useState } from "react";
import { Search, Bell, Moon, ChevronDown } from "lucide-react";
import { PiStudentBold } from "react-icons/pi";
import { HiOutlineMenu } from "react-icons/hi";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
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
            <div
              className="
              w-8 h-8 sm:w-9 sm:h-9
              rounded-full
              bg-emerald-100
              flex items-center justify-center
              font-semibold
              text-emerald-700
            "
            >
              D
            </div>

            <ChevronDown size={18} className="text-zinc-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
