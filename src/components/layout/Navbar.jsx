import { Search, Bell, Moon, ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <header className="px-6 pt-4">
      <div
        className="
        h-16
        rounded-[2rem]
        bg-white
        border border-stone-200
        shadow-sm
        px-6
        flex items-center justify-between
      "
      >
        {/* Left */}
        <h1 className="text-2xl font-semibold text-zinc-800">
          Smart Student Dashboard
        </h1>

        {/* Center Search */}
        <div
          className="
          hidden md:flex
          items-center gap-3
          bg-stone-100
          rounded-2xl
          px-4 py-3
          w-[400px]
        "
        >
          <Search size={18} className="text-zinc-500" />

          <input
            type="text"
            placeholder="Search anything..."
            className="
            bg-transparent
            outline-none
            flex-1
            text-sm
          "
          />

          <span className="text-sm text-zinc-400">Ctrl + K</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <button className="text-zinc-700 hover:text-black transition">
            <Moon size={24} />
          </button>

          <button className="text-zinc-700 hover:text-black transition">
            <Bell size={24} />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <div
              className="
              w-11 h-11
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
