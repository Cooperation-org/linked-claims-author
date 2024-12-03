'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab
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

export default FileUploadAndList
