// Règles fiscales françaises — calculs factuels sur des règles publiques
// Aucun conseil : uniquement des simulations mathématiques

// --- Taux et seuils ---
const SOCIAL_CHARGES_RATE = 0.172 // Prélèvements sociaux
const PFU_RATE = 0.30 // Prélèvement forfaitaire unique (flat tax)
const PFU_IR_RATE = 0.128 // Part IR du PFU
const AV_REDUCED_IR_RATE = 0.075 // IR réduit AV après 8 ans
const AV_THRESHOLD_YEARS = 8
const PEA_THRESHOLD_YEARS = 5
const AV_ABATEMENT_SINGLE = 4_600
const AV_ABATEMENT_COUPLE = 9_200

// --- Types ---
export type ProductType = 'assurance-vie' | 'pea' | 'per' | 'livret-a'

export interface FiscalInput {
  product: ProductType
  totalInvested: number
  currentValue: number
  withdrawalAmount: number
  holdingYears: number
  situation?: 'single' | 'couple'
  deducted?: boolean
  tmi?: number
}

export interface FiscalStep {
  label: string
  formula: string
  result: string
  highlight?: 'positive' | 'negative' | 'neutral'
}

export interface FiscalResult {
  productLabel: string
  withdrawalAmount: number
  capitalPart: number
  gainsPart: number
  abatement: number
  taxableGains: number
  incomeTax: number
  socialCharges: number
  totalTax: number
  netAmount: number
  steps: FiscalStep[]
  summary: string
  warnings: string[]
}

// --- Plafonds réglementaires ---
const PEA_MAX_DEPOSIT = 150_000
const LIVRET_A_MAX_BALANCE = 22_950

// --- Validation ---
export interface ValidationResult {
  errors: string[]     // Bloquants — empêchent le calcul
  warnings: string[]   // Non-bloquants — affichés dans le résultat
}

/** Rendement annualisé moyen implicite */
function impliedAnnualReturn(invested: number, current: number, years: number): number {
  if (invested <= 0 || years <= 0) return 0
  return Math.pow(current / invested, 1 / years) - 1
}

/** Seuils de rendement réaliste par produit */
const MAX_PLAUSIBLE_RETURN: Record<ProductType, number> = {
  'assurance-vie': 0.15, // 15%/an max (fonds UC très dynamiques)
  'pea': 0.25,           // 25%/an max (actions très performantes)
  'per': 0.15,           // 15%/an max (similaire AV)
  'livret-a': 0.05,      // 5%/an max (taux réglementé)
}

