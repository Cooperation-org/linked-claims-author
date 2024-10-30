import React from 'react'
import { Box, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Card = ({ text, color, rotation }: any) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: '8px 16px',
      borderRadius: '12px',
      border: `2px solid ${color}`,
      transform: `rotate(${rotation}deg)`,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '300px',
      margin: '8px 0',
      overflow: 'hidden',
      zIndex: 1
    }}
  >
    <CheckCircleIcon sx={{ color: color, marginRight: '8px' }} />
    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
      {text}
    </Typography>
  </Box>
)

const OverlappingCards = () => {
  return (
    <Box sx={{ position: 'relative', padding: '90px', right: '50px' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 3 }}>
        <Card text='Barista Training' color='#14B8A6' rotation={-7} />
      </Box>
      <Box sx={{ position: 'absolute', top: 60, left: 0, zIndex: 2 }}>
        <Card text='Cashier' color='#FB8C00' rotation={-1} />
      </Box>
      <Box sx={{ position: 'absolute', top: 120, left: 0, zIndex: 1 }}>
        <Card text='Team Leader' color='#8E24AA' rotation={7} />
      </Box>
    </Box>
  )
}

export default OverlappingCards
