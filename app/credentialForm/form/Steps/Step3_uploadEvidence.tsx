'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Box, Typography, styled, Card } from '@mui/material'
import FileListDisplay from '../../../components/FileList'
import { GoogleDriveStorage, uploadImageToGoogleDrive } from '@cooperation/vc-storage'
import useGoogleDrive from '../../../hooks/useGoogleDrive'
import { useStepContext } from '../StepContext'
import LoadingOverlay from '../../../components/Loading/LoadingOverlay'
import { TasksVector, SVGUplaodLink, SVGUploadMedia } from '../../../Assets/SVGs'
import { StepTrackShape } from '../fromTexts & stepTrack/StepTrackShape'
import { FileItem } from '../types/Types'
import LinkAdder from '../../../components/LinkAdder'

interface LinkItem {
  id: string
  name: string
  url: string
}

interface PortfolioItem {
  name: string
  url: string
  googleId?: string
}

interface FileUploadAndListProps {
  setValue: (field: string, value: any, options?: any) => void
  selectedFiles: readonly FileItem[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  watch: <T>(name: string) => T
}

const FileUploadAndList: React.FC<FileUploadAndListProps> = ({
  setValue,
  selectedFiles,
  setSelectedFiles,
  watch
}) => {
  const { loading, setUploadImageFn } = useStepContext()
  const { storage } = useGoogleDrive()
  const [showLinkAdder, setShowLinkAdder] = useState(false)
  const [files, setFiles] = useState<FileItem[]>([...selectedFiles])
  const [links, setLinks] = useState<LinkItem[]>([
    { id: crypto.randomUUID(), name: '', url: '' }
  ])

  const maxFiles = 10
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function attachGoogleIdIfMatched(file: FileItem, uploadedList: FileItem[]): FileItem {
    const match = uploadedList.find(f => f.name === file.name)
    return match ? { ...file, googleId: match.googleId, uploaded: true } : file
  }

  async function uploadSingleFile(
    fileItem: FileItem,
    index: number,
    hasEvidenceLink: boolean,
    drive: GoogleDriveStorage
  ) {
    const newFile = new File([fileItem.file as Blob], fileItem.name, {
      type: fileItem.file?.type
    })
    const uploaded = await uploadImageToGoogleDrive(drive, newFile)
    const fileId = (uploaded as { id: string }).id
    return {
      ...fileItem,
      googleId: fileId,
      uploaded: true,
      isFeatured: index === 0 && !hasEvidenceLink
    }
  }

  useEffect(() => {
    setFiles([...selectedFiles])
  }, [selectedFiles])
  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return

    const filesToUpload = selectedFiles.filter(
      fileItem => !fileItem.uploaded && fileItem.file && fileItem.name
    )
    if (filesToUpload.length === 0) return

    try {
      const hasEvidenceLink = !!watch<string>('evidenceLink')
      const uploadedFiles = await Promise.all(
        filesToUpload.map((fileItem, i) =>
          uploadSingleFile(fileItem, i, hasEvidenceLink, storage as GoogleDriveStorage)
        )
      )
      const featuredFile = uploadedFiles.find(file => file.isFeatured)
      if (featuredFile?.googleId) {
        setValue(
          'evidenceLink',
          `https://drive.google.com/uc?export=view&id=${featuredFile.googleId}`
        )
      }

      const currentPortfolio = watch<PortfolioItem[]>('portfolio') || []
      const newEntries = uploadedFiles.map(file => ({
        name: file.name,
        url: `https://drive.google.com/uc?export=view&id=${file.googleId}`,
        googleId: file.googleId
      }))

      setValue('portfolio', [...currentPortfolio, ...newEntries])
      setSelectedFiles(prev =>
        prev.map(file => attachGoogleIdIfMatched(file, uploadedFiles))
      )
    } catch (error) {
      console.error('Error uploading files:', error)
    }
  }, [selectedFiles, watch, setValue, setSelectedFiles, storage])

  useEffect(() => {
    // @ts-ignore-next-line
    setUploadImageFn(() => handleUpload)
  }, [handleUpload, setUploadImageFn])

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFilesSelected = useCallback(
    (newFiles: FileItem[]) => {
      setFiles(newFiles)
      setSelectedFiles(newFiles)
    },
    [setSelectedFiles]
  )

  const handleReorder = useCallback(
    (reorderedFiles: FileItem[]) => {
      setFiles(reorderedFiles)
      setSelectedFiles(reorderedFiles)

      const validFiles = reorderedFiles.filter(file => file.googleId)
      const newPortfolio = validFiles.map(file => ({
        name: file.name,
        url: `https://drive.google.com/uc?export=view&id=${file.googleId}`,
        googleId: file.googleId
      }))

      if (reorderedFiles[0]?.googleId) {
        setValue(
          'evidenceLink',
          `https://drive.google.com/uc?export=view&id=${reorderedFiles[0].googleId}`
        )
      }

      setValue('portfolio', newPortfolio)
    },
    [setValue, setSelectedFiles]
  )

  const handleAddLink = useCallback(() => {
    setLinks(prev => [...prev, { id: crypto.randomUUID(), name: '', url: '' }])
  }, [])

  const handleRemoveLink = useCallback(
    (index: number) => {
      setLinks(prev => prev.filter((_, i) => i !== index))
      const currentPortfolio = watch<PortfolioItem[]>('portfolio') || []
      setValue(
        'portfolio',
        currentPortfolio.filter((_, i) => i !== index)
      )
    },
    [setValue, watch]
  )

  const handleLinkChange = useCallback(
    (index: number, field: 'name' | 'url', value: string) => {
      setLinks(prev =>
        prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
      )
      const currentPortfolio = [...(watch<PortfolioItem[]>('portfolio') || [])]
      currentPortfolio[index] = { ...currentPortfolio[index], [field]: value }
      setValue('portfolio', currentPortfolio)
    },
    [setValue, watch]
  )

  const handleNameChange = useCallback(
    (id: string, newName: string) => {
      const updateFiles = (prevFiles: FileItem[]) =>
        prevFiles.map(file => (file.id === id ? { ...file, name: newName } : file))
      setFiles(updateFiles)
      setSelectedFiles(updateFiles)
    },
    [setSelectedFiles]
  )

  const setAsFeatured = useCallback(
    (id: string) => {
      const updateFiles = (prevFiles: FileItem[]) =>
        prevFiles
          .map(file => ({ ...file, isFeatured: file.id === id }))
          .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
      setFiles(updateFiles)
      setSelectedFiles(updateFiles)
    },
    [setSelectedFiles]
  )

  const handleDelete = useCallback(
    (event: React.MouseEvent, id: string) => {
      event.stopPropagation()
      let isFeaturedDeleted = false

      setFiles(prev => {
        if (!prev.length) return prev
        const updated = prev.filter(f => f.googleId !== id && f.id !== id)
        isFeaturedDeleted = prev[0]?.googleId === id || prev[0]?.id === id
        if (isFeaturedDeleted && updated.length > 0) {
          updated[0].isFeatured = true
        }
        return updated
      })

      setSelectedFiles(prev => prev.filter(f => f.googleId !== id && f.id !== id))

      let updatedPortfolio = (watch<PortfolioItem[]>('portfolio') || []).filter(
        file => file.googleId !== id
      )
      const newFeatured = files[1]
      const shouldUpdateFeatured = isFeaturedDeleted && newFeatured?.googleId
      if (shouldUpdateFeatured) {
        setValue(
          'evidenceLink',
          `https://drive.google.com/uc?export=view&id=${newFeatured.googleId}`
        )
        updatedPortfolio = updatedPortfolio.filter(
          f => f.googleId !== newFeatured.googleId
        )
      }
      setValue('portfolio', updatedPortfolio)
    },
    [files, setSelectedFiles, setValue, watch]
  )

  const processSingleFile = useCallback(
    (file: File, hasSetFeatured: boolean): Promise<FileItem> =>
      new Promise(res => {
        const reader = new FileReader()
        reader.onload = e => {
          const isFeatured = !hasSetFeatured && !files.length
          const newFileItem: FileItem = {
            id: crypto.randomUUID(),
            file,
            name: file.name,
            url: (e.target?.result as string) || '',
            isFeatured,
            uploaded: false,
            fileExtension: file.name.split('.').pop() ?? ''
          }
          res(newFileItem)
        }
        reader.readAsDataURL(file)
      }),
    [files]
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files
    if (!newFiles) return

    if (files.length + newFiles.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`)
      return
    }

    const fileArr = Array.from(newFiles)
    const anyFeatured = files.some(f => f.isFeatured)
    let hasSetFeatured = anyFeatured

    Promise.all(fileArr.map(f => processSingleFile(f, hasSetFeatured))).then(newItems => {
      const updated = [...files]
      for (const item of newItems) {
        if (item.isFeatured) {
          hasSetFeatured = true
          updated.unshift(item)
        } else {
          const duplicateIndex = updated.findIndex(u => u.name === item.name)
          if (duplicateIndex !== -1) {
            updated[duplicateIndex] = item
          } else {
            updated.push(item)
          }
        }
      }
      handleFilesSelected(updated)
    })
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
      <Typography sx={{ fontFamily: 'Lato', fontSize: '24px', fontWeight: 400 }}>
        Step 3
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: 400,
          maxWidth: '360px',
          textAlign: 'center'
        }}
      >
        Do you have any supporting documentation or links that you would like to add?
      </Typography>
      <StepTrackShape />
      <Box
        display='flex'
        flexDirection='column'
        bgcolor='#FFFFFF'
        gap={3}
        borderRadius={2}
        width='100%'
      >
        <CardStyle variant='outlined' onClick={() => setShowLinkAdder(true)}>
          {showLinkAdder && (
            <Box mb={3} width='100%'>
              <LinkAdder
                fields={links}
                onAdd={handleAddLink}
                onRemove={handleRemoveLink}
                onNameChange={(i, val) => handleLinkChange(i, 'name', val)}
                onUrlChange={(i, val) => handleLinkChange(i, 'url', val)}
                maxLinks={5}
                nameLabel='Name'
                urlLabel='URL'
                namePlaceholder='(e.g., LinkedIn profile, github repo, etc.)'
                urlPlaceholder='https://'
              />
            </Box>
          )}
          <SVGUplaodLink />
          <Typography variant='body1' color='primary' align='center'>
            + Add links
            <br />
            (social media, articles, your website, etc.)
          </Typography>
        </CardStyle>

        <Box width='100%'>
          <CardStyle variant='outlined' onClick={handleFileUploadClick}>
            <FileListDisplay
              files={[...selectedFiles]}
              onDelete={handleDelete}
              onNameChange={handleNameChange}
              onSetAsFeatured={setAsFeatured}
              onReorder={handleReorder}
            />
            <SVGUploadMedia />
            <Typography variant='body1' color='primary' align='center'>
              + Add media
              <br />
              (images, documents, video)
            </Typography>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept='*'
              multiple
            />
          </CardStyle>
        </Box>
      </Box>
      <LoadingOverlay text='Uploading files...' open={loading} />
    </Box>
  )
}

const CardStyle = styled(Card)({
  padding: '40px 20px',
  cursor: 'pointer',
  width: '100%',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  p: 4,
  borderRadius: 2,
  gap: 2,
  border: '2px dashed #ccc',
  '&:hover': {
    borderColor: '#2563EB'
  }
})

export default FileUploadAndList
