'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/itineraire', label: 'Itinéraire' },
    { href: '/equipe', label: 'Équipe' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#0b1e2d]/95 backdrop-blur-sm border-b border-white/10"
      style={{ minHeight: 'var(--nav-height)' }}
    >
      <div className="container mx-auto px-6 py-4 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="text-xl font-archivo font-black text-white tracking-tight">
            La Jerricane
          </Link>
          <ul className="flex items-center gap-6">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-[#f88b29]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
