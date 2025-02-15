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
        width: '100vw',
        height: '155px',
        bgcolor: '#252C41',
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: 'center',
        p: 2,
        gap: '25px',
        overflow: 'hidden',
        flexWrap: 'wrap',
        mt: '60px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          ml: { xs: 0, md: '240px' }
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
              letterSpacing: '-0.15px',
              lineHeight: '24px'
            }}
          >
            100% data privacy - no tracking,
            <br /> you own your data forever.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center ',
            gap: { xs: '30px', md: '34px' },
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              color: theme.palette.t3LightGray,
              fontFamily: 'Lato',
              fontSize: '14px',
              letterSpacing: '-0.14px',
              fontWeight: 400
            }}
          >
            Copyright, LinkedCreds, 2024
          </Typography>
          <Link href={'/privacy'}>
            <Typography
              sx={{
                color: theme.palette.t3LightGray,
                fontFamily: 'Lato',
                fontSize: '14px',
                letterSpacing: '-0.14px',
                fontWeight: 400,
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Data & Privacy Policy
            </Typography>
          </Link>
          {/* <Link href={'mailto:support@opencreds.net'}>
            <Typography
              sx={{
                color: theme.palette.t3LightGray,
                fontFamily: 'Lato',
                fontSize: '14px',
                letterSpacing: '-0.14px',
                fontWeight: 400,
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              support@opencreds.net
            </Typography>
          </Link> */}
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
