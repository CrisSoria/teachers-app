import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Month() {
  return (
    <section className="grid gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
      <main className="lg:col-span-2">
        <Heading size="lg">Planillas de Asistencias</Heading>
        <Text className="my-6">
          Consultar las planillas de asistencias de meses anteriores
        </Text>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Atención</AlertTitle>
          <AlertDescription>
            Para utilizar esta funcionalidad necesitas iniciar sesión.
          </AlertDescription>
        </Alert>
      </main>
      <aside className="lg:col-span-3">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona un mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Meses</SelectLabel>
              <SelectItem value="apple">Enero</SelectItem>
              <SelectItem value="banana">Febrero</SelectItem>
              <SelectItem value="blueberry">Marzo</SelectItem>
              <SelectItem value="grapes">Abril</SelectItem>
              <SelectItem value="pineapple">Mayo</SelectItem>
              <SelectItem value="pineapple">Junio</SelectItem>
              <SelectItem value="pineapple">Julio</SelectItem>
              <SelectItem value="pineapple">Agosto</SelectItem>
              <SelectItem value="pineapple">Septiembre</SelectItem>
              <SelectItem value="pineapple">Octubre</SelectItem>
              <SelectItem value="pineapple">Noviembre</SelectItem>
              <SelectItem value="pineapple">Diciembre</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </aside>
    </section>
  );
}
