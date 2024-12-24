'use client'

import React, { useEffect, useState } from 'react'
import useGoogleDrive from '../hooks/useGoogleDrive'
import { getVCWithRecommendations } from '@cooperation/vc-storage'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const Page = () => {
  const { storage } = useGoogleDrive()
  const [recommendation, setRecommendation] = useState<{
    recommendationText: string
    howKnow: any
    name: string
    qualifications: string
    portfolio: any
  } | null>()

  const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  }))

  const ContentSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3)
  }))

  const cleanHTML = (htmlContent: string) => {
    return htmlContent
      .replace(/<p><br><\/p>/g, '')
      .replace(/<p><\/p>/g, '')
      .replace(/<br>/g, '')
      .replace(/class="[^"]*"/g, '')
      .replace(/style="[^"]*"/g, '')
  }

  const getQueryParams = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return params.get(key)
    }
    return null
  }

  const recId = getQueryParams('recId')
  const vcId = getQueryParams('vcId')

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!recId || !storage) {
        console.log('No recommendation file recId')
        return
      }
      const recommendation = await storage.retrieve(recId as string)
      setRecommendation(recommendation?.data.credentialSubject)
      console.log('Recommendation file recId:', recommendation)
    }
    fetchRecommendation()
  }, [recId, storage])

  const handleApprove = async () => {
    try {
      if (!vcId || !storage) {
        console.log('No recommendation file id')
        return
      }
      const master = await getVCWithRecommendations({
        vcId: vcId as string,
        storage
      })
      console.log('🚀 ~ handleApprove ~ master:', master)
      await storage.updateRelationsFile({
        relationsFileId: master.relationsFileId,
        recommendationFileId: recId as string
      })
    } catch (error) {
      console.error('Error approving recommendation:', error)
    }
    console.log('Approve recommendation')
  }

  return (
    <Box sx={{ p: 3 }}>
      <h1>Review the recommendation</h1>
      {recommendation ? (
        <Card
          sx={{
            maxWidth: 672,
            mx: 'auto',
            border: '1px solid rgba(25, 118, 210, 0.12)',
            borderRadius: 2
          }}
        >
          <CardHeader
            sx={{
              borderBottom: '1px solid rgba(25, 118, 210, 0.08)',
              bgcolor: 'background.paper',
              '& .MuiCardHeader-content': {}
            }}
            avatar={
              <CheckCircleIcon
                sx={{
                  color: 'primary.main',
                  width: 20,
                  height: 20
                }}
              />
            }
            title={
              <Typography variant='h6'>{recommendation?.name} Taylor vouch </Typography>
            }
          />

          <CardContent sx={{ py: 3 }}>
            <ContentSection>
              <SectionTitle>Recommendation</SectionTitle>
              <Typography color='text.primary'>
                <span
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(recommendation?.recommendationText as any)
                  }}
                />
              </Typography>
            </ContentSection>

            <ContentSection>
              <SectionTitle>How {recommendation?.name} knows you</SectionTitle>
              <Typography color='text.primary'>
                <span
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(recommendation?.howKnow as any)
                  }}
                />
              </Typography>
            </ContentSection>

            <ContentSection>
              <SectionTitle>the qualifications</SectionTitle>
              <Typography color='text.primary'>
                <span
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(recommendation?.qualifications as any)
                  }}
                />
              </Typography>
            </ContentSection>

            {recommendation?.portfolio > 0 && (
              <ContentSection sx={{ mb: 0 }}>
                <SectionTitle>Supporting Evidence</SectionTitle>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {recommendation?.portfolio.map((evidence: any, index: any) => (
                    <Link
                      key={index}
                      href={evidence.url}
                      underline='hover'
                      color='primary'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {evidence.title}
                    </Link>
                  ))}
                </Box>
              </ContentSection>
            )}
          </CardContent>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              mb: '10px'
            }}
          >
            <Button
              sx={{
                padding: '10px 20px',
                borderRadius: '100px',
                textTransform: 'capitalize',
                fontFamily: 'Roboto',
                fontWeight: '600',
                lineHeight: '20px',
                backgroundColor: '#003FE0',
                color: '#FFF',
                '&:hover': {
                  backgroundColor: '#003FE0'
                }
              }}
              onClick={handleApprove}
            >
              Approve
            </Button>
            <Button
              variant='contained'
              sx={{
                padding: '10px 20px',
                borderRadius: '100px',
                textTransform: 'capitalize',
                fontFamily: 'Roboto',
                fontWeight: '600',
                lineHeight: '20px',
                backgroundColor: '#003FE0',
                color: '#FFF',
                '&:hover': {
                  backgroundColor: '#003FE0'
                }
              }}
            >
              Reject
            </Button>
          </Box>
        </Card>
      ) : (
        <Box>the recommendation not available</Box>
      )}
    </Box>
  )
}
export default Page
