import React, { useState, useEffect } from "react";

const Goals = () => {
  const [showModal, setShowModal] = useState(false);

  const [goalTitle, setGoalTitle] = useState("");
  const [goalType, setGoalType] = useState("");

  const [target, setTarget] = useState("");

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  const [goalTitleError, setGoalTitleError] = useState("");
  const [goalTypeError, setGoalTypeError] = useState("");
  const [targetError, setTargetError] = useState("");

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    setGoalTitleError("");
    setGoalTypeError("");
    setTargetError("");

    let valid = true;

    if (!goalTitle.trim()) {
      setGoalTitleError("Title is Required");
      valid = false;
    }

    if (!goalType) {
      setGoalTypeError("Add Goal type");
      valid = false;
    }

    if (!target || Number(target) <= 0) {
      setTargetError("Enter Target");
      valid = false;
    }

    if (!valid) return;

    const newGoal = {
      id: Date.now(),
      title: goalTitle.trim(),
      type: goalType,
      target: Number(target),
      progress: 0,
      completed: false,
    };

    setGoals((prev) => [...prev, newGoal]);

    setGoalTitle("");
    setGoalType("");
    setTarget("");

    setShowModal(false);
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const resetForm = () => {
    setGoalTitle("");
    setGoalTitleError("");
    setGoalType("");
    setGoalTypeError("");
    setTargetError("");
    setTarget("");
    setShowModal(false);
  };

  const increaseProgress = (id) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== id) return goal;

        const updatedProgress = goal.progress + 1;

        return {
          ...goal,
          progress: updatedProgress,
          completed: updatedProgress >= goal.target,
        };
      }),
    );
  };

  const completedGoals = goals.filter((goal) => goal.completed).length;

  const inProgressGoals = goals.length - completedGoals;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">Goals</h1>

          <p className="mt-1 text-zinc-500">Track your Goals</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
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
          + Add Goal
        </button>
      </div>

      {/* Stats */}
      <section
        className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-5
  "
      >
        {/* Total Goals */}
        <div
          className="
          rounded-[2rem]
          bg-emerald-50
          border border-emerald-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">Total Goals</p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-zinc-800">
            {goals.length}
          </h2>
        </div>

        {/* Goals Completed*/}
        <div
          className="
          rounded-[2rem]
          bg-violet-50
          border border-violet-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">Goals Completed</p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-zinc-800">
            {completedGoals}
          </h2>
        </div>

        {/* In progress goals */}
        <div
          className="
          rounded-[2rem]
          bg-amber-50
          border border-amber-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">In Progress Goals</p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-zinc-800">
            {inProgressGoals}
          </h2>
        </div>
      </section>

      {/* Goals */}
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
            <h2 className="text-xl font-semibold text-zinc-800">Goals</h2>

            <p className="mt-1 text-sm text-zinc-500">Your recent goals</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {goals.length === 0 ? (
            <div className="text-center text-zinc-500 py-10">
              No goals added yet
            </div>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="
    rounded-[1.5rem]
    border border-stone-200
    bg-white
    p-6
  "
              >
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-800">
                      {goal.title}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {goal.type} Goal
                    </p>

                    <p className="mt-2 text-sm text-zinc-600">
                      Progress: {goal.progress} / {goal.target}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {goal.completed && (
                      <span
                        className="
            rounded-full
            bg-emerald-100
            px-3 py-1
            text-sm
            font-medium
            text-emerald-700
          "
                      >
                        Completed
                      </span>
                    )}

                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this goal?",
                        );

                        if (confirmDelete) {
                          deleteGoal(goal.id);
                        }
                      }}
                      className="
          text-red-500
          hover:text-red-700
          transition
          "
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  className="
      mt-5
      h-3
      rounded-full
      bg-stone-200
      overflow-hidden
    "
                >
                  <div
                    className="
        h-full
        bg-emerald-500
        transition-all
        duration-300
        "
                    style={{
                      width: `${Math.min(
                        (goal.progress / goal.target) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>

                {/* Footer */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-zinc-500">
                    {Math.round((goal.progress / goal.target) * 100)}% completed
                  </p>

                  <button
                    onClick={() => increaseProgress(goal.id)}
                    disabled={goal.completed}
                    className={`
        rounded-xl
        px-4 py-2
        text-sm
        font-medium
        transition

        ${
          goal.completed
            ? "bg-stone-200 text-zinc-400 cursor-not-allowed"
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }
      `}
                  >
                    +1 Progress
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="
    fixed inset-0
    bg-black/30
    backdrop-blur-sm
    flex items-center justify-center
    z-50
  "
        >
          <div
            className="
      w-[95%] max-w-lg
      rounded-[2rem]
      bg-white
      p-8
      shadow-xl
    "
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Add New Goal</h2>

              <button onClick={resetForm}>✕</button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Goal Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  className="
          w-full
          rounded-2xl
          border
          border-stone-200
          px-4 py-3
          "
                />
                {goalTitleError && (
                  <p className="mt-2 text-sm text-red-500">{goalTitleError}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-3 block text-sm font-medium text-zinc-700">
                    Goal Type
                  </label>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setGoalType(goalType === "Weekly" ? "" : "Weekly")
                      }
                      className={`
      rounded-full px-5 py-2 transition
      ${
        goalType === "Weekly"
          ? "bg-emerald-500 text-white"
          : "bg-stone-100 text-zinc-700"
      }
    `}
                    >
                      Weekly
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setGoalType(goalType === "Monthly" ? "" : "Monthly")
                      }
                      className={`
      rounded-full px-5 py-2 transition
      ${
        goalType === "Monthly"
          ? "bg-amber-500 text-white"
          : "bg-stone-100 text-zinc-700"
      }
    `}
                    >
                      Monthly
                    </button>
                  </div>
                  {goalTypeError && (
                    <p className="mt-2 text-sm text-red-500">{goalTypeError}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-zinc-700">
                  Enter Target
                </label>
                <input
                  type="number"
                  placeholder="Target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="
            rounded-2xl
            border
            border-stone-200
            px-4 py-3
            "
                />
                {targetError && (
                  <p className="mt-2 text-sm text-red-500">{targetError}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={resetForm}
                className="
          rounded-2xl
          bg-stone-100
          hover:bg-stone-200
          px-5 py-3
          "
              >
                Cancel
              </button>

              <button
                onClick={addGoal}
                className="
          rounded-2xl
          hover:bg-emerald-600
          bg-emerald-500
          px-5 py-3
          text-white
          "
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
