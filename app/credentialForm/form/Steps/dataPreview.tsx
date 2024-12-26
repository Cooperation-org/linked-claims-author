/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, useMediaQuery, Theme } from '@mui/material'
import { FormData } from '../types/Types'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import {
  commonTypographyStyles,
  commonBoxStyles,
  evidenceListStyles
} from '../../../components/Styles/appStyles'
import { StepTrackShape } from '../fromTexts & stepTrack/StepTrackShape'

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

const cleanHTML = (htmlContent: string) =>
  htmlContent
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '')
    .replace(/class="[^"]*"/g, '')
    .replace(/style="[^"]*"/g, '')

interface DataPreviewProps {
  formData: FormData
  selectedFiles: {
    id: string
    name: string
    url: string
    isFeatured?: boolean
  }[]
}

const isPDF = (fileName: string) => fileName.toLowerCase().endsWith('.pdf')

const renderPDFThumbnail = async (fileUrl: string) => {
  try {
    const loadingTask = getDocument(fileUrl)
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 0.1 })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      canvas.height = viewport.height
      canvas.width = viewport.width
      await page.render({ canvasContext: context, viewport }).promise
      return canvas.toDataURL()
    }
  } catch (error) {
    console.error('Error rendering PDF thumbnail:', error)
  }
  return '/fallback-pdf-thumbnail.png'
}

const DataPreview: React.FC<DataPreviewProps> = ({ formData, selectedFiles }) => {
  const theme: Theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const [pdfThumbnails, setPdfThumbnails] = useState<Record<string, string>>({})

  useEffect(() => {
    selectedFiles.forEach(async file => {
      if (isPDF(file.name) && !pdfThumbnails[file.id]) {
        const thumbnail = await renderPDFThumbnail(file.url)
        setPdfThumbnails(prev => ({ ...prev, [file.id]: thumbnail }))
      }
    })
  }, [selectedFiles, pdfThumbnails])

  const handleNavigate = (url: string, target = '_self') => {
    window.open(url, target)
  }

  const hasValidEvidence = formData.portfolio?.some(porto => porto.name && porto.url)

  const getCleanedDescription = (): string => {
    if (!formData?.description) return ''
    if (typeof formData.description === 'string') {
      return cleanHTML(formData.description)
    }
    return ''
  }

  const renderFeaturedEvidence = () => {
    if (!formData.evidenceLink) {
      return <Box sx={{ width: !isLargeScreen ? '100%' : '179px', height: '100%' }} />
    }

    const featuredFiles = selectedFiles.filter(f => f.isFeatured)
    if (featuredFiles.length === 0) {
      return <Box sx={{ width: !isLargeScreen ? '100%' : '179px', height: '100%' }} />
    }

    return featuredFiles.map(file => (
      <Box key={file.id} sx={{ width: isLargeScreen ? '179px' : '100%' }}>
        {isPDF(file.name) ? (
          <img
            style={{
              borderRadius: '20px',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            src={pdfThumbnails[file.id] ?? '/fallback-pdf-thumbnail.png'}
            alt='PDF Preview'
          />
        ) : (
          <img
            style={{
              borderRadius: '20px',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            src={file.url}
            alt='Certification Evidence'
          />
        )}
      </Box>
    ))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Typography
        sx={{
          fontFamily: 'Lato',
          fontSize: '24px',
          fontWeight: 400,
          textAlign: 'center'
        }}
      >
        Here’s what you’ve created!
      </Typography>
      <StepTrackShape />
      <Box
        sx={{
          width: '100%',
          bgcolor: '#FFF',
          borderRadius: '8px',
          border: '1px solid #003FE0',
          p: '10px',
          gap: '20px'
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
          {formData.credentialDescription && (
            <Box sx={commonTypographyStyles}>
              <span
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(formData.credentialDescription)
                }}
              />
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
          {renderFeaturedEvidence()}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Typography sx={commonTypographyStyles}>
            <span dangerouslySetInnerHTML={{ __html: getCleanedDescription() }} />
          </Typography>

          {formData.credentialDuration && (
            <Typography sx={{ ...commonTypographyStyles, fontSize: '13px' }}>
              Duration:
              <br />
              <ul>
                <li style={{ marginLeft: '20px', width: 'fit-content' }}>
                  {formData.credentialDuration}
                </li>
              </ul>
            </Typography>
          )}

          {hasValidEvidence && (
            <Box sx={commonTypographyStyles}>
              <Typography sx={{ display: 'block' }}>Evidence:</Typography>
              <ul style={evidenceListStyles}>
                <li style={{ listStyle: 'none' }}>
                  <Box
                    component='button'
                    type='button'
                    sx={{
                      cursor: 'pointer',
                      p: 0,
                      m: 0,
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: 'inherit',
                      fontFamily: 'inherit',
                      color: 'blue',
                      textDecoration: 'underline',
                      width: 'fit-content'
                    }}
                    onClick={() =>
                      formData.evidenceLink &&
                      handleNavigate(formData.evidenceLink, '_blank')
                    }
                    aria-label='Open main evidence link'
                  >
                    {formData.evidenceLink}
                  </Box>
                </li>
                {formData.portfolio?.map(porto => {
                  if (!porto.name || !porto.url) return null
                  return (
                    <li style={{ listStyle: 'none' }} key={porto.url}>
                      <Box
                        component='button'
                        type='button'
                        sx={{
                          cursor: 'pointer',
                          p: 0,
                          m: 0,
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          fontSize: 'inherit',
                          fontFamily: 'inherit',
                          color: 'blue',
                          textDecoration: 'underline',
                          width: 'fit-content'
                        }}
                        onClick={() => handleNavigate(porto.url.toString(), '_blank')}
                        aria-label={`Open portfolio link: ${porto.name}`}
                      >
                        {porto.name}
                      </Box>
                    </li>
                  )
                })}
              </ul>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default DataPreview
