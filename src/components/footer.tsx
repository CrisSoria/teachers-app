import Link from "next/link";
import { Logo, LogoText } from "./logo";
import { Separator } from "@/components/ui/separator";
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
    <footer className="mt-auto py-12 bg-secondary">
      <div className="mx-auto max-w-5xl px-6">
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
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
