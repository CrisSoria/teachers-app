import { studentsData } from "@/utilities/mock-data";
import { IAttendanceProcessed } from "../../interfaces/types";
import { calcularEdadesAlumnos } from "@/features/attendance/components/tables/student-age-calculator";
import { IVerticalSheet, IHorizontalSheet, ITotalSheet } from "./types";

// TODO: Traer los datos de los estudiantes desde la base de datos
const students = formatStudentData(studentsData);

interface IStudent {
  order: string;
  fecha_nacimiento: string;
  genero: string;
  nombre: string;
}
type IformatStudents = Record<string, IStudent>;
function formatStudentData(students: Array<IStudent>): IformatStudents {
  const formattedStudents: IformatStudents = {};
  students.forEach((student) => {
    formattedStudents[student.order] = student;
  });
  return formattedStudents;
}

export function verticalSheet(
  data: IAttendanceProcessed
): Array<IVerticalSheet> {
  const verticalData: Array<IVerticalSheet> = [];
  const totalWorkingDays = data.dates.totalWorkingDays;
  const absences = data.studentAbsences;

  absences.forEach((e, index) => {
    // TODO: que pasa cuando no se encuentran estos datos
    const gender = students[index + 1].genero;
    const studentName = students[index + 1].nombre;
    const totalAbsences = e.absences.length;
    const totalPresent = totalWorkingDays - totalAbsences;

    const studentVerticalData: IVerticalSheet = {
      student: studentName,
      Vp: gender === "M" ? totalPresent.toString() : "-",
      Vi: gender === "M" ? totalAbsences.toString() : "-",
      Mp: gender === "F" ? totalPresent.toString() : "-",
      Mi: gender === "F" ? totalAbsences.toString() : "-",
    };
    verticalData.push(studentVerticalData);
  });

  return verticalData;
}

export function horizontalSheet(
  data: IAttendanceProcessed
): Array<IHorizontalSheet> {
  let rowVarones: IHorizontalSheet = { row: "varones presentes" };
  let rowMujeres: IHorizontalSheet = { row: "mujeres presentes" };
  let RowTotal: IHorizontalSheet = { row: "total" };

  for (let i = 1; i < 32; i++) {
    let contVarPres = 0;
    let contMujPres = 0;
    studentsData.forEach((e, index) => {
      const gender = students[index + 1].genero;
      const status = data.dataTransformed[index][i];

      if (gender === "M" && status === "P") {
        contVarPres++;
      }
      if (gender === "F" && status === "P") {
        contMujPres++;
      }
    });
    rowVarones[i] = contVarPres == 0 ? "-" : contVarPres;
    rowMujeres[i] = contMujPres == 0 ? "-" : contMujPres;
    RowTotal[i] =
      contVarPres + contMujPres == 0 ? "-" : contVarPres + contMujPres;
  }

  return [rowVarones, rowMujeres, RowTotal];
}

/****************************** TOTAL ****************************** */
export function totalSheet(
  data: Array<IVerticalSheet>,
  totalWorkingDays: number
): Array<ITotalSheet> {
  const totalAsistenciaData = auxTotalAsisInasis(data, totalWorkingDays);
  const totalMediaData = auxMediaAttendance(
    totalAsistenciaData,
    totalWorkingDays
  );
  const totalPercentData = auxPercentAttendance(
    totalAsistenciaData,
    totalWorkingDays
  );

  return [...totalAsistenciaData, ...totalMediaData, ...totalPercentData];
}

function auxTotalAsisInasis(
  data: Array<IVerticalSheet>,
  totalWorkingDays: number
): Array<ITotalSheet> {
  let accAsisVarones = 0;
  let accAsisMujeres = 0;
  let accInasisVarones = 0;
  let accInasisMujeres = 0;

  data.forEach((e) => {
    if (e.Vp !== "-") {
      accAsisVarones += Number(e.Vp);
    }
    if (e.Vi !== "-") {
      accInasisVarones += Number(e.Vi);
    }
    if (e.Mp !== "-") {
      accAsisMujeres += Number(e.Mp);
    }
    if (e.Mi !== "-") {
      accInasisMujeres += Number(e.Mi);
    }
  });

  return [
    {
      row: "Total Asistencia",
      varones: accAsisVarones,
      mujeres: accAsisMujeres,
      total: accAsisVarones + accAsisMujeres,
    },
    {
      row: "Total Inasistencia",
      varones: accInasisVarones,
      mujeres: accInasisMujeres,
      total: accInasisVarones + accInasisMujeres,
    },
  ];
}

function auxMediaAttendance(
  totalAsistenciaData: Array<ITotalSheet>,
  totalWorkingDays: number
): Array<ITotalSheet> {
  const mediaVarones = totalAsistenciaData[0].varones / totalWorkingDays;
  const mediaMujeres = totalAsistenciaData[0].mujeres / totalWorkingDays;
  const mediaTotal = totalAsistenciaData[0].total / totalWorkingDays;

  return [
    {
      row: "Asistencia Media",
      varones: Math.round(mediaVarones),
      mujeres: Math.round(mediaMujeres),
      total: Math.round(mediaTotal),
    },
  ];
}

function auxPercentAttendance(
  totalAsistenciaData: Array<ITotalSheet>,
  totalWorkingDays: number
): Array<ITotalSheet> {
  const percentVarones =
    (totalAsistenciaData[0].varones * 100) /
    (totalAsistenciaData[0].varones + totalAsistenciaData[1].varones);
  const percentMujeres =
    (totalAsistenciaData[0].mujeres * 100) /
    (totalAsistenciaData[0].mujeres + totalAsistenciaData[1].mujeres);
  const percentTotal =
    (totalAsistenciaData[0].total * 100) /
    (totalAsistenciaData[0].total + totalAsistenciaData[1].total);

  return [
    {
      row: "Asistencia Porcentaje",
      varones: Math.round(percentVarones),
      mujeres: Math.round(percentMujeres),
      total: Math.round(percentTotal),
    },
  ];
}

/************************** EDAD ***************************** */
export type MonthlyAgeGroup = {
  edad: number | string;
  varones: number;
  mujeres: number;
  total: number;
};
export function ageSheet(month: string): MonthlyAgeGroup[] {
  const ageGroupData = calcularEdadesAlumnos(studentsData, month);
  const ageTotalData = { edad: "Total", varones: 0, mujeres: 0, total: 0 };
  ageGroupData.forEach((e) => {
    ageTotalData.varones += e.varones;
    ageTotalData.mujeres += e.mujeres;
    ageTotalData.total += e.total;
  });

  return [...ageGroupData, ageTotalData];
}
