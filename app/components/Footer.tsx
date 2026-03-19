import Image from "next/image"
import Link from "next/link"

const LINKS = [
  { href: "/",             label: "Accueil" },
  { href: "/verification", label: "Vérification du statut douanier" },
  { href: "/reclamation",  label: "Les réclamations" },
  { href: "/multisim",     label: "Régularisation multi-SIM" },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Emblem */}
        <div className="footer-emblem">
          <Image src="/logo.webp" alt="Logo Mauritanie" width={80} height={80} style={{ objectFit: "contain" }} />
          <div>
            <div className="footer-arabic">الجمهورية الإسلامية الموريتانية</div>
            <div className="footer-arabic-sub">شرف - إخاء - عدل</div>
            <div className="footer-reph">RÉPUBLIQUE ISLAMIQUE DE MAURITANIE</div>
            <div className="footer-motto">Honneur · Fraternité · Justice</div>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="footer-links-title">Liens rapides</p>
          <div className="footer-rule" />
          <div className="footer-links">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="footer-link">
                <span style={{ color: "#059669" }}>•</span>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <hr className="footer-divider" />

        <p className="footer-copy">
          © 2026 <strong>Portail des Téléphones Mobiles</strong>. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
