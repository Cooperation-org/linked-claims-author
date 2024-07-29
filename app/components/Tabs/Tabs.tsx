import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import FetchedData from '../../Recommandations/[credntialData]/viewCredential/FetchedData'
import Form from '../../Recommandations/[credntialData]/RecommandationForm/Form'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const TabsComponent = ({
  setactivStep,
  activeStep
}: {
  setactivStep: any
  activeStep: any
}) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
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
          label='View Alice’s Credential'
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Form activeStep={activeStep} setActiveStep={setactivStep} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FetchedData />
      </TabPanel>
    </Box>
  )
}

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any }) {
  const { children, value, index, ...other } = props

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
