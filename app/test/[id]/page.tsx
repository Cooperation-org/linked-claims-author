'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import ComprehensiveClaimDetails from './ComprehensiveClaimDetails'
const ClaimPage = () => {
  const params = useParams()
  const [fullName, setFullName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [fileID, setFileID] = useState<string | null>(null)
  const id =
    typeof params?.id === 'string'
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : undefined

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
      setFullName={setFullName}
      setEmail={setEmail}
      setFileID={setFileID}
      claimId={id}
    />
  )
}

export default ClaimPage
