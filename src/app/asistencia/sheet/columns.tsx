"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IStudientAttendance } from "../types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<IStudientAttendance>[] = [
  {
    accessorKey: "student",
    header: "ALUMNO",
  },
  {
    accessorKey: "absences",
    header: "Fechas de ausencia",
    cell: ({ row }) => {
      const absences = row.original.absences;
      return absences.map((absence) => {
        return (
          <span key={absence} className="p-1 border-2 border-red-500 rounded m-0.5">
            {absence}
          </span>
        )
      })
    },
  },
]
