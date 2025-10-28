'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b bg-background relative top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          MyApp
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/alumnos">
            <Button variant="ghost">Alumnos</Button>
          </Link>
          <Link href="/asistencia">
            <Button variant="ghost">Asistencia</Button>
          </Link>
          <ModeToggle />
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col gap-2 p-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Home</Button>
            </Link>
            <Link href="/alumnos" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Alumnos</Button>
            </Link>
            <Link href="/asistencia" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Asistencia</Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      )}
    </header>
  )
}