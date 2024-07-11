"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import Providers from "./components/signing/Providers";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Footer from "./components/footer/Footer";
import Theme from './theme'
import Head from 'next/head'

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
        <body style={{ minHeight: '100vh' }}>
          <Providers>
            <NavBar />
            <Box sx={{ minHeight: 'calc(100vh - 153px)' }}>{children}</Box>
            <Footer />
          </Providers>
        </body>
      </html>
    </ThemeProvider>
  )
}
