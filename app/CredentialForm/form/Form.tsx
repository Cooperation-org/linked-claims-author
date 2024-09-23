/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, Box } from '@mui/material'
import { FormData } from './types/Types'
import {
  textGuid,
  NoteText,
  SuccessText,
  FormTextSteps
} from './fromTexts & stepTrack/FormTextSteps'
import { options, Step0 } from './Steps/Step0'
import { Buttons } from './buttons/Buttons'
import { Step1 } from './Steps/Step1'
import { Step2 } from './Steps/Step2'
import { Step3 } from './Steps/Step3'
import { Step4 } from './Steps/Step4'
import { Step5 } from './Steps/Step5'
import DataComponent from './Steps/dataPreview'
import SuccessPage from './Steps/SuccessPage'

import { createDID, createDIDWithMetaMask, signCred } from '../../utils/signCred'
import { GoogleDriveStorage, saveToGoogleDrive } from '@cooperation/vc-storage'
import { useGoogleSignIn } from '../../components/signing/useGoogleSignIn'
import { useStepContext } from './StepContext'
import { handleSign } from '../../utils/formUtils'
import { signAndSaveOnDevice } from '../../utils/saveOnDevice'
import { saveSession } from '../../utils/saveSession'
import SnackMessage from '../../components/SnackMessage'
import SessionDialog from '../../components/SessionDialog'

const Form = ({ onStepChange }: any) => {
  const { activeStep, handleNext, handleBack, setActiveStep } = useStepContext()
  const [link, setLink] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [hasSignedIn, setHasSignedIn] = useState(false)
  const [metamaskAdress, setMetamaskAdress] = useState<string>('')
  const [disabled0, setDisabled0] = useState(false)
  const [snackMessage, setSnackMessgae] = useState('')
  const [userSessions, setuserSessions] = useState<{}[]>([])
  const [openDialog, setOpenDialog] = useState(false)

  const characterLimit = 294
  const maxSteps = textGuid.length
  const { session, handleSignIn } = useGoogleSignIn()
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolio'
  })

  const handleFetchinguserSessions = async () => {
    try {
      const storageOption = watch('storageOption')
      if (!storageOption || !accessToken) return
      const userSessions = await storage.getAllSessions()
      if (!userSessions) return
      console.log('userSessions', userSessions)

      if (userSessions.length > 0) {
        setuserSessions(userSessions)
        setOpenDialog(true)
      }
    } catch (err) {
      console.error('Failed to fetch userSessions:', err)
      setErrorMessage('Failed to fetch user userSessions')
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
      const signInSuccess = await handleSignIn()
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
      setActiveStep(0)
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
      await saveToGoogleDrive(storage, res, 'VC')
      setLink(`https://drive.google.com/file/d/${res.id}/view`)

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
      setSnackMessgae('Successfully saved in Your ' + formData.storageOption)
      if (!accessToken) {
        setErrorMessage('Access token is missing')
        return
      }
      await saveSession(formData, accessToken) // Save session data to Google Drive
    } catch (error: any) {
      setSnackMessgae('Someting went wrong, please try agin later')
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
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <FormControl sx={{ width: '100%' }}>
            {activeStep === 0 && (
              <Step0
                activeStep={activeStep}
                watch={watch}
                setValue={setValue}
                setMetaMaskAddres={setMetamaskAdress}
                setErrorMessage={setErrorMessage}
                setDisabled0={setDisabled0}
              />
            )}
            {activeStep === 1 && (
              <Step1
                watch={watch}
                setValue={setValue}
                register={register}
                errors={errors}
              />
            )}

            {activeStep === 2 && (
              <Step2
                register={register}
                watch={watch}
                handleTextEditorChange={value =>
                  setValue('credentialDescription', value ?? '')
                }
                errors={errors}
              />
            )}
            {activeStep === 3 && (
              <Step3
                watch={watch}
                register={register}
                errors={errors}
                characterLimit={characterLimit}
              />
            )}
            {activeStep === 4 && (
              <Step4
                register={register}
                fields={fields}
                append={append}
                handleNext={handleNext}
                errors={errors}
                remove={remove}
              />
            )}
            {activeStep === 5 && <Step5 register={register} handleNext={handleNext} />}
            {activeStep === 6 && <DataComponent formData={watch()} />}
            {activeStep === 7 && (
              <SuccessPage
                formData={watch()}
                setActiveStep={setActiveStep}
                reset={reset}
                link={link}
                setLink={setLink}
                storageOption={watch('storageOption')}
              />
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
        {errorMessage && (
          <div
            style={{
              color: errorMessage.includes('MetaMask') ? 'red' : 'black',
              textAlign: 'center',
              marginTop: '20px'
            }}
          >
            {errorMessage}
          </div>
        )}
        {snackMessage ? <SnackMessage message={snackMessage} /> : ''}
      </form>
    </>
  )
}

export default Form
