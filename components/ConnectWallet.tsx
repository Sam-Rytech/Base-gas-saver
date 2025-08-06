'use client'
import { useState } from 'react'
import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ConnectWallet({
  onConnect,
}: {
  onConnect: (address: string, signer: any) => void
}) {
  const [address, setAddress] = useState('')

  const connect = async () => {
    if (!window.ethereum) return alert('Install MetaMask!')

    const provider = new ethers.BrowserProvider(window.ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const userAddress = accounts[0]

    setAddress(userAddress)
    onConnect(userAddress, signer)
  }

  return (
    <button
      onClick={connect}
      className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
    >
      {address ? `Connected: ${address.slice(0, 6)}...` : 'Connect Wallet'}
    </button>
  )
}
