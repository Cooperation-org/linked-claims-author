'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ComprehensiveClaimDetails from './ComprehensiveClaimDetails'
const ClaimPage = () => {
  const params = useParams()
  const credentialData = Array.isArray(params?.credentialData)
    ? params.credentialData[0]
    : params?.credentialData
  console.log('credentialData in ClaimPage:', credentialData)
  if (!credentialData) {
    return (
      <div>
        <h2>Error: Missing credential data.</h2>
      </div>
    )
  }
  return (
    <ComprehensiveClaimDetails
      params={{
        credentialData
      }}
      setFullName={() => {}}
      setEmail={() => {}}
      setFileID={() => {}}
      claimId={''}
    />
  )
}

export default ClaimPage
