import React, { createContext, useContext, useEffect, useState } from 'react'

// Define the context structure
interface StepContextType {
  activeStep: number
  loading: boolean
  setActiveStep: (step: number) => void
  handleNext: () => void
  handleBack: () => void
  setUploadImageFn: (fn: () => Promise<void>) => void
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
    return isNaN(step) ? null : step
  }

  useEffect(() => {
    const updateActiveStep = () => {
      const pathname = window.location.pathname
      const hashStep = getStepFromHash()
      const savedStep = localStorage.getItem('activeStep')

      if (pathname === '/' || pathname === '/claims') {
        setActiveStep(0)
      } else if (hashStep !== null) {
        setActiveStep(hashStep)
      } else if (savedStep) {
        setActiveStep(Number(savedStep))
      }
    }

    updateActiveStep()

    const handleLocationChange = () => {
      updateActiveStep()
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  // Update localStorage and URL hash when the active step changes
  useEffect(() => {
    localStorage.setItem('activeStep', String(activeStep))
    const pathname = window.location.pathname
    if (pathname !== '/' && pathname !== '/claims') {
      window.location.hash = `#step${activeStep}`
    }
  }, [activeStep])

  const handleNext = async () => {
    if (activeStep === 3 && typeof uploadImageFn === 'function') {
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
