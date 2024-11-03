'use client'

import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import theme from '../../theme'
import ComprehensiveClaimDetails from '../../claimdetails/[id]/ComprehensiveClaimDetails'

const Page: React.FC = () => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))

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
