'use client'

import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import fram from '../../Assets/Images/Frame 35278.png'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import vector from '../../Assets/Images/Vector 145.png'
import { SVGBadge, SVGDate, CheckMarkSVG } from '../../Assets/SVGs'
import {
  credentialBoxStyles,
  commonTypographyStyles,
  evidenceListStyles
} from '../../components/Styles/appStyles'
import useGoogleDrive from '../../hooks/useGoogleDrive'
import theme from '../../theme'

const Page = () => {
  const [driveData, setDriveData] = useState<any>(null)
  const params = useParams()
  console.log(':  page  params', params)
  const { fetchFileContent, fileContent, fileMetadata } = useGoogleDrive()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    const fetchDriveData = async () => {
      const decodedLink = decodeURIComponent(params.credentialData as any)
      const fileId = decodedLink?.split('/d/')[1]?.split('/')[0]
      const resourceKey = ''
        await fetchFileContent(fileId, resourceKey)
      
    }

    fetchDriveData()
  })

  useEffect(() => {
    if (fileContent) {
      const parsedData = JSON.parse(fileContent)
      console.log(':  useEffect  parsedData', parsedData)
      setDriveData(parsedData)
      localStorage.setItem('parsedData', JSON.stringify(parsedData))
    }
  }, [fileContent])
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
      {driveData ? (
        <Box
          sx={{
            flex: 1,
            width: { xs: '90%', md: '60%' },
            m: '0 auto'
          }}
        >
          <Box
            sx={{
              height: 'fit-content',
              border: '1px solid #003FE0',
              borderRadius: '10px',
              p: '15px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center'
              }}
            >
              <SVGBadge />
              <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#202E5B' }}>
                {driveData?.credentialSubject?.name || fileMetadata?.name} has claimed:
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography
                sx={{
                  color: '#202E5B',
                  fontFamily: 'Inter',
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '0.075px',
                  mb: '10px'
                }}
              >
                Management Skills
              </Typography>
              <Box
                sx={{
                  ...credentialBoxStyles,
                  bgcolor: '#d5e1fb'
                }}
              >
                <Box sx={{ mt: '2px' }}>
                  <SVGDate />
                </Box>
                <Typography sx={{ ...commonTypographyStyles, fontSize: '13px' }}>
                  {driveData?.credentialSubject?.duration}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '100%'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '17px',
                  letterSpacing: '0.075px',
                  lineHeight: '24px'
                }}
              >
                This credential certifies about{' '}
                {driveData?.credentialSubject?.achievement[0]?.name}
              </Typography>
              <Box>
                <Typography>Earning criteria:</Typography>
                <ul style={{ marginLeft: '25px' }}>
                  <li>
                    {driveData?.credentialSubject?.achievement[0]?.criteria?.narrative.replace(
                      /<\/?[^>]+>/gi,
                      ''
                    )}
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography>Supporting Evidence:</Typography>
                <ul style={evidenceListStyles}>
                  {driveData?.credentialSubject?.portfolio?.map(
                    (porto: { url: any; name: any }) => (
                      <li key={porto.url}>
                        <Link href={porto.url} target='_blank'>
                          {porto.name}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </Box>
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: '4px', mt: '20px' }}
            >
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#000E40',
                  fontFamily: 'Arial'
                }}
              >
                Credential Details
              </Typography>
              <Box sx={{ display: 'flex', gap: '5px', mt: '10px', alignItems: 'center' }}>
                <Box
                  sx={{
                    borderRadius: '4px',
                    bgcolor: '#C2F1BE',

                    p: '4px'
                  }}
                >
                  <CheckMarkSVG />
                </Box>
                <Typography>Has a valid digital signature</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <Box
                  sx={{
                    borderRadius: '4px',
                    bgcolor: '#C2F1BE',

                    p: '4px'
                  }}
                >
                  <CheckMarkSVG />
                </Box>
                <Typography>Has not expired</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <Box
                  sx={{
                    borderRadius: '4px',
                    bgcolor: '#C2F1BE',

                    p: '4px'
                  }}
                >
                  <CheckMarkSVG />
                </Box>
                <Typography>Has not been revoked by issuer</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
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
