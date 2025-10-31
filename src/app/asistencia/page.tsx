"use client";

import { readExcel } from "@/utilities/readExcel";
import { useState } from "react";
import { processAttendanceData } from "./utils";
import { IAttendanceProcessed } from "./types";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { OlList } from "@/components/ol-list";
import { InputDropzone } from "@/components/input-dropzone";
import { ValidateAttendance } from "./validate/validate-attendance";
import { AttendanceSheet } from "./sheet/attendance-sheet";

export default function AsistenciaPage() {
  const ROWS_TO_SKIP = 13; // Filas a saltar del archivo Excel del SINIDE

  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState<IAttendanceProcessed>();
  const [showSheet, setShowSheet] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    try {
      const excelData = await readExcel(file, ROWS_TO_SKIP);
      const attendanceData: IAttendanceProcessed =
        processAttendanceData(excelData);
      setAttendance(attendanceData);
    } catch (error) {
      //TODO: Mostrar error en el frontend
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!attendance) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col ">
        <Heading weight="bold" size="h2" as="h2">
          Carga de asistencia
        </Heading>
        <Text variant="primary" className="mt-4">
          Sube el archivo Excel{" "}
          <strong>"Reporte asistencia mensual por cursada"</strong> descargado
          desde la plataforma{" "}
          <a
            href="https://sge.salta.gob.ar/ui/#!/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>SINIDE</strong>
          </a>
          :
        </Text>
        <InputDropzone onFileUpload={handleFileUpload} />
        <Heading variant="muted" weight="medium" size="h3" as="h3">
          Instrucciones:
        </Heading>
        <OlList
          variant="muted"
          items={[
            "Accede a la plataforma <a href='https://sge.salta.gob.ar/ui/#!/login' target='_blank' rel='noopener noreferrer'><strong>SINIDE</strong></a>.",
            "Navega a la sección de <strong>Asistencia</strong>, seleccionando el Grado y una semana en el Mes que correspondan.",
            "Haz clic en el ícono de la <strong>impresora</strong>, ubicado en la esquina superior derecha.",
            'En el menú desplegable, selecciona la opción <strong>"Reporte asistencia mensual por cursada"</strong>.',
            "Asegúrate de que el archivo a descargar tenga la extensión <strong>.xls</strong>.",
            'Una vez descargado, vuelve a esta página y haz clic en <strong>"Seleccionar archivo"</strong> para subir la planilla.',
          ]}
        />
      </div>
    );
  }
  if (!showSheet) {
    return (
      <div className="max-w-2xl mx-auto my-4">
        <ValidateAttendance studentAbsences={attendance.studentAbsences} />
        <Text leading="loose" variant="primary" className="my-4">
          Si tus datos coinciden con los existentes en SINIDE, presiona el botón
          "Generar planilla" para obtener las tablas.
        </Text>
        <Button onClick={() => setShowSheet(true)}>Generar planilla</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <AttendanceSheet attendance={attendance} />
    </div>
  );
}
