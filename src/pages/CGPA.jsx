import { useState, useEffect } from "react";
import { getCGPA, getTotalCredits, getSemesterCount } from "../utils/cgpaUtils";

const CGPA = () => {
  const [showModal, setShowModal] = useState(false);

  const [semester, setSemester] = useState("");
  const [sgpa, setSgpa] = useState("");
  const [credit, setCredit] = useState("");

  const [semError, setSemError] = useState("");
  const [sgpaError, setSgpaError] = useState("");
  const [creditError, setCreditError] = useState("");

  const [semesters, setSemesters] = useState(() => {
    const saved = localStorage.getItem("cgpa");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cgpa", JSON.stringify(semesters));
  }, [semesters]);

  const addSemester = () => {
    let valid = true;

    setSemError("");
    setSgpaError("");
    setCreditError("");

    if (!semester) {
      setSemError("Enter Sem");
      valid = false;
    }

    const alreadyExists = semesters.some(
      (sem) => sem.semester === Number(semester),
    );

    if (alreadyExists) {
      setSemError("Semester already exists");
      valid = false;
    }

    if (!sgpa || Number(sgpa) < 0 || Number(sgpa) > 10) {
      setSgpaError("SGPA must be between 0 and 10");
      valid = false;
    }
    if (!credit) {
      setCreditError("Enter Credit");
      valid = false;
    }

    if (!valid) return;

    const newSemester = {
      id: Date.now(),
      semester: Number(semester),
      sgpa: Number(sgpa),
      credit: Number(credit),
    };

    setSemesters((prev) => [...prev, newSemester]);

    resetForm();
  };

  const deleteSemester = (id) => {
    setSemesters((prev) => prev.filter((sem) => sem.id !== id));
  };

  const resetForm = () => {
    setSemester("");
    setSemError("");
    setSgpa("");
    setSgpaError("");
    setCreditError("");
    setCredit("");
    setShowModal(false);
  };

  const totalCredits = getTotalCredits(semesters);
  const cgpa = getCGPA(semesters);
  const semesterCount = getSemesterCount(semesters);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">CGPA</h1>
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
          + Add Semester
        </button>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-5">
        {/* Current CGPA */}
        <div
          className="
          rounded-[2rem]
          bg-emerald-50
          border border-emerald-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">Current CGPA</p>

          <h2 className="mt-3 text-4xl font-semibold text-zinc-800">{cgpa}</h2>
        </div>

        {/*Total Credits*/}
        <div
          className="
          rounded-[2rem]
          bg-violet-50
          border border-violet-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">Total Credits</p>

          <h2 className="mt-3 text-4xl font-semibold text-zinc-800">
            {totalCredits}
          </h2>
        </div>

        {/*Semesters*/}
        <div
          className="
          rounded-[2rem]
          bg-amber-50
          border border-amber-100
          p-6
          h-36
        "
        >
          <p className="text-sm text-zinc-500">Semesters</p>

          <h2 className="mt-3 text-3xl font-semibold text-zinc-800">
            {semesterCount}
          </h2>
        </div>
      </section>

      {/* SGPA */}
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
            <p className="mt-1 text-sm text-zinc-500">Your recent semesters</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {semesters.length === 0 ? (
            <div className="text-center text-zinc-500 py-10">
              No semesters added yet
            </div>
          ) : (
            [...semesters]
              .sort((a, b) => a.semester - b.semester)
              .map((semester) => (
                <div
                  key={semester.id}
                  className="
    rounded-[1.5rem]
    border border-stone-200
    bg-white
    p-6
  "
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-800">
                        Semester {semester.semester}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        SGPA : {semester.sgpa}
                      </p>

                      <p className="mt-2 text-sm text-zinc-600">
                        Credits : {semester.credit}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteSemester(semester.id)}
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
      w-full max-w-lg
      rounded-[2rem]
      bg-white
      p-8
      shadow-xl
    "
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Add Semester</h2>

              <button onClick={resetForm}>✕</button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Semester
                </label>
                <input
                  type="number"
                  placeholder="Semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="
          w-full
          rounded-2xl
          border
          border-stone-200
          px-4 py-3
          "
                />
                {semError && (
                  <p className="mt-2 text-sm text-red-500">{semError}</p>
                )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-zinc-700">
                  SGPA
                </label>
                <input
                  type="number"
                  placeholder="SGPA"
                  value={sgpa}
                  onChange={(e) => setSgpa(e.target.value)}
                  className="
            rounded-2xl
            border
            w-full
            border-stone-200
            px-4 py-3
            "
                />
                {sgpaError && (
                  <p className="mt-2 text-sm text-red-500">{sgpaError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-3 block text-sm font-medium text-zinc-700">
                    Credits
                  </label>
                  <input
                    type="number"
                    placeholder="Credit"
                    value={credit}
                    onChange={(e) => setCredit(e.target.value)}
                    className="
          w-full
          rounded-2xl
          border
          border-stone-200
          px-4 py-3
          "
                  />
                  {creditError && (
                    <p className="mt-2 text-sm text-red-500">{creditError}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
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
                onClick={addSemester}
                className="
          rounded-2xl
          hover:bg-emerald-600
          bg-emerald-500
          px-5 py-3
          text-white
          "
              >
                Add Semester
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CGPA;
