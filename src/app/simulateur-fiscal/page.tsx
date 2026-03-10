import type { Metadata } from 'next'

import { SimulateurFiscal } from '@/components/simulateur/simulateur-fiscal'

export const metadata: Metadata = {
  title: 'Simulateur fiscal — EpargneClaire',
  description:
    'Simulez la fiscalité de vos retraits d\u2019épargne : assurance-vie, PEA, PER, Livret A. Calcul factuel étape par étape, sans conseil.',
  alternates: { canonical: '/simulateur-fiscal' },
}

export default function SimulateurFiscalPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <SimulateurFiscal />
    </div>
  )
}
