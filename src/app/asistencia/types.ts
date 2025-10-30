export interface IAttendanceProcessed {
  studentAbsences: Array<IStudientAttendance> 
  dates: IAttendanceHolidays
  dataTransformed: Array<AttendanceObj>
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

/**
 * Attendance status codes:
 * - P: Presente (Present)
 * - C: Falta completa (Full absence)
 * - M: Media falta (Half absence)
 * - X: Tercio de falta (One third absence)
 * - Q: Cuarta falta (One fourth absence)
 * - T: Tres cuartas faltas (Three fourths absence)
 * - D: Doble falta (Double absence)
 * - -: Día sin actividad (Non-working day)
 */
export type AttStatus = "P" | "-" | "C" | "M" | "X" | "Q" | "T" | "D";
/**
 * Represents a student's attendance record
 * @property {string} student - Student's name or identifier
 * @property {AttStatus} [key: number] - Attendance status for each day of the month (1-31)
 */
export type AttendanceObj = {
  student: string;
  [key: number]: AttStatus;
};