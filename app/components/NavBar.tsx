import React from 'react'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

const NavBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '24px', md: '29px' },
        display: 'flex',
        alignItems: 'center',
        mt: { xs: '37px', md: '57px' }
      }}
    >
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          right: { xs: '18px', md: 'auto' },
          left: { xs: 'auto', md: '52px' }
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M4 12H20'
            stroke='black'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M4 6H20' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
          <path
            d='M4 18H20'
            stroke='black'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'flex-start' },
          paddingRight: { xs: '15px', md: '0px' },
          marginLeft: { xs: '15px', md: '166px' },
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
              color: '#242F56',
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            LinkedClaims
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default NavBar
