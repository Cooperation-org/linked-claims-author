'use client'

import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SVGBadge, SVGDate } from '../../../Assets/SVGs'
import {
  credentialBoxStyles,
  commonTypographyStyles,
  evidenceListStyles
} from '../../../components/Styles/appStyles'
import useGoogleDrive from '../../../hooks/useGoogleDrive'
import { useSession } from 'next-auth/react'

interface FetchedDataProps {
  setFullName: (name: string) => void
  setEmail?: (email: string) => void
  setFileID?: (fileId: string) => void
}

const FetchedData: React.FC<FetchedDataProps> = ({
  setFullName,
  setEmail = () => {},
  setFileID = () => {}
}) => {
  const [driveData, setDriveData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const { data: session } = useSession()
  const accessToken = session?.accessToken

  const { fetchFileContent, fetchFileMetadata, fileContent, fileMetadata, ownerEmail } =
    useGoogleDrive()

  useEffect(() => {
    const fetchDriveData = async () => {
      const decodedLink = decodeURIComponent(params.credntialData as any)
      const fileId = decodedLink?.split('/d/')[1]?.split('/')[0]
      const resourceKey = ''
      await fetchFileContent(fileId, resourceKey, accessToken)
      await fetchFileMetadata(fileId, resourceKey)
    }

    fetchDriveData()
  }, [accessToken, fetchFileContent, fetchFileMetadata, params, setFileID])

  useEffect(() => {
    if (fileContent) {
      const parsedData = JSON.parse(fileContent)
      setDriveData(parsedData)
      setFullName(parsedData.credentialSubject?.name)
      setLoading(false)
    }

    if (ownerEmail) {
      console.log('Fetched owner email:', ownerEmail)
      setEmail(ownerEmail)
    } else {
      console.warn('ownerEmail is not available')
    }
  }, [fileContent, fileMetadata, ownerEmail, setEmail, setFullName])

  return (
    <Box sx={{ border: '1px solid #003FE0', borderRadius: '10px', p: '15px' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : driveData ? (
        <>
          <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <SVGBadge />
            <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#202E5B' }}>
              {driveData.credentialSubject?.name || fileMetadata?.name} has claimed:
            </Typography>
          </Box>
          <Box>
            <Box>
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
                {driveData.credentialSubject?.achievement[0]?.name}
              </Typography>
              <Box sx={{ ...credentialBoxStyles, bgcolor: '#d5e1fb' }}>
                <Box sx={{ mt: '2px' }}>
                  <SVGDate />
                </Box>
                <Typography sx={{ ...commonTypographyStyles, fontSize: '13px' }}>
                  {driveData.credentialSubject?.duration}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              {driveData?.credentialSubject?.achievement[0]?.description && (
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
              )}
              {driveData?.credentialSubject?.achievement[0]?.criteria?.narrative && (
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
              )}
              {driveData?.credentialSubject?.portfolio?.name ||
                (driveData?.credentialSubject?.portfolio?.url && (
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
                ))}
            </Box>
          </Box>
        </>
      ) : (
        <Typography>Data not available.</Typography>
      )}
    </Box>
  )
}

export default FetchedData