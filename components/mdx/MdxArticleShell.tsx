// components/mdx/MdxArticleShell.tsx — gabarit partagé pour tout contenu MDX
// (blog, + fallback MDX de app/tests/[slug] et app/comparatifs/[slug]).
// Compose : couverture, signature auteur, TL;DR, bloc « Résumer avec l'IA »
// (GEO), contenu MDX, tags, carte auteur, articles liés. Centralise aussi la
// liste des composants MDX et les JSON-LD (Article + Person + BreadcrumbList
// + FAQPage).

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";
import { estimateReadTime, extractFaqs, type ArticleFrontmatter, type ContentKind } from "@/lib/mdx";
import { AUTHORS, DEFAULT_AUTHOR } from "@/data/authors";
import { AuthorByline } from "@/components/blog/AuthorByline";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { ArticleTldr } from "@/components/blog/ArticleTldr";
import { ArticleCover } from "@/components/blog/ArticleCover";
import { SummarizeWithAI } from "@/components/blog/SummarizeWithAI";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
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

const SITE_URL = "https://10minutescafe.fr";
const ORG = "10minutescafe";

function resolveAuthor(slug?: string) {
  return (slug && AUTHORS[slug]) || DEFAULT_AUTHOR;
}

function frDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * JSON-LD Article + Person + BreadcrumbList (+ FAQPage si des <FaqItem>).
 * `breadcrumb` : mêmes items que le fil d'Ariane affiché (le dernier n'a pas de href).
 */
export function mdxArticleJsonLd(
  frontmatter: ArticleFrontmatter,
  content: string,
  url: string,
  breadcrumb: { label: string; href?: string }[] = [],
) {
  const author = resolveAuthor(frontmatter.author);
  const authorUrl = `${SITE_URL}/auteurs/${author.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    author: { "@type": "Person", name: author.name, url: authorUrl },
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedAt ?? frontmatter.date,
    publisher: { "@type": "Organization", name: ORG, url: SITE_URL },
    mainEntityOfPage: url,
    ...(frontmatter.cover ? { image: `${SITE_URL}${frontmatter.cover}` } : {}),
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.jobTitle,
    url: authorUrl,
    description: author.bio,
    ...(author.sameAs.length ? { sameAs: author.sameAs } : {}),
  };

  const breadcrumbSchema =
    breadcrumb.length > 1
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumb.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.label,
            ...(b.href ? { item: `${SITE_URL}${b.href}` } : {}),
          })),
        }
      : null;

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

  return { articleSchema, personSchema, breadcrumbSchema, faqSchema };
}

export function MdxArticleShell({
  frontmatter,
  content,
  breadcrumb,
  kind = "blog",
  slug = "",
}: {
  frontmatter: ArticleFrontmatter;
  content: string;
  breadcrumb: { label: string; href?: string }[];
  kind?: ContentKind;
  slug?: string;
}) {
  const readTime = estimateReadTime(content);
  const author = resolveAuthor(frontmatter.author);
  const dateDisplay = `Mis à jour le ${frDate(frontmatter.updatedAt ?? frontmatter.date)}`;
  const canonicalUrl = `${SITE_URL}${breadcrumb[breadcrumb.length - 1]?.href ?? ""}`;

  return (
    <article style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px 90px" }}>
      <Breadcrumb items={breadcrumb} />

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <ArticleCover src={frontmatter.cover} alt={frontmatter.title} />

        <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 42, lineHeight: 1.1, color: "#241B17", margin: "24px 0 0" }}>
          {frontmatter.title}
        </h1>
        <p style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "#45413E" }}>{frontmatter.description}</p>

        <AuthorByline author={author} dateDisplay={dateDisplay} readTime={readTime} />

        {frontmatter.tldr && frontmatter.tldr.length > 0 && <ArticleTldr items={frontmatter.tldr} />}

        <SummarizeWithAI title={frontmatter.title} url={canonicalUrl} />

        <div className="mdx-content" style={{ marginTop: 32, fontSize: 16, lineHeight: 1.75, color: "#3A342F" }}>
          <MDXRemote source={content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32, paddingTop: 20, borderTop: "1px solid #E8E1D6" }}>
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: mono,
                  fontSize: 11.5,
                  color: "#77716C",
                  border: "1px solid #E8E1D6",
                  borderRadius: 999,
                  padding: "4px 10px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <AuthorBox author={author} />

        <RelatedArticles currentSlug={slug} currentKind={kind} tags={frontmatter.tags} />
      </div>
    </article>
  );
}
