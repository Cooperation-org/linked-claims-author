import { useTheme } from '@mui/material/styles'
import React from 'react'
import { Box, Typography } from '@mui/material'
import { ShieldIcon } from '../../Assets/SVGs'
import Link from 'next/link'

const Footer = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '154px',
        bgcolor: '#252C41',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3
        }}
      >
        <ShieldIcon />
        <Typography
          sx={{
            color: theme.palette.t3LightGray,
            fontFamily: 'Lato',
            fontSize: '18px',
            fontWeight: 400,
            letterSpacing: '-0.15px'
          }}
        >
          100% data privacy - no tracking, you own your data forever.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: { xs: 'center', md: 'space-between' },
          px: { xs: 2, md: 4 },
          gap: { xs: 3, md: 0 },
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            color: theme.palette.t3LightGray,
            fontFamily: 'Lato',
            fontSize: '13px',
            fontWeight: 400
          }}
        >
          Copyright, LinkedClaims, 2024
        </Typography>
        <Link href={'/privacy'}>
          <Typography
            sx={{
              color: theme.palette.t3LightGray,
              fontFamily: 'Lato',
              fontSize: '13px',
              fontWeight: 400,
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Data & Privacy Policy
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default Footer
