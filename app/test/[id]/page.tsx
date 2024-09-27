'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ComprehensiveClaimDetails from './ComprehensiveClaimDetails'
const ClaimPage = () => {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  console.log('id in ClaimPage:', id)
  if (!id) {
    return (
      <div>
        <h2>Error: Missing credential data.</h2>
      </div>
    )
  }
  return (
    <ComprehensiveClaimDetails
      params={{
        id
      }}
      setFullName={() => {}}
      setEmail={() => {}}
      setFileID={() => {}}
      id={''}
    />
  )
}

export default ClaimPage
