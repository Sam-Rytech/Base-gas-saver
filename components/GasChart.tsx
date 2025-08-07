'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type GasEntry = {
  time: string
  price: number
}

export default function GasChart({ data }: { data: GasEntry[] }) {
  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} unit=" gwei" />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)} gwei`} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
