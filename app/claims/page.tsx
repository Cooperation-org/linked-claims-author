'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  Typography,
  CircularProgress,
  Box,
  Button,
  IconButton,
  Collapse,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Divider,
  Snackbar,
  Alert
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import useGoogleDrive from '../hooks/useGoogleDrive'
import LoadingOverlay from '../components/Loading/LoadingOverlay'

import {
  SVGHeart,
  SVGLinkedIn,
  SVGEmail,
  SVGCopy,
  SVGTrush,
  BlueBadge,
  SVGExport
} from '../Assets/SVGs'
import { getAccessToken } from '../firebase/storage'

// Types
interface Claim {
  [x: string]: any
  id: string
  achievementName: string
}

interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error'
}

const borderColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#6366f1']

const getRandomBorderColor = () => {
  return borderColors[Math.floor(Math.random() * borderColors.length)]
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getTimeAgo = (isoDateString: string): string => {
  const date = new Date(isoDateString)
  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }
  return formatDate(date)
}

const getTimeDifference = (isoDateString: string): string => {
  const date = new Date(isoDateString)
  if (isNaN(date.getTime())) {
    return '0 seconds'
  }

  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const months =
    (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth())

  if (months > 0) return `${months} ${months === 1 ? 'month' : 'months'}`
  if (diffInDays >= 30) return `${diffInDays} days`
  if (diffInDays > 0) return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`
  if (diffInHours > 0) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'}`
  if (diffInMinutes > 0)
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'}`
  return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'}`
}

const ClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showOverlappingCards, setShowOverlappingCards] = useState(false)
  const [desktopMenuAnchorEl, setDesktopMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  })

  const { data: session } = useSession()

  const { storage, getContent } = useGoogleDrive()
  const { storage, getContent } = useGoogleDrive()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleRecommendationClick = async (claimId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const url = `${window.location.origin}/askforrecommendation/${claimId}`
    await navigator.clipboard.writeText(url)
    router.push(`/askforrecommendation/${claimId}`)
  }

  const showNotification = (message: string, severity: 'success' | 'error') => {
    setSnackbar({
      open: true,
      message,
      severity
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const handleLinkedTrustShare = (claim: any) => {
    console.log('🚀 ~ handleLinkedTrustShare ~ claim:', claim)
    fetch('https://dev.linkedtrust.us/api/credential', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(claim)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        console.log('🚀 ~ handleShareOption ~ response:', response)
        showNotification('Successfully shared with LinkedTrust', 'success')
      })
      .catch(error => {
        console.error('Error sharing with LinkedTrust:', error)
        showNotification('Failed to share with LinkedTrust', 'error')
      })
  }

  const handleEmailShare = (claim: any, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const url = `${window.location.origin}/view/${claim.id}`
    const subject = encodeURIComponent(claim?.credentialSubject.achievement[0].name)
    const url = `${window.location.origin}/view/${claim.id}`
    const subject = encodeURIComponent(claim?.credentialSubject.achievement[0].name)
    const body = encodeURIComponent(url)
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`
    window.open(mailtoLink)
  }
  const handleDesktopMenuOpen = (event: React.MouseEvent<HTMLElement>, claim: any) => {
    event.stopPropagation()
    setDesktopMenuAnchorEl(event.currentTarget)
    setSelectedClaim(claim)
  }

  const generateLinkedInUrl = (claim: any) => {
    const baseLinkedInUrl = 'https://www.linkedin.com/profile/add'
    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: claim?.credentialName ?? 'Certification Name',
      organizationName: 'LinkedTrust',
      issueYear: '2024',
      issueMonth: '8',
      expirationYear: '2025',
      expirationMonth: '8',
      certUrl: `https://linkedcreds.allskillscount.com/view/${claim.id}`
    })
    return `${baseLinkedInUrl}?${params.toString()}`
  }

  const handleLinkedInShare = (claim: any) => {
    const linkedInUrl = generateLinkedInUrl(claim)
    window.open(linkedInUrl, '_blank')
  }

  const handleDesktopMenuClose = () => {
    setDesktopMenuAnchorEl(null)
  }

  const handleCardClick = (claimId: string) => {
    if (isMobile) {
      setExpandedCard(expandedCard === claimId ? null : claimId)
    }
  }

  const handleCopyUrl = async (claimId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const url = `${window.location.origin}/view/${claimId}`
    await navigator.clipboard.writeText(url)
  }

  const handleConfirmDelete = async () => {
    if (!selectedClaim || !storage) return

    try {
      setIsDeleting(true)
      setShowOverlappingCards(true)
      const fileId = selectedClaim.id
      const fileId = selectedClaim.id

      await storage.delete(fileId)

      // Immediately update the UI by filtering out the deleted claim
      setClaims(prevClaims => prevClaims.filter(claim => claim?.id !== fileId))
      setClaims(prevClaims => prevClaims.filter(claim => claim?.id !== fileId))

      // Reset all states
      setOpenDeleteDialog(false)
      setSelectedClaim(null)
      setDesktopMenuAnchorEl(null)
    } catch (error) {
      console.error('Error deleting claim:', error)
    } finally {
      setIsDeleting(false)
      setShowOverlappingCards(false)
      setExpandedCard(null)
    }
  }
  const getFileViaFirebase = async (fileId: string) => {
    try {
      // 1- getAccessToken   2- fetch file
      const accessToken = await getAccessToken(fileId)
      const fileContent = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      const fileData = await fileContent.json()
      console.log('🚀 ~ getFileViaFirebase ~ fileContent:', fileId, fileData)
      return fileContent
    } catch (error) {
      console.error(`Error retrieving file ${fileId} from Firebase:`, error)
      return null
    }
  }
  const getAllClaims = useCallback(async (): Promise<any> => {
    const claimsData = await storage?.getAllFilesByType('VCs')
    console.log('🚀 ~ getAllClaims ~ claimsData:', claimsData)

    if (!claimsData?.length) return []

    const vcs = []
    for (const file of claimsData) {
      try {
        const contentResponse = await getFileViaFirebase(file.id as string)
        const content = JSON.parse(file?.data?.body)
        console.log('🚀 ~ getAllClaims ~ content:', content)

        // Check if content exists and has @context property
        if (content && '@context' in content) {
          vcs.push({
            ...content,
            id: file
          })
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error)
        // Continue with the next file even if one fails
        continue
      }
    }

    return vcs
  }, [storage])

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true)
        const claimsData = await getAllClaims()
        console.log('🚀 ~ fetchClaims ~ claimsData:', claimsData)
        setClaims(claimsData)
        console.log('🚀 ~ fetchClaims ~ claimsData:', claimsData)
        setClaims(claimsData)
      } catch (error) {
        console.error('Error fetching claims:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClaims()
  }, [getAllClaims])

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        p: { xs: 2, sm: 3, md: '100px 20px 16px 50px' }
      }}
    >
      {isMobile && (
        <Box sx={{ mb: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 3
            }}
          >
            <Avatar
              sx={{ border: '2px solid #003fe0' }}
              alt='Profile Picture'
              src={session?.user?.image}
            />
            <Box>
              <Typography variant='h6'>
                Hi, <span style={{ color: '#033fe0' }}>{session?.user?.name}</span>
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                What would you like to do?
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            variant='nextButton'
            onClick={() => router.push('/credentialForm')}
          >
            Add a new skill
          </Button>

          <Typography
            variant='subtitle1'
            sx={{ fontSize: '24px', fontFamily: 'Lato', mt: 2 }}
          >
            Work with my existing skills:
          </Typography>
        </Box>
      )}

      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4
          }}
        >
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            My Skills
          </Typography>
          <Button
            variant='nextButton'
            sx={{ textTransform: 'none' }}
            onClick={() => router.push('/credentialForm')}
          >
            Add a new skill
          </Button>
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {claims.map(claim => (
            <Paper
              key={claim.id}
              onClick={() => handleCardClick(claim.id)}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                cursor: isMobile ? 'pointer' : 'default',
                border: '3px solid',
                borderColor: isMobile ? getRandomBorderColor() : 'transparent',
                bgcolor: 'background.paper',
                transition: 'all 0.3s ease'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {isMobile ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BlueBadge />
                    <Typography
                      variant='subtitle1'
                      sx={{
                        fontWeight: 600,
                        textDecoration: 'underline'
                      }}
                    >
                      {/* {claim.credentialSubject.achievement[0].name} */}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ mt: '5px' }}>
                        <BlueBadge />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '1.25rem'
                        }}
                      >
                        {/* {claim.credentialSubject.achievement[0].name} - */}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 'bold',
                          fontSize: '1.25rem'
                        }}
                      >
                        {getTimeAgo(claim.issuanceDate)}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {claim.credentialSubject.name} -{' '}
                      {getTimeDifference(claim.issuanceDate)}
                    </Typography>
                  </Box>
                )}
          {claims.map(claim => (
            <Paper
              key={claim.id}
              onClick={() => handleCardClick(claim.id)}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                cursor: isMobile ? 'pointer' : 'default',
                border: '3px solid',
                borderColor: isMobile ? getRandomBorderColor() : 'transparent',
                bgcolor: 'background.paper',
                transition: 'all 0.3s ease'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {isMobile ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BlueBadge />
                    <Typography
                      variant='subtitle1'
                      sx={{
                        fontWeight: 600,
                        textDecoration: 'underline'
                      }}
                    >
                      {claim.credentialSubject.achievement[0].name}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ mt: '5px' }}>
                        <BlueBadge />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '1.25rem'
                        }}
                      >
                        {claim.credentialSubject.achievement[0].name} -
                      </Typography>
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 'bold',
                          fontSize: '1.25rem'
                        }}
                      >
                        {getTimeAgo(claim.issuanceDate)}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {claim.credentialSubject.name} -{' '}
                      {getTimeDifference(claim.issuanceDate)}
                    </Typography>
                  </Box>
                )}

                {isMobile ? (
                  <IconButton
                    size='small'
                    onClick={e => {
                      e.stopPropagation()
                      handleCardClick(claim.id)
                    }}
                  >
                    <KeyboardArrowDownIcon
                      sx={{
                        transform: expandedCard === claim.id ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s'
                      }}
                    />
                  </IconButton>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: '100px',
                        overflow: 'hidden',
                        bgcolor: 'primary.50'
                      }}
                    >
                      <Button
                        onClick={() => handleLinkedTrustShare(claim)}
                        startIcon={<PeopleAltIcon />}
                        sx={{
                          bgcolor: '#eff6ff',
                          borderColor: '#eff6ff',
                          '&:hover': { bgcolor: 'primary.100' },
                          p: '2px 20px',
                          backgroundColor: '#f0f6ff',
                          fontSize: '12px',
                          fontWeight: 'medium',
                          color: '#003fe0'
                        }}
                      >
                        Share with LinkedTrust
                      </Button>
                      <Divider orientation='vertical' flexItem color='#003fe0' />
                      <Button
                        startIcon={<ContentCopyIcon />}
                        onClick={e => handleCopyUrl(claim.id, e)}
                        sx={{
                          bgcolor: '#eff6ff',
                          '&:hover': { bgcolor: 'primary.100' },
                          p: '2px 20px',
                          backgroundColor: '#f0f6ff',
                          fontSize: '12px',
                          fontWeight: 'medium',
                          color: '#003fe0'
                        }}
                      >
                        Copy URL
                      </Button>
                    </Box>
                    <IconButton onClick={e => handleDesktopMenuOpen(e, claim)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
                {isMobile ? (
                  <IconButton
                    size='small'
                    onClick={e => {
                      e.stopPropagation()
                      handleCardClick(claim.id)
                    }}
                  >
                    <KeyboardArrowDownIcon
                      sx={{
                        transform: expandedCard === claim.id ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s'
                      }}
                    />
                  </IconButton>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: '100px',
                        overflow: 'hidden',
                        bgcolor: 'primary.50'
                      }}
                    >
                      <Button
                        startIcon={<PeopleAltIcon />}
                        sx={{
                          bgcolor: '#eff6ff',
                          borderColor: '#eff6ff',
                          '&:hover': { bgcolor: 'primary.100' },
                          p: '2px 20px',
                          backgroundColor: '#f0f6ff',
                          fontSize: '12px',
                          fontWeight: 'medium',
                          color: '#003fe0'
                        }}
                      >
                        Share
                      </Button>
                      <Divider orientation='vertical' flexItem color='#003fe0' />
                      <Button
                        startIcon={<ContentCopyIcon />}
                        onClick={e => handleCopyUrl(claim.id, e)}
                        sx={{
                          bgcolor: '#eff6ff',
                          '&:hover': { bgcolor: 'primary.100' },
                          p: '2px 20px',
                          backgroundColor: '#f0f6ff',
                          fontSize: '12px',
                          fontWeight: 'medium',
                          color: '#003fe0'
                        }}
                      >
                        Copy URL
                      </Button>
                    </Box>
                    <IconButton onClick={e => handleDesktopMenuOpen(e, claim)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>

              {isMobile && (
                <Collapse in={expandedCard === claim.id}>
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}
                  >
                    <Button
                      startIcon={<SVGHeart />}
                      endIcon={<SVGExport />}
                      onClick={e => handleRecommendationClick(claim.id, e)}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.50' }
                      }}
                    >
                      Ask for a recommendation
                    </Button>
                    <Button
                      startIcon={<SVGLinkedIn />}
                      endIcon={<SVGExport />}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.50' }
                      }}
                      onClick={() => handleLinkedInShare(claim)}
                    >
                      Share to LinkedIn
                    </Button>
                    <Button
                      startIcon={<PeopleAltIcon />}
                      endIcon={<SVGExport />}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.50' }
                      }}
                      onClick={() => handleLinkedTrustShare(claim)}
                    >
                      Share to LinkedTrust
                    </Button>
                    <Button
                      startIcon={<SVGEmail />}
                      endIcon={<SVGExport />}
                      onClick={e => handleEmailShare(claim, e)}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.50' }
                      }}
                    >
                      Share via Email
                    </Button>
                    <Button
                      startIcon={<SVGCopy />}
                      onClick={e => handleCopyUrl(claim.id, e)}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.50' }
                      }}
                    >
                      Copy URL
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={e => {
                        e.stopPropagation()
                        setSelectedClaim(claim)
                        setOpenDeleteDialog(true)
                      }}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.50' }
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Collapse>
              )}
            </Paper>
          ))}
        </Box>
      )}

      {!isMobile && (
        <Menu
          anchorEl={desktopMenuAnchorEl}
          open={Boolean(desktopMenuAnchorEl)}
          onClose={handleDesktopMenuClose}
          PaperProps={{
            sx: {
              width: 320,
              mt: 1,
              borderRadius: 2
            }
          }}
        >
          <MenuItem
            onClick={e => {
              handleRecommendationClick(selectedClaim.id, e)
              handleDesktopMenuClose()
            }}
            sx={{ py: 1.5, gap: 2 }}
          >
            <SVGHeart />
            <Typography sx={{ textDecoration: 'underline', color: '#003fe0' }}>
              Ask for a recommendation
            </Typography>
            <SVGExport />
          </MenuItem>
          <MenuItem
            onClick={e => {
              handleLinkedInShare(selectedClaim)
              handleDesktopMenuClose()
            }}
            sx={{ py: 1.5, gap: 2 }}
          >
            <SVGLinkedIn />
            <Typography sx={{ textDecoration: 'underline', color: '#003fe0' }}>
              Share to LinkedIn
            </Typography>
            <SVGExport />
          </MenuItem>
          <MenuItem
            onClick={e => {
              handleEmailShare(selectedClaim, e)
              handleDesktopMenuClose()
            }}
            sx={{ py: 1.5, gap: 2 }}
          >
            <SVGEmail />
            <Typography sx={{ textDecoration: 'underline', color: '#003fe0' }}>
              Share via Email
            </Typography>
            <SVGExport />
          </MenuItem>
          <MenuItem
            onClick={e => {
              handleCopyUrl(selectedClaim?.[0].id, e)
              handleDesktopMenuClose()
            }}
            sx={{ py: 1.5, gap: 2 }}
          >
            <SVGCopy />
            <Typography sx={{ textDecoration: 'underline', color: '#003fe0' }}>
              Copy URL
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenDeleteDialog(true)
              handleDesktopMenuClose()
            }}
            sx={{ py: 1.5, gap: 2 }}
          >
            <SVGTrush />
            <Typography sx={{ textDecoration: 'underline', color: '#003fe0' }}>
              Delete
            </Typography>
          </MenuItem>
        </Menu>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'grey.900',
            maxWidth: '400px',
            width: '100%',
            m: 2
          }
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'grey.300' }}>
            You cannot recover deleted items and any links to this content will be broken.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            variant='outlined'
            fullWidth
            sx={{
              borderRadius: '100px',
              color: 'primary.main',
              borderColor: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                bgcolor: 'primary.50'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant='contained'
            disabled={isDeleting}
            fullWidth
            sx={{
              borderRadius: '100px',
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            {isDeleting ? <CircularProgress size={24} /> : 'Yes, delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <LoadingOverlay text='Deleting...' open={showOverlappingCards} />
    </Box>
  )
}

export default ClaimsPage
