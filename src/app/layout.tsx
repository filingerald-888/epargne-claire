import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

import { SkipLink } from "@/components/layout/skip-link"
import { StickyHeader } from "@/components/layout/sticky-header"
import { Footer } from "@/components/layout/footer"
import { AppTooltipProvider } from "@/components/layout/tooltip-provider"
import { HeroProvider } from "@/lib/hero-context"
import { ScrollToTop } from "@/components/layout/scroll-to-top"
import { JsonLd } from "@/components/seo/json-ld"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const siteUrl = "https://www.epargne-claire.fr"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EpargneClaire — Comprendre l'épargne, simplement",
    template: "%s",
  },
  description: "Comprendre l'épargne et le patrimoine, simplement. Ressource éducative neutre sur les produits patrimoniaux français.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "EpargneClaire",
    title: "EpargneClaire — Comprendre l'épargne, simplement",
    description: "Comprendre l'épargne et le patrimoine, simplement. Ressource éducative neutre sur les produits patrimoniaux français.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "EpargneClaire — Comprendre l'épargne, simplement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EpargneClaire — Comprendre l'épargne, simplement",
    description: "Comprendre l'épargne et le patrimoine, simplement. Ressource éducative neutre sur les produits patrimoniaux français.",
    images: ["/opengraph-image"],
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EpargneClaire",
  url: siteUrl,
  description: "Ressource éducative neutre sur les produits patrimoniaux français.",
  inLanguage: "fr-FR",
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EpargneClaire",
  url: siteUrl,
  logo: `${siteUrl}/logo-bleu.svg`,
  description: "Ressource éducative neutre et gratuite sur les produits patrimoniaux français.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <JsonLd schema={[websiteSchema, organizationSchema]} />
        <AppTooltipProvider>
          <HeroProvider>
            <ScrollToTop />
            <SkipLink />
            <StickyHeader />
            <main id="main-content" className="mx-auto max-w-[1200px] px-6 md:px-8">
              {children}
            </main>
            <Footer />
          </HeroProvider>
        </AppTooltipProvider>
      </body>
    </html>
  )
}
