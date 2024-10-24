import { useTheme } from '@mui/material/styles'
import React from 'react'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import HumborgerMenu from '../humborgerMenu/HumborgerMenu'

const NavBar = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '24px', md: '29px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: { xs: '37px', md: '57px' },
        px: { xs: '18px', md: '52px' }
      }}
    >
      {/* menu for large screens */}
      <Box
        sx={{
          cursor: 'pointer',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center'
        }}
      >
        <HumborgerMenu />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'flex-start' },
          paddingRight: { xs: '15px', md: '0px' },
          marginLeft: { xs: '15px', md: '90px' },
          marginRight: { xs: 'auto', md: 'auto' },
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        <Link href='/'>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: { xs: '18px', md: '24px' },
              color: theme.palette.t3DarkSlateBlue,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            LinkedClaims
          </Typography>
        </Link>
      </Box>

      {/* menu for small screens */}
      <Box
        sx={{
          cursor: 'pointer',
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center'
        }}
      >
        <HumborgerMenu />
      </Box>
    </Box>
  )
}

export default NavBar
