import type { Metadata } from 'next'

import { ComparateurPageClient } from '@/components/comparateur/comparateur-page'

export const metadata: Metadata = {
  title: 'Comparer les produits — EpargneClaire',
  description:
    "Comparez les produits d'épargne côte à côte : assurance-vie, PEA, PER, SCPI, Livret A. Comparaison factuelle et neutre.",
}

export default function ComparerPage() {
  return <ComparateurPageClient />
}
