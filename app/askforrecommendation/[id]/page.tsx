'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Typography,
  Checkbox,
  TextField,
  FormLabel,
  styled,
  Snackbar,
  Alert
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ComprehensiveClaimDetails from '../../view/[id]/ComprehensiveClaimDetails'
import {
  StyledButton,
  formLabelStyles,
  customTextFieldStyles,
  TextFieldStyles,
  nextButtonStyle,
  CustomTextField
} from '../../components/Styles/appStyles'
import { useStepContext } from '../../credentialForm/form/StepContext'
import { NewEmail2 } from '../../Assets/SVGs'
import { copyFormValuesToClipboard } from '../../utils/formUtils'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import useGoogleDrive from '../../hooks/useGoogleDrive'

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

const steps = ['Message', 'Invite']

// Custom Step styling
const CustomStep = styled(Step)(({ theme, completed, active }) => ({
  '& .MuiStepLabel-root': {
    color: completed || active ? 'green' : theme.palette.text.primary
  }
}))

export default function AskForRecommendation() {
  const { activeStep, handleNext, handleBack } = useStepContext()
  const { data: session } = useSession()
  const [sendCopyToSelf, setSendCopyToSelf] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [driveData, setDriveData] = useState<DriveData | null>(null)
  const params = useParams()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [messageToCopy, setMessageToCopy] = useState<string>('')
  const { getContent } = useGoogleDrive()
  const [isProcessing, setIsProcessing] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [achievementName, setAchievementName] = useState<string>('')

  const {
    register,
    watch,
    reset,
    formState: { errors }
  } = useForm({
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
        setDriveData(content)

        const achievement = content?.data?.credentialSubject?.achievement?.[0]
        const name = achievement?.name || 'your skill'
        setAchievementName(name)

        const baseMessage = generateMessage(name, fileID)
        setMessageToCopy(baseMessage)
        reset({
          reference: baseMessage
        })
      } catch (error) {
        console.error('Error fetching data:', error)
        showNotification('Failed to fetch data', 'error')
      } finally {
        setIsLoading(false)
      }
    }
    if (fileID) {
      fetchData()
    }
  }, [fileID, reset, getContent])

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
  const showNotification = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendCopyToSelf(event.target.checked)
  }

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setSnackbarOpen(false)
  }

  const constructEmailLinks = () => {
    const recipientEmail = watch('email')
    const ccEmail = sendCopyToSelf && session?.user?.email ? session.user.email : ''
    const subject = `Request for an endorsement for my self-claimed skill: ${achievementName}`
    const body = watch('reference')

    return {
      mailtoLink: `mailto:${recipientEmail}${ccEmail ? `,${ccEmail}` : ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      gmailLink: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}${ccEmail ? `&cc=${encodeURIComponent(ccEmail)}` : ''}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
  }

  const handleOpenMail = async () => {
    if (!watch('email')) {
      showNotification('Please enter an email address', 'error')
      return
    }

    setIsProcessing(true)
    const { mailtoLink, gmailLink } = constructEmailLinks()

    try {
      window.location.href = mailtoLink
      const fallbackTimeout = setTimeout(() => {
        try {
          window.open(gmailLink, '_blank')
          navigator.clipboard
            .writeText(watch('reference'))
            .then(() => {
              showNotification('Message copied to clipboard for Gmail', 'success')
            })
            .catch(err => {
              console.error('Clipboard error:', err)
              showNotification('Failed to copy message to clipboard', 'error')
            })
        } catch (error) {
          console.error('Gmail fallback error:', error)
          showNotification('Failed to open email client', 'error')
        }
      }, 2000)

      window.addEventListener(
        'blur',
        () => {
          clearTimeout(fallbackTimeout)
          setIsProcessing(false)
          showNotification('Email client opened successfully', 'success')
        },
        { once: true }
      )
      setTimeout(() => {
        clearTimeout(fallbackTimeout)
        setIsProcessing(false)
        if (!document.hidden) {
          showNotification(
            'Please try using the Gmail option or copy the message manually',
            'error'
          )
        }
      }, 3000)
    } catch (error) {
      console.error('Email handling error:', error)
      setIsProcessing(false)
      showNotification('Failed to open email client', 'error')
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
        gap: '30px'
      }}
    >
      <NewEmail2 />
      <Typography
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
      <Stepper
        activeStep={activeStep}
        sx={{ width: '85%', maxWidth: '800px', mx: '20px' }}
      >
        {steps.map((label, index) => (
          <CustomStep key={index} completed={index < activeStep}>
            <StepLabel
              icon={
                index < 2 ? (
                  `${index + 1}`
                ) : (
                  <span style={{ visibility: 'hidden' }}>3</span>
                )
              }
            >
              {index < 2 ? label : ''}
            </StepLabel>
          </CustomStep>
        ))}
      </Stepper>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center',
          marginTop: '30px',
          padding: '0 15px 30px',
          overflow: 'auto',
          width: '100%',
          maxWidth: '800px'
        }}
      >
        {activeStep === 0 && (
          <>
            <Box position='relative' width='100%'>
              <FormLabel sx={formLabelStyles} id='description-label'>
                Write a message asking for a reference:{' '}
                <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <CustomTextField
                {...register('reference')}
                sx={customTextFieldStyles}
                multiline
                rows={11}
                variant='outlined'
                aria-labelledby='description-label'
                error={!!errors.reference}
                helperText={errors.reference?.message}
                InputProps={{
                  endAdornment: (
                    <Box
                      onClick={() => {
                        copyFormValuesToClipboard(messageToCopy)
                        showNotification('Text copied to clipboard', 'success')
                      }}
                      sx={{
                        cursor: 'pointer',
                        position: 'absolute',
                        right: '12px',
                        top: '12px',
                        padding: '4px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <ContentCopyIcon sx={{ color: '#666', fontSize: '20px' }} />
                    </Box>
                  )
                }}
              />
            </Box>
            <ComprehensiveClaimDetails onAchievementLoad={handleAchievementLoad} />
          </>
        )}

        {activeStep === 1 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '100%',
              maxWidth: '800px'
            }}
          >
            <FormLabel sx={formLabelStyles} id='invite-label'>
              Who would you like to send this to? <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField
              {...register('firstName', { required: 'First name is required' })}
              sx={TextFieldStyles}
              id='firstName'
              label='First Name'
              variant='outlined'
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              {...register('lastName', { required: 'Last name is required' })}
              sx={TextFieldStyles}
              id='lastName'
              label='Last Name'
              variant='outlined'
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
            <TextField
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              sx={TextFieldStyles}
              id='email'
              label='Email Address'
              variant='outlined'
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox checked={sendCopyToSelf} onChange={handleCheckboxChange} />
              <Typography
                sx={{
                  color: '#000',
                  textAlign: 'center',
                  fontFamily: 'Lato',
                  fontSize: '14px',
                  fontWeight: 400
                }}
              >
                Send a copy to myself
              </Typography>
            </Box>
          </Box>
        )}
      </form>

      <Box
        sx={{
          width: '100%',
          height: '40px',
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          p: '0 10px',
          maxWidth: '800px'
        }}
      >
        {activeStep > 0 && (
          <Button sx={StyledButton} onClick={handleBack} color='secondary'>
            Back
          </Button>
        )}

        {activeStep === 0 && (
          <Button
            sx={{ ...nextButtonStyle, maxWidth: '355px' }}
            onClick={handleNext}
            color='primary'
            disabled={activeStep !== 0}
            variant='contained'
          >
            Next
          </Button>
        )}

        {activeStep === 1 && (
          <Button
            sx={{ ...nextButtonStyle, maxWidth: '355px' }}
            color='primary'
            variant='contained'
            onClick={handleOpenMail}
            disabled={isProcessing || !!errors.email}
          >
            {isProcessing ? <CircularProgress size={24} color='inherit' /> : 'Open Mail'}
          </Button>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
