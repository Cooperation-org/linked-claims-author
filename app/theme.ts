import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    t3White: string
    t3Black: string
    t3BodyText: string
    t3ButtonBlue: string
    t3YellowAccent: string
    t3LightGray: string
    t3DarkGray: string
    t3Gray: string
    t3MediumGray: string
    t3VeryLightGray: string
    t3LightGraySecondary: string
    t3NewWhitesmoke: string
    t3Whitesmoke: string
    t3Disabled: string
    t3VeryLightDisabled: string
    t3MidnightBlue: string
    t3DarkSlateBlue: string
    t3LightBlue: string
    t3BackgroundDarkBlue: string
    t3CheckboxSoftActive: string
    t3CheckboxBorderActive: string
    t3PlaceholderText: string
    t3InputPlaceholder: string
    t3TitleText: string
    t3SuccessMessage: string
    t3Error: string
    t3Purple: string
    t3LightWhitesmoke: string
    t3Gold: string
    t3Lavender: string
    t3Red: string
  }
  interface PaletteOptions {
    t3White?: string
    t3Black?: string
    t3BodyText?: string
    t3ButtonBlue?: string
    t3YellowAccent?: string
    t3LightGray?: string
    t3DarkGray?: string
    t3Gray?: string
    t3MediumGray?: string
    t3VeryLightGray?: string
    t3LightGraySecondary?: string
    t3NewWhitesmoke?: string
    t3Whitesmoke?: string
    t3Disabled?: string
    t3VeryLightDisabled?: string
    t3MidnightBlue?: string
    t3DarkSlateBlue?: string
    t3LightBlue?: string
    t3BackgroundDarkBlue?: string
    t3CheckboxSoftActive?: string
    t3CheckboxBorderActive?: string
    t3PlaceholderText?: string
    t3InputPlaceholder?: string
    t3TitleText?: string
    t3SuccessMessage?: string
    t3Error?: string
    t3Purple?: string
    t3LightWhitesmoke?: string
    t3Gold?: string
    t3Lavender?: string
    t3Red?: string
  }

  interface TypographyVariants {
    formTextStep: React.CSSProperties
    successText: React.CSSProperties
    noteText: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    formTextStep?: React.CSSProperties
    successText?: React.CSSProperties
    noteText?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    formTextStep: true
    successText: true
    noteText: true
  }
}

const Theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB'
    },
    secondary: {
      main: '#FFFFFF'
    },
    t3White: '#ffffff',
    t3Black: '#000000',
    t3BodyText: '#202e5b',
    t3ButtonBlue: '#003fe0',
    t3YellowAccent: '#ffcb25',
    t3LightGray: '#e5e7eb',
    t3DarkGray: '#4d4d4d',
    t3Gray: '#79747e',
    t3MediumGray: '#b8b8b8',
    t3VeryLightGray: '#ebebeb',
    t3LightGraySecondary: '#e7e6e6',
    t3NewWhitesmoke: '#f9f9f9',
    t3Whitesmoke: '#f6f6f6',
    t3Disabled: '#d1d5db',
    t3VeryLightDisabled: '#f8fafc',
    t3MidnightBlue: '#000e40',
    t3DarkSlateBlue: '#242f56',
    t3LightBlue: '#d1e4ff',
    t3BackgroundDarkBlue: '#003fe080',
    t3CheckboxSoftActive: '#1e40af1a',
    t3CheckboxBorderActive: '#2563eb',
    t3PlaceholderText: '#4e4e4e',
    t3InputPlaceholder: '#6b7280',
    t3TitleText: '#1f2937',
    t3SuccessMessage: '#14b8a6',
    t3Error: '#ef4444',
    t3Purple: '#6750a4',
    t3LightWhitesmoke: '#f7f7f7',
    t3Gold: '#ffcb25e6',
    t3Lavender: '#d1e3ff',
    t3Red: '#f81414'
  },
  typography: palette => ({
    fontFamily: 'Lato, Roboto, Inter, Poppins',
    formTextStep: {
      color: palette.t3BodyText,
      textAlign: 'center',
      fontFamily: 'Lato',
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
      padding: '0 50px'
    },
    successText: {
      color: palette.t3BodyText,
      textAlign: 'center',
      fontFamily: 'Lato',
      fontSize: '16px',
      fontStyle: 'italic',
      fontWeight: 500,
      lineHeight: 'normal'
    },
    noteText: {
      color: palette.t3BodyText,
      textAlign: 'center',
      fontFamily: 'Lato',
      fontSize: '16px',
      fontStyle: 'italic',
      fontWeight: 400,
      lineHeight: 'normal'
    }
  }),
  components: {
   
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1280,
      xl: 1920
    }
  }
})

export default Theme
