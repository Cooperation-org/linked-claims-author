'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/NavBar'
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  // Customize your theme here
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider theme={theme}>
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
