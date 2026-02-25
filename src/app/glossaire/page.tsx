import type { Metadata } from 'next'

import { GlossaireAlphabetNav } from '@/components/glossaire/glossaire-alphabet-nav'
import { GlossaireClosing } from '@/components/glossaire/glossaire-closing'
import { GlossaireContent } from '@/components/glossaire/glossaire-content'
import { GlossaireHero } from '@/components/glossaire/glossaire-hero'
import { getGlossaireData } from '@/lib/glossaire'
import type { GlossaireTerm } from '@/types/glossaire'

export const metadata: Metadata = {
  title: 'Glossaire financier — EpargneClaire',
  description:
    'Tous les termes financiers expliqués simplement : assurance-vie, PEA, PER, SCPI, PFU, fonds euros, unités de compte et bien plus.',
}

export default function GlossairePage() {
  const data = getGlossaireData()
  const entries = Object.entries(data)
    .map(([name, term]) => ({ name, term }))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'))

  // Group by first letter
  const groupMap = new Map<string, Array<{ name: string; term: GlossaireTerm }>>()
  for (const entry of entries) {
    const letter = entry.name[0].toUpperCase()
    if (!groupMap.has(letter)) groupMap.set(letter, [])
    groupMap.get(letter)!.push(entry)
  }
  const letters = Array.from(groupMap.keys()).sort((a, b) => a.localeCompare(b, 'fr'))
  const groups = letters.map((letter) => ({
    letter,
    terms: groupMap.get(letter)!,
  }))

  return (
    <>
      <GlossaireHero termCount={entries.length} />
      <div id="contenu" className="scroll-mt-24" />
      <GlossaireAlphabetNav letters={letters} />
      <GlossaireContent groups={groups} />
      <GlossaireClosing />
    </>
  )
}
