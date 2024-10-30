'use client'

import React from 'react'
import { Box, Typography, TextField, Button, styled } from '@mui/material'
import Image from 'next/image'
import { join } from 'path'

// Types for file handling
interface FileItem {
  id: string
  name: string
  url: string
  isFeatured: boolean
}

interface FileListProps {
  files: FileItem[]
  onDelete: (id: string) => void
  onNameChange: (id: string, newName: string) => void
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

export default function FileListDisplay({
  files,
  onDelete,
  onNameChange
}: FileListProps) {
  return (
    <FileListContainer>
      {files.map((file, index) => (
        <>
          <FileItemBox key={file.id} isFeatured={file.isFeatured}>
            {file.isFeatured && <FeaturedLabel>Featured</FeaturedLabel>}

            {/* Image Thumbnail */}
            <Box sx={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
              <Image
                src={file.url}
                alt={file.name.split('.')[0]}
                width={80}
                height={80}
                style={{ borderRadius: '8px' }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              {/* File Name (Publicly Visible) */}
              <Typography variant='caption' color='textSecondary'>
                File name (publicly visible)
              </Typography>

              {/* Editable File Name */}
              <TextField
                variant='outlined'
                size='small'
                value={file.name.split('.')[0]}
                onChange={e => onNameChange(file.id, e.target.value)}
                sx={{ marginTop: '5px', width: '100%' }}
              />
            </Box>
            {/* Delete Button */}
            <Box sx={{ ml: 1 }}>
              <Typography
                sx={{ cursor: 'pointer', textAlign: 'end', fontSize: '0.8rem' }}
                onClick={() => onDelete(file.id)}
              >
                Delete
              </Typography>
            </Box>
          </FileItemBox>
        </>
      ))}
    </FileListContainer>
  )
}
