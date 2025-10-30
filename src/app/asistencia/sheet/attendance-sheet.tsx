"use client";

import { IAttendanceProcessed } from "../types";
import { DataTable } from "@/components/ui/data-table";
import {
  colGeneral,
  colVertical,
  colHorizontal,
  colTotal,
  colAgeGroup,
} from "./columns";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { verticalSheet, horizontalSheet, totalSheet, ageSheet } from "./utils";

export function AttendanceSheet({
  attendance,
}: {
  attendance: IAttendanceProcessed;
}) {
  const verticalData = verticalSheet(attendance);
  const horizontalData = horizontalSheet(attendance);
  const totalData = totalSheet(verticalData, attendance.dates.totalWorkingDays);
  const ageData = ageSheet("octubre");

  return (
    <div>
      <Heading weight="bold" size="h2">
        Planilla General
      </Heading>
      <DataTable columns={colGeneral} data={attendance.dataTransformed} />
      <Heading weight="bold" size="h2">
        Planilla Vertical
      </Heading>
      <DataTable columns={colVertical} data={verticalData} />
      <Heading weight="bold" size="h2">
        Planilla Horizontal
      </Heading>
      <DataTable columns={colHorizontal} data={horizontalData} />
      <Heading weight="bold" size="h2">
        Planilla de totales
      </Heading>
      <DataTable columns={colTotal} data={totalData} />
      <Heading weight="bold" size="h2">
        Planilla de Edades
      </Heading>
      <DataTable columns={colAgeGroup} data={ageData} />
    </div>
  );
}
