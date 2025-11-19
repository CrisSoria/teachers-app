import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <RegisterForm />
    </section>
  );
}
