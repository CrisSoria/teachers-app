"use client";

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { AttendanceObj } from "../../interfaces/types";
import { IVerticalSheet, IHorizontalSheet, ITotalSheet } from "./types";
import { MonthlyAgeGroup } from "./utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/text";
import { Item } from "@/components/ui/item";

export const colGeneral: ColumnDef<AttendanceObj>[] = [
  {
    id: "selectAttGeneral",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className=""
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "student",
    header: () => {
      return (
        <Text variant="muted" size="sm" className="">
          ALUMNO
        </Text>
      );
    },
    cell: ({ row }) => {
      return <Text>{String(row.getValue("student"))}</Text>;
    },
  },
];

// Creacion de columnas para los dias
for (let i = 1; i < 32; i++) {
  const index = i.toString();
  colGeneral.push({
    accessorKey: index,
    header: () => {
      return (
        <Text variant="muted" align="center" className="">
          {index}
        </Text>
      );
    },
    cell: ({ row }) => {
      const day = row.original[i];
      const styles = {
        "-": "bg-gray-600/20 black:bg-gray-400/20 text-gray-500",
        D: "bg-amber-400/20 text-amber-500",
        Q: "bg-amber-400/20 text-amber-500",
        T: "bg-amber-400/20 text-amber-500",
        X: "bg-amber-400/20 text-amber-500",
        M: "bg-indigo-400/20 text-indigo-500",
        P: "bg-emerald-600/20 black:bg-emerald-400/20 text-emerald-700 black:text-emerald-500",
        C: "bg-rose-600/20 black:bg-rose-400/20 text-rose-700 black:text-rose-500",
      }[day];

      return (
        <div
          className={cn(
            "flex size-5 items-center justify-center rounded font-medium text-xs",
            styles
          )}
          key={day}
        >
          {day}
        </div>
      );
    },
  });
}

export const colVertical: ColumnDef<IVerticalSheet>[] = [
  {
    accessorKey: "student",
    header: () => {
      return (
        <Text variant="muted" size="sm" className="">
          ALUMNO
        </Text>
      );
    },
    cell: ({ row }) => {
      return <Text>{String(row.getValue("student"))}</Text>;
    },
  },
  {
    accessorKey: "Vp",
    header: () => {
      return (
        <Text variant="muted" size="lg" weight="bold" align="center">
          V(p)
        </Text>
      );
    },
    cell: ({ row }) => {
      const n = row.original.Vp;
      if (n === "-") {
        return (
          <Item variant="gray" size="sm" align="center">
            <span className="text-lg">{n}</span>
          </Item>
        );
      }
      return (
        <Item variant="blue" size="sm">
          <span className="text-lg">{n}</span>
        </Item>
      );
    },
  },
  {
    accessorKey: "Vi",
    header: () => {
      return (
        <Text variant="muted" size="lg" weight="bold" align="center">
          V(i)
        </Text>
      );
    },
    cell: ({ row }) => {
      const n = row.original.Vi;
      if (n === "-") {
        return (
          <Item variant="gray" size="sm">
            <span className="text-lg">{n}</span>
          </Item>
        );
      }
      return (
        <Item variant="blue" size="sm" className="bg-blue/50">
          <span className="text-lg">{n}</span>
        </Item>
      );
    },
  },
  {
    accessorKey: "Mp",
    header: () => {
      return (
        <Text variant="muted" size="lg" weight="bold" align="center">
          M(p)
        </Text>
      );
    },
    cell: ({ row }) => {
      const n = row.original.Mp;
      if (n === "-") {
        return (
          <Item variant="gray" size="sm">
            <span className="text-lg">{n}</span>
          </Item>
        );
      }
      return (
        <Item variant="error" size="sm">
          <span className="text-lg">{n}</span>
        </Item>
      );
    },
  },
  {
    accessorKey: "Mi",
    header: () => {
      return (
        <Text variant="muted" size="lg" weight="bold" align="center">
          M(i)
        </Text>
      );
    },
    cell: ({ row }) => {
      const n = row.original.Mi;
      if (n === "-") {
        return (
          <Item variant="gray" size="sm">
            <span className="text-lg">{n}</span>
          </Item>
        );
      }
      return (
        <Item variant="error" size="sm" className="bg-error/50">
          <span className="text-lg">{n}</span>
        </Item>
      );
    },
  },
  {
    id: "selectAttVertical",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export const colHorizontal: ColumnDef<IHorizontalSheet>[] = [
  {
    accessorKey: "row",
    header: () => {
      return (
        <Text variant="default" size="sm" align="right">
          Día:
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="sm" align="right">
          {String(row.getValue("row"))}
        </Text>
      );
    },
  },
];

// Creacion de columnas para los dias
for (let i = 1; i < 32; i++) {
  const index = i.toString();
  colHorizontal.push({
    accessorKey: index,
    header: () => {
      return (
        <Text variant="default" align="center" size="sm" weight="bold">
          {index}
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="xl" align="center" weight="bold">
          {String(row.getValue(index))}
        </Text>
      );
    },
  });
}

export const colTotal: ColumnDef<ITotalSheet>[] = [
  {
    accessorKey: "row",
    header: () => {
      return (
        <Text variant="default" size="sm" weight="bold" align="center">
          CONCEPTO
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="sm" align="right" weight="medium">
          {String(row.getValue("row"))}
        </Text>
      );
    },
  },
  {
    accessorKey: "varones",
    header: () => {
      return (
        <Text variant="primary" size="sm" weight="bold" align="center">
          VARONES
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="xl" weight="medium" align="center">
          {String(row.getValue("varones"))}
        </Text>
      );
    },
  },
  {
    accessorKey: "mujeres",
    header: () => {
      return (
        <Text variant="primary" size="sm" weight="bold" align="center">
          MUJERES
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="xl" weight="medium" align="center">
          {String(row.getValue("mujeres"))}
        </Text>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => {
      return (
        <Text variant="primary" size="sm" weight="bold" align="center">
          TOTAL
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="xl" weight="medium" align="center">
          {String(row.getValue("total"))}
        </Text>
      );
    },
  },
];

export const colAgeGroup: ColumnDef<MonthlyAgeGroup>[] = [
  {
    accessorKey: "edad",
    header: () => {
      return (
        <Text variant="primary" size="sm" weight="bold" align="center">
          AÑOS
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="xl" weight="medium" align="center">
          {String(row.getValue("edad"))}
        </Text>
      );
    },
  },
  {
    accessorKey: "varones",
    header: () => {
      return (
        <Text variant="primary" size="sm" weight="bold" align="center">
          VARONES
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="xl" weight="medium" align="center">
          {String(row.getValue("varones"))}
        </Text>
      );
    },
  },
  {
    accessorKey: "mujeres",
    header: () => {
      return (
        <Text variant="primary" size="sm" weight="bold" align="center">
          MUJERES
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="xl" weight="medium" align="center">
          {String(row.getValue("mujeres"))}
        </Text>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => {
      return (
        <Text variant="primary" size="sm" weight="bold" align="center">
          TOTAL
        </Text>
      );
    },
    cell: ({ row }) => {
      return (
        <Text variant="default" size="xl" weight="medium" align="center">
          {String(row.getValue("total"))}
        </Text>
      );
    },
  },
];
