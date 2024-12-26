import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

interface DeclineRequestProps {
  fullName: string //NOSONAR
  email: string //NOSONAR
  handleBack: () => void
}

const DeclineRequest: React.FC<DeclineRequestProps> = ({ handleBack }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '30px',
        mt: '30px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}
    >
      <Button
        onClick={() => (window.location.href = '/')}
        variant='text'
        sx={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          padding: '10px 24px',
          textTransform: 'capitalize',
          fontSize: '16px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          ':hover': {
            backgroundColor: 'transparent'
          }
        }}
        startIcon={<HomeIcon />}
      >
        Home
      </Button>

      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'Lato',
          color: '#202E5B'
        }}
      >
        No further action is neccessary.
      </Typography>

      <Typography
        sx={{
          fontFamily: 'Lato',
          color: '#666',
          fontSize: '16px',
          my: 2
        }}
      >
        We encourage you to respond to the requestor as appropriate.
      </Typography>

      <Button
        onClick={handleBack}
        sx={{
          padding: '10px 24px',
          borderRadius: '100px',
          textTransform: 'capitalize',
          fontSize: '16px',
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1565c0'
          }
        }}
      >
        Back to the Recommendation
      </Button>
    </Box>
  )
}

export default DeclineRequest
