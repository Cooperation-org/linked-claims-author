'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Alert, Snackbar, Button } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useParams } from 'next/navigation'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import useGoogleDrive from '../../hooks/useGoogleDrive'
import { NewEmail2 } from '../../Assets/SVGs'
import ComprehensiveClaimDetails from '../../view/[id]/ComprehensiveClaimDetails'

interface DriveData {
  data: {
    credentialSubject: {
      achievement: {
        name: string
        description: string
        criteria?: { narrative: string }
        image?: { id: string }
      }[]
    }
  }
}

export default function AskForRecommendation() {
  const [isLoading, setIsLoading] = useState(true)
  const [driveData, setDriveData] = useState<DriveData | null>(null) //NOSONAR
  const params = useParams()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [messageToCopy, setMessageToCopy] = useState<string>('')
  const { getContent } = useGoogleDrive()
  const [achievementName, setAchievementName] = useState<string>('')

  const { reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      reference: ''
    },
    mode: 'onChange'
  })

  const fileID = params?.id as string

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const content = await getContent(fileID)
        setDriveData(content as any)
        const achievement = content?.data?.credentialSubject?.achievement?.[0]
        const name = achievement?.name || 'your skill'
        const baseMessage = generateMessage(name, fileID)
        setMessageToCopy(baseMessage)
      } catch (error) {
        console.error('Error fetching data:', error)
        showNotification('Failed to fetch data')
      } finally {
        setIsLoading(false)
      }
    }
    if (fileID) {
      fetchData()
    }
  }, [fileID, getContent])

  const generateMessage = (skillName: string, id: string) => {
    return `Hey there! I hope you're doing well. I am writing to ask if you would consider supporting me by providing validation of my expertise as a ${skillName}. If you're comfortable, could you please take a moment to write a brief reference highlighting your observations of my skills and how they have contributed to the work we have done together? It would mean a lot to me!\n\nthis is the link https://opencreds.net/recommendations/${id}`
  }
  const handleAchievementLoad = (name: string) => {
    if (name && name !== achievementName) {
      setAchievementName(name)
      const updatedMessage = generateMessage(name, fileID)
      setMessageToCopy(updatedMessage)
      reset({
        reference: updatedMessage
      })
    }
  }
  const showNotification = (message: string) => {
    setSnackbarMessage(message)
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setSnackbarOpen(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(messageToCopy)
      showNotification('Text copied to clipboard!')
      setTimeout(() => {}, 1000)
    } catch (err) {
      showNotification('Failed to copy text')
    }
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        overflow: 'auto',
        my: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        px: 3,
        maxWidth: '800px',
        mx: 'auto'
      }}
    >
      <NewEmail2 />

      <Typography
        variant='h1'
        sx={{
          fontFamily: 'Lato',
          fontSize: '24px',
          fontWeight: 400,
          color: '#202E5B',
          textAlign: 'center'
        }}
      >
        Let&apos;s get some recommendations for you from people you know.
      </Typography>

      <Box
        sx={{
          width: '100%',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          p: 3,
          position: 'relative'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: '16px',
            mb: 3,
            fontWeight: 600,
            color: '#202E5B'
          }}
        >
          Follow these steps:
        </Typography>

        <ol
          style={{
            marginBottom: '20px',
            paddingLeft: '20px',
            color: '#202E5B',
            fontFamily: 'Lato'
          }}
        >
          <li style={{ marginBottom: '8px' }}>Copy the message below using the Button</li>
          <li style={{ marginBottom: '8px' }}>Open your preferred email application</li>
          <li>Paste the message and send it to your desired recommender</li>
        </ol>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            onClick={copyToClipboard}
            variant='outlined'
            color='primary'
            sx={{
              borderRadius: '100px',
              textTransform: 'lowercase',
              fontFamily: 'Roboto',
              color: '#FFFFFF',
              fontSize: '14px',
              width: 'fit-content',
              backgroundColor: '#003FE0',
              '&:hover': {
                backgroundColor: '#003FE0'
              }
            }}
            startIcon={<ContentCopyIcon />}
          >
            Copy the message
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: 'white',
            p: 3,
            borderRadius: '4px',
            position: 'relative',
            border: '1px solid #e0e0e0',
            flexWrap: 'wrap',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              width: '100%',
              fontFamily: 'Lato',
              color: '#333',
              fontSize: '14px',
              flexGrow: 1
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Lato',
                color: '#333',
                fontSize: '14px',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexGrow: 1,
                lineHeight: 1.5
              }}
            >
              {messageToCopy}
            </Typography>
          </Box>
          <ComprehensiveClaimDetails onAchievementLoad={handleAchievementLoad} />
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity='success' sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
