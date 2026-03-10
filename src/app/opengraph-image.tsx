import { ImageResponse } from 'next/og'

export const alt = "EpargneClaire — Comprendre l'épargne, simplement"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 24,
          }}
        >
          EpargneClaire
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Comprendre l'épargne, simplement.
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 32,
            maxWidth: 800,
          }}
        >
          Ressource éducative neutre sur les produits patrimoniaux français.
        </div>
      </div>
    ),
    { ...size }
  )
}
