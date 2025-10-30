// --- TIPOS DE DATOS ---

/**
 * Representa la estructura de un estudiante, basado en los datos de ejemplo.
 */
export interface Student {
  order: string;
  fecha_nacimiento: string; // Formato "DD/MM/YYYY"
  genero: "M" | "F";
  nombre: string;
}

export function calcularEdadesAlumnos(
  datos: Student[],
  mes: string
): { edad: number; varones: number; mujeres: number; total: number }[] {
  const meses: { [key: string]: number } = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11,
  };

  const mesNormalizado = mes.toLowerCase();
  const mesIndex = meses[mesNormalizado];
  if (mesIndex === undefined) {
    throw new Error("Mes inválido. Usa un nombre de mes en español válido.");
  }

  const year = new Date().getFullYear();
  const endDate = new Date(year, mesIndex + 1, 0); // Último día del mes

  const grupos: Map<
    number,
    { varones: number; mujeres: number; total: number }
  > = new Map();

  datos.forEach((alumno) => {
    const parts = alumno.fecha_nacimiento.split("/");
    if (parts.length !== 3) {
      console.warn(
        `Formato de fecha inválido para ${alumno.nombre}: ${alumno.fecha_nacimiento}`
      );
      return;
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const yearBirth = parseInt(parts[2], 10);
    const birthDate = new Date(yearBirth, month - 1, day);

    if (isNaN(birthDate.getTime())) {
      console.warn(
        `Fecha inválida para ${alumno.nombre}: ${alumno.fecha_nacimiento}`
      );
      return;
    }

    let edad = endDate.getFullYear() - birthDate.getFullYear();
    const mesDiff = endDate.getMonth() - birthDate.getMonth();
    if (
      mesDiff < 0 ||
      (mesDiff === 0 && endDate.getDate() < birthDate.getDate())
    ) {
      edad--;
    }

    if (!grupos.has(edad)) {
      grupos.set(edad, { varones: 0, mujeres: 0, total: 0 });
    }

    const grupo = grupos.get(edad)!;
    if (alumno.genero === "M") {
      grupo.varones++;
    } else if (alumno.genero === "F") {
      grupo.mujeres++;
    }
    grupo.total++;
  });

  const resultado = Array.from(grupos.entries())
    .sort(([edadA], [edadB]) => edadA - edadB)
    .map(([edad, counts]) => ({
      edad,
      varones: counts.varones,
      mujeres: counts.mujeres,
      total: counts.total,
    }));

  return resultado;
}
