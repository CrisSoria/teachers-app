"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { IStudientAttendance } from "../types"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

export function AttendanceSheet({studentAbsences}: {studentAbsences: Array<IStudientAttendance>}) {
    return (<div>
      <Text leading="loose" variant="primary" className="my-4">
        Si tus datos coinciden con los existentes en SINIDE, presiona el botón "Generar planilla" para obtener las tablas. 
      </Text>
      <Button>Generar planilla</Button>
      {/* <DataTable columns={columns} data={studentAbsences} /> */}
    </div>);
}