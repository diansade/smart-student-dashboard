import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaTasks,
  FaCalendarAlt,
  FaBullseye,
  FaBook,
  FaCalculator,
  FaLink,
} from "react-icons/fa";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-20"} duration-300 transition-all h-screen bg-slate-900 text-white`}
    >
      <div className="mb-8 p-4 flex justify-between items-center">
        {sidebarOpen && <h1 className="text-3xl ">Smart Student Dashboard</h1>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "inside" : "outside"}
        </button>
      </div>
      <nav className="flex flex-col gap-4">
        <NavLink to="/">Dashboard</NavLink>

        <NavLink to="/tasks">Tasks</NavLink>

        <NavLink to="/goals">Goals</NavLink>

        <NavLink to="/calendar">Calendar</NavLink>

        <NavLink to="/study">Study Tracker</NavLink>

        <NavLink to="/cgpa">CGPA</NavLink>

        <NavLink to="/resources">Resources</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
