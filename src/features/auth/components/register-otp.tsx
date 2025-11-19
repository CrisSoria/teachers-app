"use client"

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { IUserStore, useUserStore } from "@/lib/user-store";

export function RegisterOtp() {
  const email = useUserStore((state: IUserStore) => state.user?.email);
  return (
  <form
        action=""
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
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
            <InputOTP maxLength={6}>
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
            <Button className="w-full mt-6" variant="secondary">
              Verificar Código
            </Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            ¿No recibiste el código?
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Reenviar código</Link>
            </Button>
          </p>
        </div>
      </form>
      )
}