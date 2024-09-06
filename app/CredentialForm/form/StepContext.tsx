'use client'

import React, { createContext, useContext, useState } from 'react'

const StepContext = createContext({
  activeStep: 0,
  setActiveStep: (step: number) => {},
  handleNext: () => {},
  handleBack: () => {}
})

// StepContext provider component
export const StepProvider = ({ children }: { children: any }) => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => setActiveStep(prevStep => prevStep + 1)
  const handleBack = () => setActiveStep(prevStep => (prevStep > 0 ? prevStep - 1 : 0))

  return (
    <StepContext.Provider value={{ activeStep, setActiveStep, handleNext, handleBack }}>
      {children}
    </StepContext.Provider>
  )
}

export const useStepContext = () => useContext(StepContext)
