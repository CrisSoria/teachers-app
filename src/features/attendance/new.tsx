import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { FileUpload } from "@/features/attendance/components/file-upload";
import { SinideInstructions } from "./components/sinide-instructions";

export function New() {
  return (
    <section className="grid gap-12 md:grid-cols-2 md:gap-12 xl:grid-cols-5 lg:gap-24">
      <main className="xl:col-span-2">
        <Heading size="lg">Cargar un nuevo mes</Heading>
        <Text className="my-6">
          Carga el “Reporte asistencia mensual por cursada” que obtienes desde
          la plataforma{" "}
          <a
            href="https://sge.salta.gob.ar/ui/#!/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>SINIDE</strong>
          </a>
          :
        </Text>

        <SinideInstructions />
      </main>
      {/* <aside className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3 bg-linear-to-b aspect-76/59 from-zinc-300 to-transparent dark:from-zinc-700"> */}
      <aside className="xl:col-span-3">
        <FileUpload />
      </aside>
    </section>
  );
}
