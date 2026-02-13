export interface GlossaireTerm {
  definition: string
  definitionComplete: string
  aliases?: string[]
}

export interface GlossaireData {
  [key: string]: GlossaireTerm
}
