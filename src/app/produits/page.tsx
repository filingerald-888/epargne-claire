import type { Metadata } from 'next'

import { ProduitsClosing } from '@/components/produits/produits-closing'
import { ProduitsCoupDoeilSection } from '@/components/produits/produits-coup-doeil-section'
import { ProduitsFilterSection } from '@/components/produits/produits-filter-section'
import { ProduitsHero } from '@/components/produits/produits-hero'

export const metadata: Metadata = {
  title: "Tous les produits d'épargne — EpargneClaire",
  description:
    "Découvrez les 5 produits patrimoniaux expliqués simplement : assurance-vie, PEA, PER, SCPI, livret A. Filtrez par objectif et comparez en un coup d'œil.",
}

export default function ProduitsPage() {
  return (
    <>
      <ProduitsHero />
      <div id="contenu" className="scroll-mt-24" />
      <ProduitsFilterSection />
      <ProduitsCoupDoeilSection />
      <ProduitsClosing />
    </>
  )
}
