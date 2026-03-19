"use client"

import { useState } from "react"
import { Send, CheckCircle2, Search, Upload, X } from "lucide-react"
import { useRef } from "react"

export default function ReclamationPage() {
  const [tab, setTab] = useState<"submit" | "track">("submit")

  /* Submit */
  const [phone, setPhone]     = useState("")
  const [nni, setNni]         = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile]       = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [trackingNum, setTrackingNum] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  /* Track */
  const [trackId, setTrackId]   = useState("")
  const [tracked, setTracked]   = useState(false)
  const [trackError, setTrackError] = useState("")

  /* Fake tracking DB */
  const FAKE_REFS = ["REC-AB1234", "REC-CD5678", "REC-EF9012"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !message) return
    const ref = "REC-" + Math.random().toString(36).slice(2, 6).toUpperCase() + Math.floor(1000 + Math.random() * 9000)
    setTrackingNum(ref)
    setSubmitted(true)
  }

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setTrackError("")
    if (!trackId.trim()) return
    // Accept any REC-XXXXX or our fake refs
    if (trackId.toUpperCase().startsWith("REC-") && trackId.length >= 7) {
      setTracked(true)
    } else {
      setTrackError("Numéro de suivi invalide. Format attendu : REC-XXXXXX")
    }
  }

  return (
    <>
      <div className="inner-hero">
        <div className="inner-hero-inner">
          <h1 className="inner-hero-title">Les réclamations</h1>
          <p className="inner-hero-sub">Soumettre et suivre une réclamation</p>
        </div>
      </div>

      <section className="section-pad" style={{ background: "var(--slate-50)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 0px" }}>

          <div className="verify-card">
            {/* Tabs */}
            <div className="tab-bar">
              <button className={`tab-btn${tab === "submit" ? " active" : ""}`}
                onClick={() => { setTab("submit"); setTracked(false); setTrackError("") }}>
                Soumettre une réclamation
              </button>
              <button className={`tab-btn${tab === "track" ? " active" : ""}`}
                onClick={() => { setTab("track"); setSubmitted(false) }}>
                Suivre une réclamation
              </button>
            </div>

            {/* ── SUBMIT FORM ── */}
            {tab === "submit" && !submitted && (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="rec-phone">Numéro de téléphone</label>
                  <input id="rec-phone" type="tel" inputMode="numeric" className="input-field"
                    value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Ex : 22xxxxxx" maxLength={8} required />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="rec-nni">
                    NNI <span className="optional">(optionnel — 10 chiffres)</span>
                  </label>
                  <input id="rec-nni" type="text" inputMode="numeric" className="input-field"
                    value={nni} onChange={e => setNni(e.target.value.replace(/\D/g, ""))}
                    placeholder="10 chiffres" maxLength={10} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="rec-msg">Message</label>
                  <textarea id="rec-msg" className="input-field"
                    value={message} onChange={e => setMessage(e.target.value.slice(0, 10000))}
                    placeholder="Décrivez votre réclamation en détail…" required />
                  <div className="char-counter">{message.length} / 10 000 caractères restants</div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">
                    Pièce jointe <span className="optional">Optionnel — JPEG, PNG, GIF ou WebP (5 Mo max)</span>
                  </label>
                  <div className="file-drop" onClick={() => fileRef.current?.click()}
                    style={file ? { borderColor: "var(--green-500)", background: "var(--green-50)" } : {}}>
                    <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp"
                      style={{ display: "none" }} onChange={e => setFile(e.target.files?.[0] || null)} />
                    {file ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <CheckCircle2 size={20} color="var(--green-600)" />
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--green-600)" }}>{file.name}</span>
                        <button type="button" onClick={ev => { ev.stopPropagation(); setFile(null) }}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--red-600)", padding: 2 }}>
                          <X size={15} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="file-drop-icon"><Upload size={22} /></div>
                        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--slate-600)" }}>Choisir un fichier</span>
                        <span style={{ fontSize: 12, color: "var(--slate-400)" }}>ou glisser-déposer ici</span>
                      </>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn-green">
                  <Send size={15} />
                  Envoyer la réclamation
                </button>
              </form>
            )}

            {/* ── SUCCESS ── */}
            {tab === "submit" && submitted && (
              <div className="success-state animate-up">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={36} color="var(--green-600)" />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: "var(--green-900)" }}>Réclamation envoyée !</h3>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--slate-500)" }}>Votre réclamation a été enregistrée avec succès.</p>
                </div>
                <div className="tracking-box">
                  <p style={{ margin: "0 0 5px", fontSize: 12, color: "#166534", fontWeight: 600 }}>Numéro de suivi</p>
                  <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--green-600)", letterSpacing: ".12em" }}>{trackingNum}</p>
                  <p style={{ margin: "7px 0 0", fontSize: 12, color: "#166534" }}>Conservez ce numéro pour suivre l&apos;évolution de votre dossier</p>
                </div>
                <button className="btn-outline-green" style={{ width: "100%" }}
                  onClick={() => { setPhone(""); setNni(""); setMessage(""); setFile(null); setSubmitted(false); setTrackingNum("") }}>
                  Soumettre une autre réclamation
                </button>
              </div>
            )}

            {/* ── TRACK FORM ── */}
            {tab === "track" && !tracked && (
              <form onSubmit={handleTrack}>
                <div className="form-group">
                  <label className="form-label" htmlFor="track-id">Numéro de suivi</label>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input id="track-id" type="text" className="input-field"
                      value={trackId} onChange={e => setTrackId(e.target.value.toUpperCase())}
                      placeholder="Numéro de réclamation (ex. REC-AB1234)" required
                      style={{ flex: 1, minWidth: 200 }} />
                    <button type="submit" className="btn-verify" style={{ flexShrink: 0 }}>
                      <Search size={16} />
                      Consulter le statut
                    </button>
                  </div>
                  {trackError && (
                    <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--red-600)", fontWeight: 500 }}>{trackError}</p>
                  )}
                </div>
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontSize: 12, color: "var(--slate-400)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>
                    Exemples valides
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {FAKE_REFS.map(ref => (
                      <button key={ref} type="button"
                        className="demo-chip ok"
                        onClick={() => setTrackId(ref)}>
                        {ref}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            )}

            {/* ── TRACK RESULT ── */}
            {tab === "track" && tracked && (
              <div className="animate-up">
                <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: 14, padding: "20px 22px", marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                    <div>
                      <p style={{ margin: "0 0 3px", fontSize: 11, fontWeight: 700, color: "#9a3412", textTransform: "uppercase", letterSpacing: ".07em" }}>Réclamation</p>
                      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--orange-600)" }}>{trackId}</p>
                    </div>
                    <span style={{ background: "#fed7aa", color: "#9a3412", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999 }}>
                      En cours de traitement
                    </span>
                  </div>
                  <hr style={{ border: "none", borderTop: "1px solid #fed7aa", margin: "0 0 14px" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { label: "Date de soumission",  value: "20/03/2026" },
                      { label: "Service traitant",    value: "Direction des Douanes — Nouakchott" },
                      { label: "Délai estimé",        value: "5 à 10 jours ouvrables" },
                    ].map(r => (
                      <div key={r.label} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
                        <span style={{ fontSize: 13, color: "#9a3412", fontWeight: 500 }}>{r.label}</span>
                        <span style={{ fontSize: 13, color: "#431407", fontWeight: 700 }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: "14px 0 0", fontSize: 13, color: "#9a3412", lineHeight: 1.65 }}>
                    Votre réclamation est en cours de traitement par nos équipes. Vous serez notifié par SMS dès qu&apos;une décision sera prise.
                  </p>
                </div>
                <button className="btn-outline-green" style={{ width: "100%" }}
                  onClick={() => { setTracked(false); setTrackId(""); }}>
                  Rechercher un autre numéro
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
