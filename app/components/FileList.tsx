'use client'

import React from 'react'
import { Box, Typography, TextField, styled } from '@mui/material'
import Image from 'next/image'
import { FileItem } from '../credentialForm/form/types/Types'

interface FileListProps {
  files: FileItem[]
  onDelete: (id: string) => void
  onNameChange: (id: string, newName: string) => void
  onSetAsFeatured: (id: string) => void
}

const FileListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  paddingBottom: '20px',
  marginTop: '1rem'
})

const FileItemBox = styled(Box)<{ isFeatured: boolean }>(({ isFeatured, theme }) => ({
  display: 'flex',
  alignItems: 'end',
  padding: '10px',
  border: `1px solid ${isFeatured ? theme.palette.primary.main : '#ccc'}`,
  borderRadius: '8px',
  position: 'relative'
}))

const FeaturedLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '5px',
  left: '10px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '12px'
}))

const SetAsFeaturedLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '5px',
  left: '10px',
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  border: `1px solid ${theme.palette.primary.main}`,
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  backgroundColor: '#77777793',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  }
}))

// Helper function to check if a file is an image
const isImage = (fileName: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName)
}

export default function FileListDisplay({
  files,
  onDelete,
  onNameChange,
  onSetAsFeatured
}: FileListProps) {
  return (
    <FileListContainer>
      {files.map(file => (
        <FileItemBox key={file.googleId || file.id} isFeatured={file.isFeatured}>
          {file.isFeatured ? (
            <FeaturedLabel>Featured</FeaturedLabel>
          ) : (
            <SetAsFeaturedLabel onClick={() => onSetAsFeatured(file.id)}>
              Featured
            </SetAsFeaturedLabel>
          )}

          <Box sx={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
            {isImage(file.name) ? (
              <Image
                src={file.url}
                alt={file.name.split('.')[0]}
                width={80}
                height={80}
                style={{ borderRadius: '8px' }}
              />
            ) : file.name.toLowerCase().endsWith('.pdf') ? (
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f3f3f3',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  color: '#666'
                }}
              >
                PDF
              </Box>
            ) : file.name.toLowerCase().endsWith('.doc') ||
              file.name.toLowerCase().endsWith('.docx') ? (
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f3f3f3',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  color: '#666'
                }}
              >
                DOC
              </Box>
            ) : (
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f3f3f3',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  color: '#666'
                }}
              >
                FILE
              </Box>
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant='caption' color='textSecondary'>
              File name (publicly visible)
            </Typography>
            <TextField
              variant='outlined'
              size='small'
              value={file.name.split('.')[0]}
              onChange={e => onNameChange(file.id, e.target.value)}
              sx={{ marginTop: '5px', width: '100%' }}
            />
          </Box>

          <Box sx={{ marginLeft: 'auto' }}>
            <Typography
              sx={{
                cursor: 'pointer',
                textAlign: 'end',
                fontSize: '0.8rem',
                ml: 2
              }}
              onClick={() => onDelete(file.googleId || file.id)}
            >
              Delete
            </Typography>
          </Box>
        </FileItemBox>
      ))}
    </FileListContainer>
  )
}
