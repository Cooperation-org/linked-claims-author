'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { FormLabel, TextField, Typography, Checkbox } from '@mui/material'
import Image from 'next/image'
import img3 from '../../Assets/Images/Tessa Persona large sceens.png'
import { useForm } from 'react-hook-form'
import { SVGLargeScreen } from '../../Assets/SVGs'
import {
  formLabelStyles,
  CustomTextField,
  customTextFieldStyles,
  TextFieldStyles,
  StyledButton,
  nextButtonStyle
} from '../../components/Styles/appStyles'
import { useParams } from 'next/navigation'
import useGoogleDrive from '../../hooks/useGoogleDrive'
import { useSession } from 'next-auth/react'
import { useStepContext } from '../../credentialForm/form/StepContext'
import ComprehensiveClaimDetails from '../../test/[id]/ComprehensiveClaimDetails'

const steps = ['Message', 'Invite', '']

const CustomStep = styled(Step)(({ theme, completed, active }) => ({
  '& .MuiStepLabel-root': {
    color: completed || active ? 'green' : theme.palette.text.primary
  }
}))

export default function HorizontalLinearStepper() {
  const { activeStep, handleNext, handleBack } = useStepContext()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [driveData, setDriveData] = React.useState<any>(null)
  const { data: session } = useSession()
  const accessToken = session?.accessToken
  const [sendCopyToSelf, setSendCopyToSelf] = React.useState(false)
  const params = useParams()
  const [achievementName, setAchievementName] = React.useState<string | null>(null)
  const { getContent } = useGoogleDrive()

  const id = React.useMemo(() => {
    console.log('Params:', params)
    if (typeof params?.id === 'string') return params.id
    if (Array.isArray(params?.id)) return params.id[0]
    return undefined
  }, [params])

  console.log('ID:', id)

  const {
    reset,
    watch,
    register,
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

  React.useEffect(() => {
    const fetchDriveData = async () => {
      if (id && accessToken) {
        const fileId = id.split('/d/')[1]?.split('/')[0]
        console.log('File ID:', fileId)
        if (fileId) {
          try {
            const data = await getContent(fileId)
            console.log('Drive Data Fetched:', data)
            if (data) {
              setDriveData(data)
              setAchievementName(data?.credentialSubject?.achievement[0]?.name || '')
              console.log(
                'Achievement Name:',
                data?.credentialSubject?.achievement[0]?.name
              )
            }
          } catch (error) {
            console.error('Error fetching Google Drive data:', error)
          }
        }
      }
    }

    fetchDriveData()
  }, [id, accessToken, getContent])

  React.useEffect(() => {
    console.log('Drive Data:', driveData)
    if (driveData) {
      const newReference = `Hey there! I hope you’re doing well.
        I am writing to ask if you would consider supporting me by providing validation of my expertise as a ${
          driveData?.credentialSubject?.achievement[0]?.name || 'your field of expertise'
        }. If you're comfortable, could you please take a moment to write a brief reference highlighting your observations of my skills and how they have contributed to the work we have done together? It would mean a lot to me!`

      console.log('New Reference:', newReference)

      if (watch('reference') !== newReference) {
        console.log('Resetting form with new reference')
        reset(formValues => ({
          ...formValues,
          reference: newReference
        }))
      }
    }
  }, [driveData, reset, watch])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Checkbox Changed:', event.target.checked)
    setSendCopyToSelf(event.target.checked)
  }

  const handleDataFetched = (data: any) => {
    console.log('Data Fetched from ComprehensiveClaimDetails:', data)
    if (data?.credentialSubject?.achievement[0]?.name) {
      setAchievementName(data.credentialSubject.achievement[0].name)
      reset({
        reference: `Hey there! I hope you’re doing well.
          I am writing to ask if you would consider supporting me by providing validation of my expertise as a ${data.credentialSubject.achievement[0].name}. If you're comfortable, could you please take a moment to write a brief reference highlighting your observations of my skills and how they have contributed to the work we have done together? It would mean a lot to me!`
      })
    }
  }

  const mailToLink = `mailto:${watch('email')}${
    sendCopyToSelf && session?.user?.email ? `,${session.user.email}` : ''
  }?subject=${`Support Request: ${achievementName ?? ''}`}&body=${encodeURIComponent(
    watch('reference')
  )}`

  console.log('Mailto Link:', mailToLink)

  if (!id) {
    return (
      <div>
        <h2>Error: Missing credential data.</h2>
      </div>
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
                  Write a message asking for a reference:{' '}
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
                <ComprehensiveClaimDetails
                  params={{ claimId: `https://drive.google.com/file/d/${id}/view` }}
                  setFullName={() => {}}
                  setEmail={() => {}}
                  setFileID={() => {}}
                  claimId={id}
                  onDataFetched={handleDataFetched}
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                position='relative'
                width='100%'
              >
                <FormLabel sx={formLabelStyles} id='description-label'>
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
                  <Checkbox
                    {...label}
                    checked={sendCopyToSelf}
                    onChange={handleCheckboxChange}
                  />
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
              width: { xs: '100%' },
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
