# Dependencias
- Next.js
- Tailwind CSS
- Shadcn UI
- SheetJS (`npm i --save https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz`)
- @tanstack/react-table (para mostrar tablas)

# Estructura del proyecto
Lo más común y recomendado es esta estructura:

- src/app/ — rutas y páginas

- src/components/ — componentes reutilizables

- src/utils/ — funciones utilitarias como la lógica de carga de Excel

- src/lib/ — código propio que envuelve o extiende librerías externas

```
+--📁src
|   +--📁app/
|   |   +--📁alumnos/
|   |   |   +--📝page.jsx               # página con lista de alumnos
|   |   +--📁asistencia/
|   |   |   +--📝page.jsx               # página donde cargar el archivo de SINIDE
|   |   +--📝page.tsx                   # página principal
|   +--📁components/
|   |   +--📁ui/                 
|   +--📁lib/
|   |   +--📝utils.ts                   # fusiona taiwind - por Shadcn UI
|   |   |
|   +--📁types/
|   |   +--📝index.ts
|   +--📁utils/
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tablas

Para mostrar tablas se utiliza la librería @tanstack/react-table
Pasos a seguir:
1. Definir las columnas
```ts
"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
```
>[!NOTE]
>Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

2. Definir los datos
```ts
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]
```
3. Importar el componente DataTable
4. Renderizar el componente DataTable
```tsx
import { DataTable } from "@/components/ui/data-table"

<DataTable columns={columns} data={payments} />
```

## Excel

Para cargar archivos excel se utiliza la librería SheetJS


