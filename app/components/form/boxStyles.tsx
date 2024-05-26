'use client'
import { TextField, Button, styled, ButtonProps } from '@mui/material'

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
