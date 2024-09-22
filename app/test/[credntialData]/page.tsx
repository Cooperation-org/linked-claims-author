'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ComprehensiveClaimDetails from '../[credntialData]/ComprehensiveClaimDetails'
const ClaimPage = () => {
  const params = useParams()
  const credntialData = Array.isArray(params?.credntialData)
    ? params.credntialData[0]
    : params?.credntialData
  console.log('credntialData in ClaimPage:', credntialData)
  if (!credntialData) {
    return (
      <div>
        <h2>Error: Missing credential data.</h2>
      </div>
    )
  }
  return <ComprehensiveClaimDetails params={{ credntialData }} />
}

export default ClaimPage
