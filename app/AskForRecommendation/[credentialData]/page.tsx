'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import { FormLabel, TextField, Typography, Checkbox } from '@mui/material'
import Image from 'next/image'
import img3 from '../../Assets/Images/Tessa Persona large sceens.png'
import { useForm } from 'react-hook-form'
import { SVGLargeScreen, SVGDate } from '../../Assets/SVGs'
import {
  formLabelStyles,
  CustomTextField,
  customTextFieldStyles,
  successPageHeaderStyles,
  successPageTitleStyles,
  successPageInfoStyles,
  successPageDateStyles,
  TextFieldStyles,
  StyledButton,
  nextButtonStyle
} from '../../components/Styles/appStyles'
import { useParams } from 'next/navigation'
import useGoogleDrive from '../../hooks/useGoogleDrive'
import Link from 'next/link'

const steps = ['Message', 'Invite', '']

const CustomStep = styled(Step)(({ theme, completed, active }) => ({
  '& .MuiStepLabel-root': {
    color: completed || active ? 'green' : theme.palette.text.primary
  }
}))

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [driveData, setDriveData] = React.useState<any>(null)
  console.log(':  FetchedData  driveData', driveData)
  const params = useParams()
  const { fetchFile, fileData, gapiLoaded } = useGoogleDrive()

  React.useEffect(() => {
    const fetchDriveData = async () => {
      const decodedLink = decodeURIComponent(params.credentialData as any)
      const fileId = decodedLink.split('/d/')[1]?.split('/')[0]
      const resourceKey = ''
      if (gapiLoaded) {
        await fetchFile(fileId, resourceKey)
      }
    }

    fetchDriveData()
  }, [gapiLoaded])

  React.useEffect(() => {
    if (fileData) {
      const parsedData = JSON.parse(fileData)
      setDriveData(parsedData)
      localStorage.setItem('parsedData', JSON.stringify(parsedData))
      reset({
        reference: `Hey there! I hope you’re doing well. 
      
  I am writing to ask if you would consider supporting me by providing validation of my expertise as a ${
    driveData?.credentialSubject?.achievement[0]?.name || ''
  }. If you're comfortable, could you please take a moment to write a brief reference highlighting your observations of my skills and how they have contributed to the work we have done together? It would mean a lot to me! 
              
Credential Public Link:   http://localhost:3000/Recommendations/${params.credentialData}
`
      })
    }
  }, [fileData])

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const {
    reset,
    watch,
    register,
    formState: { errors }
  } = useForm<any>({
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      reference: `Hey there! I hope you’re doing well. 
      
  I am writing to ask if you would consider supporting me by providing validation of my expertise as a ${
    driveData?.credentialSubject?.achievement[0]?.name || ''
  }. If you're comfortable, could you please take a moment to write a brief reference highlighting your observations of my skills and how they have contributed to the work we have done together? It would mean a lot to me! 
              
Credential Public Link:   http://localhost:3000/Recommendations/${params.credentialData}
`
    },
    mode: 'onChange'
  })

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 153px)',

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
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100px',
            mt: '30px'
          }}
        >
          <SVGLargeScreen />
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Image src={img3} alt='logo' style={{ width: '100px', height: '100px' }} />
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
            color: 'var(--T3-Body-Text, #202E5B)',
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
              <Box position='relative' width='100%'>
                <FormLabel sx={formLabelStyles} id='description-label'>
                  Write a message asking for a reference:
                  <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <CustomTextField
                  {...register('reference')}
                  sx={customTextFieldStyles}
                  multiline
                  rows={11}
                  value={watch('reference')}
                  variant='outlined'
                  FormHelperTextProps={{
                    className: 'MuiFormHelperText-root'
                  }}
                  error={!!errors.reference}
                />
                <Box sx={{ ...successPageHeaderStyles, mt: '30px' }}>
                  <Box
                    sx={{
                      borderRadius: '20px 0px 0px 20px',
                      width: '100px',
                      height: '100px'
                    }}
                  >
                    <img
                      style={{
                        borderRadius: '20px 0px 0px 20px',
                        width: '100px',
                        height: '100px'
                      }}
                      src={'formData?.evidenceLink' || 'not Valid image'}
                      alt='logo'
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={successPageTitleStyles}>
                      {driveData?.credentialSubject?.achievement[0]?.name}
                    </Typography>
                    <Box sx={successPageInfoStyles}>
                      <SVGDate />
                      <Typography sx={successPageDateStyles}>{'4 Days'}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {activeStep === 1 && (
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                position='relative'
                width='100%'
              >
                <FormLabel sx={formLabelStyles} id='description-label'>
                  Who would you like to send this to?
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
                  label='Second Nam'
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
                  <Checkbox {...label} />
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
          <React.Fragment>
            <Box
              sx={{
                width: { xs: '100%' },
                height: '40px',
                display: 'flex',
                gap: '15px',
                justifyContent: activeStep !== 0 ? 'space-between' : 'center',
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
              <Button sx={StyledButton} type='submit' color='secondary'>
                Save & Exit
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
                <Link
                  href={`mailto:${watch('email')}?subject=Support Request: ${
                    driveData?.credentialSubject?.achievement[0]?.name || ''
                  }&body=${encodeURIComponent(watch('reference'))}`}
                >
                  <Button
                    sx={{
                      ...nextButtonStyle,
                      maxWidth: '355px'
                    }}
                    onClick={reset}
                    color='primary'
                    variant='contained'
                  >
                    Open Mail
                  </Button>
                </Link>
              )}
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    </Box>
  )
}
