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
import useGoogleDrive from '../../hooks/useGoogleDrive'

interface DriveData {
  data: {
    credentialSubject: {
      achievement: { name: string }[]
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

  const fileID = params?.id

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const content = await getContent(fileID as any)

        setDriveData(content)
        const achievementName =
          content?.data?.credentialSubject?.achievement[0]?.name || 'your skill'
        const messageToCopy = `Hey there! I hope you're doing well. I am writing to ask if you would consider supporting me by providing validation of my expertise as a ${achievementName}. If you're comfortable, could you please take a moment to write a brief reference highlighting your observations of my skills and how they have contributed to the work we have done together? It would mean a lot to me!
          
          
this is the link https://opencreds.net/recommendations/${fileID}`
        setMessageToCopy(messageToCopy)
        reset({
          reference: `Hey there! I hope you're doing well. I am writing to ask if you would consider supporting me by providing validation of my expertise as a ${achievementName}. If you're comfortable, could you please take a moment to write a brief reference highlighting your observations of my skills and how they have contributed to the work we have done together? It would mean a lot to me!
          
this is the link https://opencreds.net/recommendations/${fileID}`
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    if (fileID) {
      fetchData()
    }
  }, [fileID, reset])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendCopyToSelf(event.target.checked)
  }

  const mailToLink = `mailto:${watch('email')}${
    sendCopyToSelf && session?.user?.email ? `,${session.user.email}` : ''
  }?subject=Request for an endorsement for my self-claimed skill: ${
    driveData?.data?.credentialSubject?.achievement[0]?.name ?? ''
  }&body=${encodeURIComponent(watch('reference'))}`

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setSnackbarOpen(false)
  }

  const handleOpenMail = () => {
    window.location.href = mailToLink

    const timeout = setTimeout(() => {
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        watch('email')
      )}${sendCopyToSelf && session?.user?.email ? `,${encodeURIComponent(session.user.email)}` : ''}&su=${encodeURIComponent(
        `Request for an endorsement for my self-claimed skill: ${driveData?.data?.credentialSubject?.achievement[0]?.name ?? ''}`
      )}&body=${encodeURIComponent(watch('reference'))}`

      window.open(gmailLink, '_blank')

      navigator.clipboard
        .writeText(watch('reference'))
        .then(() => {
          setSnackbarMessage('Text Copied Successfully')
          setSnackbarOpen(true)
        })
        .catch(err => {
          console.error('Failed to copy text: ', err)
          setSnackbarMessage('Failed to copy text')
          setSnackbarOpen(true)
        })
    }, 2000)

    window.addEventListener('blur', () => clearTimeout(timeout), { once: true })
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
        Let’s get some recommendations for you from people you know.
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
              />
            </Box>
            <Button
              onClick={() => copyFormValuesToClipboard(messageToCopy)}
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
            >
              copy this text and paste in your mail to share
            </Button>
            <ComprehensiveClaimDetails />
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
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i,
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
          >
            Open Mail
          </Button>
        )}
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
