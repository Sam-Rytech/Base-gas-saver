import ConnectWallet from '../components/ConnectWallet'
import GasTracker from '../components/GasTracker'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">⛽ BaseGasSaver</h1>
      <ConnectWallet onConnect={() => {}} />
      <GasTracker />
    </main>
  )
}
