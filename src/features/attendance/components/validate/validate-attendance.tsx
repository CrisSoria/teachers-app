"use client";
import { IStudientAttendance } from "../../interfaces/types";
import { useState } from "react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ValidateCard } from "./validate-card";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ValidateAttendance({
  studentAbsences,
}: {
  studentAbsences: Array<IStudientAttendance>;
}) {
  const [showValidation, setShowValidation] = useState(false);
  const [studentNumber, setStudentNumber] = useState(0);

  const handleNextStudent = () => {
    if (studentNumber < studentAbsences.length - 1) {
      setStudentNumber(studentNumber + 1);
    }
  };

  const handlePreviousStudent = () => {
    if (studentNumber > 0) {
      setStudentNumber(studentNumber - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Realizar comprobación</CardTitle>
        <CardDescription>
          Para asegurarte de que los datos existentes en SINIDE coinciden con
          los datos de la planilla.
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => setShowValidation(true)}>
            Iniciar
          </Button>
        </CardAction>
      </CardHeader>
      {showValidation && (
        <>
          <CardContent>
            <ValidateCard studentAbsence={studentAbsences[studentNumber]} />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              disabled={studentNumber === 0}
              onClick={() => handlePreviousStudent()}
            >
              Anterior
            </Button>
            {studentNumber < studentAbsences.length - 1 && (
              <Button onClick={() => handleNextStudent()}>Siguiente</Button>
            )}
            {studentNumber === studentAbsences.length - 1 && (
              <Button onClick={() => setShowValidation(false)}>
                Finalizar
              </Button>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
