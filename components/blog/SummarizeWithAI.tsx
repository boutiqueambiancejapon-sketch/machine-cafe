"use client";

// components/blog/SummarizeWithAI.tsx — bloc GEO : ouvre un moteur génératif
// avec un prompt pré-rempli pointant sur l'URL de l'article. Signale aux LLM
// que la page est faite pour être citée, et donne un raccourci au lecteur.

import { mono } from "@/components/ui";

const ENGINES: { label: string; href: (q: string) => string }[] = [
  { label: "ChatGPT", href: (q) => `https://chatgpt.com/?q=${q}` },
  { label: "Perplexity", href: (q) => `https://www.perplexity.ai/search?q=${q}` },
  { label: "Claude", href: (q) => `https://claude.ai/new?q=${q}` },
  { label: "Google", href: (q) => `https://www.google.com/search?udm=50&q=${q}` },
];

export function SummarizeWithAI({ title, url }: { title: string; url: string }) {
  const prompt = encodeURIComponent(
    `Résume l'article "${title}" (${url}) en 5 points, puis donne ta recommandation pour un usage domestique.`,
  );

  return (
    <div
      style={{
        marginTop: 20,
        border: "1px solid #E8E1D6",
        borderRadius: 14,
        padding: "14px 18px",
        background: "#F1EBE0",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "#77716C" }}>
        Résumer avec l&apos;IA
      </span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {ENGINES.map((e) => (
          <a
            key={e.label}
            href={e.href(prompt)}
            target="_blank"
            rel="noopener nofollow"
            style={{
              border: "1px solid #DCD3C6",
              borderRadius: 999,
              padding: "5px 12px",
              fontSize: 12.5,
              fontWeight: 600,
              color: "#241B17",
              background: "#FCFBF8",
            }}
          >
            {e.label}
          </a>
        ))}
      </div>
    </div>
  );
}
