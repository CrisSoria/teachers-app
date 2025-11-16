import { Activity, DraftingCompass, Mail, Zap } from 'lucide-react'
import Image from 'next/image'

export function Features() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                    <div className="lg:col-span-2">
                        <div className="md:pr-6 lg:pr-0">
                            <h2 className="text-4xl font-semibold lg:text-5xl">Tu asistente digital para el aula</h2>
                            <p className="mt-6">ProfeTool es una aplicación web diseñada especialmente para docentes. Te ayuda a gestionar planillas de asistencia, planificar clases, generar informes y automatizar tareas repetitivas. Todo en un entorno amigable, rápido y pensado para vos.</p>
                        </div>
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
                            <Image src="/assets/attendance.png" className="hidden rounded-[15px] dark:block" alt="payments illustration dark" width={1207} height={929} />
                            <Image src="/assets/attendance.png" className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1207} height={929} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}