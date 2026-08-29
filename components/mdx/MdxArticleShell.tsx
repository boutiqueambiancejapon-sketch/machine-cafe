// components/mdx/MdxArticleShell.tsx — gabarit partagé pour tout contenu MDX
// (blog, et le fallback MDX de app/tests/[slug] et app/comparatifs/[slug]).
// Centralise la liste des composants MDX disponibles (shortcodes éditoriaux +
// <ProductRef>/<ProductComparison>/<ProductDisclosure>) pour que la rédaction
// MDX soit identique quel que soit le type de contenu.

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";
import { estimateReadTime, extractFaqs, type ArticleFrontmatter } from "@/lib/mdx";
import {
  InfoBox,
  Callout,
  FeatureGrid,
  Feature,
  StatRow,
  Stat,
  CompareTable,
  CompareThead,
  CompareTh,
  CompareTr,
  CompareTd,
  Verdict,
  ProsConsList,
  ProsBlock,
  ConsBlock,
  ProItem,
  ConItem,
  SectionDivider,
  FaqList,
  FaqItem,
  BodyImage,
  MdxTable,
} from "@/components/mdx/MdxComponents";
import { ProductRef } from "@/components/ProductRef";
import { ProductComparison } from "@/components/ProductComparison";
import { ProductDisclosure } from "@/components/ProductDisclosure";

export const mdxComponents = {
  InfoBox,
  Callout,
  FeatureGrid,
  Feature,
  StatRow,
  Stat,
  CompareTable,
  CompareThead,
  CompareTh,
  CompareTr,
  CompareTd,
  Verdict,
  ProsConsList,
  ProsBlock,
  ConsBlock,
  ProItem,
  ConItem,
  SectionDivider,
  FaqList,
  FaqItem,
  BodyImage,
  ProductRef,
  ProductComparison,
  ProductDisclosure,
  table: MdxTable,
};

/** JSON-LD Article + FAQPage (si des <FaqItem> sont présents) pour une page MDX. */
export function mdxArticleJsonLd(frontmatter: ArticleFrontmatter, content: string, url: string) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    author: { "@type": "Organization", name: frontmatter.author ?? "10minutescafe" },
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedAt ?? frontmatter.date,
    publisher: { "@type": "Organization", name: "10minutescafe" },
    mainEntityOfPage: url,
  };
  const faqs = extractFaqs(content);
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;
  return { articleSchema, faqSchema };
}

export function MdxArticleShell({
  frontmatter,
  content,
  breadcrumb,
}: {
  frontmatter: ArticleFrontmatter;
  content: string;
  breadcrumb: { label: string; href?: string }[];
}) {
  const readTime = estimateReadTime(content);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px 90px" }}>
      <Breadcrumb items={breadcrumb} />

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 42, lineHeight: 1.1, color: "#241B17", margin: "20px 0 0" }}>
          {frontmatter.title}
        </h1>
        <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "#45413E" }}>{frontmatter.description}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20, fontSize: 13, color: "#77716C", fontFamily: mono, flexWrap: "wrap" }}>
          {frontmatter.author && <span>{frontmatter.author}</span>}
          <span>·</span>
          <span>
            {new Date(frontmatter.updatedAt ?? frontmatter.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>·</span>
          <span>{readTime} min de lecture</span>
        </div>

        <div style={{ marginTop: 36, fontSize: 16, lineHeight: 1.75, color: "#3A342F" }}>
          <MDXRemote source={content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </div>
    </div>
  );
}
