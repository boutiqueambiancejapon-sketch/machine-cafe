import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { typeHubs, findTypeHub } from "@/lib/hubs";
import { HubPage } from "@/components/hub/HubPage";

const SITE_URL = "https://10minutescafe.fr";

export function generateStaticParams() {
  return typeHubs.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = findTypeHub(slug);
  if (!hub) return {};
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: { canonical: `${SITE_URL}/machines/${slug}` },
  };
}

export default async function MachineTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = findTypeHub(slug);
  if (!hub) notFound();

  return (
    <HubPage
      hub={hub}
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Machines à café", href: "/machines/a-grains" },
        { label: hub.label, href: `/machines/${slug}` },
      ]}
      siblingsLabel="Autres types de machines"
      siblings={typeHubs.filter((h) => h.slug !== slug).map((h) => ({ label: h.label, href: `/machines/${h.slug}` }))}
    />
  );
}
