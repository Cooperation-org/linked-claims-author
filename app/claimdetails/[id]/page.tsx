'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ComprehensiveClaimDetails from '../../view/[id]/ComprehensiveClaimDetails'
const ClaimPage = () => {
  const params = useParams()
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
  return <ComprehensiveClaimDetails />
}

export default ClaimPage
