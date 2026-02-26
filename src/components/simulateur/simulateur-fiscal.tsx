'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { motion, useReducedMotion } from 'motion/react'
import { Calculator, RotateCcw, User } from 'lucide-react'

import {
  calculateFiscalResult,
  type FiscalInput,
  type FiscalResult,
  type ProductType,
} from '@/lib/fiscal-rules'

// --- Types ---
type Step =
  | 'welcome'
  | 'product'
  | 'duration'
  | 'amounts'
  | 'av-situation'
  | 'per-deducted'
  | 'per-tmi'
  | 'result'

interface Message {
  id: string
  sender: 'bot' | 'user'
  content: React.ReactNode
}

// --- Product labels ---
const PRODUCT_OPTIONS: { value: ProductType; label: string }[] = [
  { value: 'assurance-vie', label: 'Assurance-vie' },
  { value: 'pea', label: 'PEA' },
  { value: 'per', label: 'PER' },
  { value: 'livret-a', label: 'Livret A' },
]

const DURATION_OPTIONS = [
  { label: 'Moins de 2 ans', value: 1 },
  { label: '2 à 5 ans', value: 4 },
  { label: '5 à 8 ans', value: 6 },
  { label: 'Plus de 8 ans', value: 10 },
]

const TMI_OPTIONS = [
  { label: '0\u00A0%', value: 0 },
  { label: '11\u00A0%', value: 0.11 },
  { label: '30\u00A0%', value: 0.30 },
  { label: '41\u00A0%', value: 0.41 },
  { label: '45\u00A0%', value: 0.45 },
]

// --- Helpers ---
function fmt(n: number): string {
  return Math.round(n).toLocaleString('fr-FR') + '\u00A0€'
}

let messageCounter = 0
function nextId(): string {
  return `msg-${++messageCounter}`
}

// --- Bot message bubble ---
function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ep-primary/10">
        <Calculator className="size-4 text-ep-primary" aria-hidden />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-ep-bg-blue-subtle px-4 py-3 text-sm leading-relaxed text-ep-text-primary">
        {children}
      </div>
    </div>
  )
}

// --- User message bubble ---
function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-2">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-ep-primary/10 px-4 py-2.5 text-sm font-medium text-ep-primary">
          {children}
        </div>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ep-primary/10">
          <User className="size-4 text-ep-primary" aria-hidden />
        </div>
      </div>
    </div>
  )
}

// --- Choice buttons ---
function ChoiceButtons({
  options,
  onSelect,
}: {
  options: { label: string; value: string | number }[]
  onSelect: (value: string | number) => void
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          onClick={() => onSelect(opt.value)}
          className="inline-flex min-h-[44px] items-center rounded-full border border-ep-separator bg-white px-4 py-2 text-sm font-medium text-ep-text-primary transition-all duration-200 hover:border-ep-primary hover:bg-ep-primary/5 hover:text-ep-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// --- Amount form ---
function AmountForm({
  onSubmit,
  product,
}: {
  onSubmit: (invested: number, current: number, withdrawal: number) => void
  product: ProductType
}) {
  const [invested, setInvested] = useState('')
  const [current, setCurrent] = useState('')
  const [withdrawal, setWithdrawal] = useState('')
  const [useTotal, setUseTotal] = useState(true)

  const isLivret = product === 'livret-a'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const inv = Number(invested) || 0
    const cur = isLivret ? inv : (Number(current) || 0)
    const w = useTotal ? cur : (Number(withdrawal) || 0)
    if (inv <= 0) return
    if (!isLivret && cur <= 0) return
    onSubmit(inv, cur, w)
  }

  const inputClass =
    'h-11 w-full rounded-lg border border-ep-separator bg-white px-3 text-sm text-ep-text-primary transition-colors focus:border-ep-primary focus:outline-none focus:ring-1 focus:ring-ep-primary'

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3">
      <div>
        <label htmlFor="sim-invested" className="mb-1 block text-xs font-medium text-ep-text-muted">
          {isLivret ? 'Montant à retirer' : 'Montant total versé'}
        </label>
        <div className="relative">
          <input
            id="sim-invested"
            type="number"
            min={1}
            step="any"
            placeholder={isLivret ? 'Ex : 5 000' : 'Ex : 40 000'}
            value={invested}
            onChange={(e) => setInvested(e.target.value)}
            className={inputClass}
            required
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ep-text-muted">€</span>
        </div>
      </div>

      {!isLivret && (
        <>
          <div>
            <label htmlFor="sim-current" className="mb-1 block text-xs font-medium text-ep-text-muted">
              Valeur actuelle du placement
            </label>
            <div className="relative">
              <input
                id="sim-current"
                type="number"
                min={1}
                step="any"
                placeholder="Ex : 50 000"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className={inputClass}
                required
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ep-text-muted">€</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-ep-text-muted">
              Montant à retirer
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setUseTotal(true)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  useTotal
                    ? 'border-ep-primary bg-ep-primary/10 text-ep-primary'
                    : 'border-ep-separator text-ep-text-muted hover:border-ep-primary'
                }`}
              >
                Tout retirer
              </button>
              <button
                type="button"
                onClick={() => setUseTotal(false)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  !useTotal
                    ? 'border-ep-primary bg-ep-primary/10 text-ep-primary'
                    : 'border-ep-separator text-ep-text-muted hover:border-ep-primary'
                }`}
              >
                Retrait partiel
              </button>
            </div>
            {!useTotal && (
              <div className="relative mt-2">
                <input
                  type="number"
                  min={1}
                  step="any"
                  placeholder="Ex : 10 000"
                  value={withdrawal}
                  onChange={(e) => setWithdrawal(e.target.value)}
                  className={inputClass}
                  required
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ep-text-muted">€</span>
              </div>
            )}
          </div>
        </>
      )}

      <button
        type="submit"
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-ep-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-ep-primary-hover hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
      >
        Calculer
      </button>
    </form>
  )
}

