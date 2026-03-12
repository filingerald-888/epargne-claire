# EpargneClaire — Architecture

> Dernière mise à jour : 2026-03-12

## Résumé exécutif

EpargneClaire est une application web statique (SSG) construite avec Next.js 16 App Router. L'architecture suit un pattern **content-driven component-based** : le contenu éditorial est rédigé en MDX et rendu via un système de 50+ composants React spécialisés. Il n'y a ni API backend, ni base de données, ni authentification — toutes les données sont statiques (TypeScript/JSON).

## Pattern architectural

```
┌─────────────────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                │
│                                                     │
│  ┌─────────┐  ┌──────────┐  ┌────────────────────┐ │
│  │ Layout  │  │  Pages   │  │   Métadonnées SEO  │ │
│  │ (root)  │  │ (routes) │  │ (sitemap, OG, LD)  │ │
│  └────┬────┘  └────┬─────┘  └────────────────────┘ │
│       │            │                                │
│  ┌────▼────────────▼──────────────────────────────┐ │
│  │              COMPOSANTS REACT                   │ │
│  │                                                 │ │
│  │  Layout ──── UI Primitives (Radix/shadcn)       │ │
│  │  Homepage ── Sections d'accueil                 │ │
│  │  Product ─── Composants produit (partagés/spé.) │ │
│  │  Content ─── Composants de contenu MDX          │ │
│  │  Objectif ── Pages objectifs patrimoniaux       │ │
│  │  Simulateur ─ Calculateur fiscal interactif     │ │
│  │  Glossaire ── Recherche et affichage termes     │ │
│  │  RDV ──────── Préparation rendez-vous           │ │
│  └────────────────────┬───────────────────────────┘ │
│                       │                             │
│  ┌────────────────────▼───────────────────────────┐ │
│  │              COUCHE DONNÉES                     │ │
│  │                                                 │ │
│  │  MDX ──────── Contenu produits & RDV            │ │
│  │  JSON ─────── Glossaire (termes.json)           │ │
│  │  TypeScript ── Données structurées (lib/*.ts)   │ │
│  │  Types ────── Interfaces (types/*.ts)           │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Routage et pages

| Route | Type | Source de données | Génération |
|---|---|---|---|
| `/` | Page statique | Composants inline | SSG |
| `/produits` | Page statique | `lib/produits-data.ts` | SSG |
| `/produits/[slug]` | Dynamique (5 slugs) | MDX (`content/produits/*.mdx`) | SSG, `dynamicParams: false` |
| `/objectifs/[slug]` | Dynamique (4 slugs) | Données inline (`page.tsx`) | SSG |
| `/comparer` | Page client | `lib/comparateur-data.ts` | SSG + hydration |
| `/simulateur-fiscal` | Page client | `lib/fiscal-rules.ts` | SSG + hydration |
| `/glossaire` | Page statique | `content/glossaire/termes.json` | SSG |
| `/rdv/[slug]` | Dynamique (3 slugs) | MDX (`content/rdv/*.mdx`) | SSG |
| `/a-propos` | Page statique | `lib/a-propos-data.ts` | SSG |
| `/mentions-legales` | Page statique | Données inline | SSG |

**Total : 20 pages générées statiquement** (1 accueil + 5 produits + 4 objectifs + 3 RDV + 1 comparer + 1 simulateur + 1 glossaire + 1 listing produits + 1 à propos + 1 mentions légales + 1 404)

## Système de contenu MDX

### Pipeline de rendu

```
MDX File (frontmatter + contenu)
    │
    ▼
@next/mdx (loader + compiler)
    │
    ▼
mdx-components.tsx (50+ composants enregistrés)
    │
    ▼
React Components (rendu dans la page)
```

### Chargement dynamique des produits

```typescript
// lib/products.ts
const productModules = {
  'assurance-vie': () => import('@/content/produits/assurance-vie.mdx'),
  'pea': () => import('@/content/produits/pea.mdx'),
  // ...
}

// Chaque module exporte : default (Component) + frontmatter
```

### Frontmatter produit

```typescript
interface ProductFrontmatter {
  title: string           // Nom du produit
  slug: string            // URL slug
  subtitle: string        // Sous-titre descriptif
  readingTime: number     // Temps de lecture (minutes)
  lastUpdated: string     // Date ISO de dernière MàJ
  objectifs: string[]     // Objectifs associés
  labelCouleur: string[]  // Labels colorés
  heroImage?: string      // Image hero optionnelle
  disclaimer: string      // Clé de disclaimer
  seo: {
    title: string
    description: string
    ogImage?: string
  }
}
```

## Gestion d'état

**Minimaliste — React Context uniquement.**

| Contexte | Fichier | Rôle |
|---|---|---|
| `HeroProvider` | `lib/hero-context.tsx` | Suivi de la visibilité de la section hero pour ajuster le header sticky |

Pas de Redux, Zustand, ou autre librairie de state management. L'état local des composants (`useState`) est utilisé pour les interactions (simulateur, comparateur, filtres, menu mobile).

## Couche données

Aucune base de données. Toutes les données sont statiques :

| Source | Format | Contenu |
|---|---|---|
| `content/produits/*.mdx` | MDX | 5 fiches produits complètes |
| `content/rdv/*.mdx` | MDX | 3 guides RDV |
| `content/glossaire/termes.json` | JSON | 100+ termes financiers |
| `lib/produits-data.ts` | TypeScript | Métadonnées listing produits |
| `lib/comparateur-data.ts` | TypeScript | Données de comparaison (5×8) |
| `lib/fiscal-rules.ts` | TypeScript | Moteur de calcul fiscal (LFSS 2026) |
| `lib/a-propos-data.ts` | TypeScript | Profil auteur |

## Sécurité

### Headers HTTP (next.config.ts)

| Header | Valeur | Objectif |
|---|---|---|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline' va.vercel-scripts.com; ...` | Protéger contre XSS et injections |
| X-Frame-Options | DENY | Empêcher l'embedding iframe |
| X-Content-Type-Options | nosniff | Empêcher le MIME sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Limiter les informations de referrer |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Désactiver les APIs sensibles |

### Vie privée

- Aucun cookie
- Aucun tracking tiers (sauf Vercel Analytics)
- Aucune collecte de données personnelles
- Aucun formulaire de contact

## SEO

| Fonctionnalité | Implémentation |
|---|---|
| Sitemap | `app/sitemap.ts` (dynamique, toutes les routes) |
| Robots.txt | `app/robots.ts` (allow all) |
| Open Graph | `opengraph-image.tsx` (images dynamiques) |
| Twitter Cards | `twitter-image.tsx` |
| JSON-LD | WebSite + Organization (layout), BreadcrumbList + Article (pages) |
| Métadonnées | title, description, canonical par page |
| PWA Manifest | `app/manifest.ts` |

## Polices et design system

### Polices
- **Inter** (variable) — Police principale sans-serif
- **JetBrains Mono** (variable) — Police monospace

### Tokens de design (`ep-*`)
- Couleurs : `ep-primary` (#2563EB), `ep-secondary` (#10B981), `ep-danger` (#EF4444), `ep-warning`
- Surfaces : `ep-surface`, `ep-surface-alt`, `ep-separator`
- Textes : `ep-text`, `ep-text-muted`, `ep-text-inverted`
- Objectifs : couleurs dédiées par objectif (securiser, projets, retraite, transmission)
- Mode sombre : variables OKLch avec `.dark` class

### Animations
- Bibliothèque de variants réutilisables (`lib/motion.ts`)
- fadeIn, scaleIn, slideInLeft/Right, stagger
- Support `prefers-reduced-motion` systématique

## Déploiement

| Aspect | Détail |
|---|---|
| Plateforme | Vercel |
| Mode | SSG (Static Site Generation) |
| Build | `next build` |
| Dev | `next dev` (Turbopack) |
| Domaine | epargne-claire.fr |
| Analytics | Vercel Analytics activé |
| CI/CD | Déploiement automatique Vercel (push to main) |
