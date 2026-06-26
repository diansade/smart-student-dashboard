import React from "react";

const MiniCalendar = ({ date }) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthName = date.toLocaleString("default", {
    month: "long",
  });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  const today = new Date();
  return (
    <div
      className="
  rounded-3xl
  border border-stone-200
  bg-white
  p-5
  shadow-sm
  hover:shadow-md
  transition
"
    >
      <h2 className="text-center text-lg font-semibold">
        {monthName} {year}
      </h2>
      <div className="grid grid-cols-7 gap-1 mt-5">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-zinc-500"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {calendarDays.map((day, index) => {
          const isToday =
            day &&
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={index}
              className={`
          aspect-square
          rounded-lg
          flex items-center justify-center
          text-sm
          transition

          ${
            day === null
              ? "opacity-0 pointer-events-none"
              : isToday
                ? "bg-emerald-500 text-white font-semibold"
                : "hover:bg-emerald-50 cursor-pointer"
          }
        `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
