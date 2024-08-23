'use client'

import { Box, Typography, useMediaQuery } from '@mui/material'
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

const page = () => {
  const [driveData, setDriveData] = useState<any>(null)
  const params = useParams()
  console.log(':  page  params', params)
  const { fetchFile, fileData, gapiLoaded } = useGoogleDrive()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    const fetchDriveData = async () => {
      const decodedLink = decodeURIComponent(params.credentialData as any)
      const fileId = decodedLink?.split('/d/')[1]?.split('/')[0]
      const resourceKey = ''
      if (gapiLoaded) {
        await fetchFile(fileId, resourceKey)
      }
    }

    fetchDriveData()
  }, [gapiLoaded])

  useEffect(() => {
    if (fileData) {
      const parsedData = JSON.parse(fileData)
      console.log(':  useEffect  parsedData', parsedData)
      setDriveData(parsedData)
      localStorage.setItem('parsedData', JSON.stringify(parsedData))
    }
  }, [fileData])
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 153px)',
        display: !isLargeScreen ? 'flex' : 'block',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto',
        width: '100%',
        pt: '50px'
      }}
    >
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
              Amr Nabel’s has claimed:
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
                5 Days
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
              {driveData?.credentialSubject?.achievement[0]?.description.replace(
                /<\/?[^>]+>/gi,
                ''
              )}
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
                <li>
                  <Link href=''>The website of the w3schools</Link>
                </li>
                <li>
                  <Link href=''>youtube clone</Link>
                </li>
              </ul>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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

export default page
