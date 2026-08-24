import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kodrish.me'),
  title: {
    default: 'KodRish Innovation & Solutions | Digital Service Provider',
    template: '%s | KodRish'
  },
  description: 'KodRish Innovation & Solutions delivers web development, UI/UX design, AI/ML solutions, cloud services, and expert technology teams.',
  keywords: ['Web Development', 'AI/ML Solutions', 'UI/UX Design', 'Cloud Services', 'Software Agency', 'Tech Startup'],
  authors: [{ name: 'KodRish Team' }],
  creator: 'KodRish Innovation & Solutions',
  publisher: 'KodRish Innovation & Solutions',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kodrish.me',
    siteName: 'KodRish',
    title: 'KodRish Innovation & Solutions',
    description: 'Delivering web development, UI/UX design, AI/ML solutions, and cloud services.',
    images: [
      {
        url: '/kodrish-logo.png',
        width: 1200,
        height: 630,
        alt: 'KodRish Innovation & Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KodRish Innovation & Solutions',
    description: 'Delivering web development, UI/UX design, AI/ML solutions, and cloud services.',
    images: ['/kodrish-logo.png'],
    creator: '@kodrish',
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
  generator: 'v0.app',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KodRish Innovation & Solutions',
    url: 'https://www.kodrish.me',
    logo: 'https://www.kodrish.me/kodrish-logo.png',
    image: 'https://www.kodrish.me/kodrish-logo.png',
    description: 'KodRish Innovation & Solutions delivers web development, UI/UX design, AI/ML solutions, cloud services, and expert technology teams.',
    founder: {
      '@type': 'Person',
      name: 'Krish Bhagat'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'contact@kodrish.com',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      'https://in.linkedin.com/company/kodrish-innovation-solutions',
      'https://www.instagram.com/kod_rish/'
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6a8c8a4951841c3442e1bd56/1k0qfocdg';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
