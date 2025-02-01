'use client'
import React, { useState } from 'react'
import {
  Box,
  Link,
  TextField,
  FormLabel,
  Typography,
  CircularProgress
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { importCredential } from '../utils/importCred'
import { makeGoogleDriveLink } from '../utils/googleDrive'
import { getCookie } from '../utils/cookie'

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

interface FileResult {
  success: boolean
  error?: string | undefined
  fileId?: string | undefined
  file?: { id: string | undefined }
}

// Separate status message component for cleaner organization
function StatusMessage({ fileResult }: { fileResult: FileResult | null }) {
  if (!fileResult) return null

  if (!fileResult.success || !fileResult.file) {
    return (
      <Typography
        sx={{
          color: 'error.main',
          mt: 2,
          textAlign: 'center'
        }}
      >
        {fileResult.error || 'Unknown error'}
      </Typography>
    )
  }

  return (
    <Typography
      sx={{
        color: 'success.main',
        mt: 2,
        textAlign: 'center'
      }}
    >
      Success! <Link href={`/view/${fileResult.file?.id}`}>View your credential</Link>
    </Typography>
  )
}

function SimpleCredentialForm() {
  const [fileResult, setFileResult] = useState<FileResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const accessToken = getCookie('accessToken')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const credentialUrl = formData.get('credentialUrl') as string

    if (!accessToken) {
      setFileResult({
        success: false,
        error: 'Please login first before attempting to import credential'
      })
      setIsLoading(false)
      return
    }

    try {
      const result = await importCredential(credentialUrl, accessToken)
      setFileResult(result)
      setIsLoading(false)
    } catch (error) {
      setFileResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
      setIsLoading(false)
    }
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
          <FormLabel sx={{ ...formLabelStyles, mb: 2 }} id='credential-url-label'>
            Enter your credential URL:
          </FormLabel>
          <TextField
            name='credentialUrl'
            placeholder='https://...'
            variant='outlined'
            sx={TextFieldStyles}
            aria-labelledby='credential-url-label'
            inputProps={textFieldInputProps}
            disabled={isLoading}
          />
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          {!isLoading && <StatusMessage fileResult={fileResult} />}
        </Box>
      </form>
    </Box>
  )
}

export default function Page() {
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
