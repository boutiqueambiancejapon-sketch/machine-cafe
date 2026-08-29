// components/ProductDisclosure.tsx — mention de divulgation Partenaires
// Amazon. À inclure UNE FOIS sur toute page contenant un lien affilié Amazon
// (que ce soit via <ProductRef variant="card"> — qui l'affiche déjà — ou via
// variant="inline"/"cta", qui ne l'affichent pas eux-mêmes).

import { mono } from "@/components/ui";

const DEFAULT_TEXT =
  "En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises.";

export function ProductDisclosure({ text = DEFAULT_TEXT }: { text?: string }) {
  return (
    <p
      style={{
        margin: "20px 0",
        fontSize: 12.5,
        lineHeight: 1.6,
        color: "#8C837A",
        fontFamily: mono,
      }}
    >
      (lien affilié) Notre avis est indépendant. {text}
    </p>
  );
}
