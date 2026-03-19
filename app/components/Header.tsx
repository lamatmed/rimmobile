"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, ChevronRight } from "lucide-react"

const NAV_LINKS = [
  { href: "/",           label: "Accueil" },
  { href: "/verification", label: "Vérification du statut douanier" },
  { href: "/reclamation",  label: "Les réclamations" },
  { href: "/multisim",     label: "Régularisation multi-SIM" },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand */}
        <Link href="/" className="header-brand">
          <Image src="/logo.webp" alt="Logo Mauritanie" width={48} height={48} style={{ objectFit: "contain" }} priority />
          <div>
            <div className="header-brand-title">Portail des Téléphones Mobiles</div>
            <div className="header-brand-sub">République Islamique de Mauritanie</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link${pathname === l.href ? " active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Lang */}
        <div className="lang-toggle">
          <button className="lang-btn">العربية</button>
          <button className="lang-btn active">FR</button>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} color="#475569" /> : <Menu size={20} color="#475569" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`mobile-nav-link${pathname === l.href ? " active" : ""}`}
            onClick={() => setOpen(false)}
          >
            <ChevronRight size={14} color="#059669" />
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
