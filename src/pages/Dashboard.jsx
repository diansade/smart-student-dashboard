import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MiniCalendar from "./MiniCalendar";
import { getWeeklyHours } from "../utils/studyUtils";
import { getCGPA, getTotalCredits } from "../utils/cgpaUtils";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [studySessions, setStudySessions] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
    setGoals(JSON.parse(localStorage.getItem("goals")) || []);
    setStudySessions(JSON.parse(localStorage.getItem("studySessions")) || []);
    setSemesters(JSON.parse(localStorage.getItem("cgpa")) || []);
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed);

  const todayTasks = pendingTasks.slice(0, 3);

  const totalTasks = tasks.length;

  const weeklyHours = getWeeklyHours(studySessions);

  const cgpa = getCGPA(semesters);
  const totalCredits = getTotalCredits(semesters);

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <section>
        <h1 className="text-2xl font-semibold text-zinc-800">Welcome back👋</h1>

        <p className="mt-1 text-zinc-500">Stay productive and keep learning.</p>
      </section>

      {/* Main Dashboard Grid */}
      <section className="grid grid-cols-3 gap-5">
        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-5">
          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-5">
            {/* Tasks Completed */}
            <div
              className="
              rounded-[2rem]
              bg-emerald-50
              border border-emerald-100
              p-6
              h-36
            "
            >
              <p className="text-zinc-500 text-sm">Tasks Completed</p>

              <div className="mt-3 flex items-end gap-2">
                <h2 className="text-4xl font-semibold text-zinc-800">
                  {completedTasks}
                </h2>

                <span className="pb-1 text-zinc-500">/ {totalTasks}</span>
              </div>
              <p className="mt-2 text-sm text-emerald-700">
                {completedTasks === totalTasks && totalTasks > 0
                  ? "All tasks completed 🎉"
                  : `${totalTasks - completedTasks} remaining`}
              </p>
            </div>

            {/* Study Hours */}
            <div
              className="
              rounded-[2rem]
              bg-violet-50
              border border-violet-100
              p-6
              h-36
            "
            >
              <p className="text-zinc-500 text-sm">Study Hours</p>

              <h2 className="mt-3 text-4xl font-semibold text-zinc-800">
                {weeklyHours} hrs
              </h2>

              <p className="mt-2 text-violet-700 text-sm">This week</p>
            </div>
          </div>

          {/* Today's Tasks */}
          <div
            className="
            rounded-[2rem]
            bg-stone-50
            border border-stone-200
            p-6
            h-[505px]
          "
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-800">
                  Today's Tasks
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Stay focused on today's priorities
                </p>
              </div>

              <span
                className="
                rounded-full
                bg-emerald-100
                px-4 py-2
                text-sm font-medium
                text-emerald-700
              "
              >
                {todayTasks.length} Tasks
              </span>
            </div>
            {/* Task List */}{" "}
            <div className="mt-6 space-y-4">
              {" "}
              {todayTasks.length === 0 ? (
                <div className="py-12 text-center text-zinc-500">
                  {" "}
                  No pending tasks 🎉{" "}
                </div>
              ) : (
                todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-[1.5rem] border border-stone-200 bg-white p-5"
                  >
                    {" "}
                    <div className="flex items-center justify-between">
                      {" "}
                      <div>
                        {" "}
                        <h3 className="font-medium text-zinc-800">
                          {" "}
                          {task.taskName}{" "}
                        </h3>{" "}
                        <p className="mt-1 text-sm text-zinc-500">
                          {" "}
                          {task.taskSubject || "No Subject"}{" "}
                        </p>{" "}
                      </div>{" "}
                      <span
                        className={`font-medium ${task.priority === "High" ? "text-orange-500" : task.priority === "Medium" ? "text-emerald-600" : "text-blue-500"}`}
                      >
                        {" "}
                        {task.priority}{" "}
                      </span>{" "}
                    </div>{" "}
                  </div>
                ))
              )}{" "}
            </div>
            {/* View All Button */}
            <Link
              to="/tasks"
              className="
    mt-6
    block
    w-full
    rounded-[1.5rem]
    bg-emerald-50
    py-4
    text-center
    font-medium
    text-emerald-700
    transition
    hover:bg-emerald-100
  "
            >
              View All Tasks
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">
          {/* CGPA */}
          <div
            className="
    rounded-[2rem]
    bg-amber-50
    border border-amber-100
    p-6
    h-36
  "
          >
            <p className="text-zinc-500 text-sm">Current CGPA</p>

            <h2 className="mt-3 text-4xl font-semibold text-zinc-800">
              {cgpa}
            </h2>

            <p className="mt-2 text-sm text-amber-700">
              {totalCredits} Credits • {semesters.length} Semesters
            </p>
          </div>
          {/* Calendar */}
          <div
            className="
            rounded-[2rem]
            bg-white
            border border-stone-200
            p-6
            h-[360px]
          "
          >
            <MiniCalendar date={new Date()} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
