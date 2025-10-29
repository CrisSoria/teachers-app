"use client";

import { readExcel } from "@/utilities/readExcel";
import { InputDropzone } from "@/components/input-dropzone";
import { useState } from "react";
import { processAttendanceData } from "./utils";

export default function AsistenciaPage() {
  const ROWS_TO_SKIP = 13; // Filas a saltar del archivo Excel del SINIDE

  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState<any>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    try {
      const excelData = await readExcel(file, ROWS_TO_SKIP);
      //TODO: Validar que el archivo tenga la estructura correcta -> asignar a attendance
      const attendanceData = processAttendanceData(excelData);
      console.log("attendanceData", attendanceData);
    } catch (error) {
      //TODO: Mostrar error en el frontend
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Carga de Asistencia</h1>
      <InputDropzone onFileUpload={handleFileUpload} />
    </div>
  );
}
