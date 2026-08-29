import type { Metadata } from "next";
import { ComparateurClient } from "@/components/comparateur/ComparateurClient";

export const metadata: Metadata = {
  title: "Comparatif des meilleures machines à café",
  description:
    "Comparez les machines à café selon les critères qui comptent : qualité du café, simplicité, entretien, bruit et prix. Filtres par besoin, budget, marque et note.",
};

export default function ComparateurPage() {
  return <ComparateurClient />;
}
