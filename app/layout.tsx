import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import PageTransition from '@/components/PageTransition'
import StructuredData from '@/components/StructuredData'
import { activeClient, siteSettingsQuery } from '@/lib/sanity.client'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await activeClient.fetch(siteSettingsQuery)
    
    return {
      title: settings?.title || 'Probity Partners East Africa',
      description: settings?.description || 'Leading law firm in East Africa providing expert legal services across multiple practice areas.',
              keywords: ['law firm', 'East Africa', 'legal services', 'corporate law', 'litigation', 'Rwanda', 'Kigali', 'legal consultation', 'business law', 'human rights law'],
        authors: [{ name: 'Probity Partners East Africa' }],
        metadataBase: new URL('https://probitypartnersea.com'),
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
          url: 'https://probitypartnersea.com',
          siteName: 'Probity Partners East Africa',
          images: [
            {
              url: '/assets/logo4.png',
              width: 400,
              height: 400,
              alt: 'Probity Partners East Africa Logo'
            }
          ]
        },
              twitter: {
          card: 'summary_large_image',
          title: settings?.title || 'Probity Partners East Africa',
          description: settings?.description || 'Leading law firm in East Africa providing expert legal services across multiple practice areas.',
          images: ['/assets/logo4.png'],
          creator: '@ProbityPEA'
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
        alternates: {
          canonical: 'https://probitypartnersea.com'
        },
        verification: {
          google: 'your-google-verification-code', // Add your Google Search Console verification code
        }
    }
  } catch (error) {
          return {
        title: 'Probity Partners East Africa',
        description: 'Leading law firm in East Africa providing expert legal services across multiple practice areas.',
        metadataBase: new URL('https://probitypartnersea.com'),
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
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow pt-16 sm:pt-20">
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
