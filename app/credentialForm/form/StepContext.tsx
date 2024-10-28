import React, { createContext, useContext, useEffect, useState } from 'react'

// Define the context structure
interface StepContextType {
  activeStep: number
  loading: boolean
  setActiveStep: (step: number) => void
  handleNext: () => void
  handleBack: () => void
  setUploadImageFn: (fn: () => Promise<void>) => void // Corrected type
}

const StepContext = createContext<StepContextType>({
  activeStep: 0,
  loading: false,
  setActiveStep: () => {},
  handleNext: async () => {},
  handleBack: () => {},
  setUploadImageFn: () => () => {}
})

export const StepProvider = ({ children }: { children: any }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [uploadImageFn, setUploadImageFn] = useState<() => Promise<void>>(
    () => async () => {}
  )
  const [loading, setLoading] = useState(false)

  const getStepFromHash = () => {
    const hash = window.location.hash
    const step = Number(hash.replace('#step', ''))
    return isNaN(step) ? 0 : step
  }

  useEffect(() => {
    const savedStep = localStorage.getItem('activeStep')
    const hashStep = getStepFromHash()

    if (savedStep) {
      setActiveStep(Number(savedStep))
    }

    if (hashStep !== null) {
      setActiveStep(hashStep)
    }

    const handleHashChange = () => {
      const step = getStepFromHash()
      setActiveStep(step)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Update localStorage and URL hash when the active step changes
  useEffect(() => {
    localStorage.setItem('activeStep', String(activeStep))
    window.location.hash = `#step${activeStep}`
  }, [activeStep])

  const handleNext = async () => {
    if (activeStep === 5 && typeof uploadImageFn === 'function') {
      setLoading(true) // Start loading
      try {
        await uploadImageFn() // Wait for image upload to complete
      } catch (error) {
        console.error('Error during image upload:', error)
      } finally {
        setLoading(false) // End loading
      }
    }
    setActiveStep(prevStep => prevStep + 1) // Move to the next step
  }

  const handleBack = () => {
    setActiveStep(prevStep => (prevStep > 0 ? prevStep - 1 : 0))
  }

  return (
    <StepContext.Provider
      value={{
        activeStep,
        setActiveStep,
        handleNext,
        handleBack,
        setUploadImageFn,
        loading
      }}
    >
      {children}
    </StepContext.Provider>
  )
}

export const useStepContext = () => useContext(StepContext)
