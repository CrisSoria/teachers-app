"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useRef, useState } from "react";
import { FileDropzone } from "@/components/file-dropzone";
import { FileList } from "@/components/file-list";
import { Form } from "./form";
import { readExcel } from "@/utilities/readExcel";
import { IAttendanceProcessed } from "../interfaces/types";
import { processAttendanceData } from "../utils/utils";
import { useAttendanceStore } from "@/store/attendance-store";
import Link from "next/link";

const ROWS_TO_SKIP = 13; // Filas a saltar del archivo Excel del SINIDE

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {}
  );
  console.log({ uploadedFiles });
  console.log("uploadedFiles.length", uploadedFiles.length);
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();

      // Evento de progreso durante la lectura
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setFileProgresses((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        }
      };

      // Cuando termina la lectura
      reader.onload = async (event) => {
        setFileProgresses((prev) => ({
          ...prev,
          [file.name]: 50,
        }));

        // Aquí puedes procesar el archivo Excel si lo necesitas
        // const data = event.target?.result;
        // procesarExcel(data);
        try {
          const excelData = await readExcel(file, ROWS_TO_SKIP);
          const attendanceData: IAttendanceProcessed =
            processAttendanceData(excelData);
          useAttendanceStore.getState().setAttendance(attendanceData);

          setFileProgresses((prev) => ({
            ...prev,
            [file.name]: 100,
          }));
        } catch (error) {
          console.error("Error al procesar el archivo:", error);
        }
      };

      // Manejo de errores
      reader.onerror = () => {
        console.error(`Error al leer el archivo: ${file.name}`);
        setFileProgresses((prev) => ({
          ...prev,
          [file.name]: 0,
        }));
      };

      // Iniciar la lectura del archivo
      // Para Excel usa readAsArrayBuffer o readAsBinaryString
      reader.readAsArrayBuffer(file);
    });
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (filename: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== filename));
    setFileProgresses((prev) => {
      const newProgresses = { ...prev };
      delete newProgresses[filename];
      return newProgresses;
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="mx-auto max-w-sm bg-background rounded-lg p-0 shadow-md">
        <CardContent className="p-0">
          <div className="p-6 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium text-foreground">
                  Crear un nuevo registro
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Arrastra y suelta el archivo o utiliza el explorador de
                  archivos para cargarlo.
                </p>
              </div>
            </div>
          </div>
          <Form />
          {uploadedFiles.length === 0 ? (
            <FileDropzone
              fileInputRef={fileInputRef}
              handleBoxClick={handleBoxClick}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleFileSelect={handleFileSelect}
            />
          ) : (
            <FileList
              uploadedFiles={uploadedFiles}
              fileProgresses={fileProgresses}
              removeFile={removeFile}
            />
          )}
          <div className="px-6 py-3 border-t border-border bg-muted rounded-b-lg flex justify-between items-center flex-wrap">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Ayuda
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="py-3 bg-background text-foreground border">
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium max-w-[200px]">
                      Carga el archivo que obtienes desde la plataforma SINIDE
                    </p>
                    <p className="text-muted-foreground dark:text-muted-background text-xs max-w-[200px]">
                      Nombre:{" "}
                      <span className="font-bold">
                        Reporte asistencia mensual por cursada
                      </span>
                    </p>
                    <p className="text-muted-foreground dark:text-muted-background text-xs max-w-[200px]">
                      Formato: XLS
                    </p>
                    <p className="text-muted-foreground dark:text-muted-background text-xs max-w-[200px]">
                      Tamaño máximo: 4MB
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-9 px-4 text-sm font-medium"
                onClick={() => {
                  setUploadedFiles([]);
                  setFileProgresses({});
                }}
              >
                Cancelar
              </Button>
              {uploadedFiles.length > 0 ? (
                <Button className="h-9 px-4 text-sm font-medium" asChild>
                  <Link href="/asistencia/planilla">Continuar</Link>
                </Button>
              ) : (
                <Button className="h-9 px-4 text-sm font-medium" disabled>
                  Continuar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
