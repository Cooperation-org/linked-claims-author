import { useTheme } from '@mui/material/styles'
import React from 'react'
import Image from 'next/image'
import { Box, Typography, useMediaQuery, Theme } from '@mui/material'
import { SVGDate } from '../../Assets/SVGs'
import { FormData } from './Types'
import test from '../../Assets/test.png'

interface DataPreviewProps {
  formData: FormData
}

const DataPreview: React.FC<DataPreviewProps> = ({ formData }) => {
  const theme: Theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))

  console.log(':  dataPreview  formData', formData)

  const handleNavigate = (url: string) => {
    window.location.href = url
  }

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '10px',
        border: '1px solid #E5E7EB',
        p: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        bgcolor: isLargeScreen ? theme.palette.t3NewWhitesmoke : 'none'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isLargeScreen ? 'row' : 'column',
          gap: !isLargeScreen ? '10px' : '20px'
        }}
      >
        <Box sx={{ borderRadius: '2px' }}>
          <Image
            style={{ width: !isLargeScreen ? '100%' : '179px', height: '100%' }}
            src={test}
            alt='testImage'
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            justifyContent: 'center'
          }}
        >
          <Typography
            sx={{
              color: theme.palette.t3BodyText,
              fontFamily: 'Inter',
              fontSize: '18px',
              fontWeight: 800
            }}
          >
            {formData.credentialName}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              p: '2px 5px',
              bgcolor: theme.palette.t3LightGray,
              borderRadius: '5px',
              width: '80px'
            }}
          >
            <Box sx={{ mt: '2px' }}>
              <SVGDate />
            </Box>
            <Typography
              sx={{
                color: theme.palette.t3PlaceholderText,
                fontFamily: 'Poppins',
                fontSize: '13px',
                fontWeight: 400
              }}
            >
              {formData.credentialDuration}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          color: theme.palette.t3BodyText,
          fontFamily: 'Inter',
          fontSize: '15px',
          fontWeight: 400
        }}
      >
        {formData.description}
      </Typography>
      <Box
        sx={{
          color: theme.palette.t3BodyText,
          fontFamily: 'Inter',
          fontSize: '15px',
          fontWeight: 400
        }}
      >
        <span style={{ display: 'block' }}>Earning criteria:</span>
        {formData.credentialDescription}
      </Box>
      <Box
        sx={{
          color: theme.palette.t3BodyText,
          fontFamily: 'Inter',
          fontSize: '15px',
          fontWeight: 400
        }}
      >
        Portfolio:
        <ul
          style={{
            marginLeft: '25px',
            textDecorationLine: 'underline',
            color: theme.palette.t3ButtonBlue
          }}
        >
          {formData?.portfolio?.map(porto => (
            <li key={porto.url} onClick={() => handleNavigate(porto.url)}>
              {porto.name}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  )
}

export default DataPreview
