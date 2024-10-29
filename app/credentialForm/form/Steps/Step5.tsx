/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { useStepContext } from '../StepContext'
import useGoogleDrive from '../../../hooks/useGoogleDrive'
import { uploadImageToGoogleDrive } from '@cooperation/vc-storage'

interface Step5Props {
  setImage: (selectedImage: string, imageUrl: string) => void
  setUploadImageFn: (uploadImageFn: () => Promise<void>) => void
}

const Step5: React.FC<Step5Props> = ({ setImage, setUploadImageFn }) => {
  const { handleNext } = useStepContext()
  const { storage } = useGoogleDrive()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Handle the drop event and set the image and file
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const imageUrl = URL.createObjectURL(file)
      console.log(':  onDrop  imageUrl', imageUrl)
      setSelectedImage(imageUrl)
      setSelectedFile(file) // Store the file for upload
    }
  }, [])

  const uploadImage = useCallback(async () => {
    if (!selectedFile) return

    try {
      // @ts-ignore
      const uploadedImage = await uploadImageToGoogleDrive(storage, selectedFile)
      // @ts-ignore
      const dynamicUrl = `https://drive.google.com/uc?export=view&id=${uploadedImage.id}`
      setImage(selectedImage as string, dynamicUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }, [selectedFile, setImage, storage])
  useEffect(() => {
    // @ts-ignore-next-line
    setUploadImageFn(() => uploadImage) // Properly set the uploadImage function
  }, [uploadImage, setUploadImageFn])

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
        backgroundColor: '#FFFFFF',
        '&:hover': {
          borderColor: '#90caf9'
        }
      }}
    >
      <input {...getInputProps()} />
      {!selectedImage ? (
        <>
          <Typography
            sx={{ display: 'flex', justifyContent: 'center' }}
            variant='body1'
            component='div'
          >
            Drop your files here or{' '}
            <Typography
              sx={{
                textDecoration: 'underline',
                ml: '4px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              color='primary'
            >
              browse
            </Typography>
          </Typography>
          <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
            Maximum size: 50MB
          </Typography>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          <img
            src={selectedImage}
            alt='Selected'
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
        </Box>
      )}
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
