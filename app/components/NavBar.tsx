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
        justifyContent: 'space-between',
        mt: { xs: '37px', md: '57px' },
        px: { xs: '18px', md: '52px' }
      }}
    >
      {/* SVG for large screens */}
      <Box
        sx={{
          cursor: 'pointer',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center'
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
              color: '#242F56',
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            LinkedClaims
          </Typography>
        </Link>
      </Box>

      {/* SVG for small screens */}
      <Box
        sx={{
          cursor: 'pointer',
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center'
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
    </Box>
  )
}

export default NavBar
