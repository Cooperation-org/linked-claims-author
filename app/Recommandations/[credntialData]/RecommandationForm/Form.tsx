import { Box, FormControl, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  FormTextSteps,
  CredentialViewText,
  SuccessText,
  textGuid
} from '../../../components/form/fromTexts & stepTrack/FormTextSteps'
import { FormData } from '../../../components/form/types/Types'
import ViewCredential from '../viewCredential/Credential'

const Form = () => {
  const [activeStep, SetFormStep] = useState(0)

  // useEffect(() => {
  //   setActiveStep(activeStep)
  // }, [activeStep])

  // const [emailData, setEmailData] = useState({
  //   to: '',
  //   subject: '',
  //   text: '',
  //   html: ''
  // })

  // const handleChange = (e: { target: { name: any; value: any } }) => {
  //   setEmailData({
  //     ...emailData,
  //     [e.target.name]: e.target.value
  //   })
  // }

  // const handleSubmit = async (e: { preventDefault: () => void }) => {
  //   console.log(':  handleSubmit  emailData', emailData)
  //   e.preventDefault()
  // }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isValid }
  } = useForm<FormData>({
    defaultValues: {
      storageOption: 'Device',
      fullName: '',
      persons: '',
      credentialName: '',
      credentialDuration: '',
      credentialDescription: '',
      portfolio: [{ name: '', url: '' }],
      evidenceLink: '',
      description: ''
    },
    mode: 'onChange'
  })

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
        marginTop: '30px',
        padding: '0 15px 30px',
        overflow: 'auto',
        flexGrow: 1
      }}
      // onSubmit={{}}
    >
      {activeStep === 0 && (
        <Typography variant='formTextStep'>{CredentialViewText}</Typography>
      )}
      {activeStep !== 0 && (
        <FormTextSteps activeStep={activeStep} activeText={textGuid[activeStep]} />
      )}
      {activeStep === 7 && <SuccessText />}
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <FormControl sx={{ width: '100%' }}>
          {activeStep === 0 && <ViewCredential />}
          {/* {activeStep === 1 && <Step1 />}

          {activeStep === 2 && <Step2 />}
          {activeStep === 3 && <Step3 />}
          {activeStep === 4 && <Step4 />}
          {activeStep === 5 && <Step5 />}
          {activeStep === 6 && <DataComponent />}
          {activeStep === 7 && <SuccessPage />} */}
        </FormControl>
      </Box>
      {/* {activeStep !== 7 && <Buttons />} */}
    </form>
  )
}

export default Form
