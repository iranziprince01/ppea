import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import PageTransition from '@/components/PageTransition'
import { activeClient, siteSettingsQuery } from '@/lib/sanity.client'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await activeClient.fetch(siteSettingsQuery)
    
    return {
      title: settings?.title || 'Probity Partners East Africa',
      description: settings?.description || 'Leading law firm in East Africa providing expert legal services across multiple practice areas.',
      keywords: ['law firm', 'East Africa', 'legal services', 'corporate law', 'litigation'],
      authors: [{ name: 'Probity Partners East Africa' }],
      metadataBase: new URL('http://localhost:3000'),
      icons: {
        icon: [
          { url: '/favicon.ico', sizes: 'any' },
          { url: '/favicon.svg', type: 'image/svg+xml' },
          { url: '/favicon.png', sizes: '32x32', type: 'image/png' }
        ],
        apple: [
          { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
        ],
        shortcut: '/favicon.ico'
      },
      manifest: '/manifest.webmanifest',
      openGraph: {
        title: settings?.title || 'Probity Partners East Africa',
        description: settings?.description || 'Leading law firm in East Africa providing expert legal services across multiple practice areas.',
        type: 'website',
        locale: 'en_US',
        images: [
          {
            url: '/favicon.png',
            width: 32,
            height: 32,
            alt: 'Probity Partners East Africa'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: settings?.title || 'Probity Partners East Africa',
        description: settings?.description || 'Leading law firm in East Africa providing expert legal services across multiple practice areas.',
        images: ['/favicon.png']
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    return {
      title: 'Probity Partners East Africa',
      description: 'Leading law firm in East Africa providing expert legal services across multiple practice areas.',
      metadataBase: new URL('http://localhost:3000'),
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  )
}
