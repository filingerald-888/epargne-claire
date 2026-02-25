import type { MDXComponents } from "mdx/types"
import type { ComponentPropsWithoutRef } from "react"

import { DisclaimerBanner } from "@/components/content/disclaimer-banner"
import { ExampleBlock } from "@/components/content/example-block"
import { GlossaryTooltip } from "@/components/content/glossary-tooltip"
import { ProductSection } from "@/components/content/product-section"
import { ReadingTime } from "@/components/content/reading-time"
import { FeeComparison } from "@/components/product/fee-comparison"
import { Feature, FeatureGrid } from "@/components/product/feature-grid"
import { FiscalTimeline } from "@/components/product/fiscal-timeline"
import { KeyFigure } from "@/components/product/key-figure"
import { ProductClosing } from "@/components/product/product-closing"
import { SpectrumBar } from "@/components/product/spectrum-bar"
import { SplitComparison, SplitItem } from "@/components/product/split-comparison"
import { StrongPhrase } from "@/components/product/strong-phrase"
import { FiscalExample } from "@/components/product/fiscal-example"
import { PlacementExample } from "@/components/product/placement-example"
import { TransmissionComparison } from "@/components/product/transmission-comparison"
import { JourneyTimeline } from "@/components/product/journey-timeline"
import { PersonaCards } from "@/components/product/persona-cards"
import { PerExitOptions } from "@/components/product/per-exit-options"
import { PerMythBuster } from "@/components/product/per-myth-buster"
import { PerRiskGrid } from "@/components/product/per-risk-grid"
import { PerJourneyTimeline } from "@/components/product/per-journey-timeline"
import { PerPersonaCards } from "@/components/product/per-persona-cards"
import { PerTaxSavingsExample } from "@/components/product/per-tax-savings-example"
import { PerUnlockCases } from "@/components/product/per-unlock-cases"
import { LivretConcreteExample } from "@/components/product/livret-concrete-example"
import { LivretPersonaCards } from "@/components/product/livret-persona-cards"
import { LivretRateExplainer } from "@/components/product/livret-rate-explainer"
import { LivretTaxComparison } from "@/components/product/livret-tax-comparison"
import { LivretSocialImpact } from "@/components/product/livret-social-impact"
import { LivretEmergencyJourney } from "@/components/product/livret-emergency-journey"
import { AvMythBuster } from "@/components/product/av-myth-buster"
import { AvRiskGrid } from "@/components/product/av-risk-grid"
import { PeaEligibleInvestments } from "@/components/product/pea-eligible-investments"
import { PeaGrowthSimulator } from "@/components/product/pea-growth-simulator"
import { PeaJourneyTimeline } from "@/components/product/pea-journey-timeline"
import { PeaMythBuster } from "@/components/product/pea-myth-buster"
import { PeaRiskGrid } from "@/components/product/pea-risk-grid"
import { PeaPersonaCards } from "@/components/product/pea-persona-cards"
import { RdvQuestionCard } from "@/components/rdv/rdv-question-card"
import { RdvAlertCard } from "@/components/rdv/rdv-alert-card"
import { RdvChecklistCard } from "@/components/rdv/rdv-checklist-card"
import { RdvClosing } from "@/components/rdv/rdv-closing"
import { slugify, textContent } from "@/lib/utils"

function H2(props: ComponentPropsWithoutRef<"h2">) {
  const id = props.id ?? slugify(textContent(props.children))
  return (
    <h2
      {...props}
      id={id}
      className="text-[1.75rem] font-semibold leading-tight md:text-[2.25rem]"
    />
  )
}

function H3(props: ComponentPropsWithoutRef<"h3">) {
  const id = props.id ?? slugify(textContent(props.children))
  return <h3 {...props} id={id} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: H2,
    h3: H3,
    GlossaryTooltip,
    ExampleBlock,
    DisclaimerBanner,
    ReadingTime,
    ProductSection,
    StrongPhrase,
    SplitComparison,
    SplitItem,
    SpectrumBar,
    FeatureGrid,
    Feature,
    KeyFigure,
    FiscalTimeline,
    FeeComparison,
    FiscalExample,
    PlacementExample,
    ProductClosing,
    TransmissionComparison,
    JourneyTimeline,
    PersonaCards,
    PerTaxSavingsExample,
    PerPersonaCards,
    PerUnlockCases,
    PerExitOptions,
    PerMythBuster,
    PerRiskGrid,
    PerJourneyTimeline,
    LivretConcreteExample,
    LivretPersonaCards,
    LivretRateExplainer,
    LivretTaxComparison,
    LivretSocialImpact,
    LivretEmergencyJourney,
    AvMythBuster,
    AvRiskGrid,
    PeaGrowthSimulator,
    PeaPersonaCards,
    PeaEligibleInvestments,
    PeaMythBuster,
    PeaRiskGrid,
    PeaJourneyTimeline,
    RdvQuestionCard,
    RdvAlertCard,
    RdvChecklistCard,
    RdvClosing,
  }
}
