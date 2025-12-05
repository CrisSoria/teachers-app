"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../interfaces/zod.schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateOtp } from "../services/otp.service";
import { changePassword } from "../services/auth.service";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";

export function ChangePassForm() {
  const [showOtp, setShowOtp] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      token: "",
    },
  });

  async function onChangePassword(
    values: z.infer<typeof changePasswordSchema>
  ) {
    console.log("onChangePassword values ", values);
    try {
      const result = await changePassword(values);
      if (result.success) {
        toast.success(result.message);
        setShowOtp(false);
        setUser(result.data.user);
        router.push("/alumnos");
      } else {
        toast.error(result.message);
      }
    } catch (error: unknown) {
      console.error("Error al cambiar contraseña", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error desconocido al cambiar contraseña");
      }
    }
  }

  async function onSendOtp() {
    // Validar correo electrónico
    const email = form.getValues("email");
    const emailSchema = z.email(
      "Por favor, ingrese un correo electrónico válido"
    );
    try {
      emailSchema.parse(email);
    } catch (error) {
      toast.error("Por favor, ingrese un correo electrónico válido");
      return;
    }
    // Generar OTP
    try {
      const result = await generateOtp(email);
      if (result.success) {
        toast.success(result.message);
        setShowOtp(true);
      } else {
        toast.error(result.message);
      }
    } catch (error: unknown) {
      console.error("Error al reenviar OTP", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error desconocido al reenviar OTP");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onChangePassword)}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card rounded-[calc(var(--radius)+.125rem)] border p-4 md:p-8 pb-6">
          <div className="text-center">
            <Link href="/" aria-label="go home" className="mx-auto block w-fit">
              <Logo />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Recuperar Contraseña
            </h1>
            <p className="text-sm">
              Ingrese su correo para recibir un código de verificación
            </p>
          </div>
          {!showOtp && (
            <>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingrese su correo electrónico"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                    Por favor, ingrese su correo electrónico
                  </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button className="w-full" onClick={onSendOtp}>
                  Enviar Código de Verificación
                </Button>
              </div>
            </>
          )}
          {showOtp && (
            <>
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Se le envió un código de verificación para restablecer su
                  contraseña a {form.getValues("email")}.
                </p>
              </div>
              <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <hr className="border-dashed" />
                <span className="text-muted-foreground text-xs">
                  Ingrese el código de verificación
                </span>
                <hr className="border-dashed" />
              </div>
              <div className="flex flex-col items-center">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-0.5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Contraseña</FormLabel>
                        <Button asChild variant="link" size="sm">
                          <Link
                            href="/login/reset"
                            className="link intent-info variant-ghost text-sm"
                          >
                            ¿Olvidaste tu contraseña?
                          </Link>
                        </Button>
                      </div>
                      <FormControl>
                        <Input placeholder="Ingrese su contraseña" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-6"
                variant="secondary"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Cambiando contraseña..."
                  : "Cambiar Contraseña"}
              </Button>
            </>
          )}
        </div>

        <div className="p-3">
          <p className="text-muted-foreground text-center text-sm">
            ¿Recordaste tu contraseña?
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
