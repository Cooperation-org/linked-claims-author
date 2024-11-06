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
import background from './Assets/Images/Background.svg'

const inter = Inter({ subsets: ['latin'] })

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
          <title>OpenCreds</title>
          <script src='https://accounts.google.com/gsi/client' async defer></script>
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
