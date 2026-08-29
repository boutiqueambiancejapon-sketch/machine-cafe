import type { Metadata } from "next";
import Link from "next/link";
import { typeHubs, budgetHubs, besoinHubs, marqueHubs } from "@/lib/hubs";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

const SITE_URL = "https://10minutescafe.fr";

export const metadata: Metadata = {
  title: "Toutes les machines à café — par type, budget, besoin et marque",
  description:
    "Explorez les machines à café par technologie (grains, capsules, filtre, expresso), par budget, par besoin ou par marque.",
  alternates: { canonical: `${SITE_URL}/machines` },
};

const shell = { maxWidth: 1280, margin: "0 auto" } as const;

function HubGrid({ title, base, hubs }: { title: string; base: string; hubs: { slug: string; label: string }[] }) {
  return (
    <section style={{ marginTop: 40 }}>
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#77716C" }}>
        {title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
        {hubs.map((h) => (
          <Link
            key={h.slug}
            href={`${base}/${h.slug}`}
            style={{
              border: "1px solid #E8E1D6",
              borderRadius: 999,
              padding: "10px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: "#241B17",
              background: "#FCFBF8",
            }}
          >
            {h.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function MachinesIndexPage() {
  return (
    <div style={{ ...shell, padding: "28px 40px 90px" }}>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Machines à café" }]} />
      <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 46, color: "#241B17", margin: "16px 0 0" }}>
        Toutes les machines à café
      </h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: "#45413E", maxWidth: "62ch", lineHeight: 1.6 }}>
        Le point d&apos;entrée dépend de comment vous cherchez : une technologie précise, un budget fixé, un usage
        (cappuccino, silence, famille) ou une marque.
      </p>

      <HubGrid title="Par technologie" base="/machines" hubs={typeHubs} />
      <HubGrid title="Par budget" base="/machines/budget" hubs={budgetHubs} />
      <HubGrid title="Par besoin" base="/machines/besoin" hubs={besoinHubs} />
      <HubGrid title="Par marque" base="/marques" hubs={marqueHubs} />

      <div style={{ marginTop: 40 }}>
        <Link href="/comparateur" style={{ fontSize: 14, fontWeight: 700, color: "#B77945" }}>
          Ou comparer tous les modèles côte à côte →
        </Link>
      </div>
    </div>
  );
}
