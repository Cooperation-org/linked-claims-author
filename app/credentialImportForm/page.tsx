'use client'
import React from 'react'
import { Box, TextField, FormLabel, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const formLabelStyles = {
  fontFamily: 'Lato',
  fontSize: '16px',
  fontWeight: 400,
  color: '#000000',
  marginBottom: '8px'
}

const TextFieldStyles = {
  width: '343px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px'
  }
}

const textFieldInputProps = {
  style: {
    padding: '16px',
    fontSize: '16px'
  }
}

export function SimpleCredentialForm() {
  const router = useRouter()
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const credentialUrl = formData.get('credentialUrl')
    // Navigate to process page with the URL as a query parameter
    router.push(`/credentialImportForm/process-credential?url=${encodeURIComponent(credentialUrl as string)}`)
  }

  return (
    <Box
      sx={{
        mt: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px'
      }}
    >
      <Typography sx={{ fontFamily: 'Lato', fontSize: '24px', fontWeight: 400 }}>
        Credential Import
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel sx={{ ...formLabelStyles, mb:2}} id='credential-url-label'>
            Enter your credential URL:
          </FormLabel>
          <TextField
            name="credentialUrl"
            placeholder="https://..."
            variant='outlined'
            sx={TextFieldStyles}
            aria-labelledby='credential-url-label'
            inputProps={textFieldInputProps}
          />
        </Box>
      </form>
    </Box>
  )
}

const FormComponent = () => {
  return (
    <Box
      sx={{
        minHeight: {
          xs: 'calc(100vh - 182px)',
          md: 'calc(100vh - 255px)'
        },
        display: 'block',
        flexDirection: 'column',
        overflow: 'auto'
      }}
    >
      <SimpleCredentialForm />
    </Box>
  )
}

export default FormComponent
