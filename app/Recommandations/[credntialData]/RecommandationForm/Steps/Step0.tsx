'use client'

import React from 'react'
import { Box } from '@mui/material'
import ViewCredential from '../../viewCredential/Credential'

interface Step0Props {
  handleNext: () => void
}

const Step0: React.FC<Step0Props> = ({ handleNext }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <ViewCredential handleNext={handleNext} />
    </Box>
  )
}

export default Step0
