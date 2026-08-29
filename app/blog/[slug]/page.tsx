import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPost } from "@/lib/mdx";
import { MdxArticleShell, mdxArticleJsonLd } from "@/components/mdx/MdxArticleShell";

const SITE_URL = "https://10minutescafe.fr";

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

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  const { articleSchema, faqSchema } = mdxArticleJsonLd(post.frontmatter, post.content, canonicalUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <MdxArticleShell
        frontmatter={post.frontmatter}
        content={post.content}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.frontmatter.title }]}
      />
    </>
  );
}
