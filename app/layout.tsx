import { Metadata } from 'next'
import ClientLayout from './ClientLayout'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'OpenCreds',
  description:
    'OpenCreds offers the ultimate solution for managing your professional credentials. Capture, store, and share your achievements securely to unlock new opportunities.',
  keywords:
    'Credential Management, Professional Credentials, Secure Storage, Share Achievements, OpenCreds',
  authors: [{ name: 'Linked Trust' }],
  metadataBase: new URL('https://opencreds.net'),
  openGraph: {
    title: 'OpenCreds',
    description:
      'Manage your professional credentials securely and efficiently with OpenCreds. Capture, store, and share your achievements to unlock new opportunities.',
    url: 'https://opencreds.net',
    siteName: 'OpenCreds',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenCreds',
    description:
      'Securely manage and share your professional credentials with OpenCreds. Enhance your career opportunities with our comprehensive credential management solution.',
    images: ['/images/og-image.png']
  },
  applicationName: 'OpenCreds',
  formatDetection: {
    telephone: false
  },
  manifest: '/site.webmanifest',
  other: {
    // add the google-site-verification when applying in google search "https://search.google.com/search-console/welcome"
    // 'google-site-verification': '', // Add your verification code
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes'
  }
}

// Structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'OpenCreds',
  url: 'https://opencreds.net',
  applicationCategory: 'CredentialManagement',
  operatingSystem: 'Web-based',
  description:
    'OpenCreds is a secure and efficient credential management platform. Easily capture, store, and share your professional credentials to unlock new opportunities.',
  featureList: [
    'Credential Capture',
    'Secure Storage',
    'Easy Sharing',
    'Recommendation Requests',
    'Integration with Professional Networks'
  ],
  sameAs: [
    'https://github.com/Cooperation-org',
    'https://linkedin.com/company/linkedtrust/'
  ],
  publisher: {
    '@type': 'Organization',
    name: 'OpenCreds',
    url: 'https://opencreds.net',
    logo: 'https://opencreds.net/images/logo.png'
  },
  applicationSubCategory: 'Credential Management'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script src='https://accounts.google.com/gsi/client' async defer />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}
