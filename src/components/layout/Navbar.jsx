import React from "react";

const Navbar = () => {
  return (
    <div className="h-16 w-full border-b flex">
      <ul className="flex gap-10">
        <li className="w-3xl p-4">Search</li>
        <li className="p-4">Mode</li>
        <li className="p-4">notifications</li>
        <li className="p-4">Settings</li>
        <li className="p-4">Profile</li>
      </ul>
    </div>
  );
};

export default Navbar;
