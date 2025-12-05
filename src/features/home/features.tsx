import { Activity, DraftingCompass, Mail, Zap } from "lucide-react";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export function Features() {
  return (
    <section className="py-12 md:py-20 lg:py-32">
      <div className="px-4 md:px-16 lg:px-24 xl:px-40">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <Heading size="lg">Tu asistente digital para el aula</Heading>
          <Text>
            ProfeTool es una aplicación web diseñada especialmente para
            docentes. Te ayuda a gestionar planillas de asistencia, planificar
            clases, generar informes y automatizar tareas repetitivas. Todo en
            un entorno amigable, rápido y pensado para vos.
          </Text>
        </div>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24 my-4">
          <div className="lg:col-span-2">
            <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
              <li>
                <Mail className="size-5" />
                Generar planillas de asistencia en segundos
              </li>
              <li>
                <Zap className="size-5" />
                Organizar tu planificación semanal o anual
              </li>
              <li>
                <Activity className="size-5" />
                Crear informes cualitativos y cuantitativos
              </li>
              <li>
                <DraftingCompass className="size-5" />
                Automatizar tareas repetitivas con plantillas personalizadas
              </li>
              <li>
                <DraftingCompass className="size-5" />
                Acceder desde cualquier dispositivo, sin instalaciones
              </li>
            </ul>
          </div>
          <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
            <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <Image
                src="/assets/attendance.png"
                className="hidden rounded-[15px] dark:block"
                alt="payments illustration dark"
                width={1207}
                height={929}
              />
              <Image
                src="/assets/attendance.png"
                className="rounded-[15px] shadow dark:hidden"
                alt="payments illustration light"
                width={1207}
                height={929}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
