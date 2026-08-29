// components/blog/ArticleCover.tsx — image de couverture d'article.
// Si `src` absent : placeholder hachuré (même DA que le reste du site). RSC.

import Image from "next/image";
import { mono } from "@/components/ui";

export function ArticleCover({ src, alt }: { src?: string; alt: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 8",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid #E8E1D6",
        background: "repeating-linear-gradient(135deg,#F7F3EC 0 14px,#F1EBE0 14px 28px)",
        marginTop: 24,
      }}
    >
      {src ? (
        <Image src={src} alt={alt} fill priority sizes="(max-width: 820px) 100vw, 760px" style={{ objectFit: "cover" }} />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontFamily: mono,
            fontSize: 11,
            color: "#8C837A",
          }}
        >
          couverture
        </div>
      )}
    </div>
  );
}
