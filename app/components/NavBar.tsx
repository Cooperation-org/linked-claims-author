import React from 'react'
import { Box, Typography } from '@mui/material'

const NavBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '24px', md: '29px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: { xs: '24px', md: '29px' },
        ml: { xs: '14px', md: '52px' },
        paddingRight: { xs: '15px', md: '52px' },
        paddingLeft: { xs: '15px', md: '0px' }
      }}
    >
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
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
          justifyContent: { xs: 'center', md: 'flex-start' },
          paddingRight: { xs: '40px', md: '0px' },
          flex: 1
        }}
      >
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: { xs: '18px', md: '24px' },
            color: '#242F56',
            textAlign: { xs: 'center', md: 'left' },
            marginLeft: { md: '52px' }
          }}
        >
          LinkedClaims
        </Typography>
      </Box>
    </Box>
  )
}

export default NavBar
