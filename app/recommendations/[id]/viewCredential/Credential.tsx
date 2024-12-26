'use client'

import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { SVGCheckMarks } from '../../../Assets/SVGs'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { featuresRecommentations } from '../RecommandationForm/fromTexts/FormTextSteps'
import ComprehensiveClaimDetails from '../../../view/[id]/ComprehensiveClaimDetails'
import DeclineRequest from '../DeclineRequest/DeclineRequest'
import { useParams } from 'next/navigation'

interface CredentialProps {
  setactivStep: (step: number) => void
  fullName: string
  email: string
}

const Credential: React.FC<CredentialProps> = ({ setactivStep, fullName, email }) => {
  const theme = useTheme()
  const [showDeclineRequest, setShowDeclineRequest] = useState(false)

  const params = useParams()
  let id: string | undefined

  if (typeof params?.id === 'string') {
    id = params.id
  } else if (Array.isArray(params?.id)) {
    id = params.id[0]
  }

  if (!id) {
    console.error('Error: Missing credential data.')
    return (
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant='h6' color='error'>
          Error: Missing credential data.
        </Typography>
      </Box>
    )
  }

  const handleClick = () => {
    setactivStep(1)
  }

  const handleDeclineRequest = () => {
    setShowDeclineRequest(true)
  }

  const handleBack = () => {
    setShowDeclineRequest(false)
  }

  if (showDeclineRequest) {
    return <DeclineRequest fullName={fullName} email={email} handleBack={handleBack} />
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '0 15px 30px',
        mt: '30px',
        alignItems: 'center'
      }}
    >
      <ComprehensiveClaimDetails />
      <Box
        sx={{
          m: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Button variant='nextButton' onClick={handleClick} sx={{ width: '100%', mb: 1 }}>
          Get Started
        </Button>
        <Button
          onClick={handleDeclineRequest}
          sx={{
            padding: '10px 24px',
            borderRadius: '100px',
            textTransform: 'capitalize',
            fontFamily: 'Roboto',
            textDecoration: 'underline',
            fontWeight: '600',
            lineHeight: '16px',
            flexGrow: 8,
            fontSize: '16px'
          }}
          variant='text'
        >
          Decline/Ignore Recommendation Request
        </Button>
      </Box>
      <Typography
        sx={{
          flexShrink: 1,
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '19.2px',
          m: '0 3px 0 15px'
        }}
      >
        Here’s what you may need before getting started:
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minWidth: '210px', gap: '15px' }}
      >
        {featuresRecommentations(fullName).map(feature => (
          <Box
            key={feature.id}
            sx={{
              display: 'flex',
              lineHeight: 'normal',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <SVGCheckMarks />
            <Typography
              sx={{
                color: theme.palette.t3BodyText,
                flexShrink: 1,
                fontFamily: 'Lato',
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '21.6px',
                m: '0 5px 0 15px'
              }}
            >
              {feature.name}
            </Typography>
            <InfoOutlinedIcon
              sx={{
                width: '15px',
                height: '15px',
                mt: '3px',
                cursor: 'pointer',
                color: theme.palette.primary.main
              }}
              aria-label={`More information about ${feature.name}`}
              titleAccess={`More information about ${feature.name}`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Credential
