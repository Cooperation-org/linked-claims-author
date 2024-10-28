'use client'

import React from 'react'
import { Box, Card, Container, Link, Typography } from '@mui/material'
import { SVGBadge, QuoteSVG } from '../../../../Assets/SVGs'
import { FormData } from '../../../../credentialForm/form/types/Types'
import ComprehensiveClaimDetails from '../../../../test/[id]/ComprehensiveClaimDetails'

interface DataPreviewProps {
  formData: FormData
  fullName: string
  handleNext: () => void
  handleBack: () => void
  handleSign: () => void
}

const cleanHTML = (htmlContent: string) => {
  return htmlContent
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '')
    .replace(/class="[^"]*"/g, '')
    .replace(/style="[^"]*"/g, '')
}

const DataPreview: React.FC<DataPreviewProps> = ({ formData, fullName }) => {
  return (
    <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant='body1'
        align='center'
        gutterBottom
        sx={{ fontSize: '16px', letterSpacing: '0.01em', fontFamily: 'Lato' }}
      >
        If everything looks good, select Finish & Sign to complete your recommendation.
      </Typography>

      {/* Credential Details from Google Drive using ComprehensiveClaimDetails */}
      <ComprehensiveClaimDetails />

      {/* Vouch Confirmation */}
      {formData.fullName && (
        <Card
          variant='outlined'
          sx={{
            p: '10px',
            mb: '10px',
            mt: '10px',
            border: '1px solid #003fe0',
            borderRadius: '10px'
          }}
        >
          <Box display='flex' alignItems='center'>
            <SVGBadge />
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: '700',
                ml: '5px',
                letterSpacing: '0.01em',
                position: 'relative'
              }}
            >
              {formData.fullName} vouched for {fullName}.
            </Typography>
          </Box>
        </Card>
      )}

      {/* Quote Section */}
      {formData.explainAnswer && formData.explainAnswer.trim() && (
        <Card
          variant='outlined'
          sx={{
            p: '10px',
            mb: '10px',
            border: '1px solid #003fe0',
            borderRadius: '10px'
          }}
        >
          <Box display='flex' alignItems='center'>
            <QuoteSVG />
            <Typography
              variant='body2'
              sx={{
                ml: 1,
                fontSize: '15px',
                lineHeight: '24px',
                color: '#202e5b',
                letterSpacing: '0.01em'
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(formData.explainAnswer)
                }}
              />
            </Typography>
          </Box>
        </Card>
      )}

      {/* How They Know Each Other */}
      {formData.howKnow && formData.howKnow.trim() && (
        <Card
          variant='outlined'
          sx={{
            p: '10px',
            mb: '10px',
            border: '1px solid #003fe0',
            borderRadius: '10px'
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{
              fontWeight: 'bold',
              fontSize: '15px',
              letterSpacing: '0.01em',
              mb: 1
            }}
          >
            How They Know Each Other
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontSize: '15px',
              lineHeight: '24px',
              color: '#000e40',
              letterSpacing: '0.01em'
            }}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: cleanHTML(formData.howKnow)
              }}
            />
          </Typography>
        </Card>
      )}

      {/* Your Qualifications */}
      {formData.qualifications && (
        <Card
          variant='outlined'
          sx={{
            p: '10px',
            mb: '10px',
            border: '1px solid #003fe0',
            borderRadius: '10px'
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{
              fontWeight: 'bold',
              fontSize: '15px',
              letterSpacing: '0.01em',
              mb: 1
            }}
          >
            Your Qualifications
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontSize: '15px',
              lineHeight: '24px',
              color: '#000e40',
              letterSpacing: '0.01em'
            }}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: cleanHTML(formData.qualifications as string)
              }}
            />
          </Typography>
        </Card>
      )}

      {/* Supporting Evidence */}
      {formData.portfolio &&
        formData.portfolio.filter(item => item.name || item.url).length > 0 && (
          <Card
            variant='outlined'
            sx={{
              p: '10px',
              border: '1px solid #003fe0',
              borderRadius: '10px'
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{
                fontWeight: 'bold',
                fontSize: '15px',
                letterSpacing: '0.01em',
                mb: 1
              }}
            >
              Supporting Evidence
            </Typography>
            {formData.portfolio
              .filter(item => item.name || item.url)
              .map((item, index) => (
                <Box key={index} sx={{ mt: 1 }}>
                  {item.name && item.url ? (
                    <Link
                      href={item.url}
                      underline='hover'
                      color='primary'
                      sx={{
                        fontSize: '15px',
                        textDecoration: 'underline',
                        color: '#003fe0'
                      }}
                      target='_blank'
                    >
                      {item.name}
                    </Link>
                  ) : null}
                </Box>
              ))}
          </Card>
        )}
    </Container>
  )
}

export default DataPreview
