import Link from 'next/link'
import { useState } from 'react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="w-full border-b bg-white/60 backdrop-blur-sm">
      <div className="container-max flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold" aria-label="Farchan Shah">
          Farchan Shah
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/pricing" className="text-sm">Pricing</Link>
          <Link href="/portfolio" className="text-sm">Portfolio</Link>
          <Link href="/contact" className="text-sm">Contact</Link>
          <Link href="/login" className="btn btn-outline ml-2">Login</Link>
          <Link href="/contact" className="btn btn-dark ml-2">Hire Me</Link>
        </nav>

        {/* mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded"
          aria-label="Toggle menu"
        >
          {open ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="p-4 flex flex-col gap-3">
            <Link href="/pricing">Pricing</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/login" className="btn btn-outline">Login</Link>
            <Link href="/contact" className="btn btn-dark">Hire Me</Link>
          </div>
        </div>
      )}
    </header>
  )
}
