'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  Theme,
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
  DialogTitle,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
  SxProps,
  Snackbar,
  Alert
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { BlueBadge, Logo } from '../Assets/SVGs'
import useGoogleDrive from '../hooks/useGoogleDrive'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useRouter } from 'next/navigation'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import LinkIcon from '@mui/icons-material/Link'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LoadingOverlay from '../components/Loading/LoadingOverlay'

// Define types
interface Achievement {
  name: string
  type?: string[]
}

interface CredentialSubject {
  name: string
  achievement: Achievement[]
  type?: string[]
}

interface FileContent {
  id: string
  name: string
  comments: string[]
  content?: any
  data?: {
    credentialSubject: CredentialSubject
    issuanceDate: string
    '@context'?: string[]
    id?: string
    type?: string[]
  }
}

type FilesType = 'KEYPAIRs' | 'VCs' | 'SESSIONs' | 'DIDs' | 'RECOMMENDATIONs' | 'MEDIAs'

// Utility functions

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

  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  // Calculate months more accurately considering different month lengths
  const months =
    (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth())

  if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  }

  if (diffInDays >= 30) {
    return `${diffInDays} days ago`
  }

  if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
  }

  if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
  }

  if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
  }

  return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'} ago`
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

  // Calculate months more accurately considering different month lengths
  const months =
    (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth())

  if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'}`
  }

  if (diffInDays >= 30) {
    return `${diffInDays} days`
  }

  if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`
  }

  if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'}`
  }

  if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'}`
  }

  return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'}`
}

// Styles function
const getStyles = (isDesktop: boolean): Record<string, SxProps<Theme>> => {
  return {
    root: {
      ...(isDesktop
        ? {
            p: '75px 100px 0 200px',
            bgcolor: 'background.default'
          }
        : {
            p: 2,
            pt: 3,
            bgcolor: '#F3F6FF',
            minHeight: '100vh'
          })
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: isDesktop ? 2 : 1.5,
      mb: isDesktop ? '30px' : 4,
      p: isDesktop ? '10px' : 0
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flex: 1
    },
    title: {
      ...(isDesktop
        ? {
            fontWeight: 'bold',
            fontSize: '2rem',
            color: '#1a1c1e'
          }
        : {
            fontSize: 16,
            whiteSpace: 'pre-line'
          })
    },
    addButton: {
      backgroundColor: '#003FE0',
      color: 'white',
      textTransform: 'none',
      borderRadius: '100px',
      ...(isDesktop
        ? {
            px: 4,
            fontSize: 16
          }
        : {
            width: '100%',
            mb: 4,
            py: 1.5
          }),
      '&:hover': {
        backgroundColor: '#002db3'
      }
    },
    cardBase: {
      p: isDesktop ? 3 : 2,
      backgroundColor: 'white',
      borderRadius: isDesktop ? '16px' : '10px',
      mb: isDesktop ? 3 : 2,
      display: 'flex',
      alignItems: 'center',
      border: isDesktop ? 'none' : '3px solid',
      borderColor: isDesktop ? 'transparent' : '#D1D5DB'
    },
    cardContent: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flex: 1
    },
    cardTitle: {
      color: isDesktop ? '#1a1c1e' : '#202E5B',
      fontWeight: 'bold',
      fontSize: isDesktop ? 26 : 16
    },
    cardSubtitle: {
      color: '#666',
      fontSize: 16
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 2,
      '& .MuiSvgIcon-root': {
        fontSize: 20
      }
    }
  } as const
}

