import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'

const SessionExpiryModal = () => {
  const { data: session } = useSession()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (session && session.expires) {
        const now = new Date().getTime()
        const expiresAt = new Date(session.expires * 1000).getTime()
        if (expiresAt - now < 60 * 60 * 1000) {
          // Less than 1 hour to expiry
          setShowModal(true)
        }
      }
    }

    // Run the expiry check immediately and then set an interval
    checkTokenExpiry()
    const interval = setInterval(checkTokenExpiry, 1000 * 60 * 5) // Check every 5 minutes

    return () => clearInterval(interval)
  }, [session])

  const handleRefreshSession = () => {
    console.log('sign in')
    signIn('google')
    console.log(showModal)
  }

  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Session Expiry Warning'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Your session is about to expire. Please refresh your session to continue.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowModal(false)} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={handleRefreshSession}
          color='primary'
          autoFocus
          variant='contained'
        >
          Refresh Session
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SessionExpiryModal
