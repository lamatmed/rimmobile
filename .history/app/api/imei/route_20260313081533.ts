import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { imei } = await req.json()

  if(!imei){
    return NextResponse.json(
      {message:"IMEI manquant"},
      {status:400}
    )
  }

  try{

    const res = await fetch(
      `https://api.imeicheck.net/v1/check/${imei}`
    )

    const data = await res.json()

    return NextResponse.json({
      brand: data.brand || "Inconnu",
      model: data.model || "Inconnu",
      status: "Non vérifié",
      redevance: "—",
      homologation: "—"
    })

  }catch(e){

    return NextResponse.json(
      {message:"Erreur API"},
      {status:500}
    )

  }
}