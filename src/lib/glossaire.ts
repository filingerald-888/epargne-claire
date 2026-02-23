import termesData from '@/content/glossaire/termes.json'
import type { GlossaireData, GlossaireTerm } from '@/types/glossaire'

const glossaire: GlossaireData = termesData

export function getGlossaireData(): GlossaireData {
  return glossaire
}

export function findTerm(termOrAlias: string): { key: string; term: GlossaireTerm } | undefined {
  const search = termOrAlias.toLowerCase()

  for (const [key, term] of Object.entries(glossaire)) {
    if (key.toLowerCase() === search) {
      return { key, term }
    }
    if (term.aliases?.some((alias) => alias.toLowerCase() === search)) {
      return { key, term }
    }
  }

  return undefined
}

export function getTermSlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/['']/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
}