export function validateInput(input: FiscalInput): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // --- Erreurs bloquantes ---
  if (input.totalInvested <= 0) {
    errors.push('Le montant versé doit être supérieur à 0\u00A0€.')
  }
  if (input.product !== 'livret-a' && input.currentValue <= 0) {
    errors.push('La valeur actuelle doit être supérieure à 0\u00A0€.')
  }
  if (input.withdrawalAmount <= 0) {
    errors.push('Le montant à retirer doit être supérieur à 0\u00A0€.')
  }
  if (input.product !== 'livret-a' && input.withdrawalAmount > input.currentValue) {
    errors.push('Le montant à retirer ne peut pas dépasser la valeur actuelle de votre placement.')
  }

  // --- Avertissements ---

  // Perte en capital (valeur < versé)
  if (input.product !== 'livret-a' && input.currentValue < input.totalInvested) {
    warnings.push(
      'La valeur actuelle est inférieure aux versements : votre placement est en moins-value. ' +
      'Dans ce cas, il n\u2019y a pas de plus-values, donc pas d\u2019imposition sur les gains.'
    )
  }

  // Plafond PEA
  if (input.product === 'pea' && input.totalInvested > PEA_MAX_DEPOSIT) {
    warnings.push(
      `Le plafond de versement du PEA est de ${PEA_MAX_DEPOSIT.toLocaleString('fr-FR')}\u00A0€. ` +
      'Si votre montant est correct, vérifiez qu\u2019il n\u2019inclut pas les plus-values.'
    )
  }

  // Plafond Livret A
  if (input.product === 'livret-a' && input.totalInvested > LIVRET_A_MAX_BALANCE) {
    warnings.push(
      `Le plafond du Livret A est de ${LIVRET_A_MAX_BALANCE.toLocaleString('fr-FR')}\u00A0€ (hors intérêts capitalisés). ` +
      'Un solde supérieur est possible grâce aux intérêts, mais vérifiez votre relevé.'
    )
  }

  // Rendement irréaliste
  if (
    input.product !== 'livret-a' &&
    input.currentValue > input.totalInvested &&
    input.holdingYears > 0
  ) {
    const annualReturn = impliedAnnualReturn(
      input.totalInvested, input.currentValue, input.holdingYears
    )
    const maxReturn = MAX_PLAUSIBLE_RETURN[input.product]
    if (annualReturn > maxReturn) {
      const pct = (annualReturn * 100).toFixed(0)
      warnings.push(
        `Les montants saisis impliquent un rendement annuel moyen de ~${pct}\u00A0%, ` +
        'ce qui est inhabituellement élevé pour ce type de placement. ' +
        'Vérifiez que le « montant total versé » inclut bien tous vos versements (pas uniquement le versement initial).'
      )
    }
  }

  // PER : rappel conditions de sortie
  if (input.product === 'per') {
    warnings.push(
      'Rappel : le PER est en principe bloqué jusqu\u2019à la retraite. ' +
      'Un retrait anticipé n\u2019est possible que dans certains cas (achat de résidence principale, accidents de la vie). ' +
      'Cette simulation calcule la fiscalité applicable en cas de sortie.'
    )
  }

  return { errors, warnings }
}

// --- Helpers ---
function fmt(n: number): string {
  return Math.round(n).toLocaleString('fr-FR') + '\u00A0€'
}

