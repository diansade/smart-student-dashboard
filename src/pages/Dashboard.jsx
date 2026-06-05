const Dashboard = () => {
  return (
    <div className="space-y-5">
      {/* Greeting */}
      <section>
        <h1 className="text-2xl font-semibold text-zinc-800">
          Welcome back, Dibakar 👋
        </h1>

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
                <h2 className="text-4xl font-semibold text-zinc-800">12</h2>

                <span className="pb-1 text-zinc-500">/ 18</span>
              </div>

              <p className="mt-2 text-emerald-700 text-sm">+12% this week</p>
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
                14.5 hrs
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
                3 Tasks
              </span>
            </div>

            {/* Task List */}
            <div className="mt-6 space-y-4">
              {/* Task 1 */}
              <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-zinc-800">
                      Complete React Revision
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      Frontend Development
                    </p>
                  </div>

                  <span className="font-medium text-orange-500">High</span>
                </div>
              </div>

              {/* Task 2 */}
              <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-zinc-800">
                      Practice DSA Problems
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      LeetCode Practice
                    </p>
                  </div>

                  <span className="font-medium text-emerald-600">Medium</span>
                </div>
              </div>

              {/* Task 3 */}
              <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-zinc-800">
                      Read 20 Pages of DBMS
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      Database Systems
                    </p>
                  </div>

                  <span className="font-medium text-blue-500">Low</span>
                </div>
              </div>
            </div>

            {/* View All Button */}
            <button
              className="
              mt-6
              w-full
              rounded-[1.5rem]
              bg-emerald-50
              py-4
              font-medium
              text-emerald-700
              transition
              hover:bg-emerald-100
            "
            >
              View All Tasks
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">
          {/* Calendar */}
          <div
            className="
            rounded-[2rem]
            bg-white
            border border-stone-200
            p-6
            h-[330px]
          "
          >
            <h2 className="text-xl font-semibold text-zinc-800">Calendar</h2>
          </div>

          {/* Goals */}
          <div
            className="
            rounded-[2rem]
            bg-white
            border border-stone-200
            p-6
            h-[275px]
          "
          >
            <h2 className="text-xl font-semibold text-zinc-800">Goals</h2>

            <div className="mt-6 space-y-5">
              {/* Weekly Goal */}
              <div>
                <div className="flex justify-between">
                  <span className="font-medium text-zinc-700">Weekly Goal</span>

                  <span className="text-sm text-zinc-500">75%</span>
                </div>

                <div className="mt-2 h-3 rounded-full bg-stone-200">
                  <div className="h-3 w-[75%] rounded-full bg-emerald-500"></div>
                </div>
              </div>

              {/* Monthly Goal */}
              <div>
                <div className="flex justify-between">
                  <span className="font-medium text-zinc-700">
                    Monthly Goal
                  </span>

                  <span className="text-sm text-zinc-500">60%</span>
                </div>

                <div className="mt-2 h-3 rounded-full bg-stone-200">
                  <div className="h-3 w-[60%] rounded-full bg-violet-500"></div>
                </div>
              </div>
            </div>

            <button
              className="
              mt-6
              w-full
              rounded-[1.5rem]
              bg-emerald-50
              py-3
              font-medium
              text-emerald-700
              hover:bg-emerald-100
              transition
            "
            >
              View All Goals
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
