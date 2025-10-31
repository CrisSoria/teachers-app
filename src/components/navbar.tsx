"use client";

import { useState } from "react";
import { Home, Users, ClipboardCheck, Menu, X } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = "/"; // En tu app real, usa usePathname() de next/navigation

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/alumnos", label: "Alumnos", icon: Users },
    { href: "/asistencia", label: "Asistencia", icon: ClipboardCheck },
  ];

  const isActive = (href: string) => currentPath === href;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center px-4">
        {/* Logo */}
        <div className="mr-4 flex">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-semibold text-foreground">Mi App</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 ${
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile: Right side controls */}
        <div className="flex flex-1 items-center justify-end md:hidden space-x-2">
          <ModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md h-9 w-9 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Menú"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Absolute positioning para evitar desplazar contenido */}
      <div
        className={`md:hidden absolute top-14 left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`inline-flex items-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 ${
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Overlay para cerrar el menú al hacer click fuera */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 top-14 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};
