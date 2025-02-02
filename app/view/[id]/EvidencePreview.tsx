import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import { useSession } from 'next-auth/react'

// Set up PDF.js worker
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

interface EvidencePreviewProps {
  url: string
  width?: number
  height?: number
  isPreviewMode?: boolean
}

const isPDF = (url: string): boolean => {
  return url.toLowerCase().endsWith('.pdf')
}

const getGoogleDriveViewUrl = (url: string): string => {
  const fileId = RegExp(/[?&]id=([^&]+)/).exec(url)?.[1]
  if (!fileId) return url
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

const EvidencePreview: React.FC<EvidencePreviewProps> = ({
  url,
  width = 180,
  height = 150,
  isPreviewMode = false
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(url)
  const [loading, setLoading] = useState(true)
  const [shouldTryPDF, setShouldTryPDF] = useState(isPDF(url))
  const { data: session } = useSession()
  const accessToken = session?.accessToken

  useEffect(() => {
    const generatePDFThumbnail = async () => {
      if (!accessToken) return

      try {
        const fileId = RegExp(/[?&]id=([^&]+)/).exec(url)?.[1]
        if (!fileId) throw new Error('Invalid Google Drive URL')

        const proxyUrl = `/api/pdf-proxy?fileId=${fileId}&access_token=${accessToken}`

        const response = await fetch(proxyUrl)
        if (!response.ok) throw new Error('Failed to fetch PDF')

        const pdfData = await response.arrayBuffer()
        const loadingTask = getDocument({ data: pdfData })
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)

        const viewport = page.getViewport({ scale: 1.0 })
        const scale = Math.min(width / viewport.width, height / viewport.height)
        const scaledViewport = page.getViewport({ scale })

        const canvas = document.createElement('canvas')
        canvas.width = scaledViewport.width
        canvas.height = scaledViewport.height

        const context = canvas.getContext('2d')
        if (!context) throw new Error('Could not get canvas context')

        await page.render({
          canvasContext: context,
          viewport: scaledViewport
        }).promise

        setThumbnailUrl(canvas.toDataURL())
      } catch (error) {
        console.error('Error generating PDF thumbnail:', error)
        setThumbnailUrl('/fallback-pdf-thumbnail.png')
      } finally {
        setLoading(false)
      }
    }

    const handleFile = async () => {
      if (shouldTryPDF) {
        await generatePDFThumbnail()
        return
      }

      if (url.includes('drive.google.com')) {
        const viewUrl = getGoogleDriveViewUrl(url)
        setThumbnailUrl(viewUrl)
      }
      setLoading(false)
    }

    handleFile()
  }, [url, shouldTryPDF, accessToken, width, height])

  const handleImageError = () => {
    console.log('Image failed to load, trying as PDF')
    if (!shouldTryPDF) {
      setShouldTryPDF(true)
      setLoading(true)
    }
  }

  return (
    <Box
      sx={{
        width,
        height,
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden'
      }}
    >
      <Image
        src={thumbnailUrl}
        alt='Evidence Preview'
        width={isPreviewMode ? width : 500}
        height={isPreviewMode ? height : 300}
        style={{
          borderRadius: '10px',
          objectFit: 'cover'
        }}
        onError={handleImageError}
      />
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
          }}
        >
          Loading...
        </Box>
      )}
    </Box>
  )
}

export default EvidencePreview
