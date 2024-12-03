'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, FormLabel, Button, Tabs, Tab, styled } from '@mui/material'
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFieldArrayAppend,
  UseFormSetValue
} from 'react-hook-form'
import {
  skipButtonBoxStyles,
  skipButtonStyles
} from '../../../../components/Styles/appStyles'
import TextEditor from '../TextEditor/Texteditor'
import { FormData, FileItem } from '../../../../credentialForm/form/types/Types'
import LinkAdder from '../../../../components/LinkAdder'
import FileUploader from '../../../../components/FileUploader'
import FileListDisplay from '../../../../components/FileList'
import { uploadImageToGoogleDrive, GoogleDriveStorage } from '@cooperation/vc-storage'
import useGoogleDrive from '../../../../hooks/useGoogleDrive'
import { useStepContext } from '../../../../credentialForm/form/StepContext'
import LoadingOverlay from '../../../../components/Loading/LoadingOverlay'

interface PortfolioItem {
  name: string
  url: string
  googleId?: string
}
interface Portfolio {
  name: string
  url: string
  googleId?: string
}

interface LocalPortfolioItem extends Portfolio {
  id: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface FormFieldError {
  type: string
  message?: string
}

interface FormErrors {
  name?: FormFieldError
  url?: FormFieldError
  googleId?: FormFieldError
}

interface Step3Props {
  readonly errors: FieldErrors<FormData>
  readonly register: UseFormRegister<FormData>
  readonly append: UseFieldArrayAppend<FormData, 'portfolio'>
  readonly remove: (index: number) => void
  readonly watch: UseFormWatch<FormData>
  readonly setValue: UseFormSetValue<FormData>
  readonly handleNext: () => void
  readonly handleBack: () => void
  readonly fullName: string
  readonly fields: any
}

const StyledFormLabel = styled(FormLabel)({
  fontWeight: 'bold',
  marginBottom: '8px',
  display: 'block'
})

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

const Step3: React.FC<Step3Props> = ({
  append,
  errors,
  remove,
  watch,
  setValue,
  handleNext,
  fullName
}) => {
  const theme = useTheme()
  const displayName = fullName || ''
  const [tabValue, setTabValue] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([])
  const [files, setFiles] = useState<FileItem[]>([])
  const portfolioFromForm = watch('portfolio') as Portfolio[] | undefined
  const portfolioWatch = useMemo(() => portfolioFromForm || [], [portfolioFromForm])
  const { storage } = useGoogleDrive()
  const { loading, setUploadImageFn } = useStepContext()

  const [localPortfolio, setLocalPortfolio] = useState<LocalPortfolioItem[]>([
    { id: crypto.randomUUID(), name: '', url: '', googleId: undefined }
  ])

  const handleEditorChange = useCallback(
    (field: string) => (value: string) => {
      setValue(field, value)
    },
    [setValue]
  )

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }, [])
  const handleFilesSelected = useCallback(
    (newFiles: FileItem[]) => {
      setFiles(newFiles)
      setSelectedFiles(newFiles)

      const portfolioEntries: Portfolio[] = newFiles.map(file => ({
        name: file.name,
        url: file.url || '',
        googleId: file.googleId
      }))

      setValue('portfolio', portfolioEntries)
    },
    [setValue]
  )

  const handleNameChange = useCallback(
    (id: string, newName: string) => {
      const updateFiles = (prevFiles: FileItem[]): FileItem[] =>
        prevFiles.map(file => (file.id === id ? { ...file, name: newName } : file))

      setFiles(updateFiles)
      setSelectedFiles(updateFiles)
    },
    [setSelectedFiles]
  )

  const setAsFeatured = useCallback(
    (id: string) => {
      const updateFiles = (prevFiles: FileItem[]): FileItem[] => {
        const updatedFiles = prevFiles.map(file => ({
          ...file,
          isFeatured: file.id === id
        }))
        return updatedFiles.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
      }

      setFiles(updateFiles)
      setSelectedFiles(updateFiles)
    },
    [setSelectedFiles]
  )

  const handleDelete = useCallback(
    (id: string) => {
      let isFeaturedFileDeleted = false

      setFiles(prevFiles => {
        const updatedFiles = prevFiles.filter(file => {
          const shouldKeep = file.googleId !== id && file.id !== id
          if (!shouldKeep && file === prevFiles[0]) {
            isFeaturedFileDeleted = true
          }
          return shouldKeep
        })

        if (isFeaturedFileDeleted && updatedFiles.length > 0) {
          updatedFiles[0].isFeatured = true
        }
        return updatedFiles
      })

      setSelectedFiles(prevFiles =>
        prevFiles.filter(file => file.googleId !== id && file.id !== id)
      )

      const currentPortfolio = portfolioWatch
      let updatedPortfolio = currentPortfolio.filter(
        file => file.googleId && file.googleId !== id
      )

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
    [setValue, portfolioWatch, files]
  )
  const handleAddLink = useCallback(() => {
    const newId = crypto.randomUUID()
    const newLink: LocalPortfolioItem = {
      id: newId,
      name: '',
      url: '',
      googleId: undefined
    }
    setLocalPortfolio(prev => [...prev, newLink])
    append({ name: '', url: '' })
  }, [append])

  const handleLinkNameChange = useCallback(
    (index: number, value: string) => {
      setLocalPortfolio(prev => {
        const updated = [...prev]
        if (updated[index]) {
          updated[index] = { ...updated[index], name: value }
        }
        return updated
      })

      const updatedPortfolio = [...portfolioWatch]
      if (updatedPortfolio[index]) {
        updatedPortfolio[index] = { ...updatedPortfolio[index], name: value }
        setValue('portfolio', updatedPortfolio)
      }
    },
    [setValue, portfolioWatch]
  )

  const handleLinkUrlChange = useCallback(
    (index: number, value: string) => {
      setLocalPortfolio(prev => {
        const updated = [...prev]
        if (updated[index]) {
          updated[index] = { ...updated[index], url: value }
        }
        return updated
      })

      const updatedPortfolio = [...portfolioWatch]
      if (updatedPortfolio[index]) {
        updatedPortfolio[index] = { ...updatedPortfolio[index], url: value }
        setValue('portfolio', updatedPortfolio)
      }
    },
    [setValue, portfolioWatch]
  )
  const isFormError = (value: unknown): value is FormErrors => {
    if (typeof value !== 'object' || value === null) return false
    const error = value as Record<string, unknown>
    return (
      ('name' in error && (error.name === undefined || typeof error.name === 'object')) ||
      ('url' in error && (error.url === undefined || typeof error.url === 'object'))
    )
  }
  const linkErrors = useMemo(() => {
    if (!errors.portfolio) return undefined

    return Object.entries(errors.portfolio).reduce(
      (acc, [key, value]) => {
        const index = parseInt(key)
        if (!isNaN(index) && isFormError(value)) {
          acc[index] = {
            name: value.name?.message ? { message: value.name.message } : undefined,
            url: value.url?.message ? { message: value.url.message } : undefined
          }
        }
        return acc
      },
      {} as Record<number, { name?: { message?: string }; url?: { message?: string } }>
    )
  }, [errors.portfolio])

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
            isFeatured: index === 0 && !watch('evidenceLink')
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

      const currentPortfolio = watch('portfolio') || []
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

  useEffect(() => {
    // @ts-ignore-next-line
    setUploadImageFn(() => handleUpload)
  }, [handleUpload, setUploadImageFn])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Recommendation Text */}
      <Box>
        <StyledFormLabel id='recommendation-text-label'>
          Recommendation Text <span style={{ color: 'red' }}>*</span>
        </StyledFormLabel>
        <TextEditor
          value={watch('recommendationText') || ''}
          onChange={handleEditorChange('recommendationText')}
          placeholder={`e.g., ${displayName} managed a local garden for 2 years, organized weekly gardening workshops, led a community clean-up initiative.`}
        />
        {errors.recommendationText && (
          <Typography color='error'>{errors.recommendationText.message}</Typography>
        )}
      </Box>

      {/* Qualifications */}
      <Box>
        <StyledFormLabel id='qualifications-label'>Your Qualifications</StyledFormLabel>
        <Typography sx={{ marginBottom: '10px' }}>
          Please share how you are qualified to provide this recommendation. Sharing your
          qualifications will further increase the value of this recommendation.
        </Typography>
        <TextEditor
          value={watch('qualifications') || ''}
          onChange={handleEditorChange('qualifications')}
          placeholder={`e.g., I have over 10 years of experience in the field and have worked closely with ${displayName}.`}
        />
        {errors.qualifications && (
          <Typography color='error'>{errors.qualifications.message}</Typography>
        )}
      </Box>

      {/* Supporting Evidence */}
      <Box>
        <Typography sx={{ mb: '10px', fontWeight: 'medium' }}>
          Adding supporting evidence of your qualifications.
        </Typography>

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
            The first file will be set as the featured evidence.
          </Typography>

          <FileListDisplay
            files={selectedFiles}
            onDelete={handleDelete}
            onNameChange={handleNameChange}
            onSetAsFeatured={setAsFeatured}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <LinkAdder
            fields={localPortfolio}
            onAdd={handleAddLink}
            onRemove={remove}
            onNameChange={handleLinkNameChange}
            onUrlChange={handleLinkUrlChange}
            errors={linkErrors}
            maxLinks={5}
            nameLabel='Name'
            urlLabel='URL'
            namePlaceholder='(e.g., LinkedIn profile, GitHub repo, etc.)'
            urlPlaceholder='https://'
          />
        </TabPanel>
      </Box>

      <Box sx={skipButtonBoxStyles}>
        <Button type='button' onClick={handleNext} sx={skipButtonStyles(theme)}>
          Skip
        </Button>
      </Box>
      <LoadingOverlay text='Uploading files...' open={loading} />
    </Box>
  )
}

export default Step3
