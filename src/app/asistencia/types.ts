export interface IAttendanceProcessed {
  studentAbsences: Array<IStudientAttendance> 
  dates: IAttendanceHolidays
} 

/**
 * Processed attendance data for a student
 * @property {string} student - Student's name or identifier
 * @property {Array<number>} absences - Array of days (1-31) when the student was absent
 */
export interface IStudientAttendance {
  student: string;
  absences: Array<number>;
};

/**
 * Information about holidays and working days in the month
 * @property {Array<number>} holidays - Array of days (1-31) that are holidays
 * @property {number} totalWorkingDays - Total number of working days in the month
 */
export interface IAttendanceHolidays {
  holidays: Array<number>;
  totalWorkingDays: number;
};