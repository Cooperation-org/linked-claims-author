// boxStyles.tsx

import { styled, TextField, Button, ButtonProps, Theme } from '@mui/material'
import { CSSProperties } from 'react'

export const StyledButton = styled(Button)<ButtonProps>(({ theme, color }) => ({
  padding: '10px 24px',
  borderRadius: '100px',
  textTransform: 'capitalize',
  fontFamily: 'Roboto',
  fontWeight: '600',
  lineHeight: '20px',
  border: '1px solid  #4E4E4E',
  backgroundColor: color === 'primary' ? theme.palette.t3ButtonBlue : '#FFF',
  color: color === 'primary' ? '#FFF' : theme.palette.t3PlaceholderText,
  '&:hover': {
    backgroundColor: color === 'primary' ? theme.palette.t3ButtonBlue : '#FFF'
  }
}))

export const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    position: 'relative',
    paddingRight: '50px',
    width: '100%',
    height: '275px',
    marginTop: '3px'
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: 8,
    right: 16,
    fontSize: '0.75rem',
    borderRadius: '28px'
  }
})

export const boxStyles = {
  width: '100%',
  bgcolor: '#FFF',
  borderRadius: '8px',
  border: '1px solid #E5E7EB'
}

export const formLabelStyles = {
  color: 't3BodyText',
  fontFamily: 'Lato',
  fontSize: '16px',
  fontWeight: 600,
  letterSpacing: '0.08px',
  mb: '7px',
  '&.Mui-focused': {
    color: 't3Black'
  }
}

export const TextFieldStyles = {
  bgcolor: '#FFF',
  width: '100%',
  mt: '3px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px'
  }
}

export const inputPropsStyles = {
  color: 'black',
  fontSize: '15px',
  fontStyle: 'italic',
  fontWeight: 600,
  letterSpacing: '0.075px'
}

export const buttonLinkStyles = {
  background: 'none',
  color: 't3Purple',
  border: 'none',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 400
}

export const UseAIStyles = {
  color: 't3BodyText',
  fontFamily: 'Lato',
  fontSize: '13px',
  textDecorationLine: 'underline',
  lineHeight: '24px',
  letterSpacing: '0.065px',
  fontWeight: 400,
  '&.Mui-focused': {
    color: '#000'
  }
}

export const commonTypographyStyles = {
  color: 't3BodyText',
  fontFamily: 'Inter',
  fontSize: '15px',
  fontWeight: 400
}

export const commonBoxStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  justifyContent: 'center'
}

export const evidenceListStyles = {
  marginLeft: '25px',
  textDecorationLine: 'underline',
  color: 't3ButtonBlue'
}

export const credentialBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  padding: '2px 5px',
  borderRadius: '5px',
  width: '80px'
}

export const imageBoxStyles = {
  borderRadius: '2px'
}

export const radioCheckedStyles = {
  '&.Mui-checked': {
    color: 't3CheckboxBorderActive'
  }
}

export const radioGroupStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  m: '0 auto',
  width: {
    xs: '100%',
    md: '50%'
  },
  pl: '10px',
  minWidth: '355px',
  alignItems: 'center'
}

export const radioGroupStep1Styles = {
  display: 'flex',
  flexDirection: {
    xs: 'column',
    sm: 'row',
    md: 'row'
  },
  gap: '15px',
  m: '0 auto',
  width: '100%',
  ml: '10px'
}

export const textFieldInputProps = {
  'aria-label': 'weight',
  style: {
    color: 't3Black',
    fontSize: '15px',
    fontStyle: 'italic',
    fontWeight: 600,
    letterSpacing: '0.075px'
  }
}

export const stepBoxContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px'
}

export const formLabelSpanStyles = {
  color: 'red'
}

export const customTextFieldStyles = {
  width: '100%',
  marginBottom: '3px'
}

export const aiBoxStyles = {
  display: 'flex',
  gap: '5px'
}

export const portfolioTypographyStyles = {
  color: 't3BodyText',
  fontFamily: 'Lato',
  fontSize: '20px',
  fontWeight: 700
}

export const addAnotherButtonStyles = (theme: Theme): CSSProperties => ({
  background: 'none',
  color: theme.palette.t3ButtonBlue,
  border: 'none',
  padding: 0,
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '0.075px',
  textAlign: 'right' as const,
  lineHeight: '16px',
  marginTop: '7px'
})

export const addAnotherBoxStyles = {
  width: '100%',
  justifyContent: 'flex-end',
  display: 'flex'
}

export const skipButtonBoxStyles = {
  width: '100%',
  justifyContent: 'center',
  display: 'flex',
  marginTop: '40px'
}

export const formBoxStyles = {
  marginBottom: '15px'
}

export const formBoxStylesUrl = {
  marginBottom: '25px'
}

export const successPageContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  alignItems: 'center',
  width: '100%'
}

export const successPageBoxStyles = {
  width: '100%',
  height: '100px',
  display: 'flex',
  gap: '15px',
  bgcolor: 't3LightGray',
  borderRadius: '20px'
}

export const successPageImageStyles = {
  width: '100px',
  height: '100px'
}

export const successPageInnerBoxStyles = {
  width: '100%',
  textAlign: 'right',
  pr: '15px',
  mt: '5px'
}

export const successPageTypographyStyles = {
  color: 't3BodyText',
  textAlign: 'left',
  fontFamily: 'Inter',
  fontSize: '15px',
  fontWeight: 700,
  textTransform: 'capitalize'
}

export const successPageInfoBoxStyles = {
  display: 'flex',
  width: '100%',
  gap: '15px',
  mt: '5px'
}

export const successPageIconContainerStyles = {
  display: 'flex',
  gap: '3px'
}

export const successPageIconTextStyles = {
  color: 't3PlaceholderText',
  textAlign: 'center',
  fontFamily: 'Poppins',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '150%'
}

export const successPageSocialContainerStyles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '9px'
}

export const successPageSocialIconStyles = {
  bgcolor: 't3LightGray',
  borderRadius: '20px',
  height: '40px',
  width: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const successPageButtonContainerStyles = {
  width: '100%',
  justifyContent: 'center',
  display: 'flex'
}

export const successPageButtonStyles = {
  padding: '10px 24px',
  borderRadius: '100px',
  bgcolor: 't3ButtonBlue',
  textTransform: 'capitalize',
  fontFamily: 'Roboto',
  lineHeight: '20px',
  '&:hover': {
    bgcolor: 't3ButtonBlue'
  }
}

export const stepTrackContainerStyles = {
  width: '100%',
  display: 'flex',
  gap: '5px',
  justifyContent: 'center'
}

export const stepTrackBoxStyles = (width: string) => ({
  width: width,
  height: '5px',
  bgcolor: 't3BodyText',
  borderRadius: '3px'
})
