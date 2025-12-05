import Link from "next/link";
import { Text } from "@/components/ui/text";
import { Logo, LogoText } from "./logo";
const links = [
  {
    title: "Inicio",
    href: "/",
  },
  {
    title: "Ayuda",
    href: "#",
  },
  {
    title: "Contacto",
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/40 py-12">
      {/* Background pattern for light theme */}
      <div className="absolute inset-0 bg-white bg-[url('/assets/aztec.svg')] opacity-40 dark:hidden" />

      {/* Background pattern for dark theme */}
      <div className="absolute inset-0 hidden bg-[url('/assets/aztec.svg')] opacity-20 invert dark:block" />

      {/* Semi-transparent overlay for better text visibility */}
      <div className="absolute inset-0 bg-linear-to-b from-background/80 to-background/60 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-center md:justify-between gap-6">
          <div className="flex items-center gap-3 md:order-first">
            <Logo />
            <LogoText className="text-5xl" />
          </div>
          <div className="order-first flex flex-wrap justify-center content-center gap-6 text-sm md:order-last">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-secondary block duration-150 text-base font-semibold"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
