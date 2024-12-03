import React, { useRef } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { FileItem } from '../credentialForm/form/types/Types'

interface FileUploaderProps {
  onFilesSelected: (files: FileItem[]) => void
  maxFiles?: number
  currentFiles: FileItem[]
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  maxFiles = 10,
  currentFiles
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files
    if (newFiles) {
      if (currentFiles.length + newFiles.length > maxFiles) {
        alert(`You can only upload a maximum of ${maxFiles} files.`)
        return
      }

      const filesArray = Array.from(newFiles)
      const isAnyFileFeatured = currentFiles.some(file => file.isFeatured)
      let hasSetFeatured = isAnyFileFeatured

      const processFile = (file: File) => {
        return new Promise<FileItem>(resolve => {
          const reader = new FileReader()
          reader.onload = e => {
            const newFileItem: FileItem = {
              id: crypto.randomUUID(),
              file: file,
              name: file.name,
              url: e.target?.result as string,
              isFeatured: !hasSetFeatured && currentFiles.length === 0,
              uploaded: false,
              fileExtension: file.name.split('.').pop() ?? ''
            }

            if (newFileItem.isFeatured) hasSetFeatured = true
            resolve(newFileItem)
          }
          reader.readAsDataURL(file)
        })
      }

      Promise.all(filesArray.map(processFile)).then(newFileItems => {
        const updatedFiles = [...currentFiles]
        newFileItems.forEach(newFile => {
          const duplicateIndex = updatedFiles.findIndex(f => f.name === newFile.name)
          if (duplicateIndex !== -1) {
            updatedFiles[duplicateIndex] = newFile
          } else {
            if (newFile.isFeatured) {
              updatedFiles.unshift(newFile)
            } else {
              updatedFiles.push(newFile)
            }
          }
        })
        onFilesSelected(updatedFiles)
      })
    }
  }

  return (
    <>
      <UploadBox onClick={handleFileUploadClick}>
        <Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 500 }}>
          Select multiple files up to {maxFiles} files <br />
          <span style={{ color: '#2563EB' }}>browse</span>
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
    </>
  )
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

export default FileUploader
