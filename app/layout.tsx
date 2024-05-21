"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Providers from "./components/Providers";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  // typography: {
  //   fontFamily: "Lato, Roboto, Inter, Poppins",
  // },
  // components: {
  //   MuiTypography: {
  //     styleOverrides: {
  //       root: {
  //         color: "#202E5B",
  //       },
  //     },
  //   },
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         textTransform: "capitalize",
  //         borderRadius: "100px",
  //         fontFamily: "Roboto",
  //         lineHeight: "20px",
  //         padding: "10px 24px",
  //       },
  //       containedPrimary: {
  //         backgroundColor: "#003FE0",
  //         color: "#FFF",
  //         "&:hover": {
  //           backgroundColor: "#003FE0",
  //         },
  //       },
  //       containedSecondary: {
  //         backgroundColor: "#FFF",
  //         color: "#4E4E4E",
  //         "&:hover": {
  //           backgroundColor: "#FFF",
  //         },
  //       },
  //     },
  //   },
  //   MuiFormLabel: {
  //     styleOverrides: {
  //       root: {
  //         color: "var(--T3-Body-Text, #202E5B)",
  //         fontSize: "16px",
  //         fontWeight: 600,
  //         "&.Mui-focused": {
  //           color: "#000",
  //         },
  //       },
  //     },
  //   },
  //   MuiTextField: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: "#FFF",
  //         "& .MuiOutlinedInput-root": {
  //           borderRadius: "8px",
  //         },
  //       },
  //     },
  //   },
  // },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 800,
  //     lg: 1280,
  //     xl: 1920,
  //   },
  // },
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
          <Providers>
            <NavBar />
            <Box sx={{ minHeight: "calc(100vh - 153px)" }}>{children}</Box>
            <Footer />
          </Providers>
        </body>
      </html>
    </ThemeProvider>
  );
}