const ClaimsPage: React.FC = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const styles = getStyles(isDesktop)

  // States
  const [claims, setClaims] = useState<FileContent[]>([])
  const [sessions, setSessions] = useState<FileContent[]>([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedItem, setSelectedItem] = useState<FileContent | null>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [isSession, setIsSession] = useState(false)
  const [showOverlayLoader, setShowOverlayLoader] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  // Hooks
  const { data: session } = useSession()
  const { storage } = useGoogleDrive()
  const router = useRouter()

  // Fetch data
  const fetchData = useCallback(async () => {
    if (!storage) return

    try {
      setLoading(true)

      // Fetch VCs
      const vcsResponse = (await storage.getAllFilesByType('VCs')) as FileContent[]
      console.log('VCs response:', vcsResponse)

      if (Array.isArray(vcsResponse)) {
        const validVCs = vcsResponse.flatMap(fileGroup => {
          if (!Array.isArray(fileGroup)) return []

          const mainFile = fileGroup.find(f => f.name !== 'RELATIONS') as FileContent
          if (!mainFile?.data?.credentialSubject?.achievement?.[0]?.name) {
            return []
          }

          return [
            {
              id: mainFile.id,
              name: mainFile.name,
              comments: mainFile.comments || [],
              data: mainFile.data
            }
          ]
        })

        console.log('Processed VCs:', validVCs)
        setClaims(validVCs)
      }

      // Fetch Sessions
      const sessionsResponse = (await storage.getAllFilesByType(
        'SESSIONs'
      )) as FileContent[]
      console.log('Sessions response:', sessionsResponse)

      if (Array.isArray(sessionsResponse)) {
        const validSessions = sessionsResponse
          .filter((file): file is FileContent => Boolean(file?.id && file?.name))
          .map(file => ({
            id: file.id,
            name: file.name,
            comments: file.comments || [],
            data: file.data
          }))

        console.log('Processed sessions:', validSessions)
        setSessions(validSessions)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setSnackbarMessage('Failed to fetch data.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    } finally {
      setLoading(false)
    }
  }, [storage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Menu handlers
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    item: FileContent,
    sessionItem = false
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedItem(item)
    setIsSession(sessionItem)
  }

  const handleShareButtonClick = (
    event: React.MouseEvent<HTMLElement>,
    item: FileContent
  ) => {
    setShareAnchorEl(event.currentTarget)
    setSelectedItem(item)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedItem(null)
    setIsSession(false)
  }

  const handleShareMenuClose = () => {
    setShareAnchorEl(null)
    setSelectedItem(null)
  }

  // Snackbar handlers
  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  // Action handlers
  const handleCopyUrl = async () => {
    if (!selectedItem?.id) return
    const url = `${window.location.origin}/view/${selectedItem.id}`
    try {
      await navigator.clipboard.writeText(url)
      setSnackbarMessage('URL copied to clipboard!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
    } catch (error) {
      console.error('Failed to copy URL:', error)
      setSnackbarMessage('Failed to copy URL.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }

    if (isDesktop) {
      handleShareMenuClose()
    } else {
      handleMenuClose()
    }
  }

  const handleDelete = () => {
    setOpenDeleteDialog(true)
    handleMenuClose()
  }

  const handleConfirmDelete = async () => {
    if (!selectedItem?.id || !storage) return

    try {
      setIsDeleting(true)
      setShowOverlayLoader(true)
      const response = await storage.delete(selectedItem.id)

      if (response !== null) {
        if (isSession) {
          setSessions(prev => prev.filter(item => item.id !== selectedItem.id))
        } else {
          setClaims(prev => prev.filter(item => item.id !== selectedItem.id))
        }
        setSnackbarMessage('Item deleted successfully.')
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
      } else {
        throw new Error('Deletion failed.')
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      setSnackbarMessage('Failed to delete item.')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    } finally {
      setIsDeleting(false)
      setShowOverlayLoader(false)
      setOpenDeleteDialog(false)
    }
  }

  // LinkedIn share URL generator
  const generateLinkedInUrl = (fileId: string): string => {
    const baseLinkedInUrl = 'https://www.linkedin.com/profile/add'
    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name:
        selectedItem?.data?.credentialSubject?.achievement[0]?.name ??
        'Certification Name',
      organizationName: 'LinkedTrust',
      issueYear: new Date(selectedItem?.data?.issuanceDate ?? '')
        .getFullYear()
        .toString(),
      issueMonth: (
        new Date(selectedItem?.data?.issuanceDate ?? '').getMonth() + 1
      ).toString(),
      expirationYear: (
        new Date(selectedItem?.data?.issuanceDate ?? '').getFullYear() + 1
      ).toString(),
      expirationMonth: (
        new Date(selectedItem?.data?.issuanceDate ?? '').getMonth() + 1
      ).toString(),
      certUrl: `https://opencreds.net/view/${fileId}`
    })
    return `${baseLinkedInUrl}?${params.toString()}`
  }

  // Render methods
  const renderCard = (item: FileContent, index: number) => {
    const isSessionItem = !item.data?.credentialSubject
    const colors = ['#9747FF', '#14B8A6', '#F9A41A', '#9747FF']
    const borderColor = colors[index % colors.length]

    if (isDesktop) {
      return (
        <Paper sx={styles.cardBase} key={item.id}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}
          >
            <Box sx={styles.cardContent}>
              {isSessionItem ? <Logo /> : <BlueBadge />}
              <Box>
                <Typography sx={styles.cardTitle}>
                  {isSessionItem
                    ? item.name
                    : item.data?.credentialSubject.achievement[0].name}
                  {!isSessionItem && item.data?.issuanceDate && (
                    <span style={{ color: '#666', marginLeft: 8 }}>
                      - {getTimeAgo(item.data.issuanceDate)}
                    </span>
                  )}
                </Typography>
                {!isSessionItem && item.data?.credentialSubject.name && (
                  <Typography sx={styles.cardSubtitle}>
                    {item.data.credentialSubject.name}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isSessionItem && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #003fe0',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    backgroundColor: '#f0f6ff'
                  }}
                >
                  <Button
                    onClick={e => handleShareButtonClick(e, item)}
                    startIcon={<PeopleAltIcon />}
                    sx={{
                      color: '#003fe0',
                      borderRight: '1px solid #003fe0',
                      px: 2,
                      '&:hover': { backgroundColor: 'rgba(0, 63, 224, 0.04)' }
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    onClick={handleCopyUrl}
                    startIcon={<ContentCopyIcon />}
                    sx={{
                      color: '#003fe0',
                      px: 2,
                      '&:hover': { backgroundColor: 'rgba(0, 63, 224, 0.04)' }
                    }}
                  >
                    Copy URL
                  </Button>
                </Box>
              )}
              <IconButton onClick={e => handleMenuOpen(e, item, isSessionItem)}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      )
    }

    // Mobile view with colored borders and only More options button
    return (
      <Paper
        key={item.id}
        sx={{
          ...styles.cardBase,
          borderColor: isSessionItem ? '#D1D5DB' : borderColor
        }}
      >
        {!isSessionItem && (
          <Box sx={{ mr: 1.5, color: borderColor }}>
            {/* Optional icon or decoration */}
          </Box>
        )}
        <Typography sx={{ flex: 1 }}>
          {isSessionItem ? item.name : item.data?.credentialSubject.achievement[0].name}
        </Typography>
        <IconButton onClick={e => handleMenuOpen(e, item, isSessionItem)}>
          <MoreVertIcon />
        </IconButton>
      </Paper>
    )
  }

  const renderMenuItems = () => {
    if (isSession) {
      return (
        <>
          <MenuItem
            onClick={() => {
              router.push(`/credentialForm/${selectedItem?.id}`)
              handleMenuClose()
            }}
            sx={styles.menuItem}
          >
            <EditIcon fontSize='small' />
            Continue editing
          </MenuItem>
          <MenuItem
            onClick={handleDelete}
            sx={{ ...styles.menuItem, color: 'error.main' }}
          >
            <DeleteIcon fontSize='small' />
            Delete
          </MenuItem>
        </>
      )
    }

    if (!isDesktop) {
      return (
        <>
          <MenuItem
            onClick={() => {
              router.push(`/recommendations/${selectedItem?.id}`)
              handleMenuClose()
            }}
            sx={styles.menuItem}
          >
            <FavoriteIcon fontSize='small' />
            Ask for a recommendation
          </MenuItem>
          <MenuItem
            onClick={() => {
              const linkedInUrl = generateLinkedInUrl(selectedItem?.id ?? '')
              window.open(linkedInUrl, '_blank')
              handleMenuClose()
            }}
            sx={styles.menuItem}
          >
            <LinkedInIcon fontSize='small' />
            Share to LinkedIn
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location.href = `mailto:?subject=Check out my skill&body=${window.location.origin}/view/${selectedItem?.id}`
              handleMenuClose()
            }}
            sx={styles.menuItem}
          >
            <EmailIcon fontSize='small' />
            Share via Email
          </MenuItem>
          <MenuItem onClick={handleCopyUrl} sx={styles.menuItem}>
            <LinkIcon fontSize='small' />
            Copy URL
          </MenuItem>
          <MenuItem
            onClick={handleDelete}
            sx={{ ...styles.menuItem, color: 'error.main' }}
          >
            <DeleteIcon fontSize='small' />
            Delete
          </MenuItem>
        </>
      )
    }

    // Desktop view: only Delete option in the primary menu
    return (
      <MenuItem onClick={handleDelete} sx={{ ...styles.menuItem, color: 'error.main' }}>
        <DeleteIcon fontSize='small' />
        Delete
      </MenuItem>
    )
  }

  return (
    <Box sx={styles.root}>
      {/* Header */}
      <Box sx={styles.header}>
        {isDesktop ? (
          <>
            <Typography sx={styles.title}>My Skills</Typography>
            <Button
              variant='contained'
              onClick={() => router.push('/credentialForm')}
              sx={styles.addButton}
            >
              Add a new skill
            </Button>
          </>
        ) : (
          <>
            <Box
              component='img'
              src={session?.user?.image ?? '/placeholder-avatar.png'}
              alt='User avatar'
              sx={{ width: 50, height: 50, borderRadius: '50%' }}
            />
            <Typography sx={styles.title}>
              {`Hi, ${session?.user?.name ?? 'User'}!`}
            </Typography>
          </>
        )}
      </Box>

      {!isDesktop && (
        <Button
          variant='contained'
          fullWidth
          sx={styles.addButton}
          onClick={() => router.push('/credentialForm')}
        >
          Add a new skill
        </Button>
      )}

      {/* Content */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {isDesktop ? (
            [...sessions, ...claims].map((item, index) => renderCard(item, index))
          ) : (
            <>
              {sessions.length > 0 && (
                <>
                  <Typography sx={styles.title}>Work on a session:</Typography>
                  {sessions.map((item, index) => renderCard(item, index))}
                </>
              )}
              <Typography sx={styles.title}>Work with my existing skills:</Typography>
              {claims.map((item, index) => renderCard(item, index))}
            </>
          )}
        </>
      )}

      {/* Menus */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ '& .MuiPaper-root': { width: 240, mt: 1 } }}
      >
        {renderMenuItems()}
      </Menu>

      {isDesktop && (
        <Menu
          anchorEl={shareAnchorEl}
          open={Boolean(shareAnchorEl)}
          onClose={handleShareMenuClose}
          sx={{ '& .MuiPaper-root': { width: 240, mt: 1 } }}
        >
          <MenuItem
            onClick={() => {
              const linkedInUrl = generateLinkedInUrl(selectedItem?.id ?? '')
              window.open(linkedInUrl, '_blank')
              handleShareMenuClose()
            }}
            sx={styles.menuItem}
          >
            <LinkedInIcon fontSize='small' />
            Share to LinkedIn
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.location.href = `mailto:?subject=Check out my skill&body=${window.location.origin}/view/${selectedItem?.id}`
              handleShareMenuClose()
            }}
            sx={styles.menuItem}
          >
            <EmailIcon fontSize='small' />
            Share via Email
          </MenuItem>
          <MenuItem onClick={handleCopyUrl} sx={styles.menuItem}>
            <LinkIcon fontSize='small' />
            Copy URL
          </MenuItem>
        </Menu>
      )}

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: '#1a1c1e',
            borderRadius: '12px',
            maxWidth: 400,
            width: '100%',
            p: 3
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', p: 0, pb: 1 }}>Are you sure?</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <DialogContentText sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            You cannot recover deleted items and any links to this content will be broken.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 0, pt: 2, gap: 2 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              flex: 1,
              bgcolor: 'white',
              color: '#2563eb',
              border: '1px solid #2563eb',
              borderRadius: '100px'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            sx={{
              flex: 1,
              bgcolor: '#2563eb',
              color: 'white',
              borderRadius: '100px',
              '&:hover': { bgcolor: '#1d4ed8' },
              '&:disabled': { bgcolor: 'rgba(37, 99, 235, 0.5)' }
            }}
          >
            {isDeleting ? <CircularProgress size={20} /> : 'Yes, delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Loading Overlay */}
      <LoadingOverlay text='Deleting...' open={showOverlayLoader} />
    </Box>
  )
}

export default ClaimsPage
