import type { Metadata } from 'next'

import { AProposClosing } from '@/components/a-propos/a-propos-closing'
import { AProposDemarche } from '@/components/a-propos/a-propos-demarche'
import { AProposHero } from '@/components/a-propos/a-propos-hero'
import { AProposHistoire } from '@/components/a-propos/a-propos-histoire'
import { AProposParcours } from '@/components/a-propos/a-propos-parcours'
import { AProposPositionnement } from '@/components/a-propos/a-propos-positionnement'

export const metadata: Metadata = {
  title: 'À propos — EpargneClaire',
  description:
    "Découvrez pourquoi EpargneClaire existe : un projet personnel pour traduire le jargon financier en français courant. Gratuitement, sans promotion, sans affiliation.",
  alternates: { canonical: '/a-propos' },
}

export default function AProposPage() {
  return (
    <>
      <AProposHero />
      <AProposHistoire />
      <AProposDemarche />
      <AProposPositionnement />
      <AProposParcours />
      <AProposClosing />
    </>
  )
}
