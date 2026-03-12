import type { Metadata } from 'next'

import { MentionsLegalesHero } from '@/components/mentions-legales/mentions-legales-hero'

export const metadata: Metadata = {
  title: 'Mentions légales — EpargneClaire',
  description:
    'Mentions légales du site EpargneClaire : éditeur, hébergeur, propriété intellectuelle et protection des données.',
  alternates: { canonical: '/mentions-legales' },
}

const sections = [
  {
    title: 'Éditeur du site',
    content: [
      'Le site epargne-claire.fr est édité par Gérald Filin, personne physique agissant à titre personnel.',
      'Email : filingerald@gmail.com',
      'Directeur de la publication : Gérald Filin.',
    ],
  },
  {
    title: 'Hébergement',
    content: [
      'Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.',
      'Site web : vercel.com',
    ],
  },
  {
    title: 'Nature du site',
    content: [
      'EpargneClaire est un site à vocation éducative et informative. Il ne constitue en aucun cas un conseil en investissement, une recommandation personnalisée ou une incitation à souscrire un produit financier.',
      "Les informations présentées sont rédigées de bonne foi à partir de sources publiques (Banque de France, AMF, Service-Public.fr, Legifrance). Elles ne sauraient se substituer à l'avis d'un conseiller financier professionnel.",
      "L'éditeur ne perçoit aucune rémunération, commission ou avantage de la part d'un établissement financier. Le site ne contient aucun lien d'affiliation.",
    ],
  },
  {
    title: 'Propriété intellectuelle',
    content: [
      "L'ensemble des contenus du site (textes, illustrations, mises en page, code source) est la propriété exclusive de l'éditeur, sauf mention contraire.",
      "Toute reproduction, même partielle, est interdite sans autorisation préalable. Les marques et logos de produits financiers mentionnés appartiennent à leurs détenteurs respectifs.",
    ],
  },
  {
    title: 'Protection des données personnelles',
    content: [
      "Le site ne collecte aucune donnée personnelle. Aucun cookie de suivi, aucun outil d'analyse tiers (Google Analytics, etc.) et aucun formulaire de collecte ne sont utilisés.",
      "Aucune donnée n'est transmise à des tiers.",
      "En cas de question relative à vos données, vous pouvez écrire à filingerald@gmail.com.",
    ],
  },
  {
    title: 'Responsabilité',
    content: [
      "L'éditeur s'efforce de fournir des informations exactes et à jour. Toutefois, il ne peut garantir l'absence d'erreurs ou d'omissions. L'utilisation des informations se fait sous la seule responsabilité de l'utilisateur.",
      "L'éditeur ne saurait être tenu responsable d'un quelconque dommage, direct ou indirect, résultant de l'utilisation du site ou de l'impossibilité d'y accéder.",
      "Les liens vers des sites externes sont fournis à titre informatif. L'éditeur n'exerce aucun contrôle sur leur contenu et décline toute responsabilité les concernant.",
    ],
  },
  {
    title: 'Droit applicable',
    content: [
      'Le site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux français sont seuls compétents.',
    ],
  },
]

export default function MentionsLegalesPage() {
  return (
    <article>
      <MentionsLegalesHero />
      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-semibold text-ep-text-primary">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.content.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-ep-text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
