'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ComprehensiveClaimDetails from './ComprehensiveClaimDetails'
const ClaimPage = () => {
  const params = useParams()
  const id =
    typeof params?.id === 'string'
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : undefined

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
        claimId: `https://drive.google.com/file/d/${id}/view`
      }}
      setFullName={() => {}}
      setEmail={() => {}}
      setFileID={() => {}}
      claimId={id}
    />
  )
}

export default ClaimPage
