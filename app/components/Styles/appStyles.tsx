import { styled, TextField, Theme } from '@mui/material'

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
  letterSpacing: '0.075px'
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
  fontSize: '15px',
  fontWeight: 400,
  fontStyle: 'normal'
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
  color: 'blue',
  backGroundColor: '#FFFFFF'
}

export const credentialBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  padding: '2px 5px',
  borderRadius: '5px',
  width: 'fit-content',
  mb: '10px'
}

export const textFieldInputProps = {
  'aria-label': 'weight',
  style: {
    color: 't3Black',
    fontSize: '15px',
    fontStyle: 'italic',
    letterSpacing: '0.075px'
  }
}

export const customTextFieldStyles = {
  width: '100%',
  marginBottom: '3px',
  textAlign: 'left'
}

export const addAnotherButtonStyles = (theme: Theme) => ({
  textTransform: 'none',
  width: '100%',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& .MuiButton-endIcon': {
    marginRight: '0'
  },
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline'
  }
})

export const addAnotherIconStyles = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: `1px solid #2563EB`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& .MuiSvgIcon-root': {
    fontSize: '16px'
  }
}

export const addAnotherBoxStyles = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start'
}
