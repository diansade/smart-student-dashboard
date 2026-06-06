import { useState, useEffect } from "react";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskSubject, setTaskSubject] = useState("");
  const [priority, setPriority] = useState("");
  const [taskNameError, setTaskNameError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [archivedTasks, setArchivedTasks] = useState(() => {
    const savedArchivedTasks = localStorage.getItem("archivedTasks");

    return savedArchivedTasks ? JSON.parse(savedArchivedTasks) : [];
  });
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
  }, [archivedTasks]);

  const resetForm = () => {
    setTaskName("");
    setTaskSubject("");
    setPriority("");

    setTaskNameError("");
    setPriorityError("");

    setEditingTaskId(null);

    setShowModal(false);
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const handleAddTask = () => {
    let valid = true;

    setTaskNameError("");
    setPriorityError("");

    // Validation
    if (!taskName.trim()) {
      setTaskNameError("Task name is required");
      valid = false;
    }

    if (!priority) {
      setPriorityError("Please select a priority");
      valid = false;
    }

    if (!valid) return;

    if (editingTaskId) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                taskName: taskName.trim(),
                taskSubject: taskSubject.trim(),
                priority,
              }
            : task,
        ),
      );
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        taskName: taskName.trim(),
        taskSubject: taskSubject.trim(),
        priority,
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    // Reset + close modal
    resetForm();
  };

  const deleteTask = (id) => {
    const taskToArchive = tasks.find((task) => task.id === id);

    if (taskToArchive) {
      setArchivedTasks((prev) => [...prev, taskToArchive]);
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setTaskName(task.taskName);
    setTaskSubject(task.taskSubject);
    setPriority(task.priority);

    setEditingTaskId(task.id);

    setShowModal(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") {
      return task.completed;
    }

    if (filter === "Pending") {
      return !task.completed;
    }

    return true;
  });

  const restoreTask = (id) => {
    const taskToRestore = archivedTasks.find((task) => task.id === id);

    if (taskToRestore) {
      setTasks((prev) => [...prev, taskToRestore]);
    }

    setArchivedTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const permanentlyDeleteTask = (id) => {
    setArchivedTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">Tasks</h1>

          <p className="mt-1 text-zinc-500">
            Organize and manage your study tasks
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowArchive(true)}
            className="
    rounded-2xl
    bg-stone-100
    px-5 py-3
    font-medium
    text-zinc-700
    transition
    hover:bg-stone-200
    "
          >
            Archived
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="
    rounded-2xl
    bg-emerald-500
    px-5 py-3
    font-medium
    text-white
    transition
    hover:bg-emerald-600
    "
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter("All")}
          className={`
      rounded-full px-5 py-2 transition font-medium
      ${
        filter === "All"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-stone-100 text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700"
      }
    `}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Pending")}
          className={`
      rounded-full px-5 py-2 transition font-medium
      ${
        filter === "Pending"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-stone-100 text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700"
      }
    `}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("Completed")}
          className={`
      rounded-full px-5 py-2 transition font-medium
      ${
        filter === "Completed"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-stone-100 text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700"
      }
    `}
        >
          Completed
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div
            className="
      rounded-[2rem]
      border border-dashed border-stone-300
      bg-stone-50
      p-10
      text-center
    "
          >
            <p className="text-zinc-500">No tasks added yet</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="
        rounded-[2rem]
        border border-stone-200
        bg-stone-50
        p-5
      "
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="mt-1 h-5 w-5"
                  />

                  <div>
                    <h2
                      className={`
                                  font-semibold
                                  ${task.completed ? "text-zinc-400 line-through" : "text-zinc-800"}
                                `}
                    >
                      {task.taskName}
                    </h2>

                    {task.taskSubject && (
                      <p
                        className={`
  mt-1 text-sm
  ${task.completed ? "text-zinc-400 line-through" : "text-zinc-500"}
`}
                      >
                        {task.taskSubject}
                      </p>
                    )}

                    <div className="mt-3">
                      <span
                        className={`
                  rounded-full px-3 py-1 text-sm
                  ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                  }
                `}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="
    text-zinc-400
    transition
    hover:text-emerald-600
    font-medium
    text-sm
  "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="
    text-zinc-400
    transition
    hover:text-red-500
    font-medium
    text-sm
  "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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
      w-full max-w-lg
      rounded-[2rem]
      bg-white
      p-8
      shadow-xl
    "
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-800">
                  {editingTaskId ? "Edit Task" : "Add New Task"}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Organize your study tasks
                </p>
              </div>

              <button
                onClick={resetForm}
                className="text-zinc-500 hover:text-zinc-800"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="mt-6 space-y-5">
              {/* Task Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Task Name
                </label>

                <input
                  type="text"
                  placeholder="Enter task name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="
                    w-full
                    rounded-2xl
                    border border-stone-200
                    bg-stone-50
                    px-4 py-3
                    outline-none
                    focus:border-emerald-400
                  "
                />
                {taskNameError && (
                  <p className="mt-2 text-sm text-red-500">{taskNameError}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Subject / Topic
                </label>

                <input
                  type="text"
                  placeholder="e.g. React, DSA, DBMS"
                  value={taskSubject}
                  onChange={(e) => setTaskSubject(e.target.value)}
                  className="
                    w-full
                    rounded-2xl
                    border border-stone-200
                    bg-stone-50
                    px-4 py-3
                    outline-none
                    focus:border-emerald-400
                  "
                />
              </div>

              {/* Priority */}
              <div>
                <label className="mb-3 block text-sm font-medium text-zinc-700">
                  Priority
                </label>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPriority(priority === "Low" ? "" : "Low")}
                    className={`
      rounded-full px-5 py-2 transition
      ${
        priority === "Low"
          ? "bg-emerald-500 text-white"
          : "bg-stone-100 text-zinc-700"
      }
    `}
                  >
                    Low
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPriority(priority === "Medium" ? "" : "Medium")
                    }
                    className={`
      rounded-full px-5 py-2 transition
      ${
        priority === "Medium"
          ? "bg-amber-500 text-white"
          : "bg-stone-100 text-zinc-700"
      }
    `}
                  >
                    Medium
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPriority(priority === "High" ? "" : "High")
                    }
                    className={`
      rounded-full px-5 py-2 transition
      ${
        priority === "High"
          ? "bg-red-500 text-white"
          : "bg-stone-100 text-zinc-700"
      }
    `}
                  >
                    High
                  </button>
                </div>
                {priorityError && (
                  <p className="mt-2 text-sm text-red-500">{priorityError}</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="
          rounded-2xl
          bg-stone-100
          px-5 py-3
          font-medium
        "
              >
                Cancel
              </button>

              <button
                onClick={handleAddTask}
                className="
                  rounded-2xl
                  bg-emerald-500
                  px-5 py-3
                  font-medium
                  text-white
                  hover:bg-emerald-600
                "
              >
                {editingTaskId ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showArchive && (
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
      w-full max-w-2xl
      rounded-[2rem]
      bg-white
      p-8
      shadow-xl
    "
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-800">
                  Archived Tasks
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Restore or permanently remove tasks
                </p>
              </div>

              <button
                onClick={() => setShowArchive(false)}
                className="text-zinc-500 hover:text-zinc-800"
              >
                ✕
              </button>
            </div>

            {/* Archive List */}
            <div className="mt-6 max-h-[400px] space-y-4 overflow-y-auto">
              {archivedTasks.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-stone-300 p-8 text-center">
                  <p className="text-zinc-500">No archived tasks</p>
                </div>
              ) : (
                archivedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="
              rounded-[1.5rem]
              border border-stone-200
              bg-stone-50
              p-5
              flex items-center justify-between
            "
                  >
                    <div>
                      <h3 className="font-medium text-zinc-800">
                        {task.taskName}
                      </h3>

                      {task.taskSubject && (
                        <p className="mt-1 text-sm text-zinc-500">
                          {task.taskSubject}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => restoreTask(task.id)}
                        className="
                  rounded-xl
                  bg-emerald-100
                  px-4 py-2
                  text-sm
                  text-emerald-700
                "
                      >
                        Restore
                      </button>

                      <button
                        onClick={() => permanentlyDeleteTask(task.id)}
                        className="
                  rounded-xl
                  bg-red-100
                  px-4 py-2
                  text-sm
                  text-red-700
                "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
