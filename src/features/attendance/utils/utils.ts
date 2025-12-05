import {
  IAttendanceProcessed,
  IStudientAttendance,
  IAttendanceHolidays,
  AttendanceObj,
  AttStatus,
} from "@/features/attendance/interfaces/types";
//TODO: lanza error si no hay datos o los datos no son validos
/**
 * Processes raw attendance data into a structured format including student absences and holiday information.
 * @param {Array<Array<string>>} data - 2D array where each row represents a student's attendance record
 [ "Almeda Sanchez,  Thiago Lorenzo", "P", "P", "P", "-", "-", "P", "P", "P", "P", "-", "-", "-", "P", "C", "P", "P", "C", "-", "-", "P", "P", "P", "P", "P", "-", "-", "-", "P", "-", "-", "-", 16, 0, 2, 10, 2 ], [ "Arjona Alejo,  Lara Aylen", "P", "P", "P", "-", "-", "P", "P", "P", "P", "-", "-", "-", "P", "P", "P", "P", "P", "-", "-", "P", "P", "P", "P", "P", "-", "-", "-", "P", "-", "-", "-", 18, 0, 0, 3, 0 ], ...]

 * @returns {Object} An object containing:
 *   - studentAbsences: Array of processed student attendance records
 *   - dates: Object containing holiday information and total working days
 *   - dataTransformed: Array of attendance objects with student names and their daily status
 */
export function processAttendanceData(
  data: Array<Array<string | number>>
): IAttendanceProcessed {
  const dataTransformed = helperTransformAttendanceData(data);
  const studentAbsences = helperResumeAttendanceData(dataTransformed);
  const dates = helperGetHolidays(dataTransformed[0]);
  return { studentAbsences, dates, dataTransformed };
}

/**
 * Transforms raw attendance data into an array of AttendanceObj
 * @param {Array<Array<string>>} data - 2D array of attendance data
 * @returns {Array<AttendanceObj>} Array of attendance objects with student names and their daily status
[{"1":"P","2":"P","3":"P","4":"-","5":"-","6":"P","7":"P","8":"P","9":"P","10":"-","11":"-","12":"-","13":"P","14":"C","15":"P","16":"P","17":"C","18":"-","19":"-","20":"P","21":"P","22":"P","23":"P","24":"P","25":"-","26":"-","27":"-","28":"P","29":"-","30":"-","31":"-","student":"Almeda Sanchez,  Thiago Lorenzo"},{"1":"P","2":"P","3":"P","4":"-","5":"-","6":"P","7":"P","8":"P","9":"P","10":"-","11":"-","12":"-","13":"P","14":"P","15":"P","16":"P","17":"P","18":"-","19":"-","20":"P","21":"P","22":"P","23":"P","24":"P","25":"-","26":"-","27":"-","28":"P","29":"-","30":"-","31":"-","student":"Arjona Alejo,  Lara Aylen"}, ...]
 * @private
 */
function helperTransformAttendanceData(
  data: Array<Array<string | number>>
): Array<AttendanceObj> {
  const dataFinal: Array<AttendanceObj> = [];
  data.forEach((row) => {
    const att: AttendanceObj = { student: String(row[0]) };
    for (let i = 1; i < 32; i++) {
      if (row[i]) {
        att[i] = row[i] as AttStatus;
      } else break;
    }
    if (Object.keys(att).length === 32) {
      dataFinal.push(att);
    }
  });
  return dataFinal;
}

/**
 * Processes attendance data to extract only days with absences for each student
 * @param {Array<AttendanceObj>} data - Array of attendance objects
 * @returns {Array<IStudientAttendance>} Array of objetcs whit Name of student and Array of days with absences.
 [{"student":"Almeda Sanchez,  Thiago Lorenzo","absences":[14,17]},{"student":"Arjona Alejo,  Lara Aylen","absences":[]}, ...]
 * @private
 */
function helperResumeAttendanceData(data: Array<AttendanceObj>) {
  const dataFinal: Array<IStudientAttendance> = [];
  data.forEach((element) => {
    const attObj: IStudientAttendance = {
      student: element.student,
      absences: [],
    };
    for (const property in element) {
      if (
        element[property] !== "P" &&
        element[property] !== "-" &&
        property !== "student"
      ) {
        attObj.absences.push(Number(property));
      }
    }
    dataFinal.push(attObj);
  });
  return dataFinal;
}

/**
 * Extracts holiday information from attendance data
 * @param {AttendanceObj} data - Attendance data for a student (used to identify holidays)
 * @returns {AttendanceHolidays} Object containing holiday information and working day count
 * @private
 */
function helperGetHolidays(data: AttendanceObj): IAttendanceHolidays {
  const holidays: Array<number> = [];
  for (const property in data) {
    if (data[property] === "-") {
      holidays.push(Number(property));
    }
  }
  const totalWorkingDays = 31 - holidays.length;

  return { holidays, totalWorkingDays };
}
