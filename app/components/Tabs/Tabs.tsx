'use client'

import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
// import { useParams } from 'next/navigation'
import ComprehensiveClaimDetails from '../../view/[id]/ComprehensiveClaimDetails'
import Form from '../../recommendations/[id]/RecommandationForm/Form'

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
  email: string
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  fullName,
  // setFullName,
  email
}) => {
  const [value, setValue] = useState(0)
  // const [fileID, setFileID] = useState<string | null>(null)
  // const params = useParams()
  // const id =
  //   typeof params?.id === 'string'
  //     ? params.id
  //     : Array.isArray(params?.id)
  //       ? params.id[0]
  //       : undefined

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ minHeight: '100%', mt: '10px', width: '100%' }}>
      <Tabs
        sx={{ width: '100%', pl: '20px', maxWidth: '720px' }}
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
        <Form fullName={fullName} email={email} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ComprehensiveClaimDetails />
      </TabPanel>
    </Box>
  )
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={false}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ display: value === index ? 'block' : 'none' }}
      {...other}
    >
      {children}
    </div>
  )
}

export default TabsComponent
