export const getCGPA = (semesters) => {
  const totalCredits = semesters.reduce((sum, sem) => sum + sem.credit, 0);

  if (totalCredits === 0) {
    return "0.00";
  }

  const totalGradePoints = semesters.reduce(
    (sum, sem) => sum + sem.sgpa * sem.credit,
    0,
  );

  return (totalGradePoints / totalCredits).toFixed(2);
};

export const getTotalCredits = (semesters) => {
  return semesters.reduce((sum, sem) => sum + sem.credit, 0);
};

export const getSemesterCount = (semesters) => {
  return semesters.length;
};
