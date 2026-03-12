# EpargneClaire — Vue d'ensemble du projet

> Dernière mise à jour : 2026-03-12

## Résumé

**EpargneClaire** est une plateforme web pédagogique de littératie financière, destinée aux épargnants français souhaitant comprendre les produits d'épargne et de patrimoine. Le site est conçu comme un guide indépendant, sans recommandation commerciale, construit avec des sources publiques uniquement.

**URL de production :** https://www.epargne-claire.fr

## Stack technique

| Catégorie | Technologie | Version |
|---|---|---|
| Framework | Next.js (App Router, SSG, Turbopack) | 16.1.6 |
| Langage | TypeScript (strict) | 5.x |
| Runtime | React | 19.2.3 |
| Styling | Tailwind CSS v4 + design tokens `ep-*` | 4.x |
| Animations | motion/react | 12.34.0 |
| Composants UI | Radix UI + shadcn | 1.4.3 / 3.8.4 |
| Icônes | lucide-react | 0.563.0 |
| Contenu | MDX (@next/mdx + @mdx-js/react) | 16.1.6 / 3.1.1 |
| Typographie | @tailwindcss/typography | 0.5.19 |
| Utilitaires CSS | clsx, tailwind-merge, class-variance-authority | — |
| Analytics | Vercel Analytics | 1.6.1 |
| SEO | next-sitemap, JSON-LD dynamique | 4.2.3 |
| Polices | Inter (sans-serif), JetBrains Mono (monospace) | Google Fonts |
| Hébergement | Vercel | — |

## Type de projet

| Attribut | Valeur |
|---|---|
| Type de dépôt | Monolith |
| Type de projet | Web (SSG) |
| Pattern d'architecture | Component-based + Content-driven (MDX) |
| Base de données | Aucune (données statiques JSON/TS) |
| API backend | Aucune |
| Authentification | Aucune |
| Tests | Aucun framework configuré |
| CI/CD | Non configuré (déploiement Vercel automatique) |

## Contenu du site

### 5 Produits d'épargne (fiches MDX)
- **Assurance-vie** — Contrat multi-support, fonds euros et unités de compte
- **PEA** — Plan d'Épargne en Actions, enveloppe fiscale pour investir en bourse
- **PER** — Plan d'Épargne Retraite, épargne défiscalisée pour la retraite
- **SCPI** — Société Civile de Placement Immobilier, immobilier indirect
- **Livret A / LDDS** — Épargne réglementée, garantie d'État

### 4 Objectifs patrimoniaux
- **Sécuriser** — Constituer une épargne de précaution
- **Projets de vie** — Financer des projets à moyen terme
- **Retraite** — Préparer sa retraite
- **Transmission** — Organiser la transmission de patrimoine

### 3 Pages Rendez-vous bancaire
- Questions à poser
- Points d'attention
- Réflexes clés

### Outils interactifs
- **Comparateur** — Tableau comparatif des 5 produits sur 8 critères
- **Simulateur fiscal** — Calcul d'imposition au retrait (conformité LFSS 2026)
- **Glossaire** — 100+ termes financiers avec définitions et alias

### Pages institutionnelles
- À propos (profil de l'auteur, positionnement)
- Mentions légales (RGPD, disclaimer)

## Liens vers la documentation détaillée

- [Architecture](./architecture.md)
- [Arbre source annoté](./source-tree-analysis.md)
- [Inventaire des composants](./component-inventory.md)
- [Guide de développement](./development-guide.md)
