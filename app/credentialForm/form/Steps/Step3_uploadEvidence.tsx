'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import FileListDisplay from '../../../components/FileList'
import { uploadImageToGoogleDrive } from '@cooperation/vc-storage'
import useGoogleDrive from '../../../hooks/useGoogleDrive'
import { useStepContext } from '../StepContext'
import LoadingOverlay from '../../../components/Loading/LoadingOverlay'

// Types for file handling
interface FileItem {
  id: string
  file: File // Preserve the full File object
  name: string
  url: string
  isFeatured: boolean
  uploaded: boolean // Property to track upload status
}

interface FileUploadAndListProps {
  setValue: (field: string, value: any, options?: any) => void
  selectedFiles: FileItem[] // Full `FileItem` objects passed from parent
  setSelectedFiles: (files: FileItem[]) => void // Update function for `selectedFiles`
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
  const formData = watch()

  // Initialize files directly from selectedFiles provided by the parent
  const [files, setFiles] = useState<FileItem[]>(selectedFiles)

  // Sync selectedFiles with component's local state files initially to ensure consistency
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
        uploaded: false // New files start with `uploaded` as false
      }

      setFiles(prevFiles => [...prevFiles, newFileItem])
      setSelectedFiles(prevFiles => [...prevFiles, newFileItem]) // Sync to parent
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = useCallback(async () => {
    try {
      if (selectedFiles.length === 0) return

      // Only upload files that are not yet marked as uploaded
      const filesToUpload = selectedFiles.filter(
        fileItem => !fileItem.uploaded && fileItem.file && fileItem.name
      )
      if (filesToUpload.length === 0) return // No new files to upload

      const uploadedFiles = await Promise.all(
        filesToUpload.map(async (fileItem, index) => {
          const uploadedFile = await uploadImageToGoogleDrive(storage, fileItem.file)
          return {
            ...fileItem,
            id: uploadedFile.id, // Use actual ID from uploaded file
            uploaded: true, // Mark as uploaded
            isFeatured: index === 0
          }
        })
      )

      const successfullyUploadedFiles = uploadedFiles.filter(file => file !== null)
      const featuredFile = successfullyUploadedFiles.find(file => file.isFeatured)
      const nonFeaturedFiles = successfullyUploadedFiles.filter(file => !file.isFeatured)

      // Update evidenceLink if a new featured file was uploaded
      if (featuredFile) {
        setValue(
          'evidenceLink',
          `https://drive.google.com/uc?export=view&id=${featuredFile.id}`
        )
      }

      // Get the current portfolio data using watch()
      const currentPortfolio = watch('portfolio') || []
      const newPortfolioEntries = nonFeaturedFiles.map(file => ({
        name: file.name,
        url: `https://drive.google.com/uc?export=view&id=${file.id}`
      }))

      // Update portfolio with existing and new entries
      setValue('portfolio', [...currentPortfolio, ...newPortfolioEntries])
      console.log(':  portfolio', [...currentPortfolio, ...newPortfolioEntries])

      // Update selectedFiles in parent to mark successfully uploaded files
      const updatedSelectedFiles = selectedFiles.map(file => {
        const uploadedFile = successfullyUploadedFiles.find(f => f.name === file.name)
        return uploadedFile ? { ...file, uploaded: true } : file
      })
      setSelectedFiles(updatedSelectedFiles)
    } catch (error) {
      console.error('Error uploading files:', error)
    }
  }, [selectedFiles, setValue, setSelectedFiles, storage, watch])

  // Set the upload function in the parent context
  useEffect(() => {
    setUploadImageFn(() => handleUpload)
  }, [handleUpload, setUploadImageFn])

  const handleNameChange = (id: string, newName: string) => {
    const updatedFiles = files.map(file =>
      file.id === id ? { ...file, name: newName } : file
    )
    setFiles(updatedFiles)
    setSelectedFiles(updatedFiles) // Sync with parent
  }

  const handleDelete = async (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id)
    if (updatedFiles.length > 0) updatedFiles[0].isFeatured = true
    setFiles(updatedFiles)
    setSelectedFiles(updatedFiles) // Sync with parent
  }

  return (
    <Box>
      <UploadBox onClick={handleFileUploadClick}>
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

      <Typography mt={1}>
        Drag images to reorder. The first image will always be the featured image.
      </Typography>

      <FileListDisplay
        files={files}
        onDelete={handleDelete}
        onNameChange={handleNameChange}
      />
      <LoadingOverlay text='Uploading files...' open={loading} />
    </Box>
  )
}