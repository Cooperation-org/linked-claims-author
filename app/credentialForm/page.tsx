'use client'
import React, { useCallback, useRef } from 'react'
import { Box } from '@mui/material'
import dynamic from 'next/dynamic'

const DynamicForm = dynamic(() => import('./form/Form'), {
  ssr: false,
  loading: () => <p></p>
})

const FormComponent = () => {
  const formRef = useRef<HTMLDivElement>(null)

  const handleScrollToTop = useCallback(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 10)
    }
  }, [formRef])

  return (
    <Box
      ref={formRef}
      sx={{
        minHeight: {
          xs: 'calc(100vh - 190px)',
          md: 'calc(100vh - 381px)'
        },
        display: 'block',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto'
      }}
    >
      <DynamicForm onStepChange={handleScrollToTop} />
    </Box>
  )
}

export default FormComponent
