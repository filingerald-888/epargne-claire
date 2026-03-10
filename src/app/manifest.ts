import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EpargneClaire',
    short_name: 'EpargneClaire',
    description: "Comprendre l'épargne et le patrimoine, simplement.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e3a5f',
    icons: [
      { src: '/logo-bleu.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
