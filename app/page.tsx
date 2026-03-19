"use client"

import Link from "next/link"
import { ChevronRight, Smartphone, ShieldCheck, FileText, Wifi, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react"
import { useState } from "react"
import { Loader2, Search, X, AlertCircle, Cpu, Calendar } from "lucide-react"
import { lookupIMEI, DEMO_IMEIS, type PhoneRecord, type PhoneStatus } from "./lib/phoneData"

/* ── Phone SVG illustration ─────────────────── */
function PhoneSVG() {
  return (
    <div className="float" style={{ position: "relative", width: 154, height: 220 }}>
      <svg width="154" height="210" viewBox="0 0 154 210" fill="none">
        <rect x="7" y="3" width="140" height="204" rx="22" fill="#031e1e" opacity=".95" />
        <rect x="11" y="7" width="132" height="196" rx="19" fill="#065f46" />
        <rect x="18" y="36" width="118" height="148" rx="7" fill="#042f2e" />
        <g transform="translate(44,66)">
          <path d="M33 5L60 15L60 36C60 52 46 64 33 68C20 64 7 52 7 36L7 15Z" fill="none" stroke="#34d399" strokeWidth="2.8" />
          <path d="M20 36L29 45L46 28" stroke="#34d399" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <rect x="52" y="12" width="50" height="11" rx="5.5" fill="#031e1e" />
        <circle cx="77" cy="17.5" r="2.8" fill="#065f46" />
        <rect x="57" y="194" width="40" height="4" rx="2" fill="#059669" opacity=".35" />
        <rect x="3" y="70" width="4" height="26" rx="2" fill="#021412" />
        <rect x="3" y="104" width="4" height="18" rx="2" fill="#021412" />
        <rect x="147" y="78" width="4" height="30" rx="2" fill="#021412" />
        <ellipse cx="77" cy="208" rx="52" ry="6.5" fill="#059669" opacity=".1" />
      </svg>
      <div style={{ position: "absolute", top: "27%", right: "-26px", background: "rgba(5,150,105,.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(52,211,153,.3)", borderRadius: 10, padding: "7px 12px", display: "flex", alignItems: "center", gap: 5 }}>
        <CheckCircle2 size={12} color="#34d399" />
        <span style={{ color: "#34d399", fontSize: 11, fontWeight: 700 }}>VÉRIFIÉ</span>
      </div>
    </div>
  )
}

/* ── Status config ───────────────────────────── */
function statusConfig(s?: PhoneStatus) {
  switch (s) {
    case "DÉDOUANÉ":     return { cls: "ok",     icon: <CheckCircle2  size={18} />, title: "Téléphone dédouané",     text: "Ce téléphone a bien été dédouané et peut utiliser les réseaux mauritaniens." }
    case "NON DÉDOUANÉ": return { cls: "danger",  icon: <XCircle      size={18} />, title: "Téléphone non dédouané", text: "Ce téléphone n'a pas été dédouané. Il risque d'être bloqué sur les réseaux mauritaniens." }
    case "BLOQUÉ":       return { cls: "danger",  icon: <XCircle      size={18} />, title: "Téléphone bloqué",        text: "Ce téléphone est bloqué et ne peut pas utiliser les réseaux mauritaniens." }
    case "EN ATTENTE":   return { cls: "warn",    icon: <Clock        size={18} />, title: "Dossier en attente",     text: "Le dossier de dédouanement est en cours de traitement par les services douaniers." }
    default:             return null
  }
}

function badgeCls(s?: PhoneStatus) {
  switch (s) {
    case "DÉDOUANÉ":     return "badge badge-ok"
    case "NON DÉDOUANÉ": return "badge badge-danger"
    case "BLOQUÉ":       return "badge badge-danger"
    case "EN ATTENTE":   return "badge badge-warn"
    default:             return ""
  }
}

/* ── Home Page ───────────────────────────────── */
export default function HomePage() {
  const [imei, setImei] = useState("")
  const [result, setResult] = useState<PhoneRecord | null | "not_found">(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [tab, setTab] = useState<"verify" | "services">("verify")

  const verify = (val?: string) => {
    const q = (val ?? imei).replace(/\D/g, "")
    if (q.length < 8) { setError("Veuillez entrer au moins 8 chiffres."); return }
    if (val) setImei(val)
    setLoading(true); setError(""); setResult(null)

    // Simulation légère (50ms) pour l'effet visuel
    setTimeout(() => {
      const found = lookupIMEI(q)
      setResult(found ?? "not_found")
      setLoading(false)
    }, 500)
  }

  const data = result && result !== "not_found" ? result : null
  const sc   = statusConfig(data?.status)

  return (
    <>
      {/* ── HERO ─────────────────────────── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <ShieldCheck size={12} />
              Portail officiel — République Islamique de Mauritanie
            </div>
            <h1 className="hero-title">Portail des Téléphones Mobiles</h1>
            <p className="hero-subtitle">
              Vérifiez la situation douanière, soumettez une réclamation ou régularisez vos téléphones multi-SIM.
            </p>
            <div className="hero-actions">
              <Link href="/reclamation" className="btn-hero-primary">
                Soumettre une réclamation <ChevronRight size={17} />
              </Link>
              <Link href="/verification" className="btn-hero-outline">
                Vérifier un IMEI
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">+120k</span>
                <span className="hero-stat-label">Téléphones vérifiés</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">3</span>
                <span className="hero-stat-label">Services disponibles</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">24/7</span>
                <span className="hero-stat-label">Accès en ligne</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <PhoneSVG />
          </div>
        </div>
      </section>

      {/* ── VERIFY SECTION ───────────────── */}
      <section style={{ background: "var(--slate-50)", padding: "56px 24px", borderBottom: "1px solid var(--slate-200)" }}>
        <div className="inner-md">
          <div className="section-header">
            <h2 className="section-title">Vérification du statut douanier</h2>
            <div className="section-rule" />
            <p className="section-sub">Entrez le numéro IMEI de votre téléphone pour vérifier son statut douanier</p>
          </div>

          <div className="verify-card">
            <div className="tab-bar">
              <button className={`tab-btn${tab === "verify" ? " active" : ""}`} onClick={() => setTab("verify")}>Vérifier un IMEI</button>
              <button className={`tab-btn${tab === "services" ? " active" : ""}`} onClick={() => setTab("services")}>Nos services</button>
            </div>

            {tab === "verify" && (
              <>
                {/* Demo chips */}
                <div style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 12, color: "var(--slate-400)", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Tester avec un exemple</p>
                  <div className="demo-chips">
                    {DEMO_IMEIS.map(d => {
                      const isDed = d.label.includes("Dédouané") && !d.label.includes("Non")
                      const isNok = d.label.includes("Non dédouané")
                      const isBl  = d.label.includes("Bloqué")
                      return (
                        <button key={d.imei} className={`demo-chip ${isDed ? "ok" : isNok ? "nok" : isBl ? "nok" : "warn"}`}
                          onClick={() => verify(d.imei)}>
                          {isDed ? <CheckCircle2 size={11} /> : isNok || isBl ? <XCircle size={11} /> : <Clock size={11} />}
                          {d.label.split(" — ")[0]}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Input */}
                <div className="imei-row">
                  <input id="imei-input" type="text" inputMode="numeric" className="imei-field" value={imei}
                    onChange={e => setImei(e.target.value.replace(/\D/g, ""))}
                    placeholder="352000000000000" maxLength={15}
                    onKeyDown={e => e.key === "Enter" && verify()} />
                  <button id="verify-btn" className="btn-verify" onClick={() => verify()} disabled={loading || imei.length < 8}>
                    {loading ? <Loader2 size={17} className="spin" /> : <Search size={17} />}
                    {loading ? "..." : "Vérifier"}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="alert-error animate-up">
                    <div className="alert-error-icon"><AlertCircle size={17} /></div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 12, color: "var(--red-600)" }}>Erreur</p>
                      <p style={{ margin: "2px 0 0", fontSize: 13, color: "#7f1d1d" }}>{error}</p>
                    </div>
                    <button onClick={() => setError("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--red-600)", padding: 4 }}><X size={14} /></button>
                  </div>
                )}

                {/* Not found */}
                {result === "not_found" && (
                  <div className="not-found-card animate-up">
                    <div className="not-found-icon"><AlertTriangle size={28} /></div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15, color: "var(--slate-700)", marginBottom: 4 }}>IMEI non reconnu</p>
                      <p style={{ fontSize: 13, color: "var(--slate-500)" }}>Ce numéro IMEI n&apos;est pas dans notre base de données. Essayez un des exemples ci-dessus.</p>
                    </div>
                  </div>
                )}

                {/* Status banner */}
                {sc && (
                  <div className={`status-banner ${sc.cls} animate-up`} style={{ marginBottom: 16 }}>
                    <div className="status-banner-icon">{sc.icon}</div>
                    <div>
                      <div className="status-banner-title">{sc.title}</div>
                      <div className="status-banner-text">{sc.text}</div>
                    </div>
                  </div>
                )}

                {/* Results */}
                <div className="result-rows">
                  {[
                    { icon: <Smartphone size={15} />, label: "Marque",               value: data?.brand,        id: "r-brand" },
                    { icon: <Cpu size={15} />,        label: "Modèle",               value: data?.model,        id: "r-model" },
                    { icon: <ShieldCheck size={15} />,label: "Statut douanier",      value: data?.status,       id: "r-status",  isStatus: true },
                    { icon: <Calendar size={15} />,   label: "Redevance",            value: data?.redevance,    id: "r-redv"  },
                    { icon: <CheckCircle2 size={15} />,label:"Homologation modèle",  value: data?.homologation, id: "r-homo"  },
                    { icon: <Wifi size={15} />,       label: "Réseau",               value: data?.network,      id: "r-net"   },
                  ].map(row => (
                    <div key={row.id} id={row.id} className={`result-row${row.value ? " filled" : ""}`}>
                      <div className="result-row-left">
                        <div className={`result-icon${row.value ? "" : " empty"}`}>{row.icon}</div>
                        <span className="result-label">{row.label}</span>
                      </div>
                      {row.isStatus && row.value
                        ? <span className={badgeCls(row.value as PhoneStatus)}>{row.value}</span>
                        : <span className={`result-value${row.value ? "" : " placeholder"}`}>{row.value || "—"}</span>
                      }
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === "services" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: <ShieldCheck size={17} />, title: "Vérification douanière",    desc: "Vérifier si un téléphone est dédouané ou non",     href: "/verification" },
                  { icon: <FileText size={17} />,    title: "Les réclamations",           desc: "Soumettre et suivre une réclamation",               href: "/reclamation" },
                  { icon: <Wifi size={17} />,        title: "Régularisation multi-SIM",  desc: "Ajouter le second IMEI pour les double SIM",       href: "/multisim" },
                ].map((s, i) => (
                  <Link key={i} href={s.href}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "var(--slate-50)", borderRadius: 14, border: "1.5px solid var(--slate-200)", textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--green-500)"; (e.currentTarget as HTMLElement).style.background = "var(--green-50)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--slate-200)"; (e.currentTarget as HTMLElement).style.background = "var(--slate-50)"; }}
                  >
                    <div className="service-icon" style={{ width: 42, height: 42, borderRadius: 11 }}>{s.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--slate-900)" }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 2 }}>{s.desc}</div>
                    </div>
                    <ChevronRight size={15} color="var(--slate-400)" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────── */}
      <section className="section-pad" style={{ background: "var(--slate-50)" }}>
        <div className="inner">
          <div className="section-header">
            <h2 className="section-title">Services</h2>
            <div className="section-rule" />
          </div>
          <div className="services-grid">
            <Link href="/verification" className="service-card">
              <div className="service-icon"><Smartphone size={26} /></div>
              <div>
                <h3 className="service-title">Vérification du statut douanier</h3>
                <p className="service-desc">Vérifier si un téléphone est dédouané ou non</p>
              </div>
              <span className="btn-green">Vérifier le statut douanier <ChevronRight size={14} /></span>
            </Link>
            <Link href="/reclamation" className="service-card">
              <div className="service-icon"><FileText size={26} /></div>
              <div>
                <h3 className="service-title">Les réclamations</h3>
                <p className="service-desc">Soumettre et suivre une réclamation</p>
              </div>
              <span className="btn-green">Soumettre une réclamation <ChevronRight size={14} /></span>
            </Link>
            <Link href="/multisim" className="service-card">
              <div className="service-icon"><Wifi size={26} /></div>
              <div>
                <h3 className="service-title">Régularisation multi-SIM</h3>
                <p className="service-desc">Ajouter le second IMEI pour les téléphones double SIM</p>
              </div>
              <span className="btn-green">Demande de régularisation <ChevronRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW TO ───────────────────────── */}
      <section className="how-section section-pad">
        <div className="inner-md" style={{ textAlign: "center" }}>
          <h2 className="section-title">Comment trouver l&apos;IMEI</h2>
          <div className="section-rule" />
          <p style={{ marginTop: 14, fontSize: 15, color: "var(--slate-500)", lineHeight: 1.8 }}>
            Pour afficher le numéro IMEI de votre téléphone, composez{" "}
            <strong style={{ color: "var(--green-900)" }}>*#06#</strong> sur le clavier d&apos;appel.
            L&apos;écran IMEI s&apos;affichera. Vous pouvez aussi retrouver l&apos;IMEI sur la boîte d&apos;origine.
          </p>
          <div className="ussd-box">*#06#</div>
          <div className="steps-grid">
            {[
              { n: "1", t: "Ouvrez l'application téléphone" },
              { n: "2", t: "Composez *#06# sur le clavier" },
              { n: "3", t: "Votre IMEI s'affiche à l'écran" },
            ].map(s => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <p className="step-text">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
