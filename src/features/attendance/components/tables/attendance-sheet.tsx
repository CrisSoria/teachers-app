"use client";

import { IAttendanceProcessed } from "../../interfaces/types";
import {
  colGeneral,
  colVertical,
  colHorizontal,
  colTotal,
  colAgeGroup,
} from "./columns";
import { Heading } from "@/components/ui/heading";
import { verticalSheet, horizontalSheet, totalSheet, ageSheet } from "./utils";
import { GeneralDataTable } from "./general-data-table";
import { HorizontalDataTable } from "./horizontal-data-table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";

export function AttendanceSheet({
  attendance,
}: {
  attendance: IAttendanceProcessed;
}) {
  const verticalData = verticalSheet(attendance);
  const horizontalData = horizontalSheet(attendance);
  const totalData = totalSheet(verticalData, attendance.dates.totalWorkingDays);
  //TODO: Obtener el mes desde el archivo Excel.
  const ageData = ageSheet("octubre");

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {/* TODO: Crear un ciclo para los items */}
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Heading size="md">Planilla General</Heading>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <GeneralDataTable
            columns={colGeneral}
            data={attendance.dataTransformed}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Heading size="md">Planilla Vertical</Heading>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <GeneralDataTable columns={colVertical} data={verticalData} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Heading size="md">Planilla Horizontal</Heading>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <HorizontalDataTable columns={colHorizontal} data={horizontalData} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          <Heading size="md">Planilla de totales</Heading>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <Text variant="default" size="lg" weight="bold" align="center">
            La cantidad de días hábiles es:{" "}
            <span className="text-success">
              {attendance.dates.totalWorkingDays}
            </span>
          </Text>
          <HorizontalDataTable columns={colTotal} data={totalData} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          <Heading size="md">Planilla de Edades</Heading>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <HorizontalDataTable columns={colAgeGroup} data={ageData} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
