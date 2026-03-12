# EpargneClaire — Inventaire des composants

> Dernière mise à jour : 2026-03-12

## Résumé

**104 composants React** répartis en **14 catégories**. L'architecture suit un pattern de composants spécialisés par page/fonctionnalité, avec une couche de primitives UI partagées (Radix/shadcn) et des composants produit réutilisables via MDX.

---

## Layout (5 composants)

Composants structurels présents sur toutes les pages.

| Composant | Fichier | Description |
|---|---|---|
| StickyHeader | `layout/sticky-header.tsx` | Barre de navigation avec détection du scroll, menu mobile overlay, réaction à la visibilité du hero |
| Footer | `layout/footer.tsx` | Pied de page avec liens + disclaimer légal |
| SkipLink | `layout/skip-link.tsx` | Lien d'accessibilité "aller au contenu principal" |
| ScrollToTop | `layout/scroll-to-top.tsx` | Bouton flottant retour en haut |
| AppTooltipProvider | `layout/tooltip-provider.tsx` | Provider Radix UI Tooltip (wraps app) |

---

## UI Primitives — shadcn/Radix (8 composants)

Composants accessibles de base, utilisés partout dans l'application.

| Composant | Fichier | Base | Variants |
|---|---|---|---|
| Button | `ui/button.tsx` | Radix Slot + CVA | default, secondary, ghost, destructive, outline, link |
| Card | `ui/card.tsx` | HTML natif | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| Dialog | `ui/dialog.tsx` | Radix Dialog | Overlay, Content, Header, Footer, Title, Description |
| Accordion | `ui/accordion.tsx` | Radix Accordion | Item, Trigger, Content |
| Select | `ui/select.tsx` | Radix Select | Trigger, Content, Item, Group, Label, Separator |
| Table | `ui/table.tsx` | HTML natif | Table, Header, Body, Footer, Row, Head, Cell, Caption |
| Badge | `ui/badge.tsx` | CVA | default, secondary, destructive, outline |
| Tooltip | `ui/tooltip.tsx` | Radix Tooltip | Provider, Root, Trigger, Content |

---

## Homepage (10 composants)

Sections de la page d'accueil, rendues séquentiellement.

| Composant | Fichier | Description | Interactif |
|---|---|---|---|
| HeroSection | `homepage/hero-section.tsx` | Hero principal avec animation motion | Non |
| FounderSection | `homepage/founder-section.tsx` | Présentation de l'auteur | Non |
| InflationLossSection | `homepage/inflation-loss-section.tsx` | Slider interactif perte à l'inflation | **Oui** (slider) |
| ObjectifsSection | `homepage/objectifs-section.tsx` | Grille 4 cartes objectifs patrimoniaux | Non |
| ProduitsSection | `homepage/produits-section.tsx` | Carrousel des produits | Non |
| RdvSection | `homepage/rdv-section.tsx` | CTA préparation rendez-vous | Non |
| ComparerSection | `homepage/comparer-section.tsx` | CTA comparateur | Non |
| GlossaireSection | `homepage/glossaire-section.tsx` | CTA glossaire | Non |
| CarouselSection | `homepage/carousel-section.tsx` | Wrapper carrousel réutilisable | Non |
| FloatingSimulateur | `homepage/floating-simulateur.tsx` | Bouton flottant sticky vers le simulateur | Non |

---

## Composants produit — Partagés (17 composants)

Composants réutilisables dans toutes les fiches produit MDX.

| Composant | Fichier | Description |
|---|---|---|
| ProductHero | `product/product-hero.tsx` | Hero parallax avec image, date, temps de lecture, badges objectifs |
| ProductClosing | `product/product-closing.tsx` | Section CTA de fermeture |
| StrongPhrase | `product/strong-phrase.tsx` | Titre de section avec animation scale et gradient optionnel |
| SplitComparison | `product/split-comparison.tsx` | Comparaison en deux colonnes côte à côte |
| SpectrumBar | `product/spectrum-bar.tsx` | Barre visuelle de spectre sécuritaire → risqué |
| FeatureGrid | `product/feature-grid.tsx` | Grille de caractéristiques avec icônes |
| KeyFigure | `product/key-figure.tsx` | Chiffre clé mis en valeur |
| FiscalTimeline | `product/fiscal-timeline.tsx` | Frise chronologique des événements fiscaux |
| FiscalExample | `product/fiscal-example.tsx` | Exemple de calcul fiscal |
| FeeComparison | `product/fee-comparison.tsx` | Tableau comparatif de frais |
| PlacementExample | `product/placement-example.tsx` | Exemple d'allocation/placement |
| JourneyTimeline | `product/journey-timeline.tsx` | Parcours d'investissement générique |
| PersonaCards | `product/persona-cards.tsx` | Grille de profils investisseurs |
| TransmissionComparison | `product/transmission-comparison.tsx` | Comparaison transmission |
| ExampleBlock | `content/example-block.tsx` | Bloc exemple mis en évidence |
| DisclaimerBanner | `content/disclaimer-banner.tsx` | Bannière d'avertissement/disclaimer |
| GlossaryTooltip | `content/glossary-tooltip.tsx` | Tooltip avec définition du glossaire |

