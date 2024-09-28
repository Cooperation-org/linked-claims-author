'use client'

import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import theme from '../../theme'
import ComprehensiveClaimDetails from '../../test/[id]/ComprehensiveClaimDetails'
import { useParams } from 'next/navigation'

const Page: React.FC = () => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const fram = require('../../Assets/Images/Frame 35278.png')
  const vector = require('../../Assets/Images/Vector 145.png')

  const params = useParams()
  const id =
    typeof params?.id === 'string'
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : undefined

  console.log('id in ClaimPage:', id)
  if (!id) {
    return (
      <div>
        <h2>Error: Missing credential data.</h2>
      </div>
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
          claimId: `https://drive.google.com/file/d/${id}/view`
        }}
        setFullName={() => {}}
        setEmail={() => {}}
        setFileID={() => {}}
        claimId={id}
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
