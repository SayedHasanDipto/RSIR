import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: 'Robiul Islam | Master English & Islamic History',
  description: 'Learn English and Islamic History & Culture with Robiul Islam. Expert lessons, resources, and guidance for students.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${_geist.variable} ${_geistMono.variable} scroll-smooth`}>
      <body suppressHydrationWarning={true} className="font-sans antialiased bg-background text-foreground selection:bg-gold/30">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
