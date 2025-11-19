import { RegisterOtp } from "@/features/auth/components/register-otp";

export default function ForgotPasswordPage() {
  // TODO: recibir el correo del registro
  /**
  se guardó el correo en el store cuando se registro el usuario.
   */
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <RegisterOtp />
    </section>
  );
}
