'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/navbar/NavBar'
import Providers from './components/signing/Providers'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import Footer from './components/footer/Footer'
import Theme from './theme'
import Head from 'next/head'
import { StepProvider } from './CredentialForm/form/StepContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <html lang='en'>
        <Head>
          <script src='https://accounts.google.com/gsi/client' async defer></script>
        </Head>
        <body>
          <Providers>
            <StepProvider>
              <NavBar />
              <Box sx={{ minHeight: 'calc(100vh - 190px)' }}>{children}</Box>
              <Footer />
            </StepProvider>
          </Providers>
        </body>
      </html>
    </ThemeProvider>
  )
}
