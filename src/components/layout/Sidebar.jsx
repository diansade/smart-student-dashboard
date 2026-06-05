import { NavLink } from "react-router-dom";

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

const Sidebar = () => {
  return (
    <aside
      className="
      w-64
      min-h-[78vh]
      rounded-[2rem]
      bg-[#EAF4EC]
      p-5
      shadow-sm
      border border-[#DDE8DF]
    "
    >
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
              flex items-center gap-4
              rounded-2xl px-4 py-4
              text-zinc-700
              transition-all duration-200
              hover:bg-white hover:text-zinc-900
              
              ${
                isActive
                  ? "bg-white text-emerald-700 shadow-sm font-medium"
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
