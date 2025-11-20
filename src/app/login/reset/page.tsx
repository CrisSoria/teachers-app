import { ChangePassForm } from "@/features/auth/components/change-pass-form";

export default function ForgotPasswordPage() {
  return (
    <section className="flex bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <ChangePassForm />
    </section>
  );
}
