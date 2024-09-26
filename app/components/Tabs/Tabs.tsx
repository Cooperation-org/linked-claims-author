'use client'

import React, { useState } from 'react'
import { Tabs, Tab, Box, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import ComprehensiveClaimDetails from '../../test/[credentialData]/ComprehensiveClaimDetails'
import Form from '../../Recommendations/[credentialData]/RecommandationForm/Form'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

interface TabPanelProps {
  children: React.ReactNode
  value: number
  index: number
}

interface TabsComponentProps {
  fullName: string
  setFullName: (name: string) => void
}

const TabsComponent: React.FC<TabsComponentProps> = ({ fullName, setFullName }) => {
  const [value, setValue] = useState(0)
  const [fileID, setFileID] = useState('')

  const params = useParams()
  const credentialData = Array.isArray(params?.credentialData)
    ? params.credentialData[0]
    : params?.credentialData

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  if (!credentialData) {
    console.error('Error: Missing credential data.')
    return (
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant='h6' color='error'>
          Error: Missing credential data.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100%', mt: '10px' }}>
      <Tabs
        sx={{ width: '100%', pl: '20px' }}
        value={value}
        onChange={handleChange}
        aria-label='simple tabs example'
      >
        <Tab
          sx={{ textTransform: 'capitalize' }}
          label='Recommendation'
          {...a11yProps(0)}
        />
        <Tab
          sx={{ textTransform: 'capitalize' }}
          label={`View ${fullName}’s Credential`}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Form />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ComprehensiveClaimDetails
          params={{ credentialData }}
          setFullName={setFullName}
          setEmail={() => {}}
          setFileID={setFileID}
          claimId={fileID}
        />
      </TabPanel>
    </Box>
  )
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

export default TabsComponent
