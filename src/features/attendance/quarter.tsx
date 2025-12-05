import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { DatePicker } from "@/components/date-picker";

export function Quarter() {
  return (
    <section className="grid gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
      <main className="lg:col-span-2">
        <Heading size="lg">Generar planilla intermensual</Heading>
        <Text>
          Seleccionar un rango de fechas específico para generar un informe
        </Text>
      </main>
      <aside className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3 bg-linear-to-b aspect-76/59 from-zinc-300 to-transparent dark:from-zinc-700">
        <div className="">
          <Text>Fecha Inicial</Text>
          <DatePicker />
          <Text>Fecha Final</Text>
          <DatePicker />
        </div>
      </aside>
    </section>
  );
}
