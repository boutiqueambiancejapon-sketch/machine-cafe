import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't emit AGENTS.md / CLAUDE.md into the repo on build.
  agentRules: false,

  images: {
    // CDN Amazon — obligatoire pour les visuels produit synchronisés dans
    // data/products/*.json. Hotlink uniquement, jamais de copie dans public/
    // (règle de conformité Partenaires Amazon — voir data/products/README.md).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
};

export default nextConfig;
