'use client'

import React, { useState, useEffect } from 'react'
import { Box, styled, Card, CardContent, IconButton } from '@mui/material'
import Image from 'next/image'
import { FileItem } from '../credentialForm/form/types/Types'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

interface FileListProps {
  files: FileItem[]
  onDelete: (event: React.MouseEvent, id: string) => void
  onNameChange: (id: string, newName: string) => void //NOSONAR
  onSetAsFeatured: (id: string) => void //NOSONAR
  onReorder: (files: FileItem[]) => void
}

const FileListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  paddingBottom: '20px',
  marginTop: '1rem',
  width: '100%'
})

const isImage = (fileName: string) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName)
const isPDF = (fileName: string) => fileName.toLowerCase().endsWith('.pdf')

const renderPDFThumbnail = async (file: FileItem) => {
  try {
    const loadingTask = getDocument(file.url)
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 0.1 })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      canvas.height = viewport.height
      canvas.width = viewport.width
      await page.render({ canvasContext: context, viewport }).promise
      return canvas.toDataURL()
    }
  } catch (error) {
    console.error('Error rendering PDF thumbnail:', error)
  }
  return '/fallback-pdf-thumbnail.png'
}

const FileListDisplay = ({ files, onDelete, onReorder }: FileListProps) => {
  const [pdfThumbnails, setPdfThumbnails] = useState<Record<string, string>>({})

  useEffect(() => {
    files.forEach(async file => {
      if (isPDF(file.name) && !pdfThumbnails[file.id]) {
        const thumbnail = await renderPDFThumbnail(file)
        setPdfThumbnails(prev => ({ ...prev, [file.id]: thumbnail }))
      }
    })
  }, [files, pdfThumbnails])

  const handleMoveItem = (
    event: React.MouseEvent,
    index: number,
    direction: 'up' | 'down'
  ) => {
    event.stopPropagation()
    const newFiles = [...files]
    const newIndex = direction === 'up' ? index - 1 : index + 1

    if (newIndex >= 0 && newIndex < files.length) {
      // Swap items
      ;[newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]]
      onReorder(newFiles)
    }
  }

  return (
    <FileListContainer>
      {files.map((file, index) => {
        let content
        if (isImage(file.name)) {
          content = (
            <Image
              src={file.url}
              alt={file.name.split('.')[0]}
              width={80}
              height={80}
              style={{ borderRadius: '8px' }}
            />
          )
        } else if (isPDF(file.name)) {
          content = (
            <Image
              src={pdfThumbnails[file.id] ?? '/fallback-pdf-thumbnail.png'}
              alt={file.name.split('.')[0]}
              width={80}
              height={80}
              style={{ borderRadius: '8px' }}
            />
          )
        } else {
          content = (
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
          )
        }

        return (
          <Box sx={{ width: '100%' }} key={file.id}>
            <Card
              sx={{
                width: '100%',
                bgcolor: 'white',
                borderRadius: 2
              }}
            >
              <CardContent sx={{ p: 4, width: '100%' }}>
                <Box
                  sx={{
                    marginRight: '10px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {content}
                </Box>
              </CardContent>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                  bgcolor: '#242c41',
                  p: 2,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8
                }}
                onClick={e => e.stopPropagation()}
              >
                <IconButton
                  sx={{ color: 'white', '&:hover': { bgcolor: 'slate.800' } }}
                  onClick={e => onDelete(e, file.googleId ?? file.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  sx={{ color: 'white', '&:hover': { bgcolor: 'slate.800' } }}
                  onClick={e => handleMoveItem(e, index, 'up')}
                  disabled={index === 0}
                >
                  <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton
                  sx={{ color: 'white', '&:hover': { bgcolor: 'slate.800' } }}
                  onClick={e => handleMoveItem(e, index, 'down')}
                  disabled={index === files.length - 1}
                >
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Box>
            </Card>
          </Box>
        )
      })}
    </FileListContainer>
  )
}

export default FileListDisplay
