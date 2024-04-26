"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html lang="en">
        <body style={{ minHeight: "100vh" }}>
          <NavBar />
          <Box sx={{ minHeight: "calc(100vh - 153px)" }}>{children}</Box>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