---

## Composants produit — Spécifiques (24 composants)

Composants dédiés à un produit, utilisés uniquement dans le MDX correspondant.

### Assurance-vie (2)

| Composant | Fichier |
|---|---|
| AvMythBuster | `product/av-myth-buster.tsx` |
| AvRiskGrid | `product/av-risk-grid.tsx` |

### PEA (6)

| Composant | Fichier |
|---|---|
| PeaGrowthSimulator | `product/pea-growth-simulator.tsx` |
| PeaJourneyTimeline | `product/pea-journey-timeline.tsx` |
| PeaMythBuster | `product/pea-myth-buster.tsx` |
| PeaRiskGrid | `product/pea-risk-grid.tsx` |
| PeaPersonaCards | `product/pea-persona-cards.tsx` |
| PeaEligibleInvestments | `product/pea-eligible-investments.tsx` |

### PER (7)

| Composant | Fichier |
|---|---|
| PerTaxSavingsExample | `product/per-tax-savings-example.tsx` |
| PerUnlockCases | `product/per-unlock-cases.tsx` |
| PerExitOptions | `product/per-exit-options.tsx` |
| PerJourneyTimeline | `product/per-journey-timeline.tsx` |
| PerMythBuster | `product/per-myth-buster.tsx` |
| PerPersonaCards | `product/per-persona-cards.tsx` |
| PerRiskGrid | `product/per-risk-grid.tsx` |

### Livret A / LDDS (6)

| Composant | Fichier |
|---|---|
| LivretConcreteExample | `product/livret-concrete-example.tsx` |
| LivretEmergencyJourney | `product/livret-emergency-journey.tsx` |
| LivretPersonaCards | `product/livret-persona-cards.tsx` |
| LivretRateExplainer | `product/livret-rate-explainer.tsx` |
| LivretTaxComparison | `product/livret-tax-comparison.tsx` |
| LivretSocialImpact | `product/livret-social-impact.tsx` |

### SCPI (6)

| Composant | Fichier |
|---|---|
| ScpiHowItWorks | `product/scpi-how-it-works.tsx` |
| ScpiTypeCards | `product/scpi-type-cards.tsx` |
| ScpiPersonaCards | `product/scpi-persona-cards.tsx` |
| ScpiMythBuster | `product/scpi-myth-buster.tsx` |
| ScpiRiskGrid | `product/scpi-risk-grid.tsx` |
| ScpiJourneyTimeline | `product/scpi-journey-timeline.tsx` |

---

## Composants contenu MDX (5 composants)

Composants de mise en forme du contenu éditorial.

| Composant | Fichier | Description |
|---|---|---|
| ProductSection | `content/product-section.tsx` | Wrapper de section avec fond optionnel (`primary-subtle`) |
| ReadingTime | `content/reading-time.tsx` | Affichage du temps de lecture estimé |
| TableOfContents | `content/table-of-contents.tsx` | Table des matières auto-générée depuis les headings |
| DisclaimerBanner | `content/disclaimer-banner.tsx` | Bannière d'avertissement |
| ExampleBlock | `content/example-block.tsx` | Bloc exemple surligné |

---

## Objectifs (7 composants)

| Composant | Fichier | Description |
|---|---|---|
| ObjectifHero | `objectif/objectif-hero.tsx` | Hero avec emoji, titre, image |
| ObjectifKeyFigure | `objectif/objectif-key-figure.tsx` | Chiffre clé |
| ObjectifChecklist | `objectif/objectif-checklist.tsx` | Checklist étape par étape |
| ObjectifLevers | `objectif/objectif-levers.tsx` | Grille d'icônes des leviers |
| ObjectifProducts | `objectif/objectif-products.tsx` | Cartes produits recommandés |
| ObjectifClosing | `objectif/objectif-closing.tsx` | CTA vers l'objectif suivant |
| ObjectifNav | `objectif/objectif-nav.tsx` | Navigation circulaire entre les 4 objectifs |

