import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { CircularProgress, Box } from '@mui/material'

const ClaimsPageClient = dynamic(() => import('./ClaimsPageClient'), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <CircularProgress />
    </Box>
  )
})

export default function ClaimsPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      }
    >
      <ClaimsPageClient />
    </Suspense>
  )
}
