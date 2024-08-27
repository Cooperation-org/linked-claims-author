'use client'
import { useState } from 'react'
import { ethers } from 'ethers'

export const useMetaMask = () => {
  const [address, setAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getMetaMaskAddress = async () => {
    setLoading(true)
    setError('Check your metamask...')
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Request MetaMask account access
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        // Get the user's MetaMask address
        const address = await signer.getAddress()
        setAddress(address)
      } else {
        setError('MetaMask not installed')
      }
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected the request
        setError(
          'you cannot continue without connecting to MetaMask, please use another option!'
        )
      } else {
        setError('MetaMask address could not be retrieved')
      }
      setAddress(null)
    } finally {
      setLoading(false)
    }
  }

  // if user click Cancel button in metamask use this function to reset the state
  const reset = () => {
    setAddress(null)
    setError(null)
    setLoading(false)
  }

  return { address, error, loading, getMetaMaskAddress, reset }
}
