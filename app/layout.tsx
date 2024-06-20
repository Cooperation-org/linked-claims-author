"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Providers from "./components/Providers";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Footer from "./components/Footer";
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
      <html lang="en">
        <body style={{ minHeight: "100vh" }}>
          <Providers>
            <NavBar />
            <Box sx={{ minHeight: "calc(100vh - 153px)" }}>{children}</Box>
            <Footer />
          </Providers>
        </body>
      </html>
    </ThemeProvider>
  )
}
