import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OlList } from "@/components/ol-list";

const instrucciones = [
  'Accede a la plataforma <span class="font-semibold text-blue-600">SINIDE</span>.',
  'Navega a la sección de <span class="font-semibold text-blue-600">Asistencia</span>, seleccionando el <span class="italic">Grado</span> y una <span class="italic">semana en el Mes</span> que correspondan.',
  'Haz clic en el ícono de la <span class="font-semibold">impresora</span>, ubicado en la esquina superior derecha.',
  'En el menú desplegable, selecciona la opción <span class="italic text-green-700">"Reporte asistencia mensual por cursada"</span>.',
  'Asegúrate de que el archivo a descargar tenga la extensión <span class="font-mono bg-gray-100 px-2 py-1 rounded">.xls</span>.',
  'Una vez descargado, vuelve a esta página y haz clic en <span class="italic text-green-700">"Seleccionar archivo"</span> para subir la planilla.'
];

export const SinideInstructions = () => {
  return (
   
        <Accordion
          type="single"
          collapsible
          className="w-full mx-auto bg-white shadow-md rounded-lg p-6"
          // defaultValue="item-1" // descomentar si se desea que el acordeon se abra por defecto
        >
        <AccordionItem value="item-1">
            <AccordionTrigger>Ver Instrucciones</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <OlList items={instrucciones} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
  );
};
