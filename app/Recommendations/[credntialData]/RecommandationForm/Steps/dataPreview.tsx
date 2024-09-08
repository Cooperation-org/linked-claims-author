import React, { useState } from 'react'
import { Box, Card, Container, Link, Typography } from '@mui/material'
import { SVGBadge, QuoteSVG } from '../../../../Assets/SVGs'
import { FormData } from '../../../../CredentialForm/form/types/Types'
import FetchedData from '../../viewCredential/FetchedData'

interface DataPreviewProps {
  formData: FormData
  handleNext: () => void
  handleBack: () => void
  handleSign: () => void
}

const DataPreview: React.FC<DataPreviewProps> = ({
  formData,
  handleNext,
  handleBack,
  handleSign
}) => {
  const [fetchedName, setFetchedName] = useState<string | null>(null)

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

      {/* Credential Details from Google Drive */}
      <FetchedData
        setFullName={(name: string) => {
          console.log('Full Name:', name)
          setFetchedName(name)
        }}
        setEmail={(email: string) => console.log('Email:', email)}
      />

      {/* Vouch Confirmation */}
      {formData.fullName && fetchedName && (
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
              {formData.fullName} vouched for {fetchedName}.
            </Typography>
          </Box>
        </Card>
      )}

      {/* Quote Section */}
      {formData.explainAnswer && (
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
              {formData.explainAnswer.replace(/<\/?[^>]+>/gi, '')}
            </Typography>
          </Box>
        </Card>
      )}

      {/* How They Know Each Other */}
      {formData.howKnow && (
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
            {formData.howKnow.replace(/<\/?[^>]+>/gi, '')}
          </Typography>
        </Card>
      )}

      {/* Supporting Evidence */}
      {formData.portfolio && formData.portfolio.length > 0 && (
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
          {formData.portfolio.map(item => (
            <Box key={item.url} sx={{ mt: 1 }}>
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
            </Box>
          ))}
        </Card>
      )}
    </Container>
  )
}

export default DataPreview
