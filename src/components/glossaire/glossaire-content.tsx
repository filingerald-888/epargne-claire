'use client'

import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { GlossaireTerm } from '@/types/glossaire'
import { getTermSlug } from '@/lib/glossaire'

interface TermEntry {
  name: string
  term: GlossaireTerm
}

interface GlossaireContentProps {
  groups: Array<{ letter: string; terms: TermEntry[] }>
}

const examples: Record<string, string> = {
  'Assurance-vie':
    'Exemple : vous placez 10 000 € sur un contrat. Après 8 ans, vos gains bénéficient d\'un abattement de 4 600 € avant imposition.',
  'PEA':
    'Exemple : vous investissez 5 000 € en actions européennes via votre PEA. Après 5 ans, vos plus-values sont exonérées d\'impôt sur le revenu.',
  'PER':
    'Exemple : avec un TMI à 30 %, un versement de 5 000 € sur votre PER réduit votre impôt de 1 500 € l\'année du versement.',
  'Livret A':
    'Exemple : avec 10 000 € sur un Livret A à 1,5 %, vous gagnez 150 € d\'intérêts par an, nets d\'impôt.',
  'PFU':
    'Exemple : vous réalisez 1 000 € de plus-values. Le PFU prélève 314 € (12,8 % d\'impôt sur le revenu + 18,6 % de prélèvements sociaux).',
  'Fonds euros':
    'Exemple : vous placez 20 000 € sur un fonds euros à 2,5 %. Vous gagnez 500 € garantis, sans risque de perte.',
  'Frais de gestion':
    'Exemple : sur un contrat avec 0,6 % de frais annuels et 50 000 € d\'encours, vous payez 300 € par an.',
  'Frais d\'arbitrage':
    'Exemple : vous transférez 5 000 € du fonds euros vers des unités de compte. Avec 0,5 % de frais, cela vous coûte 25 €.',
  'TMI':
    'Exemple : si votre TMI est à 30 %, chaque euro déductible (PER) vous fait économiser 0,30 € d\'impôt.',
  'Abattement':
    'Exemple : après 8 ans d\'assurance-vie, les premiers 4 600 € de gains retirés sont exonérés d\'impôt (9 200 € en couple).',
  'Rendement brut':
    'Exemple : un fonds affiche 5 % brut. Après 1,5 % de frais et 31,4 % de flat tax, il reste environ 2,40 % net.',
  'Rétrocessions':
    'Exemple : votre banque recommande un fonds qui lui reverse 1 % par an. Sur 50 000 €, c\'est 500 € de rétrocession annuelle.',
  'Unités de compte':
    'Exemple : vous investissez 10 000 € en unités de compte actions. Si le marché monte de 8 %, votre capital passe à 10 800 €. S\'il baisse de 5 %, il descend à 9 500 €.',
  'SCPI':
    'Exemple : vous achetez 10 000 € de parts de SCPI avec un rendement de 5 %. Vous recevez environ 500 € de revenus par an.',
  'Horizon de placement':
    'Exemple : pour un projet dans 2 ans, privilégiez le Livret A. Pour la retraite dans 20 ans, vous pouvez accepter plus de risque.',
  'Capital':
    'Exemple : vous versez 10 000 € (votre capital). Après 5 ans, votre placement vaut 12 000 €. Les 2 000 € sont vos gains.',
  'Plus-value':
    'Exemple : vous achetez une action à 100 € et la revendez 130 €. Votre plus-value est de 30 €.',
  'Rente':
    'Exemple : à 65 ans, vous convertissez 100 000 € en rente viagère. Vous recevez environ 350 € par mois à vie.',
  'LDDS':
    'Exemple : avec 12 000 € (plafond) sur un LDDS à 1,5 %, vous gagnez 180 € d\'intérêts nets par an.',
  'Prélèvements sociaux':
    'Exemple : sur 1 000 € de plus-values PEA après 5 ans, vous payez 186 € de prélèvements sociaux (18,6 %).',
  'Frais internes':
    'Exemple : un fonds actif prélève 2 % par an de frais internes. Sur 10 000 €, c\'est 200 € prélevés chaque année.',
  'Liquidité':
    'Exemple : vous avez besoin de 3 000 € en urgence. Sur un Livret A, c\'est instantané. Sur une SCPI, il faut compter plusieurs semaines à plusieurs mois pour revendre vos parts.',
  'Rachat':
    'Exemple : vous retirez 5 000 € de votre assurance-vie qui vaut 20 000 € (dont 4 000 € de gains). Le rachat porte sur 1 000 € de gains et 4 000 € de capital. Seuls les 1 000 € de gains sont imposables.',
  'Clause bénéficiaire':
    'Exemple : vous désignez « mon conjoint, à défaut mes enfants par parts égales ». Au décès, chacun bénéficie de l\'abattement de 152 500 €.',
  'Effet cliquet':
    'Exemple : votre fonds euros gagne 2,5 % en 2025. Ces intérêts sont définitivement acquis. Même si le rendement tombe à 1,5 % en 2026, vos gains 2025 restent intacts.',
  'Dividende':
    'Exemple : vous détenez 100 actions à 50 €. L\'entreprise verse 2 € de dividende par action : vous recevez 200 €.',
  'Moins-value':
    'Exemple : vous achetez une action à 100 € et la revendez 80 €. Votre moins-value de 20 € peut être déduite de vos plus-values de l\'année.',
  'Gestion pilotée':
    'Exemple : vous choisissez un profil « équilibré » sur votre PER. Le gérant place 50 % en fonds euros et 50 % en actions, puis sécurise progressivement à l\'approche de la retraite.',
  'Déblocage anticipé':
    'Exemple : vous achetez votre résidence principale et débloquez votre PER pour l\'apport. Le capital retiré est soumis à l\'impôt sur le revenu si les versements avaient été déduits.',
  'Revenus fonciers':
    'Exemple : vous détenez 20 000 € de parts SCPI à 5 % de rendement. Vous percevez 1 000 €/an de revenus fonciers, imposés à votre TMI + 17,2 % de PS.',
  'Taux de distribution':
    'Exemple : une SCPI verse 5 € de dividende par part. La part vaut 100 € au 1er janvier. Le taux de distribution est de 5 %.',
  'Frais d\'entrée':
    'Exemple : vous versez 10 000 € sur une assurance-vie avec 2 % de frais d\'entrée. Seuls 9 800 € sont effectivement investis.',
  'Délai de jouissance':
    'Exemple : vous achetez des parts de SCPI en janvier. Avec un délai de jouissance de 4 mois, vos premiers revenus arrivent en mai.',
  'Micro-foncier':
    'Exemple : vous percevez 8 000 € de revenus SCPI. En micro-foncier, l\'abattement de 30 % ramène la base imposable à 5 600 €.',
  'Régime réel':
    'Exemple : vous percevez 10 000 € de loyers et avez 7 000 € de charges déductibles (intérêts + travaux). Vous n\'êtes imposé que sur 3 000 €.',
  'Volatilité':
    'Exemple : un fonds actions peut varier de +20 % à -15 % en un an. Un fonds euros varie de +1,5 % à +3 %. Le premier est plus volatil.',
  'AMF':
    'Exemple : avant d\'investir sur une plateforme en ligne, vérifiez qu\'elle n\'apparaît pas sur la liste noire de l\'AMF (amf-france.org).',
  'Loi PACTE':
    'Exemple : grâce à la loi PACTE, vous pouvez transférer votre ancien PERP vers un nouveau PER et choisir une sortie en capital plutôt qu\'en rente.',
  'Allocation d\'actifs':
    'Exemple : à 30 ans avec un horizon retraite, une allocation 70 % actions / 30 % obligations est cohérente. À 60 ans, on inverse progressivement.',
  'Exonération':
    'Exemple : les intérêts du Livret A sont totalement exonérés. Vous gagnez 150 € ? Vous recevez 150 €, sans aucun prélèvement.',
  'Droits de succession':
    'Exemple : un parent transmet 200 000 € à son enfant. Après l\'abattement de 100 000 €, seuls 100 000 € sont taxés (de 5 % à 20 % selon les tranches).',
  'Commission':
    'Exemple : votre conseiller touche 1 % de commission sur le contrat qu\'il vous propose. Sur 30 000 €, c\'est 300 € pour lui — sans que cela vous soit toujours signalé.',
  'Plafond':
    'Exemple : votre Livret A est au plafond (22 950 €). Vous ne pouvez plus y verser d\'argent, mais les intérêts continuent de s\'accumuler au-delà.',
  'ORIAS':
    'Exemple : votre conseiller vous dit être « courtier en assurances ». En 30 secondes sur orias.fr, vous pouvez vérifier s\'il est bien immatriculé.',
}

