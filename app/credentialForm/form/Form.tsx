/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, Box, Slide } from '@mui/material'
import { FormData } from './types/Types'
import { options, Step0 } from './Steps/Step0'
import { Buttons } from './buttons/Buttons'
import { Step1 } from './Steps/Step1'
import { Step2 } from './Steps/Step2'
import { Step3 } from './Steps/Step3'
import { Step4 } from './Steps/Step4'
import Step5 from './Steps/Step5'
import DataComponent from './Steps/dataPreview'

import { createDID, createDIDWithMetaMask, signCred } from '../../utils/signCred'
import { GoogleDriveStorage, saveToGoogleDrive } from '@cooperation/vc-storage'
import { useSession, signIn } from 'next-auth/react'
import { handleSign } from '../../utils/formUtils'
import { signAndSaveOnDevice } from '../../utils/saveOnDevice'
import { saveSession } from '../../utils/saveSession'
import SnackMessage from '../../components/SnackMessage'
import SessionDialog from '../../components/SessionDialog'
import { useStepContext } from './StepContext'
import {
  FormTextSteps,
  NoteText,
  SuccessText,
  textGuid
} from './fromTexts & stepTrack/FormTextSteps'
import SuccessPage from './Steps/SuccessPage'

interface SessionData {
  fullName: string
  credentialName: string
}
interface Session {
  name: string
  content: any
  comments: string[]
}

