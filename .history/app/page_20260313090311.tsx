/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Search, Smartphone, ShieldCheck, Cpu, Calendar, CheckCircle, X, Loader2 } from "lucide-react"

type PhoneData = {
  brand: string
  model: string
  status: string
  redevance: string
  homologation: string
}

export default function Page() {
  const [imei, setImei] = useState("")
  const [data, setData] = useState<PhoneData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const verifyIMEI = async () => {
    if (!imei) return
    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch("/api/imei", {
        method: "POST",
        body: JSON.stringify({ imei })
      })
      const result = await res.json()
      if (!res.ok) {
        setError(result.message || "IMEI non trouvé mais TAC reconnu")
      } else {
        setData(result)
      }
    } catch (err) {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black overflow-hidden font-inter text-white">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("/bg.png")', backgroundSize: 'cover' }} />
      <div className="grid-bg" />

      {/* Header */}
      <header className="relative z-20 w-full header-line bg-black/40 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-cyber-blue leading-tight tracking-tighter">MOBI</span>
          <span className="text-[10px] font-bold text-cyber-cyan leading-tight tracking-widest border-t border-cyber-cyan/50 mt-1">SCAN</span>
        </div>
        <h1 className="text-2xl font-orbitron font-bold tracking-[0.4em] text-white">PORTAIL</h1>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-cyber-blue leading-tight tracking-tighter">MOBI</span>
          <span className="text-[10px] font-bold text-cyber-cyan leading-tight tracking-widest border-t border-cyber-cyan/50 mt-1">SCAN</span>
        </div>
      </header>

      {/* Error Alert (Top) */}
      {error && (
        <div className="fixed top-16 left-0 w-full z-50 px-4 animate-in fade-in slide-in-from-top duration-300">
          <div className="bg-red-950/80 backdrop-blur-md border border-red-500/40 rounded-lg p-3 flex items-center gap-3 shadow-lg">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/40 shrink-0">
              <X className="text-red-500" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-red-400 font-bold text-[10px] uppercase">IMEI: {imei}</p>
              <p className="text-red-200 text-xs truncate">{error}</p>
            </div>
            <button onClick={() => setError("")} className="text-red-500/60 p-1">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Hero / Main Content */}
      <section className="relative z-10 flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-[420px] cyber-panel rounded-3xl p-6 relative">

          {/* Internal watermark pattern - simulated */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-8xl font-black rotate-[-20deg]">IMEI</span>
          </div>

          {/* Title Area */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-cyber-cyan/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-cyber-cyan flex items-center justify-center bg-cyber-cyan/5">
                  <CheckCircle className="text-cyber-cyan" size={24} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-orbitron font-bold tracking-wider leading-tight">VÉRIFICATION</h2>
              <h3 className="text-xl font-orbitron font-semibold tracking-[0.3em] text-cyber-cyan">IMEI</h3>
            </div>
          </div>

          {/* Input Box */}
          <div className="flex bg-black/40 border border-cyber-cyan/30 rounded-2xl overflow-hidden mb-6 focus-within:border-cyber-cyan transition-all">
            <input
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              placeholder="351200719051592"
              className="flex-1 p-4 bg-transparent outline-none font-mono text-sm tracking-widest placeholder-white/20"
            />
            <button
              onClick={verifyIMEI}
              disabled={loading}
              className="btn-cyber px-5 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
              <span>{loading ? "Chargem..." : "Vérifier"}</span>
            </button>
          </div>

          {/* Table / List */}
          <div className="space-y-3">
            <InfoRow icon={<Smartphone size={16} />} label="Marque" value={data?.brand} />
            <InfoRow icon={<Cpu size={16} />} label="Modèle" value={data?.model} />
            <InfoRow icon={<ShieldCheck size={16} />} label="Statut Douane" value={data?.status} />
            <InfoRow icon={<Calendar size={16} />} label="Date de Redevance" value={data?.redevance} />
            <InfoRow icon={<ShieldCheck size={16} />} label="Homologation Modèle" value={data?.homologation} />
          </div>
        </div>

        {/* Floating Phone Illustration */}
        <div className="mt-8 relative z-10">
          <img
            src="/phone.png"
            alt="phone"
            className="w-40 h-auto opacity-80"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0, 242, 255, 0.4))' }}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 w-full py-4 px-4 bg-black/80 backdrop-blur-md text-center border-t border-cyber-cyan/10">
        <p className="text-[10px] font-orbitron font-bold tracking-[0.2em] text-cyber-cyan">
          © 2025 - <span className="text-white">INFOCOM INTERNATIONAL</span> -
        </p>
        <p className="text-[10px] font-orbitron font-bold tracking-[0.2em] text-white/60 mt-1">
          TOUS DROITS RÉSERVÉS
        </p>
      </footer>
    </main>
  )
}

function InfoRow({ icon, label, value }: { icon: any, label: string, value?: string }) {
  return (
    <div className="info-card rounded-xl p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-cyber-cyan shrink-0">
          {icon}
        </div>
        <span className="text-[11px] font-semibold tracking-wider text-white/90">{label} :</span>
      </div>
      <span className="text-xs font-bold text-white/60">{value || "─"}</span>
    </div>
  )
}
