//TODO: lanza error si no hay datos o los datos no son validos
/**
 * Processes raw attendance data into a structured format including student absences and holiday information.
 * @param {Array<Array<string>>} data - 2D array where each row represents a student's attendance record
 * @returns {Object} An object containing:
 *   - studentAbsences: Array of processed student attendance records
 *   - dates: Object containing holiday information and total working days
 */
export function processAttendanceData(
  data: Array<Array<string>>
): {studentAbsences: Array<AttendanceProcessed>, dates: AttendanceHolidays} {
  const dataTransformed = helperTransformAttendanceData(data);
  const studentAbsences = helperResumeAttendanceData(dataTransformed);
  const dates = helperGetHolidays(dataTransformed[0]);
  return {studentAbsences, dates};
}

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
type AttStatus = "P" | "-" | "C" | "M" | "X" | "Q" | "T" | "D";
/**
 * Represents a student's attendance record
 * @property {string} student - Student's name or identifier
 * @property {AttStatus} [key: number] - Attendance status for each day of the month (1-31)
 */
type AttendanceObj = {
  student: string;
  [key: number]: AttStatus;
};
/**
 * Transforms raw attendance data into an array of AttendanceObj
 * @param {Array<Array<string>>} data - 2D array of attendance data
 * @returns {Array<AttendanceObj>} Array of attendance objects with student names and their daily status
 * @private
 */
function helperTransformAttendanceData(
  data: Array<Array<string>>
): Array<AttendanceObj> {
  const dataFinal: Array<AttendanceObj> = [];
  data.forEach((row) => {
    const att: AttendanceObj = { student: row[0] };
    for (let i = 1; i < 32; i++) {
      if (row[i]) {
        att[i] = row[i] as AttStatus;
      } else break;
    }
    if(Object.keys(att).length === 32){
      dataFinal.push(att);
    }
  });
  return dataFinal;
}

/**
 * Processed attendance data for a student
 * @property {string} student - Student's name or identifier
 * @property {Array<number>} absences - Array of days (1-31) when the student was absent
 */
type AttendanceProcessed = {
  student: string;
  absences: Array<number>;
};
/**
 * Processes attendance data to extract only days with absences for each student
 * @param {Array<AttendanceObj>} data - Array of attendance objects
 * @returns {Array<AttendanceProcessed>} Processed attendance data with only absences
 * @private
 */
function helperResumeAttendanceData(data: Array<AttendanceObj>) {
  const dataFinal: Array<AttendanceProcessed> = [];
  data.forEach((element) => {
    const attObj: AttendanceProcessed = {
      student: element.student,
      absences: [],
    };
    for (const property in element) {
      if (element[property] !== "P" && element[property] !== "-"&& property !== "student") {
        attObj.absences.push(Number(property));
      }
    }
    dataFinal.push(attObj);
  });
  return dataFinal;
}

/**
 * Information about holidays and working days in the month
 * @property {Array<number>} holidays - Array of days (1-31) that are holidays
 * @property {number} totalWorkingDays - Total number of working days in the month
 */
type AttendanceHolidays = {
  holidays: Array<number>;
  totalWorkingDays: number;
};
/**
 * Extracts holiday information from attendance data
 * @param {AttendanceObj} data - Attendance data for a student (used to identify holidays)
 * @returns {AttendanceHolidays} Object containing holiday information and working day count
 * @private
 */
function helperGetHolidays(data: AttendanceObj): AttendanceHolidays {
  const holidays: Array<number> = [];
  for (const property in data) {
    if (data[property] === "-") {
      holidays.push(Number(property));
    }
  }
  const totalWorkingDays = 31 - holidays.length;

  return {holidays, totalWorkingDays};
}
