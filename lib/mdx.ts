// lib/mdx.ts — chargeur de contenu MDX, porté depuis toutougourmet/lib/mdx.ts
// et étendu à 3 dossiers de contenu : blog (nouveau), comparatifs et tests
// (fallback additif au-dessus des gabarits structurés existants — voir
// app/comparatifs/[slug]/page.tsx et app/tests/[slug]/page.tsx).

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
}

export interface MdxDoc {
  slug: string;
  frontmatter: ArticleFrontmatter;
  /** MDX brut (frontmatter retiré) — passé tel quel à <MDXRemote source={…}>. */
  content: string;
}

function readMdxDir(dir: string): MdxDoc[] {
  const full = path.join(contentDir, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(full, file), "utf-8");
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as ArticleFrontmatter, content };
    });
}

function readMdxFile(dir: string, slug: string): MdxDoc | null {
  const filePath = path.join(contentDir, dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as ArticleFrontmatter, content };
}

// ─── Blog (app/blog) ────────────────────────────────────────────────────
export function getAllBlogPosts(): MdxDoc[] {
  return readMdxDir("blog").sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );
}

export function getBlogPost(slug: string): MdxDoc | null {
  return readMdxFile("blog", slug);
}

// ─── Comparatifs — fallback MDX au-dessus du gabarit lib/data.ts ───────
export function getComparatifMdx(slug: string): MdxDoc | null {
  return readMdxFile("comparatifs", slug);
}

export function getAllComparatifMdx(): MdxDoc[] {
  return readMdxDir("comparatifs");
}

// ─── Tests — fallback MDX au-dessus du gabarit lib/data.ts ─────────────
export function getTestMdx(slug: string): MdxDoc | null {
  return readMdxFile("tests", slug);
}

export function getAllTestMdx(): MdxDoc[] {
  return readMdxDir("tests");
}

// ─── Helpers partagés ────────────────────────────────────────────────────

/** Estimation temps de lecture (~200 mots/min). */
export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Extrait les paires question/réponse des <FaqItem> pour le JSON-LD FAQPage. */
export function extractFaqs(rawContent: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const regex = /<FaqItem\s+question="([^"]+)">([\s\S]*?)<\/FaqItem>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(rawContent)) !== null) {
    const question = match[1].trim();
    const answer = match[2]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}
