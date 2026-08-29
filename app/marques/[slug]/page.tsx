import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marqueHubs, findMarqueHub } from "@/lib/hubs";
import { HubPage } from "@/components/hub/HubPage";

const SITE_URL = "https://10minutescafe.fr";

export function generateStaticParams() {
  return marqueHubs.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = findMarqueHub(slug);
  if (!hub) return {};
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: { canonical: `${SITE_URL}/marques/${slug}` },
  };
}

export default async function MarquePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = findMarqueHub(slug);
  if (!hub) notFound();

  return (
    <HubPage
      hub={hub}
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Marques", href: `/marques/${slug}` },
        { label: hub.label, href: `/marques/${slug}` },
      ]}
      siblingsLabel="Autres marques"
      siblings={marqueHubs.filter((h) => h.slug !== slug).map((h) => ({ label: h.label, href: `/marques/${h.slug}` }))}
    />
  );
}