// --- Result card ---
function ResultCard({ result }: { result: FiscalResult }) {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-ep-separator bg-white">
      {/* Header */}
      <div className="border-b border-ep-separator bg-ep-bg-blue-subtle px-5 py-4">
        <p className="text-sm font-bold text-ep-primary">
          Votre simulation fiscale
        </p>
        <p className="mt-0.5 text-xs text-ep-text-muted">
          {result.productLabel} · retrait de {fmt(result.withdrawalAmount)}
        </p>
      </div>

      {/* Steps */}
      <div className="px-5 py-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ep-text-muted">
          Détail du calcul
        </p>
        <ol className="space-y-3">
          {result.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ep-primary/10 text-xs font-bold text-ep-primary">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ep-text-primary">
                  {step.label}
                </p>
                {step.formula && (
                  <p className="mt-0.5 text-xs text-ep-text-muted">
                    {step.formula}
                  </p>
                )}
                <p
                  className={`mt-0.5 text-sm font-semibold ${
                    step.highlight === 'positive'
                      ? 'text-emerald-600'
                      : step.highlight === 'negative'
                        ? 'text-red-500'
                        : 'text-ep-text-primary'
                  }`}
                >
                  {step.result}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Summary cards */}
      <div className="border-t border-ep-separator px-5 py-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-ep-bg-blue-subtle p-3 text-center">
            <p className="text-xs text-ep-text-muted">Retiré</p>
            <p className="mt-1 text-base font-bold text-ep-text-primary">
              {fmt(result.withdrawalAmount)}
            </p>
          </div>
          <div className="rounded-xl bg-red-50 p-3 text-center">
            <p className="text-xs text-ep-text-muted">Impôts</p>
            <p className="mt-1 text-base font-bold text-red-500">
              {fmt(result.totalTax)}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 text-center">
            <p className="text-xs text-ep-text-muted">Net perçu</p>
            <p className="mt-1 text-base font-bold text-emerald-600">
              {fmt(result.netAmount)}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-ep-separator px-5 py-3">
        <p className="text-[11px] leading-relaxed text-ep-text-muted/70">
          Simulation indicative basée sur les règles fiscales en vigueur.
          Ne constitue pas un conseil en investissement. Consultez un
          professionnel pour votre situation personnelle.
        </p>
      </div>
    </div>
  )
}

