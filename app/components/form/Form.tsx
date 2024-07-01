import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, Box, useMediaQuery, Theme } from '@mui/material'
import { FormData, credential,CredentialProof  } from './Types'
import { textGuid, NoteText, SuccessText, FormTextSteps } from './FormTextSteps'
import { StepTrackShape } from './StepTrackShape'
import { Step0 } from './Step0'
import { Buttons } from './Buttons'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { Step4 } from './Step4'
import { Step5 } from './Step5'
import DataComponent from './dataPreview'
import SuccessPage from './SuccessPage'
import { useSession } from 'next-auth/react'
import { GoogleDriveStorage } from 'trust_storage'

declare global {
  interface Window {
    ethereum?: any;
  }
}
const Form = ({ onStepChange }: any) => {
  const [activeStep, setActiveStep] = useState(0)
  const [link, setLink] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const theme = useTheme<Theme>()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const characterLimit = 294
  const maxSteps = textGuid.length
  const { data: session } = useSession()
  const accessToken = session?.accessToken as string

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
      imageLink: '',
      description: ''
    },
    mode: 'onChange'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolio'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const stepFromHash = parseInt(window.location.hash.replace('#step-', ''), 10)
      if (!isNaN(stepFromHash) && stepFromHash >= 0 && stepFromHash < maxSteps) {
        setActiveStep(stepFromHash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [maxSteps])

  useEffect(() => {
    setActiveStep(0)
    window.location.hash = `step-0`
  }, [])

  useEffect(() => {
    onStepChange()
  }, [activeStep, onStepChange])

  const handleStepChange = (step: number) => {
    setActiveStep(step)
    window.location.hash = `step-${step}`
  }

  const handleNext = () => {
    handleStepChange(activeStep + 1)
  }

  const handleSign = () => {
    handleStepChange(activeStep + 1)
    handleFormSubmit()
  }

  const handleBack = () => {
    handleStepChange(activeStep - 1)
  }

  const handleTextEditorChange = (value: string | undefined) => {
    setValue('credentialDescription', value ?? '')
  }

  const detectProvider = async () => {
    if (window.ethereum && !isRequesting) {
      setIsRequesting(true)
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        const address = accounts[0]
        setAddress(address)
        setIsRequesting(false)
        return address
      } catch (error) {
        console.error('User rejected the request')
        setIsRequesting(false)
      }
    } else if (!window.ethereum) {
      console.error('MetaMask not found')
    }
  }

  async function signCredentialWithMetaMask(
    vcJwt: string,
    holderAddress: string
  ): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed')
    }

    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [holderAddress, vcJwt]
    })

    return signature
  }

  async function createFolderAndUploadFile(
    data: FormData,
    accessToken: string,
    holderAddress: string
  ) {
    const credential = createCredential(data, holderAddress)
    const vcJwt = JSON.stringify(credential)
    const signature = await signCredentialWithMetaMask(vcJwt, holderAddress)

    // Add signature to the credential
    credential.proof = {
      type: 'EcdsaSecp256k1Signature2019',
      created: new Date().toISOString(),
      proofPurpose: 'assertionMethod',
      verificationMethod: holderAddress,
      jws: signature
    } as CredentialProof
    console.log(':  Form  credential', credential)

    const fileName = data.fullName.toLowerCase().replace(/\s+/g, '') + '.json'

    try {
      const storage = new GoogleDriveStorage(accessToken)
      const folderName = 'USER_UNIQUE_KEY'
      const folderId = await storage.createFolder(folderName)

      const fileData = {
        fileName: fileName,
        mimeType: 'application/json',
        body: new Blob([JSON.stringify(credential)], { type: 'application/json' })
      }
      const fileId = await storage.save(fileData, folderId)

      const fileLink = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
      setLink(fileLink)
      console.log('File uploaded successfully with link:', fileLink)

      return fileLink
    } catch (error) {
      console.error('Error:', error)
    }
  }

  function createCredential(data: FormData, holderAddress: string) {
    const issuerDid = `did:ethr:${holderAddress}`
    return {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.1.json'
      ],
      type: ['VerifiableCredential', 'OpenBadgeCredential'],
      id: 'urn:uuid:' + crypto.randomUUID(), 
      name: data.credentialName,
      issuer: {
        id: issuerDid,
        name: data.persons,
        url: 'https://example.org', // issuer URL
        image: {
          id: data.imageLink,
          type: 'Image'
        }
      },
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: '', // subject's DID
        type: 'AchievementSubject',
        achievement: {
          id:
            'https://example.org/badges/' +
            data.credentialName.toLowerCase().replace(/\s+/g, ''),
          type: 'Badge',
          name: data.credentialName,
          description: data.description,
          image: {
            id: data.imageLink,
            type: 'Image'
          },
          criteria: {
            narrative: data.description
          }
        }
      }
    }
  }

  const handleFormSubmit = handleSubmit(async data => {
    let fileLink
    const holderAddress = await detectProvider()

    if (data.storageOption === 'Google Drive') {
      fileLink = await createFolderAndUploadFile(data, accessToken, holderAddress)
      console.log('Credential link:', fileLink)
    } else {
      localStorage.setItem('personalCredential', JSON.stringify(data))
    }
  })

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    await handleFormSubmit()
    reset()
    setActiveStep(0)
  }

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
      onSubmit={onSubmit}
    >
      <FormTextSteps activeStep={activeStep} activeText={textGuid[activeStep]} />
      {!isLargeScreen && activeStep !== 7 && <StepTrackShape activeStep={activeStep} />}
      {activeStep !== 0 && activeStep !== 7 && activeStep !== 6 && activeStep !== 4 && (
        <NoteText />
      )}
      {activeStep === 7 && <SuccessText />}
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <FormControl sx={{ width: '100%' }}>
          {activeStep === 0 && (
            <Step0 activeStep={activeStep} watch={watch} setValue={setValue} />
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
              handleTextEditorChange={handleTextEditorChange}
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
            />
          )}
        </FormControl>
      </Box>
      {activeStep !== 7 && (
        <Buttons
          activeStep={activeStep}
          maxSteps={maxSteps}
          handleNext={handleNext}
          handleSign={handleSign}
          handleBack={handleBack}
          isValid={isValid}
        />
      )}
    </form>
  )
}

export default Form
