"use client";

import { IAttendanceProcessed } from "../types";
import { DataTable } from "@/components/ui/data-table";
import { colGeneral, colVertical, colHorizontal } from "./columns";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { verticalSheet, horizontalSheet } from "./utils";

export function AttendanceSheet({
  attendance,
}: {
  attendance: IAttendanceProcessed;
}) {
  const verticalData = verticalSheet(attendance);
  const horizontalData = horizontalSheet(attendance);
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
      {/* Planilla de totales */}
    </div>
  );
}
