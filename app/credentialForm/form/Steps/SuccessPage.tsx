/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {
  Typography,
  Box,
  Button,
  Snackbar,
  useMediaQuery,
  useTheme,
  Stack
} from '@mui/material'
import {
  GlobalSVG,
  HeartSVG,
  BlueBadge,
  NewCopy,
  NewLinkedin,
  NewEmail
} from '../../../Assets/SVGs'

import { FormData } from '../../../credentialForm/form/types/Types'
import { copyFormValuesToClipboard } from '../../../utils/formUtils'
import { useStepContext } from '../StepContext'

interface SuccessPageProps {
  setActiveStep: (step: number) => void
  formData: FormData | null
  reset: () => void
  link: string
  setLink: (link: string) => void
  setFileId: (link: string) => void
  storageOption: string
  fileId: string
  selectedImage: string
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  formData,
  reset,
  link,
  setLink,
  setFileId,
  fileId,
  storageOption,
  selectedImage
}) => {
  const { setActiveStep } = useStepContext()
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const refLink = fileId
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const generateLinkedInUrl = () => {
    const baseLinkedInUrl = 'https://www.linkedin.com/profile/add'
    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: formData?.credentialName ?? 'Certification Name',
      organizationName: 'LinkedTrust',
      issueYear: '2024',
      issueMonth: '8',
      expirationYear: '2025',
      expirationMonth: '8',
      certUrl: `https://opencreds.net/view/${fileId}`
    })
    return `${baseLinkedInUrl}?${params.toString()}`
  }

  const handleShareOption = (option: 'LinkedIn' | 'Email' | 'CopyURL') => {
    const credentialLink = `https://opencreds.net/view/${fileId}`
    if (option === 'LinkedIn') {
      const linkedInUrl = generateLinkedInUrl()
      window.open(linkedInUrl, '_blank', 'noopener noreferrer')
    } else if (option === 'Email') {
      const mailUrl = `mailto:?subject=Check%20out%20my%20new%20certification&body=You%20can%20view%20my%20certification%20here:%20${encodeURIComponent(
        credentialLink
      )}`
      window.location.href = mailUrl
    } else if (option === 'CopyURL') {
      copyFormValuesToClipboard(credentialLink)
      setSnackbarOpen(true)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: isMobile ? '100%' : '720px',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        mx: 'auto'
      }}
    >
      {!isMobile && (
        <Button
          onClick={() => setActiveStep(0)}
          sx={{
            alignSelf: 'flex-start',
            color: '#003FE0',
            textTransform: 'none',
            mb: 2
          }}
        >
          &lt; Back
        </Button>
      )}

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          maxWidth: '660px'
        }}
      >
        <Box
          sx={{
            aspectRatio: '1',
            objectFit: 'contain',
            objectPosition: 'center',
            width: isMobile ? '80px' : '100px',
            maxWidth: '98%'
          }}
        >
          <GlobalSVG />
        </Box>
        <Typography
          sx={{
            marginTop: '32px',
            color: '#202E5B',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: isMobile ? '24px' : '32px',
            fontFamily: 'Lato, sans-serif'
          }}
        >
          Success!
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          marginTop: '32px',
          width: '100%',
          flexDirection: 'column',
          color: '#003FE0',
          letterSpacing: '0.12px',
          justifyContent: 'center',
          padding: '5px',
          fontWeight: 700,
          fontSize: '24px',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <Box
          sx={{
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: '20px',
            justifyContent: 'flex-start',
            padding: '15px',
            border: '1px solid #003FE0'
          }}
        >
          <BlueBadge />
          <Typography
            sx={{
              flex: 1,
              fontFamily: 'inherit',
              margin: 0,
              color: '#003FE0'
            }}
          >
            {formData?.credentialName}
          </Typography>
        </Box>

        <Button
          onClick={() => handleShareOption('CopyURL')}
          disabled={!fileId}
          sx={{
            ...buttonStyles,
            mt: '15px'
          }}
        >
          <NewCopy />
          Copy URL
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: '45px',
          width: '100%'
        }}
      >
        <Typography
          sx={{
            color: '#202E5B',
            fontWeight: 400,
            fontSize: '24px',
            fontFamily: 'Lato, sans-serif',
            marginBottom: '10px'
          }}
        >
          Strengthen the value of your skill:
        </Typography>

        <Button
          onClick={() => {
            window.location.href = `/askforrecommendation/${refLink}`
          }}
          disabled={!refLink}
          sx={buttonStyles}
        >
          <HeartSVG />
          Ask for a recommendation
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: '45px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: '15px'
        }}
      >
        <Typography
          sx={{
            width: '100%',
            color: '#202E5B',
            padding: '5px 0 5px 5px',
            fontWeight: 400,
            fontSize: '24px',
            fontFamily: 'Lato, sans-serif',
            marginBottom: '10px'
          }}
        >
          Make your skills work for you:
        </Typography>

        <Button
          disabled={!fileId}
          onClick={() => handleShareOption('LinkedIn')}
          sx={buttonStyles}
        >
          <NewLinkedin />
          Share to LinkedIn
        </Button>
        <Button
          disabled={!fileId}
          onClick={() => handleShareOption('Email')}
          sx={buttonStyles}
        >
          <NewEmail />
          Share via Email
        </Button>
      </Box>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={isMobile ? 1 : 2}
        sx={{
          marginTop: '45px',
          width: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <Button
          variant='outlined'
          onClick={() => {
            window.location.href = '/view-my-opencred-skills'
          }}
          sx={{
            ...finalButtonStyles,
            minWidth: isMobile ? '360px' : '130px',
            backgroundColor: '#EFF6FF',
            color: '#003FE0',
            border: '1px solid #003FE0'
          }}
        >
          View my skills
        </Button>
        <Button
          onClick={() => {
            setActiveStep(0)
            setLink('')
            setFileId('')
            reset()
          }}
          variant='contained'
          sx={{
            ...finalButtonStyles,
            minWidth: isMobile ? '360px' : '220px'
          }}
        >
          Add another skill
        </Button>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message='Link copied to clipboard!'
      />
    </Box>
  )
}

const buttonStyles = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  color: '#000',
  letterSpacing: '0.08px',
  justifyContent: 'flex-start',
  padding: '15px',
  gap: '10px',
  fontWeight: 700,
  fontSize: '16px',
  fontFamily: 'Inter, sans-serif',
  borderRadius: '10px',
  backgroundColor: '#FFFFFF',
  border: '3px solid #14B8A6',
  textTransform: 'none'
}

const finalButtonStyles = {
  borderRadius: '100px',
  minHeight: '40px',
  width: '100%',
  gap: '10px',
  overflow: 'hidden',
  padding: '10px 20px',
  textTransform: 'none',
  color: '#FFFFFF',
  backgroundColor: '#003FE0'
}

export default SuccessPage
