'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import {
  Box,
  Typography,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FileListDisplay from '../../../components/FileList'
import { GoogleDriveStorage, uploadImageToGoogleDrive } from '@cooperation/vc-storage'
import useGoogleDrive from '../../../hooks/useGoogleDrive'
import { useStepContext } from '../StepContext'
import LoadingOverlay from '../../../components/Loading/LoadingOverlay'
import { TasksVector } from '../../../Assets/SVGs'
import { StepTrackShape } from '../fromTexts & stepTrack/StepTrackShape'
import TipIcon from '../../../Assets/Images/Light Bulb.png'
import Image from 'next/image'
import { FileItem } from '../types/Types'

interface FileUploadAndListProps {
  setValue: (field: string, value: any, options?: any) => void
  selectedFiles: FileItem[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  watch: any
}

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
  const latestFileNamesRef = useRef(selectedFiles)

  useEffect(() => {
    setFiles(selectedFiles)
  }, [selectedFiles])

  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files
    if (newFiles) {
      const filesArray = Array.from(newFiles)

      // Check if any file is already featured
      const isAnyFileFeatured = files.some(file => file.isFeatured)
      let hasSetFeatured = isAnyFileFeatured // Track if we've already set a featured file

      filesArray.forEach((file, index) => {
        const reader = new FileReader()
        reader.onload = e => {
          const newFileItem: FileItem = {
            id: crypto.randomUUID(), // Generate a unique ID
            file: file,
            name: file.name,
            url: e.target?.result as string,
            isFeatured: !hasSetFeatured && index === 0, // Set the first file in the batch as featured if none are featured
            uploaded: false,
            fileExtension: file.name.split('.').pop() ?? ''
          }

          // Update the state with the new file, ensuring no duplicates by name
          setFiles(prevFiles => {
            const filesWithoutDuplicate = prevFiles.filter(f => f.name !== file.name)
            return newFileItem.isFeatured
              ? [newFileItem, ...filesWithoutDuplicate] // Place featured file at the top
              : [...filesWithoutDuplicate, newFileItem]
          })

          setSelectedFiles(prevFiles => {
            const filesWithoutDuplicate = prevFiles.filter(f => f.name !== file.name)
            return newFileItem.isFeatured
              ? [newFileItem, ...filesWithoutDuplicate] // Place featured file at the top
              : [...filesWithoutDuplicate, newFileItem]
          })

          // Once a file is set as featured, mark `hasSetFeatured` as true to prevent others from being featured
          if (newFileItem.isFeatured) hasSetFeatured = true
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const addFile = (file: File) => {
    if (files.length >= 10) {
      alert('You can only upload a maximum of 10 files.')
      return
    }

    const reader = new FileReader()
    reader.onload = e => {
      const isFirstFileFeatured = files.every(f => !f.isFeatured) // Only set as featured if no file is currently featured

      const newFileItem: FileItem = {
        id: crypto.randomUUID(), // Generate a unique ID
        file: file,
        name: file.name,
        url: e.target?.result as string,
        isFeatured: isFirstFileFeatured, // Set as featured only if no file is featured
        uploaded: false,
        fileExtension: file.name.split('.').pop() ?? ''
      }

      setFiles(prevFiles => {
        const filesWithoutDuplicate = prevFiles.filter(f => f.name !== file.name) // Remove duplicates
        return newFileItem.isFeatured
          ? [newFileItem, ...filesWithoutDuplicate] // Place featured item at the top
          : [...filesWithoutDuplicate, newFileItem]
      })

      setSelectedFiles(prevFiles => {
        const filesWithoutDuplicate = prevFiles.filter(f => f.name !== file.name) // Remove duplicates
        return newFileItem.isFeatured
          ? [newFileItem, ...filesWithoutDuplicate] // Place featured item at the top
          : [...filesWithoutDuplicate, newFileItem]
      })
    }
    reader.readAsDataURL(file)
  }

  const setAsFeatured = (id: string) => {
    setFiles(prevFiles => {
      return prevFiles
        .map(file => ({ ...file, isFeatured: file.id === id }))
        .sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1)) // Featured file at the top
    })

    setSelectedFiles(prevFiles => {
      return prevFiles
        .map(file => ({ ...file, isFeatured: file.id === id }))
        .sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1)) // Featured file at the top
    })
  }

