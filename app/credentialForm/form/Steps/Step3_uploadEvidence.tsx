'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Tabs, Tab, styled } from '@mui/material'
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
import FileUploader from '../../../components/FileUploader'
import LinkAdder from '../../../components/LinkAdder'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

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
  readonly setValue: (field: string, value: any, options?: any) => void
  readonly selectedFiles: readonly FileItem[]
  readonly setSelectedFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  readonly watch: <T>(name: string) => T
}

const StyledTipBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '24px',
  width: '100%',
  maxWidth: '800px',
  gap: '1rem',
  marginTop: theme.spacing(2),
  backgroundColor: '#D1E4FF',
  padding: '0.6rem 1rem',
  borderRadius: '1rem'
}))

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`evidence-tabpanel-${index}`}
    aria-labelledby={`evidence-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
)

const FileUploadAndList: React.FC<FileUploadAndListProps> = ({
  setValue,
  selectedFiles,
  setSelectedFiles,
  watch
}) => {
  const { loading, setUploadImageFn } = useStepContext()
  const { storage } = useGoogleDrive()
  const [tabValue, setTabValue] = useState(0)
  const [files, setFiles] = useState<FileItem[]>([...selectedFiles])
  const [links, setLinks] = useState<LinkItem[]>([
    { id: crypto.randomUUID(), name: '', url: '' }
  ])

  useEffect(() => {
    setFiles([...selectedFiles])
  }, [selectedFiles])

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }, [])

  const handleFilesSelected = useCallback(
    (newFiles: FileItem[]) => {
      setFiles(newFiles)
      setSelectedFiles(newFiles)
    },
    [setSelectedFiles]
  )

  const handleUpload = useCallback(async () => {
    try {
      if (selectedFiles.length === 0) return

      const filesToUpload = selectedFiles.filter(
        fileItem => !fileItem.uploaded && fileItem.file && fileItem.name
      )
      if (filesToUpload.length === 0) return

      const uploadedFiles = await Promise.all(
        filesToUpload.map(async (fileItem, index) => {
          const newFile = new File([fileItem.file], fileItem.name, {
            type: fileItem.file.type
          })

          const uploadedFile = await uploadImageToGoogleDrive(
            storage as GoogleDriveStorage,
            newFile
          )
          const fileId = (uploadedFile as { id: string }).id

          return {
            ...fileItem,
            googleId: fileId,
            uploaded: true,
            isFeatured: index === 0 && !watch<string>('evidenceLink')
          }
        })
      )

      const featuredFile = uploadedFiles.find(file => file.isFeatured)
      const nonFeaturedFiles = uploadedFiles.filter(file => !file.isFeatured)

      if (featuredFile?.googleId) {
        setValue(
          'evidenceLink',
          `https://drive.google.com/uc?export=view&id=${featuredFile.googleId}`
        )
      }

      const currentPortfolio = watch<PortfolioItem[]>('portfolio') || []
      const newPortfolioEntries: PortfolioItem[] = nonFeaturedFiles.map(file => ({
        name: file.name,
        url: `https://drive.google.com/uc?export=view&id=${file.googleId}`,
        googleId: file.googleId
      }))

      setValue('portfolio', [...currentPortfolio, ...newPortfolioEntries])

      setSelectedFiles(prevFiles =>
        prevFiles.map(file => {
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

      const currentPortfolio = watch<PortfolioItem[]>('portfolio') || []
      const updatedPortfolio = [...currentPortfolio]
      updatedPortfolio[index] = { ...updatedPortfolio[index], [field]: value }
      setValue('portfolio', updatedPortfolio)
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
          .sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1))

      setFiles(updateFiles)
      setSelectedFiles(updateFiles)
    },
    [setSelectedFiles]
  )

  const handleDelete = useCallback(
    (id: string) => {
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

      setSelectedFiles(prevFiles =>
        prevFiles.filter(file => file.googleId !== id && file.id !== id)
      )

      const currentPortfolio = watch<PortfolioItem[]>('portfolio') || []
      let updatedPortfolio = currentPortfolio.filter(file => file.googleId !== id)

      const newFeaturedFile = files[1]
      if (isFeaturedFileDeleted && newFeaturedFile?.googleId) {
        setValue(
          'evidenceLink',
          `https://drive.google.com/uc?export=view&id=${newFeaturedFile.googleId}`
        )
        updatedPortfolio = updatedPortfolio.filter(
          file => file.googleId !== newFeaturedFile.googleId
        )
      }
      setValue('portfolio', updatedPortfolio)
    },
    [setValue, watch, files, setSelectedFiles]
  )

  useEffect(() => {
    // @ts-ignore-next-line
    setUploadImageFn(() => handleUpload)
  }, [handleUpload, setUploadImageFn])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

      <StyledTipBox>
        <Image src={TipIcon} alt='Tip Icon' width={100} height={100} />
        <Typography
          sx={{ fontFamily: 'Lato', fontSize: '16px', fontWeight: 400, color: '#334155' }}
        >
          The strength of your credential is significantly enhanced when you provide
          supporting evidence.
        </Typography>
      </StyledTipBox>

      <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label='evidence upload method tabs'
          centered
        >
          <Tab label='Upload Files' id='evidence-tab-0' />
          <Tab label='Add Links' id='evidence-tab-1' />
        </Tabs>
      </Box>

      <Box sx={{ width: '100%' }}>
        <TabPanel value={tabValue} index={0}>
          <FileUploader
            onFilesSelected={handleFilesSelected}
            maxFiles={10}
            currentFiles={files}
          />

          <Typography
            mt={2}
            sx={{ textAlign: 'center', fontSize: '0.875rem', color: '#666' }}
          >
            The first image will always be the featured image.
          </Typography>

          <FileListDisplay
            files={[...selectedFiles]}
            onDelete={handleDelete}
            onNameChange={handleNameChange}
            onSetAsFeatured={setAsFeatured}
          />
        </TabPanel>
      </Box>

      <Box sx={{ width: '100%' }}>
        <TabPanel value={tabValue} index={1}>
          <LinkAdder
            fields={links}
            onAdd={handleAddLink}
            onRemove={handleRemoveLink}
            onNameChange={(index, value) => handleLinkChange(index, 'name', value)}
            onUrlChange={(index, value) => handleLinkChange(index, 'url', value)}
            maxLinks={5}
            nameLabel='Name'
            urlLabel='URL'
            namePlaceholder='(e.g., LinkedIn profile, github repo, etc.)'
            urlPlaceholder='https://'
          />
        </TabPanel>
      </Box>

      <LoadingOverlay text='Uploading files...' open={loading} />
    </Box>
  )
}

export default FileUploadAndList
