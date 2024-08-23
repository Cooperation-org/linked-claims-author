import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import FetchedData from '../../Recommendations/[credntialData]/viewCredential/FetchedData'
import Form from '../../Recommendations/[credntialData]/RecommandationForm/Form'

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
  setactivStep: (step: number) => void
  activeStep: number
  fullName: string
  setFullName: (name: string) => void
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  setactivStep,
  activeStep,
  fullName,
  setFullName
}) => {
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
          label={`View ${fullName}’s Credential`}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Form activeStep={activeStep} setActiveStep={setactivStep} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FetchedData setFullName={setFullName} />
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
