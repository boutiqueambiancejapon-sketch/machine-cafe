import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllBlogPosts, getBlogPost, estimateReadTime, extractFaqs } from "@/lib/mdx";
import { mono, serif } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";
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

const SITE_URL = "https://10minutescafe.fr";

const mdxComponents = {
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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const canonical = `${SITE_URL}/blog/${slug}`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const readTime = estimateReadTime(content);
  const faqs = extractFaqs(content);
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    author: { "@type": "Organization", name: frontmatter.author ?? "10minutescafe" },
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedAt ?? frontmatter.date,
    publisher: { "@type": "Organization", name: "10minutescafe" },
  };

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

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px 90px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Blog", href: "/blog" }, { label: frontmatter.title }]} />

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
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </div>
    </div>
  );
}
