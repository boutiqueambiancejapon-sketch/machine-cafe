import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { besoinHubs, findBesoinHub } from "@/lib/hubs";
import { HubPage } from "@/components/hub/HubPage";

const SITE_URL = "https://10minutescafe.fr";

export function generateStaticParams() {
  return besoinHubs.map((h) => ({ besoin: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ besoin: string }> }): Promise<Metadata> {
  const { besoin } = await params;
  const hub = findBesoinHub(besoin);
  if (!hub) return {};
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: { canonical: `${SITE_URL}/machines/besoin/${besoin}` },
  };
}

export default async function MachineBesoinPage({ params }: { params: Promise<{ besoin: string }> }) {
  const { besoin } = await params;
  const hub = findBesoinHub(besoin);
  if (!hub) notFound();

  return (
    <HubPage
      hub={hub}
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Machines à café", href: "/machines/a-grains" },
        { label: "Par besoin" },
        { label: hub.label, href: `/machines/besoin/${besoin}` },
      ]}
      siblingsLabel="Autres besoins"
      siblings={besoinHubs.filter((h) => h.slug !== besoin).map((h) => ({ label: h.label, href: `/machines/besoin/${h.slug}` }))}
    />
  );
}
