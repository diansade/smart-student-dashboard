import React, { useState, useEffect } from "react";
import { getWeeklyHours } from "../utils/studyUtils";
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal";

const StudyTracker = () => {
  const [showModal, setShowModal] = useState(false);

  const [subject, setSubject] = useState("");

  const [hours, setHours] = useState("");

  const [minutes, setMinutes] = useState("");

  const [subjectError, setSubjectError] = useState("");

  const [timeError, setTimeError] = useState("");

  const [sessions, setSessions] = useState([]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  const fetchSessions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/study-sessions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch sessions");
      }

      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const addSession = async () => {
    setSubjectError("");
    setTimeError("");

    let valid = true;

    if (!subject.trim()) {
      setSubjectError("Subject is Required");
      valid = false;
    }

    const totalMinutes = Number(hours || 0) * 60 + Number(minutes || 0);

    if (totalMinutes <= 0) {
      setTimeError("Add Study Duration");
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch("http://localhost:5000/api/study-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          subject: subject.trim(),
          minutes: totalMinutes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create session");
      }

      setSessions((prevSessions) => [...prevSessions, data.session]);

      setSubject("");
      setHours("");
      setMinutes("");
      setShowModal(false);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const deleteSession = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/study-sessions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete session");
      }

      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== id),
      );
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const resetForm = () => {
    setSubject("");
    setSubjectError("");
    setTimeError("");
    setHours("");
    setMinutes("");
    setShowModal(false);
  };

  const formatTime = (mins) => {
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;

    if (hrs === 0) return `${rem}m`;
    if (rem === 0) return `${hrs}h`;

    return `${hrs}h ${rem}m`;
  };

  const now = new Date();

  const startOfWeek = new Date(now);

  startOfWeek.setDate(now.getDate() - now.getDay());

  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyMinutes = sessions
    .filter((session) => new Date(session.date) >= startOfWeek)
    .reduce((sum, session) => sum + session.minutes, 0);

  const weeklyHours = getWeeklyHours(sessions);

  const today = new Date();

  const todayMinutes = sessions
    .filter((session) => {
      const d = new Date(session.date);

      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, session) => sum + session.minutes, 0);

  const todayHours = (todayMinutes / 60).toFixed(1);

  const groupedSessions = sessions.reduce((groups, session) => {
    const date = new Date(session.date);

    const dateKey = date.toLocaleDateString("en-CA");

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(session);

    return groups;
  }, {});

  const formatSessionDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">
            Study Tracker
          </h1>

          <p className="mt-1 text-zinc-500">
            Track your study sessions and stay consistent
          </p>
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
          + Add Session
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

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-zinc-800">
            {todayHours} hrs
          </h2>
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

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-zinc-800">
            {weeklyHours} hrs
          </h2>

          <p className="mt-2 text-sm text-violet-700">This week</p>
        </div>

        {/* Total Sessions */}
        <div
          className="
          rounded-[2rem]
          bg-amber-50
          border border-amber-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">Total Sessions</p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-zinc-800">
            {sessions.length}
          </h2>
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

        <div className="mt-6 space-y-8">
          {sessions.length === 0 ? (
            <div className="text-center text-zinc-500 py-10">
              No study sessions added yet
            </div>
          ) : (
            Object.entries(groupedSessions).map(([date, dateSessions]) => (
              <div key={date}>
                <h3 className="text-base font-semibold text-zinc-800 mb-3">
                  {formatSessionDate(date)}
                </h3>

                <div className="space-y-3">
                  {dateSessions.map((session) => (
                    <div
                      key={session._id}
                      className="
                rounded-[1.5rem]
                border border-stone-200
                bg-white
                p-5
                flex flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
                    >
                      <div>
                        <h4 className="font-medium text-zinc-800">
                          {session.subject}
                        </h4>

                        <p className="mt-1 text-sm text-zinc-500">
                          {formatTime(session.minutes)}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSessionToDelete(session);
                          setShowDeleteConfirm(true);
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
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

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
              <h2 className="text-2xl font-semibold">Add Study Session</h2>

              <button onClick={resetForm}>✕</button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="
          w-full
          rounded-2xl
          border
          border-stone-200
          px-4 py-3
          "
                />
                {subjectError && (
                  <p className="mt-2 text-sm text-red-500">{subjectError}</p>
                )}
              </div>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="
            rounded-2xl
            border
            border-stone-200
            px-4 py-3
            "
                  />

                  <input
                    type="number"
                    placeholder="Minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="
            rounded-2xl
            border
            border-stone-200
            px-4 py-3
            "
                  />
                </div>
                {timeError && (
                  <p className="mt-2 text-sm text-red-500">{timeError}</p>
                )}
              </div>
            </div>

            <div
              className="
    mt-6
    flex
    flex-col-reverse
    gap-3
    sm:flex-row
    sm:justify-end
  "
            >
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
                onClick={addSession}
                className="
          rounded-2xl
          hover:bg-emerald-600
          bg-emerald-500
          px-5 py-3
          text-white
          "
              >
                Add Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Study Session?"
        itemName={sessionToDelete?.subject}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setSessionToDelete(null);
        }}
        onConfirm={() => {
          deleteSession(sessionToDelete._id);
          setShowDeleteConfirm(false);
          setSessionToDelete(null);
        }}
      />
    </div>
  );
};

export default StudyTracker;
