'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import Theme from './theme'

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
        <body
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            margin: 0,
            maxHeight: '100vh'
          }}
        >
          <NavBar />
          <Box component='main' sx={{ flex: '1 0 auto' }}>
            {children}
          </Box>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  )
}