function TermCard({ entry }: { entry: TermEntry }) {
  const [isOpen, setIsOpen] = useState(false)
  const example = examples[entry.name]
  const slug = getTermSlug(entry.name)

  return (
    <div
      id={slug}
      className={cn(
        'scroll-mt-36',
        'rounded-xl border border-ep-separator bg-white p-5',
        'shadow-[0_2px_8px_rgb(0,0,0,0.06)] transition-shadow duration-300',
        'hover:shadow-[0_4px_16px_rgb(0,0,0,0.08)]'
      )}
    >
      <h3 className="text-lg font-bold text-ep-text-primary">{entry.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ep-text-muted">
        {entry.term.definition}
      </p>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="mt-3 border-t border-ep-separator pt-3 text-sm leading-relaxed text-ep-text-primary">
              {entry.term.definitionComplete}
            </p>
            {example && (
              <p className="mt-2 rounded-lg bg-ep-bg-blue-subtle px-3 py-2 text-sm leading-relaxed text-ep-primary">
                {example}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-ep-primary transition-colors hover:text-ep-primary/70"
      >
        {isOpen ? 'Réduire' : 'En savoir plus'}
        <ChevronDown
          className={cn(
            'size-3.5 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
    </div>
  )
}

export function GlossaireContent({ groups }: GlossaireContentProps) {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <div className="py-8 md:py-12">
      {groups.map((group) => (
        <motion.section
          key={group.letter}
          id={`lettre-${group.letter}`}
          className="scroll-mt-28 pb-10"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-5xl font-bold text-ep-primary/15">
              {group.letter}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {group.terms.map((entry) => (
              <motion.div key={entry.name} variants={itemVariants}>
                <TermCard entry={entry} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  )
}
