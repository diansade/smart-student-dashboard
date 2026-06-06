import React from "react";

const StudyTracker = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">
            Study Tracker
          </h1>

          <p className="mt-1 text-zinc-500">
            Track your study sessions and stay consistent
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="
            rounded-2xl
            bg-stone-100
            px-5 py-3
            font-medium
            text-zinc-700
            hover:bg-stone-200
            transition
          "
          >
            History
          </button>

          <button
            className="
            rounded-2xl
            bg-emerald-500
            px-5 py-3
            font-medium
            text-white
            hover:bg-emerald-600
            transition
          "
          >
            + Add Session
          </button>
        </div>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-5">
        {/* Today's Total */}
        <div
          className="
          rounded-[2rem]
          bg-emerald-50
          border border-emerald-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">Today's Total</p>

          <h2 className="mt-3 text-4xl font-semibold text-zinc-800">3.5 hrs</h2>

          <p className="mt-2 text-sm text-emerald-700">Great progress today</p>
        </div>

        {/* Weekly Total */}
        <div
          className="
          rounded-[2rem]
          bg-violet-50
          border border-violet-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">Weekly Total</p>

          <h2 className="mt-3 text-4xl font-semibold text-zinc-800">14 hrs</h2>

          <p className="mt-2 text-sm text-violet-700">This week</p>
        </div>

        {/* Most Studied */}
        <div
          className="
          rounded-[2rem]
          bg-amber-50
          border border-amber-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">Most Studied</p>

          <h2 className="mt-3 text-3xl font-semibold text-zinc-800">DSA</h2>

          <p className="mt-2 text-sm text-amber-700">6 hrs this week</p>
        </div>
      </section>

      {/* Study Sessions */}
      <section
        className="
        rounded-[2rem]
        border border-stone-200
        bg-stone-50
        p-6
        min-h-[450px]
      "
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-800">
              Study Sessions
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your recent study activity
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-zinc-500">
          No study sessions added yet
        </div>
      </section>
    </div>
  );
};

export default StudyTracker;
