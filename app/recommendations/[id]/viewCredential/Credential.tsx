'use client'

import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { nextButtonStyle } from '../../../components/Styles/appStyles'
import { SVGCheckMarks } from '../../../Assets/SVGs'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { featuresRecommentations } from '../RecommandationForm/fromTexts/FormTextSteps'
import FetchedData from './FetchedData'
import DeclineRequest from '../DeclineRequest/DeclineRequest'

const Credential = ({ setactivStep }: { setactivStep: any }) => {
  const theme = useTheme()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [showDeclineRequest, setShowDeclineRequest] = useState(false)

  const handleClick = () => {
    setactivStep(1)
  }

  const handleDeclineRequest = () => {
    setShowDeclineRequest(true)
  }

  const handleBack = () => {
    setShowDeclineRequest(false) // Go back to Credential component
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
        mt: '30px'
      }}
    >
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.t3BodyText,
          fontFamily: 'Lato',
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '28.8px',
          textAlign: 'center',
          m: '0',
          width: '100%'
        }}
      >
        Hi, I’m Tessa! I’ll help you with <br /> {fullName}’s recommendation.
      </Typography>
      <Button onClick={handleClick} sx={{ ...nextButtonStyle, width: '100%' }}>
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
          fontSize: '16px',
          width: '100%'
        }}
        variant='text'
      >
        Decline Recommendation Request
      </Button>
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
        {featuresRecommentations(fullName).map((feature: { id: any; name: any }) => (
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
            <InfoOutlinedIcon sx={{ width: '15px', height: '15px', mt: '3px ' }} />
          </Box>
        ))}
      </Box>
      <FetchedData setFullName={setFullName} setEmail={setEmail} />
    </Box>
  )
}

export default Credential