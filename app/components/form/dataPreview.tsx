import React from 'react'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { Box, Typography, useMediaQuery, Theme } from '@mui/material'
import { SVGDate } from '../../Assets/SVGs'
import { FormData } from './Types'
import test from '../../Assets/test.png'
import {
  boxStyles,
  commonTypographyStyles,
  commonBoxStyles,
  evidenceListStyles,
  credentialBoxStyles,
  imageBoxStyles
} from './boxStyles'

interface DataPreviewProps {
  formData: FormData
}

const DataPreview: React.FC<DataPreviewProps> = ({ formData }) => {
  const theme: Theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))

  const handleNavigate = (url: string) => {
    window.location.href = url
  }

  return (
    <Box
      sx={{
        ...boxStyles,
        p: '10px',
        gap: '20px',
        bgcolor: isLargeScreen ? theme.palette.t3NewWhitesmoke : 'none'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isLargeScreen ? 'row' : 'column',
          gap: isLargeScreen ? '20px' : '10px',
          mb:'10px'
        }}
      >
        <Box sx={imageBoxStyles}>
          <Image
            style={{ width: !isLargeScreen ? '100%' : '179px', height: '100%' }}
            src={test}
            alt='testImage'
          />
        </Box>
        <Box sx={commonBoxStyles}>
          <Typography
            sx={{
              ...commonTypographyStyles,
              fontSize: '18px',
              fontWeight: 800
            }}
          >
            {formData.credentialName}
          </Typography>
          <Box
            sx={{
              ...credentialBoxStyles,
              bgcolor: theme.palette.t3LightGray
            }}
          >
            <Box sx={{ mt: '2px' }}>
              <SVGDate />
            </Box>
            <Typography sx={{ ...commonTypographyStyles, fontSize: '13px' }}>
              {formData.credentialDuration}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <Typography sx={commonTypographyStyles}>{formData.description}</Typography>
        <Box sx={commonTypographyStyles}>
          <span style={{ display: 'block' }}>Earning criteria:</span>
          {formData.credentialDescription.replace(/<[^>]+>/g, '')}
        </Box>
        <Box sx={commonTypographyStyles}>
          Evidence:
          <ul style={evidenceListStyles}>
            {formData?.portfolio?.map(porto => (
              <li key={porto.url} onClick={() => handleNavigate(porto.url)}>
                {porto.name}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  )
}

export default DataPreview
