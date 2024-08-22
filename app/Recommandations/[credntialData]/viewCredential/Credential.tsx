'use client'

import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { nextButtonStyle } from '../../../components/Styles/appStyles'
import { SVGCheckMarks } from '../../../Assets/SVGs'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { featuresRecommentations } from '../RecommandationForm/fromTexts & stepTrack/FormTextSteps'
import FetchedData from './FetchedData'
import { useSession } from 'next-auth/react'
import DeclineMessage from '../RecommandationForm/Steps/DeclineMessage'

const Credential = ({ setactivStep }: { setactivStep: any }) => {
  const [fullName, setFullName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [isEmailFetched, setIsEmailFetched] = useState(false)

  const { data: session } = useSession()
  const userName = session?.user?.name ?? 'Your Name'

  const theme = useTheme()

  const handleClick = () => {
    setactivStep(1)
  }

  const handleDeclineClick = () => {
    setactivStep(8)
  }

  useEffect(() => {
    if (recipientEmail) {
      setIsEmailFetched(true)
    }
  }, [recipientEmail])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // gap: '30px',
        padding: '0 15px 30px',
        mt: '30px'
      }}
    >
      <Button onClick={handleClick} sx={{ ...nextButtonStyle, width: '100%' }}>
        Get Started
      </Button>

      <Link
        component='button'
        variant='body2'
        onClick={handleDeclineClick}
        sx={{
          textDecoration: 'underline',
          color: theme.palette.primary.main,
          cursor: 'pointer',
          fontWeight: '400',
          fontSize: '16px',
          textAlign: 'center',
          marginTop: '15px',
          mb: '30px'
        }}
      >
        Decline Recommendation Request
      </Link>
      <Typography
        sx={{
          flexShrink: 0,
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: 'normal',
          m: '0 3px 30px 15px'
        }}
      >
        Here’s what you may need before getting started:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: '30px' }}>
        {featuresRecommentations.map((feature: { id: any; name: any }) => (
          <Box
            key={feature.id}
            sx={{ display: 'flex', width: '100%', maxWidth: '321px', ml: '30px' }}
          >
            <SVGCheckMarks />
            <Typography
              sx={{
                color: theme.palette.t3BodyText,
                flexShrink: 0,
                fontFamily: 'Lato',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: 'normal',
                m: '0 5px 0 15px'
              }}
            >
              {feature.name}
            </Typography>
            <InfoOutlinedIcon sx={{ width: '15px', height: '15px', mt: '3px ' }} />
          </Box>
        ))}
      </Box>
      <FetchedData setFullName={setFullName} setEmail={setRecipientEmail} />
      {isEmailFetched && setactivStep === 8 && (
        <DeclineMessage
          setactivStep={setactivStep}
          fullName={fullName}
          recipientEmail={recipientEmail}
          userName={userName}
        />
      )}
    </Box>
  )
}

export default Credential
