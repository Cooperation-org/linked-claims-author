'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material'

interface SessionDialogProps {
  userSessions: Array<{
    id: string
    content: {
      fullName?: string
      storageOption?: string
    }
  }>
  open: boolean
  onSelect: (session: any) => void
  onCancel: () => void
}

const SessionDialog: React.FC<SessionDialogProps> = ({
  userSessions,
  open,
  onSelect,
  onCancel
}) => {
  if (userSessions.length === 0) return null

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        You have previous userSession, select one to continue with or press cancel to
        start fresh
      </DialogTitle>
      <DialogContent>
        <List>
          {userSessions.map(session => (
            <ListItemButton key={session.id} onClick={() => onSelect(session.content)}>
              <ListItemText
                primary={session.content.fullName ?? 'Unnamed Session'}
                secondary={session.content.storageOption ?? 'Unknown Storage'}
              />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SessionDialog