// --- Main component ---
export function SimulateurFiscal() {
  const prefersReduced = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState<Step>('welcome')
  const [result, setResult] = useState<FiscalResult | null>(null)

  // Collected data
  const [product, setProduct] = useState<ProductType | null>(null)
  const [holdingYears, setHoldingYears] = useState<number>(0)
  const [situation, setSituation] = useState<'single' | 'couple'>('single')
  const [deducted, setDeducted] = useState<boolean>(true)
  const [tmi, setTmi] = useState<number>(0.30)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: prefersReduced ? 'auto' : 'smooth',
      })
    }
  }, [messages, step, prefersReduced])

  // Add messages helper
  const addBot = useCallback((content: React.ReactNode) => {
    setMessages((prev) => [...prev, { id: nextId(), sender: 'bot', content }])
  }, [])

  const addUser = useCallback((content: React.ReactNode) => {
    setMessages((prev) => [...prev, { id: nextId(), sender: 'user', content }])
  }, [])

  // Start on mount (guard against React strict mode double-fire)
  const hasInitRef = useRef(false)
  useEffect(() => {
    if (hasInitRef.current) return
    hasInitRef.current = true

    addBot(
      <>
        <p className="font-semibold">Bienvenue dans le simulateur fiscal !</p>
        <p className="mt-1">
          Je vais vous expliquer, étape par étape, combien vous paierez
          d'impôts sur un retrait de votre épargne. Aucun conseil ici, que
          du calcul factuel sur les règles publiques.
        </p>
      </>
    )
    setTimeout(() => {
      addBot('Quel placement souhaitez-vous simuler ?')
      setStep('product')
    }, 400)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --- Step handlers ---
  const handleProduct = useCallback(
    (value: string | number) => {
      const p = value as ProductType
      const label = PRODUCT_OPTIONS.find((o) => o.value === p)?.label ?? p
      setProduct(p)
      addUser(label)

      if (p === 'livret-a') {
        // Skip duration, go straight to amounts
        setTimeout(() => {
          addBot(
            'Le Livret A est totalement exonéré. Indiquez le montant que vous souhaitez retirer pour voir le résultat.'
          )
          setStep('amounts')
        }, 300)
      } else {
        setTimeout(() => {
          addBot(`Depuis combien de temps détenez-vous votre ${label} ?`)
          setStep('duration')
        }, 300)
      }
    },
    [addBot, addUser]
  )

  const handleDuration = useCallback(
    (value: string | number) => {
      const years = Number(value)
      setHoldingYears(years)
      const label = DURATION_OPTIONS.find((o) => o.value === years)?.label ?? `${years} ans`
      addUser(label)

      setTimeout(() => {
        addBot('Parfait. Renseignez maintenant les montants de votre placement.')
        setStep('amounts')
      }, 300)
    },
    [addBot, addUser]
  )

  const handleAmounts = useCallback(
    (invested: number, current: number, withdrawal: number) => {
      if (product === 'livret-a') {
        addUser(`Retrait de ${fmt(invested)}`)

        const fiscalResult = calculateFiscalResult({
          product: 'livret-a',
          totalInvested: invested,
          currentValue: invested,
          withdrawalAmount: invested,
          holdingYears: 0,
        })
        setResult(fiscalResult)
        setTimeout(() => setStep('result'), 300)
        return
      }

      addUser(
        `Versé : ${fmt(invested)} · Valeur : ${fmt(current)} · Retrait : ${fmt(withdrawal)}`
      )

      // Determine if we need extra questions
      if (product === 'assurance-vie' && holdingYears >= 8) {
        setTimeout(() => {
          addBot(
            'Après 8 ans, vous bénéficiez d\u2019un abattement qui dépend de votre situation. Êtes-vous\u00A0:'
          )
          setStep('av-situation')
        }, 300)
      } else if (product === 'per') {
        setTimeout(() => {
          addBot(
            'Vos versements sur le PER ont-ils été déduits de votre revenu imposable\u00A0?'
          )
          setStep('per-deducted')
        }, 300)
      } else {
        // Calculate directly
        const fiscalResult = calculateFiscalResult({
          product: product!,
          totalInvested: invested,
          currentValue: current,
          withdrawalAmount: withdrawal,
          holdingYears,
        })
        setResult(fiscalResult)
        setTimeout(() => setStep('result'), 300)
      }
    },
    [product, holdingYears, addBot, addUser]
  )

  const handleAVSituation = useCallback(
    (value: string | number) => {
      const s = value as 'single' | 'couple'
      setSituation(s)
      addUser(s === 'single' ? 'Seul(e)' : 'En couple')

      // We need to retrieve amounts from the last user message
      // Calculate with stored state — amounts were captured in the form
      setStep('result')
    },
    [addUser]
  )

  const handlePERDeducted = useCallback(
    (value: string | number) => {
      const d = value === 'yes'
      setDeducted(d)
      addUser(d ? 'Oui, déduits' : 'Non, pas déduits')

      if (d) {
        setTimeout(() => {
          addBot('Quelle est votre tranche marginale d\u2019imposition (TMI)\u00A0?')
          setStep('per-tmi')
        }, 300)
      } else {
        setStep('result')
      }
    },
    [addBot, addUser]
  )

  const handlePERTmi = useCallback(
    (value: string | number) => {
      const t = Number(value)
      setTmi(t)
      const label = TMI_OPTIONS.find((o) => o.value === t)?.label ?? `${t * 100}%`
      addUser(`TMI : ${label}`)
      setStep('result')
    },
    [addUser]
  )

  // Store amounts for later use (AV situation / PER questions come after)
  const amountsRef = useRef({ invested: 0, current: 0, withdrawal: 0 })

  const handleAmountsWithStore = useCallback(
    (invested: number, current: number, withdrawal: number) => {
      amountsRef.current = { invested, current, withdrawal }
      handleAmounts(invested, current, withdrawal)
    },
    [handleAmounts]
  )

  // Compute result when step reaches 'result' and result is not yet set
  useEffect(() => {
    if (step === 'result' && !result && product) {
      const { invested, current, withdrawal } = amountsRef.current
      const fiscalResult = calculateFiscalResult({
        product,
        totalInvested: invested,
        currentValue: current,
        withdrawalAmount: withdrawal,
        holdingYears,
        situation: product === 'assurance-vie' ? situation : undefined,
        deducted: product === 'per' ? deducted : undefined,
        tmi: product === 'per' ? tmi : undefined,
      })
      setResult(fiscalResult)
    }
  }, [step, result, product, holdingYears, situation, deducted, tmi])

  // Reset
  const handleReset = useCallback(() => {
    setMessages([])
    setStep('welcome')
    setResult(null)
    setProduct(null)
    setHoldingYears(0)
    setSituation('single')
    setDeducted(true)
    setTmi(0.30)
    amountsRef.current = { invested: 0, current: 0, withdrawal: 0 }

    // Restart
    setTimeout(() => {
      addBot(
        <>
          <p className="font-semibold">On recommence !</p>
          <p className="mt-1">Quel placement souhaitez-vous simuler ?</p>
        </>
      )
      setStep('product')
    }, 200)
  }, [addBot])

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col">
      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 md:px-6"
        role="log"
        aria-label="Conversation avec le simulateur fiscal"
      >
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {msg.sender === 'bot' ? (
                <BotBubble>{msg.content}</BotBubble>
              ) : (
                <UserBubble>{msg.content}</UserBubble>
              )}
            </motion.div>
          ))}

          {/* Interactive controls based on current step */}
          {step === 'product' && (
            <motion.div
              initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="pl-11"
            >
              <ChoiceButtons
                options={PRODUCT_OPTIONS.map((o) => ({
                  label: o.label,
                  value: o.value,
                }))}
                onSelect={handleProduct}
              />
            </motion.div>
          )}

          {step === 'duration' && (
            <motion.div
              initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="pl-11"
            >
              <ChoiceButtons
                options={DURATION_OPTIONS.map((o) => ({
                  label: o.label,
                  value: o.value,
                }))}
                onSelect={handleDuration}
              />
            </motion.div>
          )}

          {step === 'amounts' && (
            <motion.div
              initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="pl-11"
            >
              <AmountForm
                onSubmit={handleAmountsWithStore}
                product={product!}
              />
            </motion.div>
          )}

          {step === 'av-situation' && (
            <motion.div
              initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="pl-11"
            >
              <ChoiceButtons
                options={[
                  { label: 'Seul(e)', value: 'single' },
                  { label: 'En couple', value: 'couple' },
                ]}
                onSelect={handleAVSituation}
              />
            </motion.div>
          )}

          {step === 'per-deducted' && (
            <motion.div
              initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="pl-11"
            >
              <ChoiceButtons
                options={[
                  { label: 'Oui, déduits', value: 'yes' },
                  { label: 'Non, pas déduits', value: 'no' },
                ]}
                onSelect={handlePERDeducted}
              />
            </motion.div>
          )}

          {step === 'per-tmi' && (
            <motion.div
              initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="pl-11"
            >
              <ChoiceButtons
                options={TMI_OPTIONS.map((o) => ({
                  label: o.label,
                  value: o.value,
                }))}
                onSelect={handlePERTmi}
              />
            </motion.div>
          )}

          {step === 'result' && result && (
            <motion.div
              initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <BotBubble>Voici le détail de votre simulation :</BotBubble>
              <div className="mt-3 pl-11">
                <ResultCard result={result} />
                <button
                  onClick={handleReset}
                  className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ep-separator bg-white px-5 py-2.5 text-sm font-medium text-ep-text-primary transition-all duration-200 hover:border-ep-primary hover:text-ep-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
                >
                  <RotateCcw className="size-4" aria-hidden />
                  Nouvelle simulation
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
