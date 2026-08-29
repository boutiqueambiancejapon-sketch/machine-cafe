import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/mdx";
import { mono, serif, kicker } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, avis et actualité machines à café — articles indépendants de la rédaction 10minutescafe.",
};

const shell = { maxWidth: 1280, margin: "0 auto" } as const;

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div style={{ ...shell, padding: "28px 40px 90px" }}>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Blog" }]} />

      <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 48, color: "#241B17", margin: "16px 0 0" }}>
        Le blog
      </h1>
      <p style={{ margin: "12px 0 0", fontSize: 16, color: "#45413E", maxWidth: "60ch" }}>
        Guides d&apos;achat, avis produit et actualité — écrits par la rédaction, sans avis sponsorisé.
      </p>

      {posts.length === 0 ? (
        <p style={{ marginTop: 40, fontSize: 14, color: "#77716C" }}>Aucun article publié pour le moment.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24, marginTop: 40 }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="h-card"
              style={{ display: "block", border: "1px solid #E8E1D6", borderRadius: 18, padding: 22, background: "#FCFBF8" }}
            >
              <div style={kicker}>{new Date(post.frontmatter.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</div>
              <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 22, color: "#241B17", margin: "10px 0 0", lineHeight: 1.25 }}>
                {post.frontmatter.title}
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 14, color: "#45413E", lineHeight: 1.5 }}>{post.frontmatter.description}</p>
              {post.frontmatter.author && (
                <div style={{ marginTop: 14, fontFamily: mono, fontSize: 11.5, color: "#77716C" }}>{post.frontmatter.author}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
