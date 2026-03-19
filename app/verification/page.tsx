"use client"

import { useState } from "react"
import { Search, Smartphone, ShieldCheck, Cpu, Calendar, CheckCircle2, Loader2, X, AlertCircle, Wifi, XCircle, Clock, AlertTriangle } from "lucide-react"
import { lookupIMEI, DEMO_IMEIS, type PhoneRecord, type PhoneStatus } from "../lib/phoneData"

function badgeCls(s?: PhoneStatus) {
  switch (s) {
    case "DÉDOUANÉ":     return "badge badge-ok"
    case "NON DÉDOUANÉ": return "badge badge-danger"
    case "BLOQUÉ":       return "badge badge-danger"
    case "EN ATTENTE":   return "badge badge-warn"
    default: return ""
  }
}

function statusConfig(s?: PhoneStatus) {
  switch (s) {
    case "DÉDOUANÉ":
      return { cls: "ok",     icon: <CheckCircle2 size={18} />, title: "Téléphone dédouané",     text: "Ce téléphone a bien été dédouané et peut utiliser les réseaux mauritaniens sans restriction." }
    case "NON DÉDOUANÉ":
      return { cls: "danger", icon: <XCircle size={18} />,     title: "Téléphone non dédouané", text: "Ce téléphone n'a pas été dédouané. Il risque d'être bloqué sur les réseaux mauritaniens." }
    case "BLOQUÉ":
      return { cls: "danger", icon: <XCircle size={18} />,     title: "Téléphone bloqué",        text: "Ce téléphone est bloqué et ne peut plus être utilisé sur les réseaux mauritaniens." }
    case "EN ATTENTE":
      return { cls: "warn",   icon: <Clock size={18} />,       title: "Dossier en attente",     text: "Le dossier de dédouanement est en cours de traitement par les services douaniers." }
    default: return null
  }
}

export default function VerificationPage() {
  const [imei, setImei]     = useState("")
  const [result, setResult] = useState<PhoneRecord | null | "not_found">(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState("")

  const verify = (val?: string) => {
    const q = (val ?? imei).replace(/\D/g, "")
    if (q.length < 8) { setError("Veuillez entrer au moins 8 chiffres."); return }
    if (val) setImei(val)
    setLoading(true); setError(""); setResult(null)

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
      {/* Inner header */}
      <div className="inner-hero">
        <div className="inner-hero-inner">
          <h1 className="inner-hero-title">Vérification du statut douanier</h1>
          <p className="inner-hero-sub">Vérifier si un téléphone est dédouané ou non</p>
        </div>
      </div>

      <section className="section-pad" style={{ background: "var(--slate-50)" }}>
        <div className="inner-md">

          {/* Demo chips */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--slate-400)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>
              Exemples à tester
            </p>
            <div className="demo-chips">
              {DEMO_IMEIS.map(d => {
                const isDed = d.label.includes("Dédouané") && !d.label.includes("Non")
                const isNok = d.label.includes("Non dédouané")
                const isBl  = d.label.includes("Bloqué")
                const isWait = d.label.includes("attente")
                return (
                  <button key={d.imei}
                    className={`demo-chip ${isDed ? "ok" : isNok || isBl ? "nok" : "warn"}`}
                    onClick={() => verify(d.imei)}>
                    {isDed ? <CheckCircle2 size={11} /> : isNok || isBl ? <XCircle size={11} /> : <Clock size={11} />}
                    {d.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="verify-card">
            <p style={{ fontSize: 14, color: "var(--slate-500)", marginBottom: 20, lineHeight: 1.7 }}>
              Entrez le numéro IMEI (15 chiffres) de votre téléphone.
              Composez <strong style={{ color: "var(--green-900)", fontFamily: "'Courier New', monospace" }}>*#06#</strong> pour l&apos;afficher.
            </p>

            {/* Input row */}
            <div className="imei-row">
              <input
                id="imei-input"
                type="text"
                inputMode="numeric"
                className="imei-field"
                value={imei}
                onChange={e => setImei(e.target.value.replace(/\D/g, ""))}
                placeholder="352000000000000"
                maxLength={15}
                onKeyDown={e => e.key === "Enter" && verify()}
              />
              <button
                id="verify-btn"
                className="btn-verify"
                onClick={() => verify()}
                disabled={loading || imei.length < 8}
              >
                {loading ? <Loader2 size={17} className="spin" /> : <Search size={17} />}
                {loading ? "Recherche…" : "Vérifier"}
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
                <button onClick={() => setError("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--red-600)", padding: 4 }}>
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Not found */}
            {result === "not_found" && (
              <div className="not-found-card animate-up">
                <div className="not-found-icon"><AlertTriangle size={28} /></div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: "var(--slate-700)", marginBottom: 4 }}>IMEI non reconnu</p>
                  <p style={{ fontSize: 13, color: "var(--slate-500)", lineHeight: 1.6 }}>
                    Ce numéro IMEI ne figure pas dans notre base de données. Essayez un des exemples ci-dessus ou contactez le support.
                  </p>
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

            {/* Rows */}
            <div className="result-rows">
              {[
                { icon: <Smartphone size={15} />,    label: "Marque",               value: data?.brand,        id: "r-brand",  isStatus: false },
                { icon: <Cpu size={15} />,           label: "Modèle",               value: data?.model,        id: "r-model",  isStatus: false },
                { icon: <ShieldCheck size={15} />,   label: "Statut douanier",      value: data?.status,       id: "r-status", isStatus: true  },
                { icon: <Calendar size={15} />,      label: "Redevance",            value: data?.redevance,    id: "r-redv",   isStatus: false },
                { icon: <CheckCircle2 size={15} />,  label: "Homologation modèle",  value: data?.homologation, id: "r-homo",   isStatus: false },
                { icon: <Wifi size={15} />,          label: "Réseau",               value: data?.network,      id: "r-net",    isStatus: false },
                { icon: <Calendar size={15} />,      label: "Date dédouanement",    value: data?.dateDouane,   id: "r-date",   isStatus: false },
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
          </div>

          {/* Info */}
          <div className="info-box" style={{ marginTop: 20 }}>
            <div className="info-box-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "var(--blue-600)" }}>À savoir</p>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#1e40af", lineHeight: 1.65 }}>
                Si votre téléphone n&apos;est pas dédouané, vous pouvez régulariser sa situation en soumettant une réclamation. Les téléphones non dédouanés seront bloqués sur les réseaux mauritaniens après la date limite fixée par les autorités.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
