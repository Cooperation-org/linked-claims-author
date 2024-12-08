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
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'Lato',
          color: '#202E5B'
        }}
      >
        No further action is required.
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
          fontFamily: 'Roboto',
          textDecoration: 'underline',
          fontWeight: '600',
          lineHeight: '16px',
          fontSize: '16px',
          mt: 2
        }}
        variant='text'
      >
        Back
      </Button>
      <Button
        onClick={() => (window.location.href = '/')}
        startIcon={<HomeIcon />}
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
        Home
      </Button>
    </Box>
  )
}

export default DeclineRequest
// 'use client'

// import React, { useState } from 'react'
// import { Box, Button, Typography, Snackbar, Alert } from '@mui/material'
// import ContentCopyIcon from '@mui/icons-material/ContentCopy'

// interface DeclineRequestProps {
//   fullName: string
//   email: string
//   handleBack: () => void
// }
//
// const DeclineRequest: React.FC<DeclineRequestProps> = ({
//   fullName,
//   email,
//   handleBack
// }) => {
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const [snackbarMessage, setSnackbarMessage] = useState('')
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
//
//   const emailSubject = `Unable to Provide Recommendation at this Time`
//   const emailBody = `Hi ${fullName},\n\nI'm currently unable to provide a recommendation. I apologize for the inconvenience.\n\nBest regards.`
//
//   const showNotification = (message: string, severity: 'success' | 'error') => {
//     setSnackbarMessage(message)
//     setSnackbarSeverity(severity)
//     setSnackbarOpen(true)
//   }
//
//   const copyToClipboard = async (text: string, type: string) => {
//     try {
//       await navigator.clipboard.writeText(text)
//       showNotification(`${type} copied to clipboard!`, 'success')
//     } catch (err) {
//       showNotification('Failed to copy text', 'error')
//     }
//   }
//
//   const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === 'clickaway') return
//     setSnackbarOpen(false)
//   }

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         maxWidth: '600px',
//         margin: '0 auto',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '20px',
//         padding: '30px',
//         mt: '30px',
//         textAlign: 'center',
//         border: '1px solid #ccc',
//         borderRadius: '8px',
//         boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: '24px',
//           fontWeight: '700',
//           fontFamily: 'Lato',
//           color: '#202E5B'
//         }}
//       >
//         No further action is required.
//       </Typography>

//       <Box
//         sx={{
//           backgroundColor: '#f5f5f5',
//           borderRadius: '8px',
//           p: 3,
//           textAlign: 'left'
//         }}
//       >
//         <Typography
//           sx={{
//             fontFamily: 'Lato',
//             fontSize: '16px',
//             mb: 3,
//             fontWeight: 600,
//             color: '#202E5B'
//           }}
//         >
//           Follow these steps:
//         </Typography>
//
//         <ol
//           style={{
//             marginBottom: '20px',
//             paddingLeft: '20px',
//             color: '#202E5B',
//             fontFamily: 'Lato'
//           }}
//         >
//           <li style={{ marginBottom: '8px' }}>
//             Copy the email address by clicking the copy icon
//           </li>
//           <li style={{ marginBottom: '8px' }}>
//             Copy the message by clicking the copy icon
//           </li>
//           <li style={{ marginBottom: '8px' }}>Open your preferred email application</li>
//           <li>Paste the message and send it to the copied email address</li>
//         </ol>
//
//         {/* Email Box */}
//         <Box sx={{ mb: 3 }}>
//           <Typography
//             sx={{
//               fontSize: '14px',
//               fontWeight: 500,
//               color: '#666',
//               mb: 1
//             }}
//           >
//             Email Address:
//           </Typography>
//           <Box
//             sx={{
//               backgroundColor: 'white',
//               p: 2,
//               borderRadius: '4px',
//               position: 'relative',
//               border: '1px solid #e0e0e0'
//               // cursor: 'pointer'
//             }}
//           >
//             <Typography
//               sx={{
//                 fontFamily: 'Lato',
//                 color: '#333',
//                 fontSize: '14px'
//               }}
//             >
//               {email}
//             </Typography>
//             <Box
//               onClick={() => copyToClipboard(email, 'Email address')}
//               sx={{
//                 position: 'absolute',
//                 right: '12px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 cursor: 'pointer',
//                 padding: '8px',
//                 borderRadius: '4px',
//                 pl: '8px',
//                 '&:hover': {
//                   backgroundColor: 'rgba(0, 0, 0, 0.04)'
//                 }
//               }}
//             >
//               <ContentCopyIcon sx={{ color: '#666' }} />
//             </Box>
//           </Box>
//         </Box>

//         {/* Subject Box */}
//         <Box sx={{ mb: 3 }}>
//           <Typography
//             sx={{
//               fontSize: '14px',
//               fontWeight: 500,
//               color: '#666',
//               mb: 1
//             }}
//           >
//             Subject:
//           </Typography>
//           <Box
//             sx={{
//               backgroundColor: 'white',
//               p: 2,
//               borderRadius: '4px',
//               position: 'relative',
//               border: '1px solid #e0e0e0'
//               // cursor: 'pointer'
//             }}
//           >
//             <Typography
//               sx={{
//                 fontFamily: 'Lato',
//                 color: '#333',
//                 fontSize: '14px'
//               }}
//             >
//               {emailSubject}
//             </Typography>
//             <Box
//               onClick={() => copyToClipboard(emailSubject, 'Subject')}
//               sx={{
//                 position: 'absolute',
//                 right: '12px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 cursor: 'pointer',
//                 padding: '8px',
//                 borderRadius: '4px',

//                 '&:hover': {
//                   backgroundColor: 'rgba(0, 0, 0, 0.04)'
//                 }
//               }}
//             >
//               <ContentCopyIcon sx={{ color: '#666' }} />
//             </Box>
//           </Box>
//         </Box>

//         {/* Message Box */}
//         <Box>
//           <Typography
//             sx={{
//               fontSize: '14px',
//               fontWeight: 500,
//               color: '#666',
//               mb: 1
//             }}
//           >
//             Message:
//           </Typography>
//           <Box
//             sx={{
//               backgroundColor: 'white',
//               p: 2,
//               borderRadius: '4px',
//               position: 'relative',
//               border: '1px solid #e0e0e0'
//               // cursor: 'pointer'
//             }}
//           >
//             <Typography
//               sx={{
//                 whiteSpace: 'pre-wrap',
//                 fontFamily: 'Lato',
//                 color: '#333',
//                 fontSize: '14px'
//               }}
//             >
//               {emailBody}
//             </Typography>
//             <Box
//               onClick={() => copyToClipboard(emailBody, 'Message')}
//               sx={{
//                 position: 'absolute',
//                 right: '12px',
//                 top: '12px',
//                 cursor: 'pointer',
//                 padding: '8px',
//                 borderRadius: '4px',
//                 '&:hover': {
//                   backgroundColor: 'rgba(0, 0, 0, 0.04)'
//                 }
//               }}
//             >
//               <ContentCopyIcon sx={{ color: '#666' }} />
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <Button
//         onClick={handleBack}
//         sx={{
//           padding: '10px 24px',
//           borderRadius: '100px',
//           fontFamily: 'Roboto',
//           textTransform: 'capitalize',
//           fontSize: '16px',
//           width: '100%',
//           backgroundColor: '#FF6347',
//           color: '#fff',
//           '&:hover': {
//             backgroundColor: '#FF4500'
//           }
//         }}
//       >
//         Back
//       </Button>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbarSeverity}
//           sx={{ width: '100%' }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   )
// }

// export default DeclineRequest
