'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import { FormLabel, TextField, Typography, useMediaQuery, Checkbox } from '@mui/material'
import { SVGDate, SVGLargeScreen } from '../Assets/SVGs'
import Image from 'next/image'
import img3 from '../Assets/Images/Tessa Persona large sceens.png'
import {
  CustomTextField,
  customTextFieldStyles,
  formLabelStyles,
  successPageTitleStyles,
  successPageDateStyles,
  successPageHeaderStyles,
  successPageInfoStyles,
  nextButtonStyle,
  StyledButton,
  TextFieldStyles
} from '../components/Styles/appStyles'
import { useForm } from 'react-hook-form'

const steps = ['Message', 'Invite', '']

const CustomStep = styled(Step)(({ theme, completed, active }) => ({
  '& .MuiStepLabel-root': {
    color: completed || active ? 'green' : theme.palette.text.primary
  }
}))

export default function HorizontalLinearStepper() {
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isValid }
  } = useForm<any>({
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      reference: ''
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
                      {'formData?.credentialName'}
                    </Typography>
                    <Box sx={successPageInfoStyles}>
                      <SVGDate />
                      <Typography sx={successPageDateStyles}>
                        {'formData?.credentialDuration'}
                      </Typography>
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
                  {...register('firstName', {
                    required: 'First Name is required'
                  })}
                  sx={TextFieldStyles}
                  id='outlined-basic'
                  label='First Name'
                  variant='outlined'
                />
                <TextField
                  {...register('secondName', {
                    required: 'Second Name is required'
                  })}
                  sx={TextFieldStyles}
                  id='outlined-basic'
                  label='Second Nam'
                  variant='outlined'
                />
                <TextField
                  {...register('email', {
                    required: 'Email is required'
                  })}
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
                <Button
                  sx={{
                    ...nextButtonStyle,
                    maxWidth: '355px'
                  }}
                  onClick={handleNext}
                  color='primary'
                  variant='contained'
                >
                  Open Mail
                </Button>
              )}
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    </Box>
  )
}
