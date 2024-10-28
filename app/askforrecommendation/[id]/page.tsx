'use client'

import React, { useEffect, useMemo, useState, useCallback } from 'react'
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
  styled
} from '@mui/material'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import useGoogleDrive from '../../hooks/useGoogleDrive'
import ComprehensiveClaimDetails from '../../test/[id]/ComprehensiveClaimDetails'
import {
  StyledButton,
  formLabelStyles,
  customTextFieldStyles,
  TextFieldStyles,
  nextButtonStyle,
  CustomTextField
} from '../../components/Styles/appStyles'
import { useStepContext } from '../../credentialForm/form/StepContext'
import img3 from '../../Assets/Images/Tessa Persona large sceens.png'
import { SVGLargeScreen } from '../../Assets/SVGs'

const steps = ['Message', 'Invite', '']

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
  const [driveData, setDriveData] = useState<any>(null)
  const params = useParams()

  const id = useMemo(
    () => (Array.isArray(params?.id) ? params.id[0] : params?.id || ''),
    [params]
  )

  const memoizedParams = useMemo(
    () => ({
      claimId: `https://drive.google.com/file/d/${id}/view`
    }),
    [id]
  )

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

  // Function to get data from local storage or fetch from Google Drive
  const fetchOrRetrieveData = useCallback(async () => {
    try {
      const cachedData = localStorage.getItem(`driveData_${id}`)

      if (cachedData) {
        const parsedData = JSON.parse(cachedData)
        setDriveData(parsedData)

        const achievementName = parsedData?.credentialSubject?.achievement[0]?.name || ''

        reset({
          reference: `Hey there! I hope you're doing well. I am writing to ask if you would consider supporting me by providing validation of my expertise as a ${achievementName}. If you're comfortable, could you please take a moment to write a brief reference highlighting your observations of my skills and how they have contributed to the work we have done together? It would mean a lot to me!
          
this is the link https://opencreds.net/recommendations/${params.id}`
        })
      } else {
        const data = await getContent(id)

        if (data) {
          setDriveData(data)
          localStorage.setItem(`driveData_${id}`, JSON.stringify(data))

          const achievementName = data?.credentialSubject?.achievement[0]?.name || ''

          reset({
            reference: `Hey there! I hope you're doing well. I am writing to ask if you would consider supporting me by providing validation of my expertise as a ${achievementName}. If you're comfortable, could you please take a moment to write a brief reference highlighting your observations of my skills and how they have contributed to the work we have done together? It would mean a lot to me!
            this is the link https://opencreds.net/recommendations/${params.id}`
          })
        }
      }
    } catch (error) {
      console.error('Error fetching drive data:', error)
      setIsLoading(false)
      alert('Error fetching data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [id, getContent, reset])

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }

    fetchOrRetrieveData()
  }, [id, fetchOrRetrieveData])

  // Only fetch data when component mounts
  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }

    fetchOrRetrieveData()
  }, [id, getContent, reset, setDriveData, fetchOrRetrieveData])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendCopyToSelf(event.target.checked)
  }

  const mailToLink = `mailto:${watch('email')}${
    sendCopyToSelf && session?.user?.email ? `,${session.user.email}` : ''
  }?subject=Support Request: ${
    driveData?.credentialSubject?.achievement[0]?.name || ''
  }&body=${encodeURIComponent(watch('reference'))}`

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
        minHeight: {
          xs: 'calc(100vh - 190px)',
          md: 'calc(100vh - 381px)'
        },
        overflow: 'auto',
        mb: '30px'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          width: '100%',
          overflow: 'hidden',
          mb: '20px'
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100px', mt: '30px' }}>
          <SVGLargeScreen />
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Image
              src={img3}
              priority
              alt='logo'
              style={{ width: '100px', height: '100px' }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px',
          height: '100%'
        }}
      >
        <Typography
          sx={{
            color: '#202E5B',
            textAlign: 'center',
            fontFamily: 'Lato',
            fontSize: '24px',
            fontWeight: 400
          }}
        >
          Let’s get some recommendations for you from people you know.
        </Typography>

        <Box sx={{ width: { xs: '100%', md: '50%' }, flex: 1, height: '100%' }}>
          <Stepper activeStep={activeStep}>
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
              overflow: 'auto'
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
                    error={!!errors.reference}
                  />
                </Box>
                <ComprehensiveClaimDetails />
              </>
            )}

            {activeStep === 1 && (
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                width='100%'
              >
                <FormLabel sx={{ color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                  Who would you like to send this to?{' '}
                  <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <TextField
                  {...register('firstName')}
                  sx={TextFieldStyles}
                  id='outlined-basic'
                  label='First Name'
                  variant='outlined'
                />
                <TextField
                  {...register('lastName')}
                  sx={TextFieldStyles}
                  id='outlined-basic'
                  label='Second Name'
                  variant='outlined'
                />
                <TextField
                  {...register('email')}
                  sx={TextFieldStyles}
                  id='outlined-basic'
                  label='Email address'
                  variant='outlined'
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox checked={sendCopyToSelf} onChange={handleCheckboxChange} />
                  <Typography
                    sx={{
                      color: '#000',
                      textAlign: 'center',
                      fontFamily: 'Arial',
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
              justifyContent: 'space-between',
              p: '0 10px'
            }}
          >
            <Button
              sx={StyledButton}
              onClick={handleBack}
              disabled={activeStep === 0}
              color='secondary'
            >
              Back
            </Button>

            {activeStep === 0 && (
              <Button
                sx={{
                  ...nextButtonStyle,
                  maxWidth: '355px'
                }}
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
                sx={{
                  ...nextButtonStyle,
                  maxWidth: '355px'
                }}
                color='primary'
                variant='contained'
                onClick={() => (window.location.href = mailToLink)}
              >
                Open Mail
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
