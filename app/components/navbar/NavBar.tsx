import { useTheme } from '@mui/material/styles'
import React from 'react'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu'
import { Logo } from '../../Assets/SVGs'

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
        mt: { xs: '33px', md: '53px' },
        px: { xs: '18px', md: '52px' }
      }}
    >
      {/* menu for large screens */}
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Link href='/' aria-label='OpenCreds Home'>
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
            <Logo />
          </Box>
        </Link>
        <Link href='/' aria-label='OpenCreds Home'>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: { xs: '18px', md: '24px' },
              color: theme.palette.t3DarkSlateBlue
            }}
          >
            OpenCreds
          </Typography>
        </Link>
      </Box>

      <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <HamburgerMenu aria-label='Open menu' />
      </Box>
    </Box>
  )
}

export default NavBar