  const handleUpload = useCallback(async () => {
    try {
      if (selectedFiles.length === 0) return
      const filesToUpload = selectedFiles.filter(
        fileItem => !fileItem.uploaded && fileItem.file && fileItem.name
      )
      if (filesToUpload.length === 0) return

      // Upload files to Google Drive
      const uploadedFiles = await Promise.all(
        filesToUpload.map(async (fileItem, index) => {
          const newFile = new File([fileItem.file], fileItem.name, {
            type: fileItem.file.type
          })

          const uploadedFile = await uploadImageToGoogleDrive(
            storage as GoogleDriveStorage,
            newFile
          )
          return {
            ...fileItem,
            googleId: (uploadedFile as { id: string }).id,
            uploaded: true,
            isFeatured: index === 0 && !watch('evidenceLink')
          }
        })
      )

      const featuredFile = uploadedFiles.find(file => file.isFeatured)
      const nonFeaturedFiles = uploadedFiles.filter(file => !file.isFeatured)

      if (featuredFile) {
        setValue(
          'evidenceLink',
          `https://drive.google.com/uc?export=view&id=${featuredFile.googleId}`
        )
      }

      const currentPortfolio = Array.isArray(watch('portfolio')) ? watch('portfolio') : []
      const newPortfolioEntries = nonFeaturedFiles.map(file => ({
        name: file.name,
        url: `https://drive.google.com/uc?export=view&id=${file.googleId}`,
        googleId: file.googleId
      }))

      setValue('portfolio', [...currentPortfolio, ...newPortfolioEntries])

      // Update selectedFiles with uploaded googleIds
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
    latestFileNamesRef.current = updatedFiles // Sync ref with the latest name change
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
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        gap: '24px'
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
        Do you have any supporting evidence that you&apos;d like to add?
      </Typography>

      <StepTrackShape />
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          p: 3,
          border: '1px solid #E2E8F0'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: '18px',
            fontWeight: 600,
            color: '#334155',
            mb: 2
          }}
        >
          How to Add Your Evidence
        </Typography>

        <Accordion
          defaultExpanded
          sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
            <Typography sx={{ color: '#2563EB', fontWeight: 500 }}>
              View detailed instructions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component='ol'
              sx={{
                ml: 2,
                '& li': {
                  mb: 1.5,
                  color: '#334155',
                  fontSize: '14px',
                  lineHeight: 1.5
                }
              }}
            >
              <li>
                <strong>Select Your Files:</strong> Click the upload area below to choose
                up to 10 files that demonstrate your skill or achievement.
              </li>
              <li>
                <strong>Featured Evidence:</strong> The first file you upload will
                automatically become your featured evidence. This will be the primary
                image displayed on your credential.
              </li>
              <li>
                <strong>Manage Featured Evidence:</strong> You can change your featured
                evidence at any time by clicking the star icon next to any file in your
                list.
              </li>
              <li>
                <strong>Supported Files:</strong> You can upload images, documents, or
                other files that showcase your work and achievements.
              </li>
              <li>
                <strong>File Names:</strong> You can edit file names after upload to
                better describe your evidence.
              </li>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#D1E4FF',
          p: '1rem',
          borderRadius: '12px',
          gap: '1rem'
        }}
      >
        <Image src={TipIcon} alt='Tip Icon' width={100} height={100} />
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: '16px',
            color: '#334155'
          }}
        >
          The strength of your credential is significantly enhanced when you provide
          supporting evidence. Your featured evidence will be prominently displayed.
        </Typography>
      </Box>

      <UploadBox
        onClick={handleFileUploadClick}
        sx={{
          position: 'relative',
          '&::after': {
            content:
              '"Featured evidence will be automatically selected from your first upload"',
            position: 'absolute',
            bottom: '-28px',
            fontSize: '14px',
            color: '#666',
            width: '100%',
            textAlign: 'center'
          }
        }}
      >
        <Typography
          variant='h6'
          sx={{
            textAlign: 'center',
            fontWeight: 500,
            color: '#334155'
          }}
        >
          Select multiple files (up to 10) <br />
          <span style={{ color: '#2563EB', textDecoration: 'underline' }}>browse</span>
        </Typography>
      </UploadBox>

      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept='*'
        multiple
      />

      <FileListDisplay
        files={selectedFiles}
        onDelete={handleDelete}
        onNameChange={handleNameChange}
        onSetAsFeatured={setAsFeatured}
      />

      <LoadingOverlay text='Uploading files...' open={loading} />
    </Box>
  )
}

const UploadBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 20px',
  border: '2px dashed #ccc',
  borderRadius: '12px',
  cursor: 'pointer',
  width: '100%',
  backgroundColor: '#F8FAFC',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#2563EB',
    backgroundColor: '#F1F5F9'
  }
})
