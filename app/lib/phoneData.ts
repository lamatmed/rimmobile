// Base de données locale de téléphones (simulation)
// Les IMEI sont préfixés par TAC (8 premiers chiffres) pour la recherche

export type PhoneStatus = "DÉDOUANÉ" | "NON DÉDOUANÉ" | "EN ATTENTE" | "BLOQUÉ"

export type PhoneRecord = {
  tac: string          // 8 premiers chiffres de l'IMEI
  brand: string
  model: string
  status: PhoneStatus
  redevance: string
  homologation: string
  dateDouane?: string
  network?: string
}

export const PHONE_DB: PhoneRecord[] = [
  // ── SAMSUNG dédouanés ────────────────────────────────
  { tac: "35643208", brand: "Samsung", model: "Galaxy S24 Ultra",   status: "DÉDOUANÉ",     redevance: "Payée (2024)", homologation: "Conforme", dateDouane: "15/01/2024", network: "4G/5G" },
  { tac: "35643512", brand: "Samsung", model: "Galaxy A54 5G",      status: "DÉDOUANÉ",     redevance: "Payée (2023)", homologation: "Conforme", dateDouane: "03/06/2023", network: "4G/5G" },
  { tac: "35201012", brand: "Samsung", model: "Galaxy S23",         status: "DÉDOUANÉ",     redevance: "Payée (2023)", homologation: "Conforme", dateDouane: "12/02/2023", network: "4G/5G" },
  { tac: "35312087", brand: "Samsung", model: "Galaxy A14",         status: "DÉDOUANÉ",     redevance: "Payée (2024)", homologation: "Conforme", dateDouane: "20/03/2024", network: "4G"    },
  { tac: "35800012", brand: "Samsung", model: "Galaxy M14",         status: "EN ATTENTE",   redevance: "Non payée",   homologation: "En cours",  dateDouane: "—",          network: "4G"    },
  { tac: "35112203", brand: "Samsung", model: "Galaxy A05",         status: "NON DÉDOUANÉ", redevance: "Non payée",   homologation: "Non reconnu", dateDouane: "—",        network: "4G"    },

  // ── IPHONE dédouanés ─────────────────────────────────
  { tac: "35299601", brand: "Apple",   model: "iPhone 15 Pro Max",  status: "DÉDOUANÉ",     redevance: "Payée (2024)", homologation: "Conforme", dateDouane: "08/10/2023", network: "5G"    },
  { tac: "35299501", brand: "Apple",   model: "iPhone 15",          status: "DÉDOUANÉ",     redevance: "Payée (2024)", homologation: "Conforme", dateDouane: "10/10/2023", network: "5G"    },
  { tac: "35299301", brand: "Apple",   model: "iPhone 14 Pro",      status: "DÉDOUANÉ",     redevance: "Payée (2023)", homologation: "Conforme", dateDouane: "22/09/2022", network: "5G"    },
  { tac: "35488801", brand: "Apple",   model: "iPhone 13",          status: "DÉDOUANÉ",     redevance: "Payée (2022)", homologation: "Conforme", dateDouane: "24/09/2021", network: "5G"    },
  { tac: "35371201", brand: "Apple",   model: "iPhone 12",          status: "NON DÉDOUANÉ", redevance: "Non payée",   homologation: "Non reconnu", dateDouane: "—",        network: "5G"    },
  { tac: "35612401", brand: "Apple",   model: "iPhone SE (2022)",   status: "BLOQUÉ",       redevance: "Non payée",   homologation: "Non reconnu", dateDouane: "—",        network: "4G"    },

  // ── XIAOMI ──────────────────────────────────────────
  { tac: "86882903", brand: "Xiaomi",  model: "Redmi Note 12",      status: "DÉDOUANÉ",     redevance: "Payée (2023)", homologation: "Conforme", dateDouane: "14/04/2023", network: "4G"    },
  { tac: "86551404", brand: "Xiaomi",  model: "Xiaomi 13T Pro",     status: "DÉDOUANÉ",     redevance: "Payée (2024)", homologation: "Conforme", dateDouane: "30/09/2023", network: "5G"    },
  { tac: "86790205", brand: "Xiaomi",  model: "Poco X5 Pro",        status: "NON DÉDOUANÉ", redevance: "Non payée",   homologation: "Non reconnu", dateDouane: "—",        network: "5G"    },
  { tac: "86123406", brand: "Xiaomi",  model: "Redmi 12C",          status: "EN ATTENTE",   redevance: "Non payée",   homologation: "En cours",  dateDouane: "—",          network: "4G"    },

  // ── OPPO / REALME ────────────────────────────────────
  { tac: "86780512", brand: "Oppo",    model: "Reno 11 Pro",        status: "DÉDOUANÉ",     redevance: "Payée (2024)", homologation: "Conforme", dateDouane: "11/01/2024", network: "5G"    },
  { tac: "86540312", brand: "Realme",  model: "Realme C55",         status: "DÉDOUANÉ",     redevance: "Payée (2023)", homologation: "Conforme", dateDouane: "05/05/2023", network: "4G"    },
  { tac: "86990014", brand: "Oppo",    model: "A78 5G",             status: "NON DÉDOUANÉ", redevance: "Non payée",   homologation: "Non reconnu", dateDouane: "—",        network: "5G"    },

  // ── TECNO / INFINIX ──────────────────────────────────
  { tac: "35890501", brand: "Tecno",   model: "Spark 20 Pro+",      status: "DÉDOUANÉ",     redevance: "Payée (2024)", homologation: "Conforme", dateDouane: "18/02/2024", network: "4G"    },
  { tac: "35780601", brand: "Infinix", model: "Hot 40 Pro",         status: "DÉDOUANÉ",     redevance: "Payée (2024)", homologation: "Conforme", dateDouane: "25/03/2024", network: "4G"    },
  { tac: "35670711", brand: "Tecno",   model: "Camon 20",           status: "NON DÉDOUANÉ", redevance: "Non payée",   homologation: "Non reconnu", dateDouane: "—",        network: "4G"    },
  { tac: "35560812", brand: "Infinix", model: "Note 30 5G",         status: "BLOQUÉ",       redevance: "Non payée",   homologation: "Non reconnu", dateDouane: "—",        network: "5G"    },

  // ── HUAWEI ───────────────────────────────────────────
  { tac: "86456704", brand: "Huawei",  model: "Nova 11i",           status: "DÉDOUANÉ",     redevance: "Payée (2023)", homologation: "Conforme", dateDouane: "20/07/2023", network: "4G"    },
  { tac: "86234501", brand: "Huawei",  model: "P60 Pro",            status: "NON DÉDOUANÉ", redevance: "Non payée",   homologation: "Non reconnu", dateDouane: "—",        network: "4G"    },

  // ── VIVO ─────────────────────────────────────────────
  { tac: "35987612", brand: "Vivo",    model: "Y36 5G",             status: "DÉDOUANÉ",     redevance: "Payée (2023)", homologation: "Conforme", dateDouane: "16/08/2023", network: "5G"    },
  { tac: "35876523", brand: "Vivo",    model: "V29 Lite",           status: "NON DÉDOUANÉ", redevance: "Non payée",   homologation: "Non reconnu", dateDouane: "—",        network: "5G"    },
]

