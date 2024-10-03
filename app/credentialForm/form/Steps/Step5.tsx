import React, { useCallback } from 'react'
import { Box, Typography, Link, Button } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { useStepContext } from '../StepContext'

const Step5 = () => {
  const { handleNext } = useStepContext()
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles)
    // Handle file processing here
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    },
    maxSize: 50 * 1024 * 1024 // 50MB limit
  })

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: 'FFFFFF',
        '&:hover': {
          borderColor: '#90caf9'
        }
      }}
    >
      <input {...getInputProps()} />
      <Typography
        sx={{ display: 'flex', justifyContent: 'center' }}
        variant='body1'
        component='div'
      >
        Drop your files here or{'  '}
        <Typography
          sx={{
            textDecoration: 'underline',
            ml: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          color='primary'
        >
          {' '}
          browse
        </Typography>
      </Typography>
      <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
        Maximum size: 50MB
      </Typography>
      <Button
        onClick={event => {
          event.stopPropagation()
          handleNext()
        }}
        variant='text'
        color='primary'
        sx={{ mt: 2 }}
      >
        Skip
      </Button>
    </Box>
  )
}
export default Step5
