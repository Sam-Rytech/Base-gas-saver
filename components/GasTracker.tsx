'use client'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import GasChart from './GasChart'

const BASE_RPC = 'https://mainnet.base.org'

type GasEntry = {
  time: string
  price: number
}

export default function GasTracker() {
  const [currentGas, setCurrentGas] = useState<string>('...')
  const [gasHistory, setGasHistory] = useState<GasEntry[]>([])
  const [cheapest, setCheapest] = useState<GasEntry | null>(null)

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider(BASE_RPC)

    const fetchGas = async () => {
      try {
        const gasHex = await provider.send('eth_gasPrice', [])
        const gas = BigInt(gasHex)
        const gwei = +ethers.formatUnits(gas, 'gwei')
        const timestamp = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        const newEntry = { time: timestamp, price: gwei }

        setCurrentGas(gwei.toFixed(2))

        setGasHistory((prev) => {
          const updated = [...prev, newEntry].slice(-60) // Keep last 60 mins
          const cheapestNow = updated.reduce((min, p) =>
            p.price < min.price ? p : min
          )
          setCheapest(cheapestNow)
          return updated
        })
      } catch (err) {
        console.error('Gas fetch error', err)
      }
    }

    fetchGas() // initial fetch
    const interval = setInterval(fetchGas, 60_000) // every 1 min

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-xl shadow-lg text-center">
      <h2 className="text-xl font-semibold mb-2">📡 Live Gas Price</h2>
      <p className="text-3xl text-blue-600">{currentGas} gwei</p>

      <h3 className="mt-6 text-lg font-semibold">⏱️ Cheapest in Last Hour</h3>
      {cheapest ? (
        <p className="text-green-600 text-xl font-bold mt-2">
          {cheapest.time} — {cheapest.price.toFixed(2)} gwei
        </p>
      ) : (
        <p>Loading...</p>
      )}

      <GasChart data={gasHistory} />

      <p className="text-sm text-gray-500 mt-4">
        Tracking for {gasHistory.length} minute{gasHistory.length !== 1 && 's'}
      </p>
    </div>
  )
}