// ── Lookup ──────────────────────────────────────────────────────────────────
export function lookupIMEI(imei: string): PhoneRecord | null {
  const cleaned = imei.replace(/\D/g, "")
  if (cleaned.length < 8) return null

  const tac = cleaned.slice(0, 8)

  // Recherche exacte par TAC
  const match = PHONE_DB.find(p => p.tac === tac)
  if (match) return match

  // Si IMEI de démo connu (pour tests faciles)
  const DEMO: Record<string, PhoneRecord> = {
    "123456789012345": {
      tac: "12345678", brand: "Samsung", model: "Galaxy A54", status: "DÉDOUANÉ",
      redevance: "Payée (2024)", homologation: "Conforme", dateDouane: "01/01/2024", network: "4G",
    },
    "000000000000000": {
      tac: "00000000", brand: "iPhone", model: "iPhone 15 Pro", status: "NON DÉDOUANÉ",
      redevance: "Non payée", homologation: "Non reconnu", network: "5G",
    },
  }

  if (DEMO[cleaned]) return DEMO[cleaned]

  return null
}

// ── IMEI List suggérés (pour l'aide utilisateur) ────────────────────────────
export const DEMO_IMEIS = [
  { imei: "352994010000001", label: "iPhone 14 Pro — Dédouané" },
  { imei: "356432080000001", label: "Samsung Galaxy S24 Ultra — Dédouané" },
  { imei: "868829030000001", label: "Xiaomi Redmi Note 12 — Dédouané" },
  { imei: "358905010000001", label: "Tecno Spark 20 Pro+ — Dédouané" },
  { imei: "353711200000001", label: "iPhone 12 — Non dédouané" },
  { imei: "867902050000001", label: "Xiaomi Poco X5 Pro — Non dédouané" },
  { imei: "356560812000001", label: "Infinix Note 30 — Bloqué" },
]
