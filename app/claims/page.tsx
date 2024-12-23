'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  Typography,
  CircularProgress,
  Box,
  Button,
  MenuItem,
  Menu,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { BlueBadge, SVGCopy, SVGExport, SVGHeart, SVGLinkedIn } from '../Assets/SVGs'
import useGoogleDrive from '../hooks/useGoogleDrive'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useRouter } from 'next/navigation'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LoadingOverlay from '../components/Loading/LoadingOverlay'

// Define types
interface Claim {
  [x: string]: any
  id: string
  achievementName: string
}

interface ClaimDetail {
  '@context': string[]
  id: string
  type: string[]
  issuer: {
    id: string
    type: string[]
  }
  issuanceDate: string
  expirationDate: string
  credentialSubject: {
    type: string[]
    name: string
    achievement: any
    duration: string
    portfolio: any
  }
}

interface Comment {
  author: string
  howKnow: string
  recommendationText: string
  qualifications: string
  createdTime: string
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

let getTimeAgo = (isoDateString: string): string => {
  // Create a new Date object from the ISO string
  const date = new Date(isoDateString)

  // Handle invalid dates
  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return formatDate(date)
}

const getTimeDifference = (isoDateString: string): string => {
  const date = new Date(isoDateString)

  // Handle invalid dates
  if (isNaN(date.getTime())) {
    return '0 seconds'
  }

  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  // Calculate months more accurately considering different month lengths
  const months =
    (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth())

  // If more than one month
  if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'}`
  }

  // If more than 30 days but less than a month
  if (diffInDays >= 30) {
    return `${diffInDays} days`
  }

  // If more than 24 hours but less than 30 days
  if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`
  }

  // If more than 60 minutes but less than 24 hours
  if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'}`
  }

  // If more than 60 seconds but less than 60 minutes
  if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'}`
  }

  // If less than 60 seconds
  return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'}`
}

const ClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([])
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const accessToken = session?.accessToken as string
  const { storage } = useGoogleDrive()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [showOverlappingCards, setShowOverlappingCards] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, claim: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedClaim(claim)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedClaim(null)
  }

  const handleMakeCopy = () => {
    handleMenuClose()
  }

  const handleContinueEditing = () => {
    handleMenuClose()
  }

  const handleDelete = () => {
    setOpenConfirmDialog(true)
    handleMenuClose()
  }
  const handleCopyUrl = async (claimId: string) => {
    const url = `http://localhost:3000/view/${claimId}`

    navigator.clipboard.writeText(url)
  }

  const handleConfirmDelete = async () => {
    if (!selectedClaim || !storage) return

    try {
      setIsDeleting(true)
      setShowOverlappingCards(true)
      const fileId = selectedClaim[0].id
      const response = await storage.delete(fileId)

      if (response !== null) {
        setClaims(prevClaims => {
          const filteredClaims = prevClaims.filter(claim => claim[0].id !== fileId)
          return filteredClaims
        })
        console.log('Successfully deleted claim')

        setTimeout(() => {
          setShowOverlappingCards(false)
        }, 2000)
      } else {
        console.error('Failed to delete claim')
        setShowOverlappingCards(false)
      }
    } catch (error) {
      console.error('Error deleting claim:', error)
      setShowOverlappingCards(false)
    } finally {
      setIsDeleting(false)
      setOpenConfirmDialog(false)
    }
  }

  // Add a function to check if claim has valid data
  const isValidClaim = (claim: any) => {
    return (
      claim[0]?.data?.credentialSubject?.achievement[0]?.name &&
      claim[0]?.data?.credentialSubject?.name
    )
  }

  const getAllClaims = useCallback(async (): Promise<any> => {
    const claimsData = await storage?.getAllFilesByType('VCs')
    console.log('🚀 ~ getAllClaims ~ claimsData:', claimsData)
    if (!claimsData?.length) return []
    return claimsData
  }, [storage])

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true)

        const claimsData = await getAllClaims()
        console.log('🚀 ~ fetchClaims ~ claimsData:', claimsData)

        // Assuming claimsData is an array of objects or arrays, process the data
        const vcs = claimsData.map((file: { name: string }[]) =>
          file.filter((f: { name: string }) => f.name !== 'RELATIONS')
        )

        console.log('🚀 ~ vcs ~ vcs:', vcs)

        setClaims(vcs)
      } catch (error) {
        console.error('Error fetching claims:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClaims()
  }, [accessToken, storage, getAllClaims])

  return (
    <Box sx={{ p: '75px 100px 0 200px' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          mb: '30px',
          p: '10px'
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }} variant='h4'>
          My Skills
        </Typography>
        <Button
          onClick={() => router.push('/credentialForm')}
          variant='contained'
          sx={{
            backgroundColor: '#003FE0',
            textTransform: 'none',
            borderRadius: '100px'
          }}
        >
          Add a new skill
        </Button>
      </Box>

      <Box>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%'
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          claims.map(
            claim =>
              isValidClaim(claim) && (
                <Box sx={{ mb: '30px' }} key={claim[0].data.id}>
                  <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: '16px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ mb: '20px' }}>
                          <BlueBadge />
                        </Box>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              sx={{
                                color: 'blue.600',
                                fontWeight: 'bold',
                                fontSize: '26px'
                              }}
                            >
                              {claim[0]?.data?.credentialSubject?.achievement[0]?.name ??
                                ''}{' '}
                              -
                            </Typography>
                            <Typography
                              sx={{
                                color: 'gray.700',
                                fontWeight: 'bold',
                                fontSize: '26px'
                              }}
                            >
                              {getTimeAgo(claim[0]?.data?.issuanceDate)}
                            </Typography>
                          </Box>
                          <Typography sx={{ color: 'gray.600', fontSize: '16px' }}>
                            {claim[0]?.data?.credentialSubject?.name ?? ''} -{' '}
                            {getTimeDifference(claim[0]?.data?.issuanceDate)}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '50px',
                            border: '1px solid blue',
                            backgroundColor: '#f0f6ff',
                            p: '0 10px'
                          }}
                        >
                          <Button
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#f0f6ff',
                              fontSize: '12px',
                              color: '#003fe0',
                              fontWeight: 'medium',
                              '&:hover': { backgroundColor: 'gray.50' },
                              borderRight: '1px solid #003fe0'
                            }}
                            startIcon={<PeopleAltIcon />}
                          >
                            Share
                          </Button>

                          <Button
                            onClick={() => handleCopyUrl(claim[0].id)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#f0f6ff',
                              fontSize: '12px',
                              fontWeight: 'medium',
                              color: '#003fe0',
                              '&:hover': { backgroundColor: 'gray.50' }
                            }}
                            startIcon={<ContentCopyIcon href={''} />}
                          >
                            Copy URL
                          </Button>
                        </Box>
                        <Button onClick={event => handleMenuOpen(event, claim)}>
                          <MoreVertIcon />
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                          }}
                          sx={{
                            '& .MuiPaper-root': {
                              borderRadius: '8px',
                              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                              padding: '8px',
                              backgroundColor: 'white',
                              width: '360px'
                            }
                          }}
                        >
                          <MenuItem
                            onClick={handleMakeCopy}
                            sx={{
                              fontFamily: 'Inter',
                              fontSize: '14px',
                              gap: '12px',
                              color: '#1976d2',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: '20px'
                              },
                              '& a': {
                                color: 'inherit',
                                textDecoration: 'underline',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                              }
                            }}
                          >
                            <SVGHeart />
                            <span style={{ textDecoration: 'underline' }}>
                              Ask for a recommendation
                            </span>
                            <SVGExport />
                          </MenuItem>
                          <MenuItem
                            onClick={handleContinueEditing}
                            sx={{
                              fontFamily: 'Inter',
                              fontSize: '14px',
                              gap: '12px',
                              color: '#1976d2',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: '20px'
                              },
                              '& a': {
                                color: 'inherit',
                                textDecoration: 'underline',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                              }
                            }}
                          >
                            <SVGLinkedIn />
                            <span style={{ textDecoration: 'underline' }}>
                              Share to LikedIn
                            </span>
                            <SVGExport />
                          </MenuItem>
                          <MenuItem
                            onClick={handleContinueEditing}
                            sx={{
                              fontFamily: 'Inter',
                              fontSize: '14px',
                              gap: '12px',
                              color: '#1976d2',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: '20px'
                              },
                              '& a': {
                                color: 'inherit',
                                textDecoration: 'underline',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                              }
                            }}
                          >
                            <EditIcon />
                            <span style={{ textDecoration: 'underline' }}>
                              Share via Email
                            </span>
                            <SVGExport />
                          </MenuItem>
                          <MenuItem
                            onClick={handleContinueEditing}
                            sx={{
                              fontFamily: 'Inter',
                              fontSize: '14px',
                              gap: '12px',
                              color: '#1976d2',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: '20px'
                              },
                              '& a': {
                                color: 'inherit',
                                textDecoration: 'underline',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                              }
                            }}
                          >
                            <SVGCopy />
                            <span style={{ textDecoration: 'underline' }}>Copy URL</span>
                          </MenuItem>

                          <MenuItem
                            onClick={handleDelete}
                            disabled={isDeleting}
                            sx={{
                              fontFamily: 'Inter',
                              fontSize: '14px',
                              gap: '12px',
                              color: '#1976d2',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: '20px'
                              },
                              '& a': {
                                color: 'inherit',
                                textDecoration: 'underline',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                              }
                            }}
                          >
                            {isDeleting ? (
                              <CircularProgress size={20} color='error' />
                            ) : (
                              <DeleteIcon />
                            )}
                            <span style={{ textDecoration: 'underline' }}>Delete</span>
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
          )
        )}
      </Box>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{
          sx: {
            backgroundColor: '#1a1c1e',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '100%',
            padding: '24px'
          }
        }}
      >
        <DialogTitle
          id='alert-dialog-title'
          sx={{
            color: '#fff',
            fontSize: '24px',
            padding: 0,
            paddingBottom: '8px'
          }}
        >
          Are you sure?
        </DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <DialogContentText
            id='alert-dialog-description'
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '16px'
            }}
          >
            You cannot recover deleted items and any links to this content will be broken.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            width: '100%',
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            onClick={() => setOpenConfirmDialog(false)}
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#2563eb',
              borderRadius: '100px',
              padding: '8px 24px',
              border: '1px solid #2563eb',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '16px',
              width: '50%',
              '&:hover': {
                backgroundColor: '#FFFFFF'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            sx={{
              backgroundColor: '#2563eb',
              color: '#fff',
              borderRadius: '100px',
              padding: '8px 24px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              width: '50%',
              '&:hover': {
                backgroundColor: '#1d4ed8'
              },
              '&:disabled': {
                backgroundColor: 'rgba(37, 99, 235, 0.5)',
                color: 'rgba(255, 255, 255, 0.5)'
              }
            }}
          >
            {isDeleting ? (
              <CircularProgress size={20} sx={{ color: '#fff' }} />
            ) : (
              'Yes, delete'
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <LoadingOverlay text='Deleting...' open={showOverlappingCards} />
    </Box>
  )
}

export default ClaimsPage
