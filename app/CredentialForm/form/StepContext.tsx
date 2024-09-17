'use client'

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'

const StepContext = createContext({
  activeStep: 0,
  setActiveStep: (step: number) => {},
  handleNext: () => {},
  handleBack: () => {}
})

export const StepProvider = ({ children }: { children: any }) => {
  const [activeStep, setActiveStep] = useState(0)

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

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevStep => (prevStep > 0 ? prevStep - 1 : 0))
  }

  return (
    <StepContext.Provider
      value={useMemo(
        () => ({ activeStep, setActiveStep, handleNext, handleBack }),
        [activeStep, setActiveStep, handleNext, handleBack]
      )}
    >
      {children}
    </StepContext.Provider>
  )
}

export const useStepContext = () => useContext(StepContext)
