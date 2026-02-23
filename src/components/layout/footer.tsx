import Link from 'next/link'

interface FooterProps {
  className?: string
}

const footerLinks = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Glossaire', href: '/glossaire' },
]

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`bg-ep-text-primary text-white ${className ?? ''}`}
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        {/* Logo */}
        <p className="text-lg font-bold">Épargne Claire</p>

        {/* Links */}
        <nav className="mt-6 flex flex-wrap gap-6" aria-label="Liens du pied de page">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center text-gray-300 hover:text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ep-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Disclaimer */}
        <p className="mt-8 text-sm leading-relaxed text-gray-400">
          EpargneClaire est un projet pédagogique. Ce site ne constitue pas du
          conseil en investissement financier. Consultez un professionnel habilité
          pour tout conseil adapté à votre situation.
        </p>
      </div>
    </footer>
  )
}
