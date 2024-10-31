/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { Typography, Box, Button, Snackbar } from '@mui/material'
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
        maxWidth: '390px',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        mx: 'auto',
        px: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <Box
          sx={{
            aspectRatio: '1',
            objectFit: 'contain',
            objectPosition: 'center',
            width: '100px',
            maxWidth: '100%'
          }}
        >
          <GlobalSVG />
        </Box>
        <Typography
          sx={{
            marginTop: '32px',
            width: '120px',
            maxWidth: '100%',
            color: '#202E5B',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '32px',
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
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            color: '#000',
            letterSpacing: '0.08px',
            justifyContent: 'flex-start',
            padding: '15px',
            fontWeight: 700,
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            border: '3px solid #14B8A6',
            textTransform: 'none',
            mt: '10px'
          }}
        >
          <HeartSVG />
          <Typography
            sx={{
              flex: 1,
              color: '#000'
            }}
          >
            Ask for a recommendation
          </Typography>
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: '45px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start'
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

        <Box sx={{ width: '100%' }}>
          <Button
            onClick={() => handleShareOption('LinkedIn')}
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              color: '#000',
              letterSpacing: '0.08px',
              justifyContent: 'flex-start',
              padding: '15px',
              fontWeight: 700,
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '3px solid #14B8A6',
              textTransform: 'none',
              mt: '10px'
            }}
          >
            <NewLinkedin />
            <Typography
              sx={{
                flex: 1,
                color: '#000'
              }}
            >
              Share to LinkedIn
            </Typography>
          </Button>

          <Button
            onClick={() => handleShareOption('Email')}
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              color: '#000',
              letterSpacing: '0.08px',
              justifyContent: 'flex-start',
              padding: '15px',
              fontWeight: 700,
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '3px solid #14B8A6',
              textTransform: 'none',
              mt: '10px'
            }}
          >
            <NewEmail />
            <Typography
              sx={{
                flex: 1,
                color: '#000'
              }}
            >
              Share via Email
            </Typography>
          </Button>

          <Button
            onClick={() => handleShareOption('CopyURL')}
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              color: '#000',
              letterSpacing: '0.08px',
              justifyContent: 'flex-start',
              padding: '15px',
              fontWeight: 700,
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '3px solid #14B8A6',
              textTransform: 'none',
              mt: '10px'
            }}
          >
            <NewCopy />
            <Typography
              sx={{
                flex: 1,
                color: '#000'
              }}
            >
              Copy URL
            </Typography>
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          marginTop: '45px',
          width: '100%',
          flexDirection: 'column',
          textAlign: 'center',
          justifyContent: 'flex-start',
          fontWeight: 600,
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <Button
          onClick={() => {
            setActiveStep(0)
            setLink('')
            setFileId('')
            reset()
          }}
          variant='contained'
          sx={{
            alignSelf: 'stretch',
            borderRadius: '100px',
            backgroundColor: '#003FE0',
            minWidth: '240px',
            minHeight: '40px',
            width: '100%',
            gap: '10px',
            overflow: 'hidden',
            padding: '10px 20px',
            textTransform: 'none',
            color: '#FFFFFF'
          }}
        >
          Add another skill
        </Button>

        <Button
          variant='outlined'
          sx={{
            display: 'flex',
            marginTop: '10px',
            minHeight: '40px',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#003FE0',
            alignSelf: 'stretch',
            borderRadius: '100px',
            backgroundColor: '#EFF6FF',
            minWidth: '240px',
            gap: '10px',
            overflow: 'hidden',
            padding: '10px 20px',
            border: '1px solid #003FE0',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif'
          }}
          onClick={() => {
            window.location.href = '/view-my-opencred-skills'
          }}
        >
          View my OpenCred skills
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message='Link copied to clipboard!'
      />
    </Box>
  )
}

export default SuccessPage
