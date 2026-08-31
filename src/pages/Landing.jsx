import { Link } from "react-router-dom";
import {
  CheckSquare,
  BookOpen,
  Target,
  BarChart3,
  GraduationCap,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      {/* Navbar */}
      <nav className="px-4 sm:px-6 pt-4">
        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-full shadow-sm px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="text-emerald-500">
                <GraduationCap size={32} />
              </div>

              <span className="text-xl sm:text-2xl font-bold text-[#0f172a]">
                Student Dashboard
              </span>
            </div>

            {/* Login */}
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-lg bg-[#08b982] text-white font-semibold hover:bg-[#079f71] transition"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6">
        <section className="min-h-[75vh] flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium">
              Your personal academic workspace
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-[#0f172a] leading-tight">
              Stay organized.
              <br />
              <span className="text-emerald-500">Keep learning.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Manage your tasks, track study hours, set goals, monitor your
              CGPA, and keep your academic resources organized — all in one
              place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold transition-colors"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-emerald-500 mb-4">
                <CheckSquare size={28} />
              </div>
              <h3 className="text-lg font-semibold text-[#0f172a]">
                Manage Tasks
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Organize your academic tasks and stay on top of your priorities.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-emerald-500 mb-4">
                <BookOpen size={28} />
              </div>
              <h3 className="text-lg font-semibold text-[#0f172a]">
                Track Study
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Record your study sessions and keep track of your progress.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-emerald-500 mb-4">
                <Target size={28} />
              </div>
              <h3 className="text-lg font-semibold text-[#0f172a]">
                Set Goals
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Create goals and monitor your progress toward achieving them.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-emerald-500 mb-4">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-lg font-semibold text-[#0f172a]">
                Monitor CGPA
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Keep your semester results and CGPA calculations organized.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