const Form = ({ onStepChange }: any) => {
  const { activeStep, handleNext, handleBack, setActiveStep } = useStepContext()
  const [prevStep, setPrevStep] = useState(0)
  const [link, setLink] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [hasSignedIn, setHasSignedIn] = useState(false)
  const [metamaskAdress, setMetamaskAdress] = useState<string>('')
  const [disabled0, setDisabled0] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')
  const [userSessions, setUserSessions] = useState<Session[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [refLink, setRefLink] = useState('')
  const [image, setImage] = useState('')
  const characterLimit = 294
  const maxSteps = textGuid.length
  const { data: session } = useSession()
  const accessToken = session?.accessToken

  const storage = new GoogleDriveStorage(accessToken as string)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    trigger,
    formState: { errors, isValid }
  } = useForm<FormData>({
    defaultValues: {
      storageOption: 'Google Drive',
      fullName: session?.user?.name ?? '',
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolio'
  })

  useEffect(() => {
    setPrevStep(activeStep + 1)
  }, [activeStep])

  const direction = activeStep > prevStep ? 'left' : 'right'

  const handleFetchinguserSessions = async () => {
    try {
      const storageOption = watch('storageOption')
      if (!storageOption || !accessToken) return
      const userSessions = await storage.getAllFilesByType('SESSIONs')
      if (!userSessions) return
      console.log('userSessions', userSessions)

      if (userSessions.length > 0) {
        setUserSessions(userSessions)
        setOpenDialog(true)
      }
    } catch (err) {
      console.error('Failed to fetch userSessions:', err)
      setErrorMessage('Failed to fetch user sessions')
    }
  }

  const handleuserSessionselect = (session: any) => {
    // Set the selected session values into the form
    setValue('storageOption', session.storageOption)
    setValue('fullName', session.fullName)
    setValue('persons', session.persons)
    setValue('credentialName', session.credentialName)
    setValue('credentialDuration', session.credentialDuration)
    setValue('credentialDescription', session.credentialDescription)
    setValue('portfolio', session.portfolio)
    setValue('evidenceLink', session.evidenceLink)
    setValue('description', session.description)

    // Close the dialog
    setOpenDialog(false)
  }

  useEffect(() => {
    onStepChange()
  }, [activeStep])
  useEffect(() => {
    handleFetchinguserSessions()
  }, [])

  const costumedHandleNextStep = async () => {
    if (
      activeStep === 0 &&
      watch('storageOption') === 'Google Drive' &&
      !session?.accessToken &&
      !hasSignedIn
    ) {
      const signInSuccess = await signIn('google')
      if (!signInSuccess || !session?.accessToken) return
      setHasSignedIn(true)
      handleNext()
    } else {
      handleNext()
    }
  }

  const costumedHandleBackStep = async () => {
    if (activeStep > 0) {
      handleBack()
      await trigger()
    }
  }

  const handleFormSubmit = handleSubmit(async (data: FormData) => {
    try {
      if (
        data.storageOption === options.GoogleDrive ||
        data.storageOption === options.DigitalWallet
      )
        await sign(data)
      else if (data.storageOption === options.Device) {
        signAndSaveOnDevice(data)
      }
    } catch (error: any) {
      if (error.message === 'MetaMask address could not be retrieved') {
        setErrorMessage('Please make sure you have MetaMask installed and connected.')
        return
      } else {
        console.log('Error during VC signing:', error)
        setErrorMessage('An error occurred during the signing process.')
      }
    }
  })

  const sign = async (data: any) => {
    try {
      if (!accessToken) {
        setErrorMessage('Access token is missing')
        return
      }

      let newDid
      if (data.storageOption === options.DigitalWallet) {
        newDid = await createDIDWithMetaMask(metamaskAdress)
      } else {
        newDid = await createDID()
      }
      const { didDocument, keyPair, issuerId } = newDid

      const saveResponse = await saveToGoogleDrive(
        storage,
        {
          didDocument,
          keyPair
        },
        'DID'
      )

      const res = await signCred(accessToken, data, issuerId, keyPair, 'VC')
      const file = (await saveToGoogleDrive(storage, res, 'VC')) as any
      setLink(`https://drive.google.com/file/d/${file.id}/view`)
      setRefLink(`${file.id}`)

      console.log('🚀 ~ handleFormSubmit ~ res:', res)
      return res
    } catch (error: any) {
      console.error('Error during signing process:', error)
      throw error
    }
  }

  const handleSaveSession = async () => {
    try {
      const formData = watch() // Get the current form data
      const { fullName, credentialName, storageOption } = formData

      // Validate required fields
      if (!fullName || !credentialName) {
        setErrorMessage('Full Name and Credential Name are required to save the session.')
        return
      }

      const sessionData: SessionData = { fullName, credentialName }

      setSnackMessage(`Successfully saved in Your ${storageOption}`)

      if (!accessToken) {
        setErrorMessage('Access token is missing')
        return
      }

      await saveSession(sessionData, accessToken) // Save session data to Google Drive
    } catch (error: any) {
      setSnackMessage('Something went wrong, please try again later')
      console.error('Error saving session:', error)
    }
  }

  return (
    <>
      {true ? (
        <SessionDialog
          userSessions={userSessions}
          open={openDialog}
          onSelect={handleuserSessionselect}
          onCancel={() => setOpenDialog(false)}
        />
      ) : (
        ''
      )}
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
        onSubmit={handleFormSubmit}
      >
        <FormTextSteps activeStep={activeStep} activeText={textGuid[activeStep]} />
        {activeStep !== 0 && activeStep !== 7 && activeStep !== 6 && activeStep !== 4 && (
          <NoteText />
        )}
        {activeStep === 7 && <SuccessText />}
        <Box sx={{ width: { xs: '100%', md: '50%' }, minWidth: { md: '400px' } }}>
          <FormControl sx={{ width: '100%' }}>
            {activeStep === 0 && (
              <Slide in={true} direction={direction} timeout={500}>
                <Box>
                  <Step0
                    activeStep={activeStep}
                    watch={watch}
                    setValue={setValue}
                    setMetaMaskAddres={setMetamaskAdress}
                    setErrorMessage={setErrorMessage}
                    setDisabled0={setDisabled0}
                  />
                </Box>
              </Slide>
            )}
            {activeStep === 1 && (
              <Slide in={true} direction={direction} timeout={500}>
                <Box>
                  <Step1
                    watch={watch}
                    setValue={setValue}
                    register={register}
                    errors={errors}
                  />
                </Box>
              </Slide>
            )}

            {activeStep === 2 && (
              <Slide in={true} direction={direction}>
                <Box>
                  <Step2
                    register={register}
                    watch={watch}
                    handleTextEditorChange={value =>
                      setValue('credentialDescription', value ?? '')
                    }
                    errors={errors}
                  />
                </Box>
              </Slide>
            )}
            {activeStep === 3 && (
              <Slide in={true} direction={direction}>
                <Box>
                  <Step3
                    watch={watch}
                    register={register}
                    errors={errors}
                    characterLimit={characterLimit}
                  />
                </Box>
              </Slide>
            )}
            {activeStep === 4 && (
              <Slide in={true} direction={direction}>
                <Box>
                  <Step4
                    register={register}
                    fields={fields}
                    append={append}
                    handleNext={handleNext}
                    errors={errors}
                    remove={remove}
                  />
                </Box>
              </Slide>
            )}
            {activeStep === 5 && (
              <Slide in={true} direction={direction}>
                <Box>
                  <Step5
                    setImage={(imageUrl: string) => {
                      setImage(imageUrl)
                      setValue('evidenceLink', imageUrl)
                    }}
                  />
                </Box>
              </Slide>
            )}
            {activeStep === 6 && (
              <Slide in={true} direction={direction}>
                <Box>
                  <DataComponent formData={watch()} image={image} />
                </Box>
              </Slide>
            )}
            {activeStep === 7 && (
              <Slide in={true} direction={direction}>
                <Box>
                  <SuccessPage
                    formData={watch()}
                    setActiveStep={setActiveStep}
                    reset={reset}
                    link={link}
                    setLink={setLink}
                    setRefLink={setRefLink}
                    storageOption={watch('storageOption')}
                  />
                </Box>
              </Slide>
            )}
          </FormControl>
        </Box>
        {activeStep !== 7 && (
          <Buttons
            activeStep={activeStep}
            maxSteps={maxSteps}
            handleNext={activeStep === 0 ? costumedHandleNextStep : () => handleNext()}
            handleSign={() => handleSign(activeStep, setActiveStep, handleFormSubmit)}
            handleBack={costumedHandleBackStep}
            isValid={isValid}
            disabled0={disabled0}
            handleSaveSession={handleSaveSession}
          />
        )}
        {errorMessage && <SnackMessage message={errorMessage} type='error' />}
        {snackMessage && <SnackMessage message={snackMessage} type='success' />}
      </form>
    </>
  )
}

export default Form
