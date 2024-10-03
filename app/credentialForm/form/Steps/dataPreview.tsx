/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, useMediaQuery, Theme } from '@mui/material'
import { SVGDate } from '../../../Assets/SVGs'
import { FormData } from '../types/Types'
import {
  boxStyles,
  commonTypographyStyles,
  commonBoxStyles,
  evidenceListStyles,
  credentialBoxStyles
} from '../../../components/Styles/appStyles'
import Image from 'next/image'

const cleanHTML = (htmlContent: string) => {
  return htmlContent
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '')
    .replace(/class="[^"]*"/g, '')
    .replace(/style="[^"]*"/g, '')
}

interface DataPreviewProps {
  formData: FormData
}

const DataPreview: React.FC<DataPreviewProps> = ({ formData }) => {
  console.log(':  formData', formData)
  const theme: Theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))

  const handleNavigate = (url: string, target: string = '_self') => {
    window.open(url, target)
  }

  const imageUrl = formData.evidenceLink || ''
  const hasValidEvidence = formData.portfolio?.some(porto => porto.name && porto.url)

  return (
    <Box
      sx={{
        ...boxStyles,
        p: '10px',
        gap: '20px',
        bgcolor: isLargeScreen ? theme.palette.t3NewWhitesmoke : 'none'
      }}
    >
      <Box sx={commonBoxStyles}>
        <Typography
          sx={{
            ...commonTypographyStyles,
            fontSize: '24px',
            fontWeight: 700
          }}
        >
          {formData.credentialName}
        </Typography>
        {formData.credentialDuration && (
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
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isLargeScreen ? 'row' : 'column',
          gap: isLargeScreen ? '20px' : '10px',
          mb: '10px'
        }}
      >
        {imageUrl ? (
          <img
            style={{
              borderRadius: '20px',
              width: !isLargeScreen ? '100%' : '179px',
              height: '100%'
            }}
            src={imageUrl}
            alt='Certification Evidence'
          />
        ) : (
          <Box sx={{ width: !isLargeScreen ? '100%' : '179px', height: '100%' }} />
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography sx={commonTypographyStyles}>
          <span
            dangerouslySetInnerHTML={{ __html: cleanHTML(formData?.description as any) }}
          />
        </Typography>
        {formData.credentialDescription && (
          <Box sx={commonTypographyStyles}>
            <span style={{ display: 'block' }}>Earning criteria:</span>
            <span
              dangerouslySetInnerHTML={{
                __html: cleanHTML(formData.credentialDescription as any)
              }}
            />
          </Box>
        )}
        {hasValidEvidence && (
          <Box sx={commonTypographyStyles}>
            <Typography sx={{ display: 'block' }}>Evidence:</Typography>
            <ul style={evidenceListStyles}>
              {formData.portfolio.map(
                porto =>
                  porto.name &&
                  porto.url && (
                    <li
                      style={{ cursor: 'pointer', width: 'fit-content' }}
                      key={porto.url}
                      onClick={() => handleNavigate(porto.url, '_blank')}
                    >
                      {porto.name}
                    </li>
                  )
              )}
            </ul>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DataPreview
