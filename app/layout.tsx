import type { Metadata } from "next";
import { Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "@/components/CompareProvider";
import { CompareBar } from "@/components/CompareBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://10minutescafe.fr"),
  title: {
    default: "10minutescafe — comparateur de machines à café",
    template: "%s · 10minutescafe",
  },
  description:
    "Comparez les machines à café, découvrez leurs différences et trouvez le modèle adapté à votre budget, votre café préféré et votre quotidien.",
  openGraph: {
    title: "10minutescafe — comparateur de machines à café",
    description:
      "Comparatifs indépendants de machines à café : notes éditoriales, méthodologie publique, aucun avis sponsorisé.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body>
        <CompareProvider>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}
