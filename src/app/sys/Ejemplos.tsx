import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"

export default function EjemploTextos() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Títulos con diferentes tamaños */}
      <section className="space-y-4">
        <Heading size="h1" as="h1">
          Título Principal H1
        </Heading>
        <Heading size="h2" as="h2">
          Subtítulo H2
        </Heading>
        <Heading size="h3" as="h3">
          Sección H3
        </Heading>
      </section>

      {/* Títulos con variantes */}
      <section className="space-y-4">
        <Heading variant="primary" size="h2" as="h2">
          Título con color primario
        </Heading>
        <Heading variant="gradient" size="h2" as="h2">
          Título con gradiente
        </Heading>
        <Heading variant="muted" size="h3" as="h3">
          Título con color apagado
        </Heading>
      </section>

      {/* Títulos con diferentes pesos */}
      <section className="space-y-4">
        <Heading weight="bold" size="h2" as="h2">
          Título en negrita
        </Heading>
        <Heading weight="extrabold" size="h3" as="h3">
          Título extra negrita
        </Heading>
      </section>

      {/* Párrafos con diferentes tamaños */}
      <section className="space-y-4">
        <Text size="lg">
          Este es un párrafo grande. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text size="base">
          Este es un párrafo normal. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text size="sm">
          Este es un párrafo pequeño. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </section>

      {/* Párrafos con variantes de color */}
      <section className="space-y-4">
        <Text variant="default">
          Texto con color por defecto
        </Text>
        <Text variant="muted">
          Texto con color apagado
        </Text>
        <Text variant="primary">
          Texto con color primario
        </Text>
        <Text variant="success">
          Mensaje de éxito
        </Text>
        <Text variant="warning">
          Mensaje de advertencia
        </Text>
        <Text variant="destructive">
          Mensaje de error
        </Text>
      </section>

      {/* Párrafos con diferentes alineaciones */}
      <section className="space-y-4">
        <Text align="left">
          Texto alineado a la izquierda
        </Text>
        <Text align="center">
          Texto alineado al centro
        </Text>
        <Text align="right">
          Texto alineado a la derecha
        </Text>
      </section>

      {/* Párrafos con diferentes espaciados */}
      <section className="space-y-4">
        <Text leading="tight" className="max-w-2xl">
          Texto con interlineado ajustado. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Text leading="relaxed" className="max-w-2xl">
          Texto con interlineado relajado. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </section>

      {/* Combinaciones */}
      <section className="space-y-4">
        <Heading size="h2" variant="gradient" weight="bold" as="h2">
          Título Combinado
        </Heading>
        <Text size="lg" variant="muted" leading="relaxed" className="max-w-3xl">
          Este es un ejemplo de párrafo con múltiples propiedades: tamaño grande, 
          color apagado y espaciado relajado para mejor legibilidad.
        </Text>
      </section>

      {/* Usando como otros elementos */}
      <section className="space-y-4">
        <Text as="span" variant="primary" weight="semibold">
          Texto inline con span
        </Text>
        <Text as="label" weight="medium" size="sm">
          Etiqueta de formulario
        </Text>
      </section>
    </div>
  )
}