'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Box, Typography } from '@mui/material'
import { useSession, signIn } from 'next-auth/react'
import { signAndSave } from '../../utils/googleDrive'

export default function ProcessCredential() {
 const searchParams = useSearchParams()
 const url = searchParams.get('url')
 const [status, setStatus] = useState<string>('Loading...')
 const [error, setError] = useState<string | null>(null)

 useEffect(() => {
   const processUrl = async () => {
     if (!url) {
       setError('No URL provided')
       return
     }

     try {
       const response = await fetch(url)
       if (!response.ok) {
         setError(`Failed to fetch URL: ${response.statusText}`)
         return
       }

       // Get the content as text first
       const content = await response.text()

       try {
         // Try to parse as JSON
         const jsonData = JSON.parse(content)
         // If we get here, it's valid JSON
         setStatus('Processing JSON content...')


         const accessToken = session?.accessToken
         await signAndSave(accessToken, jsonData)
         
       } catch (jsonError) {
         // Not JSON, handle as non-JSON
         setStatus('Processing non-JSON content...')
         // Insert your non-JSON handling function here
         // await handleNonJsonContent(content)
       }

     } catch (fetchError) {
       setError(`Failed to process URL: ${fetchError.message}`)
     }
   }

   processUrl()
 }, [url])

 return (
   <Box
     sx={{
       mt: '20px',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       gap: '32px'
     }}
   >
     <Typography sx={{ fontFamily: 'Lato', fontSize: '24px', fontWeight: 400 }}>
       Processing Credential
     </Typography>
     
     {error ? (
       <Typography color="error" sx={{ fontFamily: 'Lato' }}>
         {error}
       </Typography>
     ) : (
       <Typography sx={{ fontFamily: 'Lato' }}>
         {status}
       </Typography>
     )}
     
     <Typography sx={{ fontFamily: 'Lato', fontSize: '16px' }}>
       URL: {url}
     </Typography>
   </Box>
 )
}
