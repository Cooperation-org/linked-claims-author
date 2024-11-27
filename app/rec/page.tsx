'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import useGoogleDrive from '../hooks/useGoogleDrive'
import { getVCWithRecommendations } from '@cooperation/vc-storage'

const Page = () => {
  const params = useSearchParams()
  const { storage } = useGoogleDrive()
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const recId = params.get('recId')
  const vcId = params.get('vcId')
  useEffect(() => {
    const fetchRecomedation = async () => {
      if (!recId || !storage) {
        console.log('No recommendation file recId')
        return
      }
      const recommendation = await storage.retrieve(recId as string)
      setRecommendation(recommendation)
      console.log('Recommendation file recId:', recId)
    }
    fetchRecomedation()
  }, [recId, storage])
  const handleApprove = async () => {
    try {
      if (!vcId || !storage) {
        console.log('No recommendation file id')
        return
      }
      const master = await getVCWithRecommendations({
        vcId: vcId as string,
        storage
      })
      console.log('🚀 ~ handleApprove ~ master:', master)
      const updated = await storage.updateRelationsFile({
        relationsFileId: master.relationsFileId,
        recommendationFileId: recId as string
      })
    } catch (error) {
      console.error('Error approving recommendation:', error)
    }

    console.log('Approve recommendation')
  }
  return (
    <div>
      <h1>Rview the recommendation</h1>
      <p>{JSON.stringify(recommendation)}</p>

      <button onClick={handleApprove}>Approve</button>
      <br />
      <button>Reject</button>
    </div>
  )
}

export default Page
