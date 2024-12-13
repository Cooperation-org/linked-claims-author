import React from 'react'
import { Box, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface CardProps {
  title?: string
  description?: string
  criteria?: string[]
  duration?: string
  evidence?: string[]
  width?: string
  height?: string
  rotation?: string
  image?: string
  showPlayButton?: boolean
  showTimer?: boolean
  showDuration?: boolean
  showEvidence?: boolean
}

const Card = ({
  title = 'Example',
  description = 'I am able to demonstrate advanced skills in coffee preparation, customer service, and knowledge of coffee origins and brewing techniques.',
  criteria = [
    'Took 12 hours of barista classes',
    'Received positive customer surveys',
    'Received positive teacher feedback'
  ],
  duration = '2 Days',
  evidence = [
    'Video of the Perfect Pour',
    'Coffee Portfolio',
    'Training Campus Certification',
    'Scent training',
    'IMG_0624',
    'Tamping',
    'IMG_0640'
  ],
  width = '320px',
  height = '467px',
  rotation = 'rotate(0deg)',
  image = '/coffee.jpeg',
  showPlayButton = true,
  showTimer = true,
  showDuration = true,
  showEvidence = true
}: CardProps) => {
  return (
    <Box
      sx={{
        width,
        height,
        transform: rotation,
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        borderRadius: '10px',
        border: '1px solid #003FE0',
        padding: '8px',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '3px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '1.5px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '1.5px'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 0.5
          }}
        >
          <img src='/Badge.svg' alt='Badge' />
          <Typography
            sx={{
              color: '#202E5B',
              fontSize: '14px',
              fontWeight: 600,
              flex: 1
            }}
          >
            {title}
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: '#666', fontSize: '16px' }} />
        </Box>

        <Typography
          sx={{
            color: '#202E5B',
            fontSize: '10px',
            mb: 1,
            lineHeight: 1.2
          }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            position: 'relative',
            height: '100px',
            borderRadius: '6px',
            overflow: 'hidden',
            mb: 1
          }}
        >
          <Box
            component='img'
            src={image}
            alt='Card media'
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {showPlayButton && (
            <Box
              component='img'
              src='/play-circle.svg'
              alt='Play'
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '28px',
                height: '28px',
                filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3))'
              }}
            />
          )}

          {showTimer && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '4px',
                left: '4px',
                background: '#003FE0',
                borderRadius: '4px',
                padding: '2px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '10px',
                  lineHeight: 1
                }}
              >
                1:36
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography
            sx={{
              color: '#000E40',
              fontSize: '10px',
              fontWeight: 500,
              mb: 0.25
            }}
          >
            Earning criteria:
          </Typography>
          {criteria.map((item, index) => (
            <Typography
              key={`criteria-${index}`}
              sx={{
                color: '#000E40',
                fontSize: '9px',
                pl: 1,
                lineHeight: 1.2
              }}
            >
              • {item}
            </Typography>
          ))}
        </Box>

        {showDuration && (
          <Box sx={{ mb: 1 }}>
            <Typography
              sx={{
                color: '#000E40',
                fontSize: '10px',
                fontWeight: 500,
                mb: 0.25
              }}
            >
              Duration:
            </Typography>
            <Typography
              sx={{
                color: '#000E40',
                fontSize: '9px',
                pl: 1
              }}
            >
              • {duration}
            </Typography>
          </Box>
        )}

        {showEvidence && (
          <Box>
            <Typography
              sx={{
                color: '#000E40',
                fontSize: '10px',
                fontWeight: 500,
                mb: 0.25
              }}
            >
              Supporting Evidence:
            </Typography>
            {evidence.map((item, index) => (
              <Typography
                key={`evidence-${index}`}
                sx={{
                  color: '#000E40',
                  fontSize: '9px',
                  pl: 1,
                  lineHeight: 1.2
                }}
              >
                •{' '}
                <span
                  style={{
                    color: '#003FE0',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  {item}
                </span>
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Card
