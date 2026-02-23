import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

import { SkipLink } from "@/components/layout/skip-link"
import { StickyHeader } from "@/components/layout/sticky-header"
import { Footer } from "@/components/layout/footer"
import { AppTooltipProvider } from "@/components/layout/tooltip-provider"

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

export const metadata: Metadata = {
  title: "EpargneClaire — Comprendre l'épargne, simplement",
  description: "Comprendre l'épargne et le patrimoine, simplement. Ressource éducative neutre sur les produits patrimoniaux français.",
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
        <AppTooltipProvider>
          <SkipLink />
          <StickyHeader />
          <main id="main-content" className="mx-auto max-w-[1200px] px-4">
            {children}
          </main>
          <Footer />
        </AppTooltipProvider>
      </body>
    </html>
  )
}
