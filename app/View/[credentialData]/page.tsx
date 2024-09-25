'use client'

import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import theme from '../../theme'
import ComprehensiveClaimDetails from '../../test/[credentialData]/ComprehensiveClaimDetails'
import fram from '../../Assets/Images/Frame 35278.png'
import vector from '../../Assets/Images/Vector 145.png'
import { useParams } from 'next/navigation'

const Page: React.FC = () => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const params = useParams()

  const credentialData = Array.isArray(params?.credentialData)
    ? params.credentialData[0]
    : params?.credentialData
  console.log('credentialData in ClaimPage:', credentialData)

  // console.log('Params:', params)
  // console.log('credentialData in Page.tsx:', credentialData)

  if (!credentialData) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Typography variant='h6' color='error'>
          Missing credential data. Please check the URL.
        </Typography>
      </Box>
    )
  }

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
      <ComprehensiveClaimDetails
        params={{
          credentialData
        }}
        setFullName={() => {}}
        setEmail={() => {}}
        setFileID={() => {}}
        claimId={''}
      />

      {/* Footer section only for small screens */}
      {!isLargeScreen && (
        <Box
          sx={{
            mt: '30px',
            width: '100%',
            height: '114px',
            bgcolor: theme.palette.t3LightBlue,
            p: '28px 70px 28px 50px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Box>
            <Image src={fram} alt='fram' />
          </Box>
          <Box>
            <Typography
              sx={{
                width: '200px',
                color: theme.palette.t3BodyText,
                fontFamily: 'Lato',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal'
              }}
            >
              Learn how this data is used & protected.
              <Image style={{ marginLeft: '10px' }} src={vector} alt='logo' />
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Page
