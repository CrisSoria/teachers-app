"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AttendanceObj } from "../types";
import { IVerticalSheet, IHorizontalSheet } from "./types";

export const colGeneral: ColumnDef<AttendanceObj>[] = [
  {
    accessorKey: "student",
    header: "ALUMNO",
  },
];

// Creacion de columnas para los dias
for (let i = 1; i < 32; i++) {
  const index = i.toString();
  colGeneral.push({
    accessorKey: index,
    header: index,
    cell: ({ row }) => {
      const day = row.original[i];

      if (day === "P") {
        return (
          <span className="p-1 border-2 bg-green-500 rounded m-0.5">{day}</span>
        );
      }
      if (day === "C") {
        return (
          <span className="p-1 border-2 bg-red-500 rounded m-0.5">{day}</span>
        );
      }
      if (day === "-") {
        return (
          <span className="p-1 border-2 bg-gray-500 rounded m-0.5">{day}</span>
        );
      }
    },
  });
}

export const colVertical: ColumnDef<IVerticalSheet>[] = [
  {
    accessorKey: "student",
    header: "ALUMNO",
  },
  {
    accessorKey: "Vp",
    header: "V(p)",
    cell: ({ row }) => {
      const n = row.original.Vp;
      if (n === "-") {
        return (
          <span className="p-1 border-2 bg-gray-500 rounded m-0.5">{n}</span>
        );
      }
      return (
        <span className="p-1 border-2 bg-blue-500 rounded m-0.5">{n}</span>
      );
    },
  },
  {
    accessorKey: "Vi",
    header: "V(i)",
    cell: ({ row }) => {
      const n = row.original.Vi;
      if (n === "-") {
        return (
          <span className="p-1 border-2 bg-gray-500 rounded m-0.5">{n}</span>
        );
      }
      return (
        <span className="p-1 border-2 bg-blue-700 rounded m-0.5">{n}</span>
      );
    },
  },
  {
    accessorKey: "Mp",
    header: "M(p)",
    cell: ({ row }) => {
      const n = row.original.Mp;
      if (n === "-") {
        return (
          <span className="p-1 border-2 bg-gray-500 rounded m-0.5">{n}</span>
        );
      }
      return (
        <span className="p-1 border-2 bg-pink-500 rounded m-0.5">{n}</span>
      );
    },
  },
  {
    accessorKey: "Mi",
    header: "M(i)",
    cell: ({ row }) => {
      const n = row.original.Mi;
      if (n === "-") {
        return (
          <span className="p-1 border-2 bg-gray-500 rounded m-0.5">{n}</span>
        );
      }
      return (
        <span className="p-1 border-2 bg-pink-700 rounded m-0.5">{n}</span>
      );
    },
  },
];

export const colHorizontal: ColumnDef<IHorizontalSheet>[] = [
  {
    accessorKey: "row",
    header: "Día",
  },
];

// Creacion de columnas para los dias
for (let i = 1; i < 32; i++) {
  const index = i.toString();
  colHorizontal.push({
    accessorKey: index,
    header: index,
  });
}