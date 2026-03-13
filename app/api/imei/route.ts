import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { imei } = await req.json()

    if (!imei || imei.length < 8) {
      return NextResponse.json(
        { message: "IMEI non valide (min. 8 chiffres)" },
        { status: 400 }
      )
    }

    const apiToken = "NTEeGHG7AVtAsYNMVOfX";
    
    // Appel à l'API IMEIDB.xyz
    const res = await fetch(`https://imeidb.xyz/api/imei/${imei}?token=${apiToken}`);
    
    if (!res.ok) {
        return NextResponse.json(
            { message: "IMEI non trouvé mais TAC reconnu" },
            { status: 404 }
        )
    }

    const data = await res.json();

    // Vérification si l'API retourne une erreur dans le corps JSON
    if (data.status === "error" || !data.brand) {
        return NextResponse.json(
            { message: data.message || "IMEI non trouvé mais TAC reconnu" },
            { status: 404 }
        )
    }

    // Retour des données réelles formatées pour l'UI
    return NextResponse.json({
      brand: data.brand || "—",
      model: data.model || "—",
      status: "DÉDOUANÉ", // Valeur simulée car dépend de votre base douane
      redevance: "PAYÉ (2025)", // Valeur simulée
      homologation: "RECONNU" // Valeur simulée
    })

  } catch (e) {
    console.error("Erreur API IMEI:", e);
    return NextResponse.json(
      { message: "Erreur de connexion à la base de données" },
      { status: 500 }
    )
  }
}