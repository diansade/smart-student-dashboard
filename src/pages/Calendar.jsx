import { useState } from "react";
import MiniCalendar from "./MiniCalendar";

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const months = [];

  for (let i = 0; i < 12; i++) {
    months.push(new Date(year, i, 1));
  }
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-center gap-8 mb-8">
        <button
          onClick={() => setYear(year - 1)}
          className="rounded-lg px-3 py-2 hover:bg-stone-100"
        >
          ◀
        </button>

        <h1 className="text-3xl font-bold">{year}</h1>

        <button
          onClick={() => setYear(year + 1)}
          className="rounded-lg px-3 py-2 hover:bg-stone-100"
        >
          ▶
        </button>
      </div>
      <div
        className="
  grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-3
  gap-6
"
      >
        {months.map((month) => (
          <MiniCalendar key={`${year}-${month.getMonth()}`} date={month} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
