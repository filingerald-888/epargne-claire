import { HeroSection } from '@/components/homepage/hero-section'
import { FounderSection } from '@/components/homepage/founder-section'
import { ObjectifsSection } from '@/components/homepage/objectifs-section'
import { ProduitsSection } from '@/components/homepage/produits-section'
import { RdvSection } from '@/components/homepage/rdv-section'
import { ComparerSection } from '@/components/homepage/comparer-section'
import { GlossaireSection } from '@/components/homepage/glossaire-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FounderSection />
      <ObjectifsSection />
      <ProduitsSection />
      <RdvSection />
      <ComparerSection />
      <GlossaireSection />
    </>
  )
}
