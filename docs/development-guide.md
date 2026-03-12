# EpargneClaire — Guide de développement

> Dernière mise à jour : 2026-03-12

## Prérequis

| Outil | Version requise |
|---|---|
| Node.js | 20+ (recommandé : LTS) |
| npm | 10+ (inclus avec Node.js) |
| Git | 2.x |

## Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd epargne-claire

# Installer les dépendances
npm install
```

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production (SSG) |
| `npm run start` | Serveur de production local |
| `npm run lint` | Linting ESLint |

## Développement local

```bash
# Lancer le serveur de développement
npm run dev

# Le site est accessible sur http://localhost:3000
```

Le mode développement utilise **Turbopack** pour un rechargement rapide. Toutes les pages sont pré-rendues en statique (SSG) au build.

## Structure du code

```
src/
├── app/           → Routes (pages)
├── components/    → Composants React (14 sous-dossiers)
├── content/       → Contenu MDX et JSON
├── lib/           → Logique métier et utilitaires
├── types/         → Interfaces TypeScript
└── mdx-components.tsx → Enregistrement des composants MDX
```

Voir [source-tree-analysis.md](./source-tree-analysis.md) pour l'arbre complet annoté.

## Conventions du projet

### TypeScript

- **Mode strict** activé (`strict: true` dans tsconfig.json)
- Alias d'import : `@/*` → `./src/*`
- Types dédiés dans `src/types/` pour chaque domaine (product, objectif, glossaire, etc.)

### Styling

- **Tailwind CSS v4** avec PostCSS
- Tokens de design personnalisés : préfixe `ep-*` (ex : `ep-primary`, `ep-text-muted`)
- Variables CSS en OKLch pour le support du mode sombre
- Plugin `@tailwindcss/typography` pour le prose styling (contenu MDX)
- Utilitaire `cn()` (clsx + tailwind-merge) dans `lib/utils.ts`

### Composants

- **CVA** (class-variance-authority) pour les variants de composants
- **Radix UI** pour les primitives accessibles (Dialog, Select, Tooltip, Accordion)
- **shadcn** comme scaffolding des primitives UI
- **motion/react** (PAS framer-motion) pour les animations
- Support systématique de `prefers-reduced-motion`

### Contenu MDX

- Les fichiers MDX sont dans `src/content/produits/` et `src/content/rdv/`
- Chaque MDX exporte un objet `frontmatter` avec métadonnées
- Les composants disponibles dans MDX sont enregistrés dans `src/mdx-components.tsx`
- **Encodage** : Utiliser des caractères UTF-8 réels (é, à, ô, ê) — les séquences `\u00E9` s'affichent littéralement dans le JSX/MDX

### Nommage

- Fichiers composants : `kebab-case.tsx` (ex : `product-hero.tsx`)
- Composants React : `PascalCase` (ex : `ProductHero`)
- Fichiers lib : `kebab-case.ts` (ex : `fiscal-rules.ts`)
- Préfixes produit-spécifiques : `av-`, `pea-`, `per-`, `livret-`, `scpi-`

## Ajouter un nouveau produit

1. **Créer le fichier MDX** dans `src/content/produits/nouveau-produit.mdx` avec le frontmatter requis
2. **Créer les composants spécifiques** dans `src/components/product/` (préfixe du produit)
3. **Enregistrer les composants** dans `src/mdx-components.tsx`
4. **Ajouter le module** dans `src/lib/products.ts` (entrée dans `productModules`)
5. **Ajouter les données listing** dans `src/lib/produits-data.ts`
6. **Ajouter les données comparateur** dans `src/lib/comparateur-data.ts`
7. **Mettre à jour le sitemap** dans `src/app/sitemap.ts` si nécessaire

## Ajouter une page RDV

1. **Créer le fichier MDX** dans `src/content/rdv/nouveau-slug.mdx`
2. **Ajouter l'entrée** dans `src/lib/rdv.ts` (tableau `rdvPages`)
3. Les composants RDV existants (RdvQuestionCard, RdvAlertCard, etc.) sont déjà disponibles

## Ajouter un terme au glossaire

1. **Éditer** `src/content/glossaire/termes.json`
2. Ajouter une entrée avec `definition`, `definitionComplete`, et `aliases` (optionnel)
3. Le terme sera automatiquement disponible dans le glossaire et via `<GlossaryTooltip>`

## Build de production

```bash
# Build statique
npm run build

# Vérifier localement
npm run start
```

Le build génère un site statique complet. Toutes les routes dynamiques (`[slug]`) sont pré-rendues grâce à `dynamicParams: false` et les fonctions `generateStaticParams()`.

## Déploiement

| Aspect | Configuration |
|---|---|
| Plateforme | Vercel |
| Déclencheur | Push sur la branche main |
| Mode | SSG (Static Site Generation) |
| Domaine | epargne-claire.fr |
| Analytics | Vercel Analytics (automatique) |

Aucune variable d'environnement requise. L'URL du site est hardcodée : `https://www.epargne-claire.fr`.

## Linting

```bash
npm run lint
```

Configuration ESLint :
- Règles Next.js Core Web Vitals
- Règles Next.js TypeScript
- Ignores : `.next/`, `out/`, `build/`, `next-env.d.ts`

## Tests

**Aucun framework de test n'est configuré** actuellement. Il n'y a pas de tests unitaires, d'intégration ou E2E.

## Accessibilité

- **SkipLink** : lien "aller au contenu" pour la navigation clavier
- **Focus visible** : ring de focus personnalisé (Tailwind)
- **Radix UI** : composants accessibles par défaut (Dialog, Select, Tooltip, Accordion)
- **HTML sémantique** : landmarks (`main`, `nav`, `footer`), headings hiérarchiques
- **Reduced motion** : toutes les animations respectent `prefers-reduced-motion`

## SEO

- **JSON-LD** : schémas WebSite, Organization, BreadcrumbList, Article
- **Open Graph** : images dynamiques par page (`opengraph-image.tsx`)
- **Sitemap** : généré dynamiquement (`app/sitemap.ts`)
- **Robots.txt** : généré dynamiquement (`app/robots.ts`)
- **PWA Manifest** : `app/manifest.ts`
- **Métadonnées** : title, description, canonical configurés par page