---

## Listing produits (4 composants)

| Composant | Fichier | Description |
|---|---|---|
| ProduitsHero | `produits/produits-hero.tsx` | Hero de la page listing |
| ProduitsFilterSection | `produits/produits-filter-section.tsx` | Filtres par objectif |
| ProduitsCoupDoeilSection | `produits/produits-coup-doeil-section.tsx` | Tableau récapitulatif |
| ProduitsClosing | `produits/produits-closing.tsx` | CTA de fermeture |

---

## Comparateur (3 composants)

| Composant | Fichier | Description |
|---|---|---|
| ComparateurHero | `comparateur/comparateur-hero.tsx` | Hero de la page |
| ComparateurPageClient | `comparateur/comparateur-page.tsx` | Tableau comparatif interactif (client component) |
| ComparateurResult | `comparateur/comparateur-result.tsx` | Affichage des résultats |

---

## Glossaire (5 composants)

| Composant | Fichier | Description |
|---|---|---|
| GlossaireHero | `glossaire/glossaire-hero.tsx` | Hero avec compteur de termes |
| GlossaireContent | `glossaire/glossaire-content.tsx` | Entrées termes regroupées par lettre |
| GlossaireAlphabetNav | `glossaire/glossaire-alphabet-nav.tsx` | Navigation A-Z |
| GlossaireHashScroll | `glossaire/glossaire-hash-scroll.tsx` | Scroll vers ancre #lettre |
| GlossaireClosing | `glossaire/glossaire-closing.tsx` | CTA de fermeture |

---

## RDV (6 composants)

| Composant | Fichier | Description |
|---|---|---|
| RdvHero | `rdv/rdv-hero.tsx` | Hero de la page |
| RdvNavTabs | `rdv/rdv-nav-tabs.tsx` | Onglets navigation entre les 3 pages RDV |
| RdvQuestionCard | `rdv/rdv-question-card.tsx` | Carte question/réponse |
| RdvAlertCard | `rdv/rdv-alert-card.tsx` | Carte alerte/avertissement |
| RdvChecklistCard | `rdv/rdv-checklist-card.tsx` | Section checklist |
| RdvClosing | `rdv/rdv-closing.tsx` | CTA de fermeture |

---

## À propos (6 composants)

| Composant | Fichier | Description |
|---|---|---|
| AProposHero | `a-propos/a-propos-hero.tsx` | Hero de la page |
| AProposHistoire | `a-propos/a-propos-histoire.tsx` | Section histoire du fondateur |
| AProposDemarche | `a-propos/a-propos-demarche.tsx` | Section approche/méthodologie (piliers) |
| AProposPositionnement | `a-propos/a-propos-positionnement.tsx` | Sections "ce que je suis" / "ce que je ne suis pas" |
| AProposParcours | `a-propos/a-propos-parcours.tsx` | Expérience, compétences, formation, langues |
| AProposClosing | `a-propos/a-propos-closing.tsx` | CTA de fermeture |

---

## Mentions légales (1 composant)

| Composant | Fichier | Description |
|---|---|---|
| MentionsLegalesHero | `mentions-legales/mentions-legales-hero.tsx` | Affichage des sections légales |

---

## Simulateur (1 composant)

| Composant | Fichier | Description |
|---|---|---|
| SimulateurFiscal | `simulateur/simulateur-fiscal.tsx` | Simulateur fiscal interactif complet (client component, formulaire + calcul + affichage) |

---

## SEO (1 composant)

| Composant | Fichier | Description |
|---|---|---|
| JsonLd | `seo/json-ld.tsx` | Injecteur de schémas JSON-LD |

---

## Enregistrement MDX

Tous les composants utilisables dans les fichiers MDX sont enregistrés dans `src/mdx-components.tsx` :

- **Headings personnalisés** : `h2`, `h3` (auto-slugification pour ancres)
- **Contenu** : GlossaryTooltip, ExampleBlock, DisclaimerBanner, ReadingTime, ProductSection
- **Produit partagés** : StrongPhrase, SplitComparison, SpectrumBar, FeatureGrid, KeyFigure, FiscalTimeline, FeeComparison, FiscalExample, PlacementExample, ProductClosing, TransmissionComparison, JourneyTimeline, PersonaCards
- **Produit spécifiques** : 24 composants (Per*, Livret*, Av*, Pea*, Scpi*)
- **RDV** : RdvQuestionCard, RdvAlertCard, RdvChecklistCard, RdvClosing
