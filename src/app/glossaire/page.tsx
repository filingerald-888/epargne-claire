import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Glossaire — EpargneClaire',
}

export default function GlossairePage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ep-text-primary">Glossaire</h1>
        <p className="mt-4 text-ep-text-muted">Contenu à venir.</p>
      </div>
    </div>
  )
}
