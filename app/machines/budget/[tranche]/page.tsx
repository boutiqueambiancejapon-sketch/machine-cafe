import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { budgetHubs, findBudgetHub } from "@/lib/hubs";
import { HubPage } from "@/components/hub/HubPage";

const SITE_URL = "https://10minutescafe.fr";

export function generateStaticParams() {
  return budgetHubs.map((h) => ({ tranche: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tranche: string }> }): Promise<Metadata> {
  const { tranche } = await params;
  const hub = findBudgetHub(tranche);
  if (!hub) return {};
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: { canonical: `${SITE_URL}/machines/budget/${tranche}` },
  };
}

export default async function MachineBudgetPage({ params }: { params: Promise<{ tranche: string }> }) {
  const { tranche } = await params;
  const hub = findBudgetHub(tranche);
  if (!hub) notFound();

  return (
    <HubPage
      hub={hub}
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Machines à café", href: "/machines/a-grains" },
        { label: "Par budget" },
        { label: hub.label, href: `/machines/budget/${tranche}` },
      ]}
      siblingsLabel="Autres budgets"
      siblings={budgetHubs.filter((h) => h.slug !== tranche).map((h) => ({ label: h.label, href: `/machines/budget/${h.slug}` }))}
    />
  );
}
