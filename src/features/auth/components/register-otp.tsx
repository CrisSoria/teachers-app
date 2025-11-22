"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpFormSchema } from "@/features/auth/interfaces/zod.schemas";
import { login } from "@/features/auth/services/auth.service";
import { generateOtp } from "@/features/auth/services/otp.service";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/user-store";

export function RegisterOtp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      token: "",
    },
  });

  async function onVerifyLogin(values: z.infer<typeof otpFormSchema>) {
    try {
      // login se encarga de verificar el status de la cuenta y solicitar el OTP para verificarla y luego iniciar sesión
      console.log("Verificando OTP", values.token, email, password);
      const loginResult = await login({ email, password, otp: values.token });
      if (loginResult.success) {
        toast.success(loginResult.message);
        setUser(loginResult.data?.user);
        router.push("/alumnos");
      } else {
        toast.error(loginResult.message);
      }
    } catch (error: unknown) {
      console.error("Error en verificación OTP", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error desconocido al verificar OTP");
      }
    }
  }

  async function onResendOtp() {
    try {
      const result = await generateOtp(email);
      if (result.success) {
        toast.success(result.message);
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
        onSubmit={(e) => {
          console.log("Form submit triggered");
          console.log("Form errors:", form.formState.errors);
          console.log("Form values:", form.getValues());
          form.handleSubmit(onVerifyLogin)(e);
        }}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-4 md:p-8 pb-6">
          <div className="text-center">
            <Link href="/" aria-label="go home" className="mx-auto block w-fit">
              <Logo />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Verifica tu correo
            </h1>
            <p className="text-sm">
              Ingrese el código de seis dígitos que se envió a su correo {email}
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
            <Button
              className="w-full mt-6"
              variant="secondary"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Verificando..."
                : "Verificar Código"}
            </Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-muted-foreground text-center text-sm">
            ¿No recibiste el código?
            <Button variant="link" className="px-2" onClick={onResendOtp}>
              Reenviar código
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
