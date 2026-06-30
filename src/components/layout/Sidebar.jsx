import { NavLink } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";

import {
  LayoutDashboard,
  CheckSquare,
  Target,
  Calendar,
  BookOpen,
  Calculator,
  Link,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: <CheckSquare size={20} />,
  },
  {
    name: "Goals",
    path: "/goals",
    icon: <Target size={20} />,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: <Calendar size={20} />,
  },
  {
    name: "Study Tracker",
    path: "/study",
    icon: <BookOpen size={20} />,
  },
  {
    name: "CGPA",
    path: "/cgpa",
    icon: <Calculator size={20} />,
  },
  {
    name: "Resources",
    path: "/resources",
    icon: <Link size={20} />,
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <aside
      className={`
    fixed
    top-0
    left-0
    h-screen
    w-60
    rounded-none
    bg-white
    lg:rounded-[2rem]
    lg:bg-[#EAF4EC]
    py-5
    shadow-2xl
    border-r
    border-[#DDE8DF]
    z-50
    transition-transform
    duration-300

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

    lg:translate-x-0
    lg:static
    lg:min-h-[78vh]
    lg:shadow-sm
    lg:border
  `}
    >
      <div className="flex items-start justify-between px-4 pb-5 border-b border-stone-200 lg:hidden">
        <div>
          <h2 className="text-lg font-semibold text-zinc-800">
            Student Dashboard
          </h2>

          <p className="mt-1 text-sm text-zinc-500">Stay productive</p>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="
      p-2
      rounded-full
      hover:bg-stone-100
      transition
    "
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      </div>
      <nav className="flex flex-col gap-3 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `
              flex items-center gap-4
              rounded-2xl px-4 py-4
              text-zinc-700
              transition-all duration-200
              hover:bg-emerald-50 hover:text-zinc-900
              
              ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 font-medium border border-emerald-100"
                  : ""
              }
            `
            }
          >
            {item.icon}

            <span className="text-[15px]">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
