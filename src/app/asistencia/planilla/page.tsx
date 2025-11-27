"use client";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ValidateAttendance } from "@/features/attendance/components/validate/validate-attendance";
import { useAttendanceStore } from "@/lib/attendance-store";
import { useState } from "react";
import { AttendanceSheet } from "@/features/attendance/components/tables/attendance-sheet";

export default function AsistenciaPlanillaPage() {
  const { attendance } = useAttendanceStore();
  const [showSheet, setShowSheet] = useState(false);

  if (!attendance) return <div>Seleccione un archivo</div>;

  if (!showSheet) {
    return (
      <div className="max-w-2xl mx-auto my-4">
        <ValidateAttendance studentAbsences={attendance?.studentAbsences} />
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
