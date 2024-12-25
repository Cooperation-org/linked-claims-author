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
  Divider
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
  BlueBadge
} from '../Assets/SVGs'

// Types
interface Claim {
  [x: string]: any
  id: string
  achievementName: string
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

  const { data: session } = useSession()
  console.log(':  session', session)
  const { storage } = useGoogleDrive()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleRecommendationClick = async (claimId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const url = `${window.location.origin}/recommendations/${claimId}`
    await navigator.clipboard.writeText(url)
  }

  const handleEmailShare = (claim: any, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const url = `${window.location.origin}/view/${claim[0].id}`
    const subject = encodeURIComponent(
      claim[0].data.credentialSubject.achievement[0].name
    )
    const body = encodeURIComponent(url)
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`
    window.open(mailtoLink)
  }
  const handleDesktopMenuOpen = (event: React.MouseEvent<HTMLElement>, claim: any) => {
    event.stopPropagation()
    setDesktopMenuAnchorEl(event.currentTarget)
    setSelectedClaim(claim)
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
      const fileId = selectedClaim[0].id

      await storage.delete(fileId)

      // Immediately update the UI by filtering out the deleted claim
      setClaims(prevClaims => prevClaims.filter(claim => claim[0]?.id !== fileId))

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

  const isValidClaim = (claim: any) => {
    return (
      claim[0]?.data?.credentialSubject?.achievement[0]?.name &&
      claim[0]?.data?.credentialSubject?.name
    )
  }

  const getAllClaims = useCallback(async (): Promise<any> => {
    const claimsData = await storage?.getAllFilesByType('VCs')
    if (!claimsData?.length) return []
    return claimsData
  }, [storage])

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true)
        const claimsData = await getAllClaims()
        const vcs = claimsData.map((file: any[]) =>
          file.filter((f: { name: string }) => f.name !== 'RELATIONS')
        )
        setClaims(vcs)
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
          {claims.map(
            claim =>
              isValidClaim(claim) && (
                <Paper
                  key={claim[0].id}
                  onClick={() => handleCardClick(claim[0].id)}
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
                          {claim[0].data.credentialSubject.achievement[0].name}
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
                            {claim[0].data.credentialSubject.achievement[0].name} -
                          </Typography>
                          <Typography
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 'bold',
                              fontSize: '1.25rem'
                            }}
                          >
                            {getTimeAgo(claim[0].data.issuanceDate)}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: 'text.secondary' }}>
                          {claim[0].data.credentialSubject.name} -{' '}
                          {getTimeDifference(claim[0].data.issuanceDate)}
                        </Typography>
                      </Box>
                    )}

                    {isMobile ? (
                      <IconButton
                        size='small'
                        onClick={e => {
                          e.stopPropagation()
                          handleCardClick(claim[0].id)
                        }}
                      >
                        <KeyboardArrowDownIcon
                          sx={{
                            transform:
                              expandedCard === claim[0].id ? 'rotate(180deg)' : 'none',
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
                            onClick={e => handleCopyUrl(claim[0].id, e)}
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
                    <Collapse in={expandedCard === claim[0].id}>
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
                          onClick={e => handleRecommendationClick(claim[0].id, e)}
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
                          fullWidth
                          sx={{
                            justifyContent: 'flex-start',
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'primary.50' }
                          }}
                        >
                          Share to LinkedIn
                        </Button>
                        <Button
                          startIcon={<SVGEmail />}
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
                          onClick={e => handleCopyUrl(claim[0].id, e)}
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
              )
          )}
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
              handleRecommendationClick(selectedClaim?.[0].id, e)
              handleDesktopMenuClose()
            }}
            sx={{ py: 1.5, gap: 2 }}
          >
            <SVGHeart />
            <Typography>Ask for a recommendation</Typography>
          </MenuItem>
          <MenuItem onClick={handleDesktopMenuClose} sx={{ py: 1.5, gap: 2 }}>
            <SVGLinkedIn />
            <Typography>Share to LinkedIn</Typography>
          </MenuItem>
          <MenuItem
            onClick={e => {
              handleEmailShare(selectedClaim, e)
              handleDesktopMenuClose()
            }}
            sx={{ py: 1.5, gap: 2 }}
          >
            <SVGEmail />
            <Typography>Share via Email</Typography>
          </MenuItem>
          <MenuItem
            onClick={e => {
              handleCopyUrl(selectedClaim?.[0].id, e)
              handleDesktopMenuClose()
            }}
            sx={{ py: 1.5, gap: 2 }}
          >
            <SVGCopy />
            <Typography>Copy URL</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenDeleteDialog(true)
              handleDesktopMenuClose()
            }}
            sx={{ py: 1.5, gap: 2 }}
          >
            <SVGTrush />
            <Typography>Delete</Typography>
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

      <LoadingOverlay text='Deleting...' open={showOverlappingCards} />
    </Box>
  )
}

export default ClaimsPage
