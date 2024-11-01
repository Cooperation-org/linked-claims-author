'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import FileListDisplay from '../../../components/FileList'
import { GoogleDriveStorage, uploadImageToGoogleDrive } from '@cooperation/vc-storage'
import useGoogleDrive from '../../../hooks/useGoogleDrive'
import { useStepContext } from '../StepContext'
import LoadingOverlay from '../../../components/Loading/LoadingOverlay'
import { SVGDescribeBadge, TasksVector } from '../../../Assets/SVGs'
import { StepTrackShape } from '../fromTexts & stepTrack/StepTrackShape'
import TipIcon from '../../../Assets/Images/Light Bulb.png'
import Image from 'next/image'

export interface FileItem {
  id: string
  file: File
  name: string
  url: string
  isFeatured: boolean
  uploaded: boolean
  googleId?: string
}

interface FileUploadAndListProps {
  setValue: (field: string, value: any, options?: any) => void
  selectedFiles: FileItem[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  watch: any
}

const UploadBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 20px',
  border: '2px dashed #ccc',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
  transition: 'border 0.3s',
  '&:hover': {
    borderColor: '#2563EB'
  }
})

export default function FileUploadAndList({
  setValue,
  selectedFiles,
  setSelectedFiles,
  watch
}: FileUploadAndListProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { loading, setUploadImageFn } = useStepContext()
  const { storage } = useGoogleDrive()

  const [files, setFiles] = useState<FileItem[]>(selectedFiles)

  useEffect(() => {
    setFiles(selectedFiles)
  }, [])

  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0]
    if (newFile) {
      addFile(newFile)
    }
  }

  const addFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      const newFileItem: FileItem = {
        id: new Date().getTime().toString(),
        file: file,
        name: file.name,
        url: e.target?.result as string,
        isFeatured: files.length === 0,
        uploaded: false
      }

      setFiles(prevFiles => [...prevFiles, newFileItem])
      setSelectedFiles(prevFiles => [...prevFiles, newFileItem])
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = useCallback(async () => {
    try {
      if (selectedFiles.length === 0) return

      // Identify files that haven't been uploaded
      const filesToUpload = selectedFiles.filter(
        fileItem => !fileItem.uploaded && fileItem.file && fileItem.name
      )
      if (filesToUpload.length === 0) return // Exit if no new files

      // Upload each file
      const uploadedFiles = await Promise.all(
        filesToUpload.map(async (fileItem, index) => {
          const uploadedFile = await uploadImageToGoogleDrive(
            storage as GoogleDriveStorage,
            fileItem.file
          )
          return {
            ...fileItem,
            googleId: (uploadedFile as { id: string }).id,
            uploaded: true,
            isFeatured: index === 0 && !watch('evidenceLink') // First file as featured if no evidence link exists
          }
        })
      )

      // Find the featured and non-featured files among the uploaded files
      const featuredFile = uploadedFiles.find(file => file.isFeatured)
      const nonFeaturedFiles = uploadedFiles.filter(file => !file.isFeatured)
      console.log('🚀 ~ handleUpload ~ nonFeaturedFiles:', nonFeaturedFiles)

      // Update `evidenceLink` if there is a featured file
      if (featuredFile) {
        setValue(
          'evidenceLink',
          `https://drive.google.com/uc?export=view&id=${featuredFile.googleId}`
        )
      }

      // Ensure the existing portfolio is preserved in `portfolio`
      const currentPortfolio = Array.isArray(watch('portfolio')) ? watch('portfolio') : []
      console.log('🚀 ~ handleUpload ~ currentPortfolio:', currentPortfolio)

      // Append only non-featured uploaded files to `portfolio`
      const newPortfolioEntries = nonFeaturedFiles.map(file => ({
        name: file.name,
        url: `https://drive.google.com/uc?export=view&id=${file.googleId}`,
        googleId: file.googleId
      }))
      console.log('🚀 ~ newPortfolioEntries ~ newPortfolioEntries:', newPortfolioEntries)

      // Update the form portfolio with current entries plus any new non-featured entries
      setValue('portfolio', [...currentPortfolio, ...newPortfolioEntries])

      // Update selectedFiles to mark these as uploaded and assign Google Drive IDs
      setSelectedFiles(
        selectedFiles.map(file => {
          const uploadedFile = uploadedFiles.find(f => f.name === file.name)
          return uploadedFile
            ? { ...file, googleId: uploadedFile.googleId, uploaded: true }
            : file
        })
      )
    } catch (error) {
      console.error('Error uploading files:', error)
    }
  }, [selectedFiles, setValue, setSelectedFiles, storage, watch])

  useEffect(() => {
    // @ts-ignore-next-line
    setUploadImageFn(() => handleUpload)
  }, [handleUpload, setUploadImageFn])

  const handleNameChange = (id: string, newName: string) => {
    const updatedFiles = files.map(file =>
      file.id === id ? { ...file, name: newName } : file
    )
    setFiles(updatedFiles)
    setSelectedFiles(updatedFiles)
  }

  const handleDelete = (id: string) => {
    console.log('Deleting file with ID:', id)
    let isFeaturedFileDeleted = false

    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(
        file => file.googleId !== id && file.id !== id
      )

      isFeaturedFileDeleted = prevFiles[0]?.googleId === id || prevFiles[0]?.id === id

      if (isFeaturedFileDeleted && updatedFiles.length > 0) {
        updatedFiles[0].isFeatured = true
      }

      return updatedFiles
    })

    setSelectedFiles(prevSelectedFiles =>
      prevSelectedFiles.filter(file => file.googleId !== id && file.id !== id)
    )

    const currentPortfolio = Array.isArray(watch('portfolio')) ? watch('portfolio') : []

    let updatedPortfolio = currentPortfolio.filter(
      (file: { googleId: string }) => file.googleId !== id
    )

    const newFeaturedFile = files[1]
    if (isFeaturedFileDeleted && newFeaturedFile?.googleId) {
      setValue(
        'evidenceLink',
        `https://drive.google.com/uc?export=view&id=${newFeaturedFile.googleId}`
      )

      updatedPortfolio = updatedPortfolio.filter(
        (file: { googleId: string }) => file.googleId !== newFeaturedFile.googleId
      )
    }

    setValue('portfolio', updatedPortfolio)
    console.log('Updated portfolio after deletion:', updatedPortfolio)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <TasksVector />

      <Typography
        sx={{
          fontFamily: 'Lato',
          fontSize: '24px',
          fontWeight: 400,
          textAlign: 'center',
          marginBottom: '16px'
        }}
      >
        Do you have any supporting evidence that you’d like to add?
      </Typography>

      <StepTrackShape />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '24px',
          width: '100%',
          maxWidth: '800px',
          gap: '1rem',
          my: 2,
          backgroundColor: '#D1E4FF',
          p: '0.6rem 1rem',
          borderRadius: '1rem'
        }}
      >
        <Image src={TipIcon} alt='Tip Icon' width={100} height={100} />
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: '16px',
            fontWeight: 400,
            color: '#334155'
          }}
        >
          The strength of your credential is significantly enhanced when you provide
          supporting evidence.
        </Typography>
      </Box>

      <UploadBox onClick={handleFileUploadClick}>
        <Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 500 }}>
          Drop your files here or <span style={{ color: '#2563EB' }}>browse</span>
        </Typography>
        <Typography
          variant='caption'
          color='textSecondary'
          sx={{ textAlign: 'center', fontSize: '0.875rem' }}
        >
          Max 10 files
        </Typography>
      </UploadBox>

      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept='image/*'
      />

      <Typography
        mt={2}
        sx={{ textAlign: 'center', fontSize: '0.875rem', color: '#666' }}
      >
        The first image will always be the featured image.
      </Typography>

      <FileListDisplay
        files={selectedFiles}
        onDelete={handleDelete}
        onNameChange={handleNameChange}
      />

      <LoadingOverlay text='Uploading files...' open={loading} />
    </Box>
  )
}
