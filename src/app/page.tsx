import type { Metadata } from 'next'

import { HeroSection } from '@/components/homepage/hero-section'
import { FounderSection } from '@/components/homepage/founder-section'
import { InflationLossSection } from '@/components/homepage/inflation-loss-section'
import { ObjectifsSection } from '@/components/homepage/objectifs-section'
import { ProduitsSection } from '@/components/homepage/produits-section'
import { RdvSection } from '@/components/homepage/rdv-section'
import { ComparerSection } from '@/components/homepage/comparer-section'
import { GlossaireSection } from '@/components/homepage/glossaire-section'

export const metadata: Metadata = {
  title: "EpargneClaire — Comprendre l'épargne, simplement",
  description:
    "Comprendre l'épargne et le patrimoine, simplement. Assurance-vie, PEA, PER, SCPI, Livret A : guides neutres, comparateur, simulateur fiscal et glossaire financier.",
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: "EpargneClaire — Comprendre l'épargne, simplement",
    description:
      "Comprendre l'épargne et le patrimoine, simplement. Assurance-vie, PEA, PER, SCPI, Livret A : guides neutres, comparateur, simulateur fiscal et glossaire financier.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "EpargneClaire — Comprendre l'épargne, simplement",
    description:
      "Comprendre l'épargne et le patrimoine, simplement. Assurance-vie, PEA, PER, SCPI, Livret A : guides neutres, comparateur, simulateur fiscal et glossaire financier.",
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FounderSection />
      <InflationLossSection />
      <ObjectifsSection />
      <ProduitsSection />
      <RdvSection />
      <ComparerSection />
      <GlossaireSection />
    </>
  )
}