function fmtRate(r: number): string {
  return (r * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + '\u00A0%'
}

function computeGainsPart(
  withdrawalAmount: number,
  totalInvested: number,
  currentValue: number
): { capitalPart: number; gainsPart: number; gainsRatio: number } {
  const totalGains = Math.max(0, currentValue - totalInvested)
  const gainsRatio = currentValue > 0 ? totalGains / currentValue : 0
  const gainsPart = withdrawalAmount * gainsRatio
  const capitalPart = withdrawalAmount - gainsPart
  return { capitalPart, gainsPart, gainsRatio }
}

// --- Calculs par produit ---

function calculateAV(input: FiscalInput): FiscalResult {
  const { totalInvested, currentValue, withdrawalAmount, holdingYears, situation } = input
  const { capitalPart, gainsPart, gainsRatio } = computeGainsPart(
    withdrawalAmount, totalInvested, currentValue
  )

  const steps: FiscalStep[] = []
  const totalGains = Math.max(0, currentValue - totalInvested)

  steps.push({
    label: 'Plus-values totales du contrat',
    formula: `${fmt(currentValue)} − ${fmt(totalInvested)}`,
    result: fmt(totalGains),
    highlight: 'neutral',
  })

  steps.push({
    label: 'Part de plus-values dans votre retrait',
    formula: `${fmt(withdrawalAmount)} × (${fmt(totalGains)} ÷ ${fmt(currentValue)})`,
    result: fmt(gainsPart),
    highlight: 'neutral',
  })

  let incomeTax: number
  let socialCharges: number
  let abatement = 0
  let taxableGains: number

  if (holdingYears < AV_THRESHOLD_YEARS) {
    // Avant 8 ans : PFU 30% sur les plus-values
    taxableGains = gainsPart
    incomeTax = taxableGains * PFU_IR_RATE
    socialCharges = taxableGains * SOCIAL_CHARGES_RATE

    steps.push({
      label: `Avant ${AV_THRESHOLD_YEARS} ans : prélèvement forfaitaire unique (PFU)`,
      formula: `${fmt(taxableGains)} × ${fmtRate(PFU_RATE)}`,
      result: fmt(incomeTax + socialCharges),
      highlight: 'negative',
    })

    steps.push({
      label: 'Dont impôt sur le revenu',
      formula: `${fmt(taxableGains)} × ${fmtRate(PFU_IR_RATE)}`,
      result: fmt(incomeTax),
      highlight: 'negative',
    })

    steps.push({
      label: 'Dont prélèvements sociaux',
      formula: `${fmt(taxableGains)} × ${fmtRate(SOCIAL_CHARGES_RATE)}`,
      result: fmt(socialCharges),
      highlight: 'negative',
    })
  } else {
    // Après 8 ans : abattement + taux réduit
    abatement = situation === 'couple' ? AV_ABATEMENT_COUPLE : AV_ABATEMENT_SINGLE
    const abatementLabel = situation === 'couple'
      ? 'Abattement annuel (couple)'
      : 'Abattement annuel (personne seule)'

    taxableGains = Math.max(0, gainsPart - abatement)

    steps.push({
      label: abatementLabel,
      formula: `${fmt(gainsPart)} − ${fmt(abatement)}`,
      result: `${fmt(taxableGains)} imposables`,
      highlight: 'positive',
    })

    incomeTax = taxableGains * AV_REDUCED_IR_RATE
    socialCharges = gainsPart * SOCIAL_CHARGES_RATE

    if (taxableGains > 0) {
      steps.push({
        label: `Impôt sur le revenu (taux réduit après ${AV_THRESHOLD_YEARS} ans)`,
        formula: `${fmt(taxableGains)} × ${fmtRate(AV_REDUCED_IR_RATE)}`,
        result: fmt(incomeTax),
        highlight: 'negative',
      })
    } else {
      steps.push({
        label: 'Impôt sur le revenu',
        formula: 'Plus-values inférieures à l\u2019abattement',
        result: '0\u00A0€',
        highlight: 'positive',
      })
    }

    steps.push({
      label: 'Prélèvements sociaux (sur toutes les plus-values)',
      formula: `${fmt(gainsPart)} × ${fmtRate(SOCIAL_CHARGES_RATE)}`,
      result: fmt(socialCharges),
      highlight: 'negative',
    })
  }

  const totalTax = incomeTax + socialCharges
  const netAmount = withdrawalAmount - totalTax

  steps.push({
    label: 'Total des prélèvements',
    formula: `${fmt(incomeTax)} + ${fmt(socialCharges)}`,
    result: fmt(totalTax),
    highlight: 'negative',
  })

  const durationLabel = holdingYears < AV_THRESHOLD_YEARS
    ? `avant ${AV_THRESHOLD_YEARS} ans (PFU)`
    : `après ${AV_THRESHOLD_YEARS} ans (taux réduit)`

  return {
    productLabel: 'Assurance-vie',
    withdrawalAmount,
    capitalPart,
    gainsPart,
    abatement,
    taxableGains,
    incomeTax,
    socialCharges,
    totalTax,
    netAmount,
    steps,
    summary: `Sur un retrait de ${fmt(withdrawalAmount)} ${durationLabel}, vous serez prélevé(e) de ${fmt(totalTax)}. Vous récupérez ${fmt(netAmount)}.`,
    warnings: [],
  }
}

function calculatePEA(input: FiscalInput): FiscalResult {
  const { totalInvested, currentValue, withdrawalAmount, holdingYears } = input
  const { capitalPart, gainsPart } = computeGainsPart(
    withdrawalAmount, totalInvested, currentValue
  )

  const steps: FiscalStep[] = []
  const totalGains = Math.max(0, currentValue - totalInvested)

  steps.push({
    label: 'Plus-values totales du PEA',
    formula: `${fmt(currentValue)} − ${fmt(totalInvested)}`,
    result: fmt(totalGains),
    highlight: 'neutral',
  })

  steps.push({
    label: 'Part de plus-values dans votre retrait',
    formula: `${fmt(withdrawalAmount)} × (${fmt(totalGains)} ÷ ${fmt(currentValue)})`,
    result: fmt(gainsPart),
    highlight: 'neutral',
  })

  let incomeTax: number
  let socialCharges: number

  if (holdingYears < PEA_THRESHOLD_YEARS) {
    incomeTax = gainsPart * PFU_IR_RATE
    socialCharges = gainsPart * SOCIAL_CHARGES_RATE

    steps.push({
      label: `Avant ${PEA_THRESHOLD_YEARS} ans : PFU sur les plus-values`,
      formula: `${fmt(gainsPart)} × ${fmtRate(PFU_RATE)}`,
      result: fmt(incomeTax + socialCharges),
      highlight: 'negative',
    })

    steps.push({
      label: 'Attention : retrait avant 5 ans = clôture du PEA',
      formula: '',
      result: 'Le PEA sera fermé',
      highlight: 'negative',
    })
  } else {
    incomeTax = 0
    socialCharges = gainsPart * SOCIAL_CHARGES_RATE

    steps.push({
      label: `Après ${PEA_THRESHOLD_YEARS} ans : exonération d\u2019impôt sur le revenu`,
      formula: 'IR = 0\u00A0€',
      result: 'Exonéré',
      highlight: 'positive',
    })

    steps.push({
      label: 'Prélèvements sociaux uniquement',
      formula: `${fmt(gainsPart)} × ${fmtRate(SOCIAL_CHARGES_RATE)}`,
      result: fmt(socialCharges),
      highlight: 'negative',
    })
  }

  const totalTax = incomeTax + socialCharges
  const netAmount = withdrawalAmount - totalTax

  steps.push({
    label: 'Total des prélèvements',
    formula: `${fmt(incomeTax)} + ${fmt(socialCharges)}`,
    result: fmt(totalTax),
    highlight: 'negative',
  })

  const durationLabel = holdingYears < PEA_THRESHOLD_YEARS
    ? `avant ${PEA_THRESHOLD_YEARS} ans (PFU + clôture)`
    : `après ${PEA_THRESHOLD_YEARS} ans (PS uniquement)`

  return {
    productLabel: 'PEA',
    withdrawalAmount,
    capitalPart,
    gainsPart,
    abatement: 0,
    taxableGains: gainsPart,
    incomeTax,
    socialCharges,
    totalTax,
    netAmount,
    steps,
    summary: `Sur un retrait de ${fmt(withdrawalAmount)} ${durationLabel}, vous serez prélevé(e) de ${fmt(totalTax)}. Vous récupérez ${fmt(netAmount)}.`,
    warnings: [],
  }
}

function calculatePER(input: FiscalInput): FiscalResult {
  const { totalInvested, currentValue, withdrawalAmount, deducted, tmi } = input
  const { capitalPart, gainsPart } = computeGainsPart(
    withdrawalAmount, totalInvested, currentValue
  )

  const steps: FiscalStep[] = []
  const totalGains = Math.max(0, currentValue - totalInvested)
  const effectiveTMI = tmi ?? 0.30

  steps.push({
    label: 'Plus-values totales du PER',
    formula: `${fmt(currentValue)} − ${fmt(totalInvested)}`,
    result: fmt(totalGains),
    highlight: 'neutral',
  })

  steps.push({
    label: 'Part de plus-values dans votre retrait',
    formula: `${fmt(withdrawalAmount)} × (${fmt(totalGains)} ÷ ${fmt(currentValue)})`,
    result: fmt(gainsPart),
    highlight: 'neutral',
  })

  let incomeTax: number
  let socialCharges: number

  if (deducted) {
    // Versements déduits : capital imposé au barème (TMI) + PS sur PV
    const capitalTax = capitalPart * effectiveTMI
    incomeTax = capitalTax
    socialCharges = gainsPart * SOCIAL_CHARGES_RATE

    steps.push({
      label: 'Versements déduits à l\u2019entrée : le capital est imposé à la sortie',
      formula: `${fmt(capitalPart)} × TMI ${fmtRate(effectiveTMI)}`,
      result: fmt(capitalTax),
      highlight: 'negative',
    })

    steps.push({
      label: 'Prélèvements sociaux sur les plus-values',
      formula: `${fmt(gainsPart)} × ${fmtRate(SOCIAL_CHARGES_RATE)}`,
      result: fmt(socialCharges),
      highlight: 'negative',
    })
  } else {
    // Versements non déduits : seules les PV sont taxées (PS)
    incomeTax = 0
    socialCharges = gainsPart * SOCIAL_CHARGES_RATE

    steps.push({
      label: 'Versements non déduits : le capital sort sans impôt',
      formula: 'IR sur capital = 0\u00A0€',
      result: 'Exonéré',
      highlight: 'positive',
    })

    steps.push({
      label: 'Prélèvements sociaux sur les plus-values uniquement',
      formula: `${fmt(gainsPart)} × ${fmtRate(SOCIAL_CHARGES_RATE)}`,
      result: fmt(socialCharges),
      highlight: 'negative',
    })
  }

  const totalTax = incomeTax + socialCharges
  const netAmount = withdrawalAmount - totalTax

  steps.push({
    label: 'Total des prélèvements',
    formula: `${fmt(incomeTax)} + ${fmt(socialCharges)}`,
    result: fmt(totalTax),
    highlight: 'negative',
  })

  const deductedLabel = deducted
    ? 'versements déduits, TMI ' + fmtRate(effectiveTMI)
    : 'versements non déduits'

  return {
    productLabel: 'PER',
    withdrawalAmount,
    capitalPart,
    gainsPart,
    abatement: 0,
    taxableGains: gainsPart,
    incomeTax,
    socialCharges,
    totalTax,
    netAmount,
    steps,
    summary: `Sur un retrait de ${fmt(withdrawalAmount)} (${deductedLabel}), vous serez prélevé(e) de ${fmt(totalTax)}. Vous récupérez ${fmt(netAmount)}.`,
    warnings: [],
  }
}

function calculateLivretA(input: FiscalInput): FiscalResult {
  const { withdrawalAmount } = input

  const steps: FiscalStep[] = [
    {
      label: 'Exonération totale',
      formula: 'Le Livret A est exonéré d\u2019impôt sur le revenu et de prélèvements sociaux',
      result: '0\u00A0€ d\u2019impôts',
      highlight: 'positive',
    },
  ]

  return {
    productLabel: 'Livret A',
    withdrawalAmount,
    capitalPart: withdrawalAmount,
    gainsPart: 0,
    abatement: 0,
    taxableGains: 0,
    incomeTax: 0,
    socialCharges: 0,
    totalTax: 0,
    netAmount: withdrawalAmount,
    steps,
    summary: `Votre retrait de ${fmt(withdrawalAmount)} est totalement exonéré. Vous récupérez ${fmt(withdrawalAmount)}.`,
    warnings: [],
  }
}

// --- Point d'entrée ---
export function calculateFiscalResult(input: FiscalInput): FiscalResult {
  // Clamp withdrawal to currentValue to prevent impossible scenarios
  const safeInput: FiscalInput = {
    ...input,
    withdrawalAmount: Math.min(input.withdrawalAmount, input.currentValue),
  }

  // Validate and collect warnings
  const { warnings } = validateInput(safeInput)

  let result: FiscalResult
  switch (safeInput.product) {
    case 'assurance-vie':
      result = calculateAV(safeInput)
      break
    case 'pea':
      result = calculatePEA(safeInput)
      break
    case 'per':
      result = calculatePER(safeInput)
      break
    case 'livret-a':
      result = calculateLivretA(safeInput)
      break
  }

  // Merge warnings from validation into result
  result.warnings = [...warnings, ...result.warnings]
  return result
}
