import Link from 'next/link'
export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">Farchan Shah</Link>
        <nav className="space-x-4">
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  )
}
