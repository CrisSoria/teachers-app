import { studentsData } from "@/utilities/mock-data";
import { IAttendanceProcessed } from "../types";
import { IVerticalSheet, IHorizontalSheet } from "./types";
import next from "next";

/*
# Vertical
necesito saber el sexo
usar:
!  totalWorkingDays - absences.length
necesito retornar:
{
  student: string;
  V(p): string;
  V(i): string;
  M(p): string;
  M(i): string;
}

*/
// TODO: Traer los datos de los estudiantes desde la base de datos
/*
{
  1:fulano
  2:mengano
}

*/
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
      const isHoliday = data.dataTransformed[index][i] === "-";

      if (isHoliday) {
        rowVarones[i] = "-";
        rowMujeres[i] = "-";
        RowTotal[i] = "-";
        next;
      }
      if (gender === "M" && status === "P") {
        contVarPres++;
      }
      if (gender === "F" && status === "P") {
        contMujPres++;
      }
    });
    rowVarones[i] = contVarPres;
    rowMujeres[i] = contMujPres;
    RowTotal[i] = contVarPres + contMujPres;
  }

  return [rowVarones, rowMujeres, RowTotal];
}
