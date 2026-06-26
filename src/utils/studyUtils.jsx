export const getWeeklyHours = (sessions) => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyMinutes = sessions
    .filter(session => new Date(session.date) >= startOfWeek)
    .reduce((sum, session) => sum + session.minutes, 0);

  return (weeklyMinutes / 60).toFixed(1);
};