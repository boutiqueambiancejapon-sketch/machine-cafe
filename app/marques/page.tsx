import type { Metadata } from "next";
import Link from "next/link";
import { marqueHubs } from "@/lib/hubs";
import { serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

const SITE_URL = "https://10minutescafe.fr";

export const metadata: Metadata = {
  title: "Machines à café par marque",
  description: "Toutes les marques de machines à café que nous suivons : De'Longhi, Philips, Jura, Sage, Krups, Melitta et les autres.",
  alternates: { canonical: `${SITE_URL}/marques` },
};

const shell = { maxWidth: 1280, margin: "0 auto" } as const;

export default function MarquesIndexPage() {
  return (
    <div style={{ ...shell, padding: "28px 40px 90px" }}>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Marques" }]} />
      <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 46, color: "#241B17", margin: "16px 0 0" }}>
        Machines à café par marque
      </h1>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: "#45413E", maxWidth: "62ch", lineHeight: 1.6 }}>
        Chaque marque a sa logique de gamme. Ces pages listent les modèles que nous suivons, du plus abordable au haut
        de gamme, avec ce qui les distingue.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginTop: 36 }}>
        {marqueHubs.map((h) => (
          <Link
            key={h.slug}
            href={`/marques/${h.slug}`}
            style={{
              border: "1px solid #E8E1D6",
              borderRadius: 14,
              padding: 18,
              fontSize: 15,
              fontWeight: 700,
              color: "#241B17",
              background: "#F7F3EC",
            }}
          >
            {h.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
