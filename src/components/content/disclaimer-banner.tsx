import { cn } from '@/lib/utils'

interface DisclaimerBannerProps {
  variant: 'fiche-produit' | 'comparateur' | 'objectif' | 'rdv'
  className?: string
}

const disclaimerTexts: Record<DisclaimerBannerProps['variant'], string> = {
  'fiche-produit':
    'Cette fiche est à vocation informative. Elle ne constitue pas une recommandation d\u2019investissement.',
  comparateur:
    'Cette comparaison présente des caractéristiques factuelles. Elle ne constitue pas une aide à la décision personnalisée.',
  objectif:
    'Les produits mentionnés sont ceux généralement associés à cet objectif. Votre situation personnelle peut nécessiter une approche différente.',
  rdv: 'Ces éléments sont fournis à titre informatif pour vous aider à préparer un échange avec un professionnel habilité.',
}

export function DisclaimerBanner({ variant, className }: DisclaimerBannerProps) {
  return (
    <aside
      role="note"
      className={cn(
        'border-l-4 border-ep-warning bg-amber-50 p-4 text-sm text-slate-600 rounded-r-lg',
        className
      )}
    >
      {disclaimerTexts[variant]}
    </aside>
  )
}
