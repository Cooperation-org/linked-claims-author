'use client'

import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { nextButtonStyle } from '../../../components/Styles/appStyles'
import { SVGCheckMarks } from '../../../Assets/SVGs'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { featuresRecommentations } from '../RecommandationForm/fromTexts/FormTextSteps'
import FetchedData from './FetchedData'

const Credential = ({ setactivStep }: { setactivStep: any; setFullName: any }) => {
  const theme = useTheme()
  const [fullName, setFullName] = useState('Golda')

  const handleClick = () => {
    setactivStep(1)
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
      <Button onClick={handleClick} sx={{ ...nextButtonStyle, width: '100%' }}>
        Get Started
      </Button>
      <Typography
        sx={{
          flexShrink: 0,
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: 'normal',
          m: '0 3px 0 15px'
        }}
      >
        Here’s what you may need before getting started:
      </Typography>
      <Box>
        {featuresRecommentations(fullName).map((feature: { id: any; name: any }) => (
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
      <FetchedData setFullName={setFullName} />
    </Box>
  )
}

export default Credential
