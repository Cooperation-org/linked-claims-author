'use client'

import React, { useEffect, useState } from 'react'
import useGoogleDrive from '../hooks/useGoogleDrive'
import { getVCWithRecommendations } from '@cooperation/vc-storage'

const Page = () => {
  const { storage } = useGoogleDrive()
  const [recommendation, setRecommendation] = useState<{
    name: string
    data: any
    id: string
  } | null>()

  const getQueryParams = (key: string) => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return params.get(key)
    }
    return null
  }

  const recId = getQueryParams('recId')
  const vcId = getQueryParams('vcId')

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!recId || !storage) {
        console.log('No recommendation file recId')
        return
      }
      const recommendation = await storage.retrieve(recId as string)
      setRecommendation(recommendation)
      console.log('Recommendation file recId:', recId)
    }
    fetchRecommendation()
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
      await storage.updateRelationsFile({
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
      <h1>Review the recommendation</h1>
      <p>{JSON.stringify(recommendation)}</p>
      <button onClick={handleApprove}>Approve</button>
      <br />
      <button>Reject</button>
    </div>
  )
}

export default Page
