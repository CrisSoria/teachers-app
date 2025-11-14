"use client"

import { useState } from "react"
import { CheckboxCard } from "@/components/ui/checkbox-card"
import { 
  Code, 
  Database, 
  Globe, 
  Rocket, 
  Shield, 
  Zap,
  Heart,
  Star,
  Sparkles,
  CheckCircle2
} from "lucide-react"

export default function CheckboxCardExample() {
  const [selected, setSelected] = useState<string[]>([])

  const handleChange = (id: string, checked: boolean) => {
    setSelected(prev => 
      checked 
        ? [...prev, id] 
        : prev.filter(item => item !== id)
    )
  }

  return (
    <div className="container mx-auto p-8 space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-2">Selecciona tus tecnologías</h2>
        <p className="text-muted-foreground mb-6">
          Has seleccionado {selected.length} {selected.length === 1 ? 'opción' : 'opciones'}
        </p>
      </div>

      {/* Variante Default */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Variante Default</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxCard
            title="React"
            description="Una biblioteca de JavaScript para construir interfaces de usuario"
            icon={Code}
            onCheckedChange={(checked) => handleChange('react', checked)}
          />
          <CheckboxCard
            title="Next.js"
            description="El framework de React para producción"
            icon={Rocket}
            badge="Popular"
            badgeVariant="success"
            onCheckedChange={(checked) => handleChange('nextjs', checked)}
          />
        </div>
      </section>

      {/* Variante Primary */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Variante Primary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxCard
            variant="primary"
            title="TypeScript"
            description="JavaScript con tipos para mayor seguridad"
            icon={Shield}
            onCheckedChange={(checked) => handleChange('typescript', checked)}
          />
          <CheckboxCard
            variant="primary"
            title="Tailwind CSS"
            description="Framework de CSS utilitario para diseño rápido"
            icon={Sparkles}
            badge="Recomendado"
            onCheckedChange={(checked) => handleChange('tailwind', checked)}
          />
        </div>
      </section>

      {/* Variante Success */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Variante Success</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxCard
            variant="success"
            title="Node.js"
            description="Entorno de ejecución para JavaScript del lado del servidor"
            icon={Database}
            onCheckedChange={(checked) => handleChange('nodejs', checked)}
          />
          <CheckboxCard
            variant="success"
            title="Vercel"
            description="Plataforma de deployment para aplicaciones web"
            icon={Globe}
            badge="Gratis"
            badgeVariant="success"
            onCheckedChange={(checked) => handleChange('vercel', checked)}
          />
        </div>
      </section>

      {/* Variante Secondary */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Variante Secondary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxCard
            variant="secondary"
            title="shadcn/ui"
            description="Componentes UI re-utilizables y personalizables"
            icon={Star}
            onCheckedChange={(checked) => handleChange('shadcn', checked)}
          />
          <CheckboxCard
            variant="secondary"
            title="Prisma"
            description="ORM moderno para Node.js y TypeScript"
            icon={Database}
            badge="Beta"
            badgeVariant="warning"
            onCheckedChange={(checked) => handleChange('prisma', checked)}
          />
        </div>
      </section>

      {/* Variante Outline */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Variante Outline</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxCard
            variant="outline"
            title="Vite"
            description="Build tool rápido para desarrollo moderno"
            icon={Zap}
            onCheckedChange={(checked) => handleChange('vite', checked)}
          />
          <CheckboxCard
            variant="outline"
            title="Premium Support"
            description="Soporte prioritario 24/7 con tiempo de respuesta garantizado"
            icon={Heart}
            badge="Pro"
            badgeVariant="destructive"
            onCheckedChange={(checked) => handleChange('premium', checked)}
          />
        </div>
      </section>

      {/* Diferentes tamaños */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Tamaños</h3>
        <div className="space-y-4">
          <CheckboxCard
            size="sm"
            title="Pequeño"
            description="Checkbox compacto"
            icon={CheckCircle2}
          />
          <CheckboxCard
            size="default"
            title="Default"
            description="Tamaño estándar del checkbox"
            icon={CheckCircle2}
          />
          <CheckboxCard
            size="lg"
            title="Grande"
            description="Checkbox con más espacio y texto más grande"
            icon={CheckCircle2}
          />
        </div>
      </section>

      {/* Sin icono de check y deshabilitado */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Opciones Especiales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxCard
            title="Sin icono de check"
            description="Este checkbox no muestra el icono de verificación"
            icon={Sparkles}
            showCheckIcon={false}
          />
          <CheckboxCard
            title="Deshabilitado"
            description="Esta opción no está disponible"
            icon={Shield}
            disabled
            badge="No disponible"
            badgeVariant="destructive"
          />
        </div>
      </section>

      {/* Ejemplo sin icono */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Sin Ícono</h3>
        <CheckboxCard
          variant="primary"
          title="Acepto los términos y condiciones"
          description="He leído y acepto los términos de servicio y la política de privacidad"
        />
      </section>
    </div>
  )
}