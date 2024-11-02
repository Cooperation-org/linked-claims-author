'use client'

import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import theme from '../../theme'
import ComprehensiveClaimDetails from '../../view/[id]/ComprehensiveClaimDetails'

const Page: React.FC = () => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const fram = require('../../Assets/Images/Frame 35278.png')
  const vector = require('../../Assets/Images/Vector 145.png')

  return (
    <Box
      sx={{
        minHeight: {
          xs: 'calc(100vh - 190px)',
          md: 'calc(100vh - 381px)'
        },
        display: !isLargeScreen ? 'flex' : 'block',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto',
        width: '100%',
        pt: '50px'
      }}
    >
      <ComprehensiveClaimDetails />
    </Box>
  )
}

export default Page
