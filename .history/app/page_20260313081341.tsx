"use client"

import { useState } from "react"
import { Search } from "lucide-react"

type PhoneData = {
  brand: string
  model: string
  status: string
  redevance: string
  homologation: string
}

export default function Page() {

  const [imei,setImei] = useState("")
  const [data,setData] = useState<PhoneData | null>(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  const verifyIMEI = async () => {

    setLoading(true)
    setError("")
    setData(null)

    const res = await fetch("/api/imei",{
      method:"POST",
      body:JSON.stringify({imei})
    })

    const result = await res.json()

    if(!res.ok){
      setError(result.message)
    }else{
      setData(result)
    }

    setLoading(false)
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#051b2a]">

      <div className="w-[420px] bg-[#071f33] p-6 rounded-xl border border-cyan-500/30 shadow-[0_0_40px_rgba(0,255,255,0.2)]">

        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-cyan-400">
            VÉRIFICATION
          </h1>

          <h2 className="text-2xl font-semibold text-white">
            IMEI
          </h2>

        </div>

        {/* input */}

        <div className="flex mb-6">

          <input
            value={imei}
            onChange={(e)=>setImei(e.target.value)}
            placeholder="Entrer IMEI"
            className="flex-1 p-3 bg-[#06263a] text-white rounded-l-lg border border-cyan-500/30 focus:outline-none"
          />

          <button
            onClick={verifyIMEI}
            className="bg-cyan-500 px-4 rounded-r-lg flex items-center gap-2 text-white hover:bg-cyan-400"
          >
            <Search size={18}/>
            Vérifier
          </button>

        </div>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (
          <p className="text-white text-center">
            Chargement...
          </p>
        )}

        {data && (

          <div className="space-y-4">

            <Info label="Marque" value={data.brand}/>
            <Info label="Modèle" value={data.model}/>
            <Info label="Statut Douane" value={data.status}/>
            <Info label="Date de Redevance" value={data.redevance}/>
            <Info label="Homologation Modèle" value={data.homologation}/>

          </div>

        )}

      </div>

    </div>
  )
}

function Info({label,value}:{label:string,value:string}){

  return(

    <div className="bg-[#06263a] border border-cyan-500/30 p-3 rounded-lg flex justify-between text-white">

      <span className="text-cyan-300">{label}</span>
      <span>{value || "-"}</span>

    </div>

  )
}
