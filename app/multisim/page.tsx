"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"

export default function MultisimPage() {
  const [form, setForm] = useState({ phone: "", imei1: "", imei2: "", nni: "" })
  const [submitted, setSubmitted] = useState(false)
  const [ref, setRef] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value.replace(/\D/g, "") }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (form.phone.length !== 8)  e.phone = "Le numéro doit faire exactement 8 chiffres"
    if (form.imei1.length !== 15) e.imei1 = "L'IMEI doit faire exactement 15 chiffres"
    if (form.imei2.length !== 15) e.imei2 = "L'IMEI doit faire exactement 15 chiffres"
    if (form.imei1 && form.imei2 && form.imei1 === form.imei2) e.imei2 = "Les deux IMEI doivent être différents"
    if (form.nni && form.nni.length !== 10) e.nni = "Le NNI doit faire exactement 10 chiffres"
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    const r = "SIM-" + Math.random().toString(36).slice(2, 5).toUpperCase() + Math.floor(1000 + Math.random() * 9000)
    setRef(r)
    setSubmitted(true)
  }

  return (
    <>
      <div className="inner-hero">
        <div className="inner-hero-inner">
          <h1 className="inner-hero-title">Régularisation multi-SIM</h1>
          <p className="inner-hero-sub">Ajouter le second IMEI pour les téléphones double SIM</p>
        </div>
      </div>

      <section className="section-pad" style={{ background: "var(--slate-50)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* Info banner */}
          <div className="info-box" style={{ marginBottom: 24 }}>
            <div className="info-box-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "var(--blue-600)" }}>Information</p>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#1e40af", lineHeight: 1.65 }}>
                Cette demande est réservée aux téléphones double SIM. Vous devrez fournir les deux numéros IMEI de votre appareil (composez <strong>*#06#</strong> pour les afficher).
              </p>
            </div>
          </div>

          <div className="verify-card">
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* Phone */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="ms-phone">Numéro de téléphone</label>
                  <input id="ms-phone" type="tel" inputMode="numeric" className="input-field"
                    value={form.phone} onChange={set("phone")}
                    placeholder="Ex : 22xxxxxx" maxLength={8} required />
                  {errors.phone && <p style={{ margin: "5px 0 0", fontSize: 12, color: "var(--red-600)" }}>{errors.phone}</p>}
                </div>

                {/* NNI */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="ms-nni">
                    NNI <span className="optional">(optionnel — 10 chiffres)</span>
                  </label>
                  <input id="ms-nni" type="text" inputMode="numeric" className="input-field"
                    value={form.nni} onChange={set("nni")}
                    placeholder="10 chiffres" maxLength={10} />
                  {errors.nni && <p style={{ margin: "5px 0 0", fontSize: 12, color: "var(--red-600)" }}>{errors.nni}</p>}
                </div>

                {/* IMEI 1 & 2 */}
                <div>
                  <label className="form-label">Numéros IMEI</label>
                  <div className="imei-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--slate-500)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em" }}>IMEI 1</div>
                      <input id="ms-imei1" type="text" inputMode="numeric"
                        className="input-field"
                        style={{ fontFamily: "'Courier New', monospace", letterSpacing: ".07em" }}
                        value={form.imei1} onChange={set("imei1")}
                        placeholder="15 chiffres" maxLength={15} required />
                      {errors.imei1 && <p style={{ margin: "5px 0 0", fontSize: 12, color: "var(--red-600)" }}>{errors.imei1}</p>}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--slate-500)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em" }}>IMEI 2</div>
                      <input id="ms-imei2" type="text" inputMode="numeric"
                        className="input-field"
                        style={{ fontFamily: "'Courier New', monospace", letterSpacing: ".07em" }}
                        value={form.imei2} onChange={set("imei2")}
                        placeholder="15 chiffres" maxLength={15} required />
                      {errors.imei2 && <p style={{ margin: "5px 0 0", fontSize: 12, color: "var(--red-600)" }}>{errors.imei2}</p>}
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-green">
                  <Send size={15} />
                  Soumettre la demande
                </button>
              </form>
            ) : (
              <div className="success-state animate-up">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={36} color="var(--green-600)" />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: "var(--green-900)" }}>Demande soumise !</h3>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--slate-500)" }}>Votre demande de régularisation multi-SIM a été enregistrée avec succès.</p>
                </div>
                <div className="tracking-box">
                  <p style={{ margin: "0 0 5px", fontSize: 12, color: "#166534", fontWeight: 600 }}>Numéro de référence</p>
                  <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--green-600)", letterSpacing: ".12em" }}>{ref}</p>
                  <p style={{ margin: "7px 0 0", fontSize: 12, color: "#166534" }}>Délai de traitement estimé : 3 à 7 jours ouvrables</p>
                </div>

                {/* Summary */}
                <div style={{ width: "100%", background: "var(--slate-50)", border: "1.5px solid var(--slate-200)", borderRadius: 14, padding: "16px 18px" }}>
                  <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: "var(--slate-700)" }}>Récapitulatif</p>
                  {[
                    { l: "Téléphone", v: form.phone },
                    { l: "IMEI 1",    v: form.imei1 },
                    { l: "IMEI 2",    v: form.imei2 },
                    ...(form.nni ? [{ l: "NNI", v: form.nni }] : []),
                  ].map(r => (
                    <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: "1px solid var(--slate-200)" }}>
                      <span style={{ fontSize: 13, color: "var(--slate-500)" }}>{r.l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, fontFamily: r.l.includes("IMEI") ? "'Courier New', monospace" : "inherit" }}>{r.v}</span>
                    </div>
                  ))}
                </div>

                <button className="btn-outline-green" style={{ width: "100%" }}
                  onClick={() => { setSubmitted(false); setForm({ phone: "", imei1: "", imei2: "", nni: "" }); }}>
                  Nouvelle demande
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
