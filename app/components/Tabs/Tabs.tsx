import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import Form from '../../recommendations/[id]/RecommandationForm/Form'
import FetchedData from '../../recommendations/[id]/viewCredential/FetchedData'

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

const TabsComponent = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
          label={`View ${'fullName'}’s Credential`}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Form />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FetchedData />
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
