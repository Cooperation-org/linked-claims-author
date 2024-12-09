'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/navbar/NavBar'
import Providers from './components/signing/Providers'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import Footer from './components/footer/Footer'
import Theme from './theme'
import Head from 'next/head'
import { StepProvider } from './credentialForm/form/StepContext'
import { usePathname } from 'next/navigation'
import background from './Assets/Images/Background.svg' // Import background image

const inter = Inter({ subsets: ['latin'] })

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
    'https://www.linkedin.com/company/linkedtrust/'
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
  const pathname = usePathname()

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <html lang='en'>
        <Head>
          {/* Inject structured data */}
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          {/* Metadata */}
          <title>OpenCreds</title>
          <script src='https://accounts.google.com/gsi/client' async defer></script>
          <meta
            name='description'
            content='OpenCreds offers the ultimate solution for managing your professional credentials. Capture, store, and share your achievements securely to unlock new opportunities.'
          />
          {/* add the content when applying in google search https://search.google.com/search-console/welcome */}
          {/* <meta name='google-site-verification' content='' /> */}

          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta
            name='keywords'
            content='Credential Management, Professional Credentials, Secure Storage, Share Achievements, OpenCreds'
          />
          <meta name='author' content='Linked Trust' />

          {/* Open Graph */}
          <meta property='og:title' content='OpenCreds' />
          <meta
            property='og:description'
            content='Manage your professional credentials securely and efficiently with OpenCreds. Capture, store, and share your achievements to unlock new opportunities.'
          />
          <meta property='og:url' content='https://opencreds.net' />
          <meta property='og:site_name' content='OpenCreds' />
          <meta property='og:image' content='/images/og-image.png' />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
          <meta property='og:type' content='website' />

          {/* Twitter Card */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='OpenCreds' />
          <meta
            name='twitter:description'
            content='Securely manage and share your professional credentials with OpenCreds. Enhance your career opportunities with our comprehensive credential management solution.'
          />
          <meta name='twitter:image' content='/images/og-image.png' />
          <meta name='application-name' content='OpenCreds' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />

          {/* Preconnect to important third-party domains */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
          {/* Favicon and PWA assets */}
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/icons/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/icons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/icons/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
        </Head>
        <body
          style={{
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
            // backgroundColor: '#F0F4F8'
          }}
        >
          <Providers>
            <StepProvider>
              <NavBar />
              <Box
                component='main'
                sx={{
                  flexGrow: 1,
                  minHeight: `calc(100vh - 255px)`,
                  backgroundImage: pathname === '/' ? `url(${background.src})` : 'none',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: pathname === '/' ? 'overlay' : 'normal',
                  backgroundColor:
                    pathname === '/'
                      ? {
                          xs: 'rgba(255, 255, 255, 0.8)',
                          md: 'rgba(255, 255, 255, 0.85)'
                        }
                      : {
                          xs: '#FFFFFF',
                          md: '#F0F4F8'
                        }
                }}
              >
                {children}
              </Box>
              <Footer />
            </StepProvider>
          </Providers>
        </body>
      </html>
    </ThemeProvider>
  )
}
