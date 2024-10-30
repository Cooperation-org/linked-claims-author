'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import FileListDisplay from '../../../components/FileList'
import { uploadImageToGoogleDrive } from '@cooperation/vc-storage'
import useGoogleDrive from '../../../hooks/useGoogleDrive'

// Types for file handling
interface FileItem {
  id: string
  file: File // Store the original File object
  name: string
  url: string
  isFeatured: boolean
}

interface FileUploadAndListProps {
  setValue: (field: string, value: any, options?: any) => void
  watch: (field: string) => any
  setUploadImageFn: (uploadImageFn: () => Promise<void>) => void
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
  watch,
  setUploadImageFn
}: FileUploadAndListProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<FileItem[]>([])

  const { storage } = useGoogleDrive()

  // Handle file input click
  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  // Handle file selection via input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0]
    if (newFile) {
      addFile(newFile)
    }
  }

  // Handle file drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    if (droppedFiles.length) {
      for (let i = 0; i < droppedFiles.length; i++) {
        addFile(droppedFiles[i])
      }
    }
  }

  // Handle drag over
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault() // Allow drop
  }

  // Add new file to state
  const addFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      const newFileItem: FileItem = {
        id: new Date().getTime().toString(),
        file: file, // Keep the original File object
        name: file.name,
        url: e.target?.result as string,
        isFeatured: files.length === 0 // Set the first file as featured
      }

      setFiles(prevFiles => {
        const updatedFiles = [...prevFiles, newFileItem]
        logFiles(updatedFiles)
        return updatedFiles
      })
    }
    reader.readAsDataURL(file) // Read file as data URL for preview
  }

  // Handle file upload to Google Drive
  const handleUpload = async () => {
    try {
      if (files.length === 0) return // If no files, do nothing

      // Upload files to Google Drive
      const uploadedFiles = await Promise.all(
        files.map(async (fileItem, index) => {
          // Upload the original File object to Google Drive
          const uploadedFile = await uploadImageToGoogleDrive(storage, fileItem.file)

          return {
            id: uploadedFile.id,
            name: fileItem.name,
            isFeatured: index === 0 // Mark the first file as featured
          }
        })
      )

      // Separate featured and non-featured files
      const featuredFile = uploadedFiles.find(file => file.isFeatured)
      const nonFeaturedFiles = uploadedFiles.filter(file => !file.isFeatured)

      if (featuredFile) {
        // Set evidenceLink to the featured image's Google Drive ID
        setValue(
          'evidenceLink',
          `https://drive.google.com/file/d/${featuredFile.id}/view`
        )
      }

      // Set the non-featured files to the portfolio
      setValue(
        'portfolio',
        nonFeaturedFiles.map(file => ({
          name: file.name,
          url: `https://drive.google.com/file/d/${file.id}/view`
        }))
      )

      console.log('Updated evidenceLink and portfolio successfully!')
    } catch (error) {
      console.error('Error updating evidenceLink and portfolio:', error)
    }
  }

  // Set the upload function in the parent context
  useEffect(() => {
    setUploadImageFn(handleUpload)
  }, [setUploadImageFn])

  // Update form values with the current state of files
  useEffect(() => {
    if (files.length > 0) {
      // Set the first file as evidenceLink
      const featuredFile = files[0]
      setValue('evidenceLink', featuredFile.url)

      // Set the remaining files in the portfolio
      const portfolioFiles = files.slice(1).map(file => ({
        name: file.name,
        url: file.url
      }))
      setValue('portfolio', portfolioFiles)

      logFormValues(featuredFile.url, portfolioFiles)
    }
  }, [files, setValue])

  // useEffect(() => {
  //   const evidenceLink = watch('evidenceLink')
  //   const portfolio = watch('portfolio')

  //   console.log('Evidence Link:', evidenceLink)
  //   console.log('Portfolio:', portfolio)
  // }, [watch])

  // Handle deletion
  const handleDelete = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id)
    if (updatedFiles.length > 0) updatedFiles[0].isFeatured = true // Set the first file as featured
    setFiles(updatedFiles)
    logFiles(updatedFiles)
  }

  // Handle file name change
  const handleNameChange = (id: string, newName: string) => {
    const updatedFiles = files.map(file =>
      file.id === id ? { ...file, name: newName } : file
    )
    setFiles(updatedFiles)
    logFiles(updatedFiles)
  }

  // Log current state of files
  const logFiles = (updatedFiles: FileItem[]) => {
    console.log('Updated Files:', updatedFiles)
  }

  // Log form values
  const logFormValues = (
    evidenceLink: string,
    portfolioFiles: { name: string; url: string }[]
  ) => {
    console.log('Evidence Link:', evidenceLink)
    console.log('Portfolio Files:', portfolioFiles)
  }

  return (
    <Box>
      {/* Upload Box */}
      <UploadBox
        onClick={handleFileUploadClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Typography variant='h6'>
          Drop your files here or <span style={{ color: '#2563EB' }}>browse</span>
        </Typography>
        <Typography variant='caption' color='textSecondary'>
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

      {/* File List Display */}
      <FileListDisplay
        files={files}
        onDelete={handleDelete}
        onNameChange={handleNameChange}
      />
    </Box>
  )
}
