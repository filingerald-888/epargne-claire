# EpargneClaire — Arbre source annoté

> Dernière mise à jour : 2026-03-12

## Structure du projet

```
epargne-claire/
├── public/                          # Fichiers statiques (images, logo, favicon)
├── scripts/                         # Scripts utilitaires
├── src/                             # Code source principal
│   ├── app/                         # ── ROUTES (Next.js App Router) ──
│   │   ├── layout.tsx               # 🔑 Layout racine (providers, header, footer, analytics)
│   │   ├── page.tsx                 # 🔑 Homepage (8 sections)
│   │   ├── not-found.tsx            # Page 404
│   │   ├── globals.css              # 🔑 Tokens de design, variables CSS, Tailwind config
│   │   ├── manifest.ts              # PWA manifest
│   │   ├── robots.ts                # robots.txt dynamique
│   │   ├── sitemap.ts               # Sitemap XML dynamique
│   │   ├── opengraph-image.tsx      # Image OG dynamique (racine)
│   │   ├── twitter-image.tsx        # Image Twitter Card
│   │   ├── favicon.ico              # Favicon
│   │   │
│   │   ├── produits/                # /produits — Listing des produits
│   │   │   ├── page.tsx             #   Filtres par objectif + tableau récapitulatif
│   │   │   └── [slug]/              # /produits/[slug] — Fiche produit (5 slugs)
│   │   │       ├── page.tsx         #   🔑 Chargement MDX + hero + schemas JSON-LD
│   │   │       └── opengraph-image.tsx  # Image OG par produit
│   │   │
│   │   ├── objectifs/               # /objectifs
│   │   │   └── [slug]/              # /objectifs/[slug] — Page objectif (4 slugs)
│   │   │       └── page.tsx         #   Données inline, 6 sections par objectif
│   │   │
│   │   ├── comparer/                # /comparer — Comparateur de produits
│   │   │   └── page.tsx             #   Client component, tableau dynamique
│   │   │
│   │   ├── simulateur-fiscal/       # /simulateur-fiscal
│   │   │   └── page.tsx             #   Client component, moteur de calcul fiscal
│   │   │
│   │   ├── glossaire/               # /glossaire — Glossaire financier
│   │   │   └── page.tsx             #   100+ termes, navigation A-Z
│   │   │
│   │   ├── rdv/                     # /rdv — Préparer un rendez-vous bancaire
│   │   │   └── [slug]/              # /rdv/[slug] — 3 pages RDV
│   │   │       └── page.tsx         #   Chargement MDX + navigation onglets
│   │   │
│   │   ├── a-propos/                # /a-propos — Page auteur
│   │   │   └── page.tsx             #   6 sections (histoire, démarche, parcours)
│   │   │
│   │   └── mentions-legales/        # /mentions-legales
│   │       └── page.tsx             #   Sections légales, RGPD, disclaimer
│   │
│   ├── components/                  # ── COMPOSANTS REACT ──
│   │   ├── layout/                  #   Navigation, header, footer, skip-link, scroll-to-top
│   │   ├── homepage/                #   8 sections de la page d'accueil
│   │   ├── product/                 #   🔑 51 composants produit (partagés + spécifiques)
│   │   ├── content/                 #   Composants de contenu MDX (disclaimer, tooltip, section)
│   │   ├── objectif/                #   Composants pages objectifs (hero, checklist, levers)
│   │   ├── produits/                #   Composants listing produits (hero, filtres, tableau)
│   │   ├── comparateur/             #   Composants comparateur (hero, page, résultat)
│   │   ├── glossaire/               #   Composants glossaire (hero, contenu, navigation A-Z)
│   │   ├── rdv/                     #   Composants RDV (hero, onglets, cartes)
│   │   ├── a-propos/                #   Composants page auteur
│   │   ├── mentions-legales/        #   Hero mentions légales
│   │   ├── simulateur/              #   Simulateur fiscal interactif
│   │   ├── seo/                     #   JSON-LD schema injector
│   │   └── ui/                      #   🔑 8 primitives UI (Radix/shadcn : button, card, dialog…)
│   │
│   ├── content/                     # ── CONTENU ──
│   │   ├── produits/                #   5 fichiers MDX (assurance-vie, pea, per, scpi, livret-a-ldds)
│   │   ├── rdv/                     #   3 fichiers MDX (questions, points-attention, reflexes)
│   │   ├── glossaire/               #   termes.json (100+ définitions)
│   │   ├── objectifs/               #   (vide — données inline dans page.tsx)
│   │   └── pages/                   #   (vide — réservé)
│   │
│   ├── lib/                         # ── LOGIQUE MÉTIER & UTILITAIRES ──
│   │   ├── products.ts              #   🔑 Chargement dynamique des modules MDX produits
│   │   ├── rdv.ts                   #   Chargement dynamique des modules MDX RDV
│   │   ├── glossaire.ts             #   Utilitaires glossaire (recherche, slugification)
│   │   ├── fiscal-rules.ts          #   🔑 Moteur de calcul fiscal (LFSS 2026)
│   │   ├── comparateur-data.ts      #   Données du comparateur (5 produits × 8 critères)
│   │   ├── produits-data.ts         #   Métadonnées listing produits
│   │   ├── a-propos-data.ts         #   Données profil auteur
│   │   ├── hero-context.tsx         #   React Context (visibilité hero → header sticky)
│   │   ├── motion.ts                #   Variants d'animation réutilisables (motion/react)
│   │   └── utils.ts                 #   Utilitaires (cn, slugify, textContent, renderBold)
│   │
│   ├── types/                       # ── TYPES TYPESCRIPT ──
│   │   ├── product.ts               #   ProductFrontmatter
│   │   ├── objectif.ts              #   ObjectifFrontmatter
│   │   ├── glossaire.ts             #   GlossaireTerm, GlossaireData
│   │   ├── comparaison.ts           #   Critere, ComparisonData
│   │   ├── rdv.ts                   #   RdvFrontmatter
│   │   ├── navigation.ts            #   NavItem, ContextualLink
│   │   └── mdx.d.ts                 #   Déclaration de module *.mdx
│   │
│   └── mdx-components.tsx           # 🔑 Enregistrement des 50+ composants MDX
│
├── next.config.ts                   # Config Next.js (MDX, headers sécurité)
├── tsconfig.json                    # TypeScript strict, alias @/*
├── postcss.config.mjs               # PostCSS avec @tailwindcss/postcss
├── eslint.config.mjs                # ESLint + Next.js Web Vitals
├── components.json                  # Configuration shadcn
├── package.json                     # Dépendances et scripts
└── package-lock.json                # Lock file npm
```

## Répertoires critiques

| Répertoire | Rôle | Fichiers clés |
|---|---|---|
| `src/app/` | Routes et pages | `layout.tsx`, `page.tsx`, `globals.css` |
| `src/components/product/` | Composants produits (51 fichiers) | Partagés + spécifiques par produit |
| `src/components/ui/` | Primitives UI accessibles | button, card, dialog, accordion, select, tooltip, table, badge |
| `src/content/produits/` | Contenu éditorial MDX | 5 fiches produit complètes |
| `src/lib/` | Logique métier | `products.ts`, `fiscal-rules.ts`, `glossaire.ts` |
| `src/types/` | Interfaces TypeScript | 7 fichiers de types |

## Points d'entrée

| Point d'entrée | Fichier | Rôle |
|---|---|---|
| Layout racine | `src/app/layout.tsx` | Providers, navigation, footer, analytics, schemas |
| Page d'accueil | `src/app/page.tsx` | 8 sections de la homepage |
| Config MDX | `src/mdx-components.tsx` | Enregistrement des composants disponibles en MDX |
| Config Next.js | `next.config.ts` | MDX loader, headers sécurité |
