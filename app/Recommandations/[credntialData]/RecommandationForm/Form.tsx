import { Box, FormControl } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  FormTextSteps,
  NoteText,
  SuccessText,
  textGuid
} from '../../../components/form/fromTexts & stepTrack/FormTextSteps'
import { FormData } from '../../../components/form/types/Types'

const Form = ( setActiveStep : any) => {
  const [activeStep, SetFormStep] = useState(0)

  useEffect(() => {
    setActiveStep(activeStep)
  }, [activeStep])

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
        overflow: 'auto'
      }}
      // onSubmit={{}}
    >
      <FormTextSteps activeStep={activeStep} activeText={textGuid[activeStep]} />
      {activeStep !== 0 && activeStep !== 7 && activeStep !== 6 && activeStep !== 4 && (
        <NoteText />
      )}
      {activeStep === 7 && <SuccessText />}
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <FormControl sx={{ width: '100%' }}>
          {/* {activeStep === 0 && <Step0 />}
          {activeStep === 1 && <Step1 />}

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
