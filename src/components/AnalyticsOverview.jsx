import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import clsx from 'clsx'
import { TrendingUp, TrendingDown } from 'lucide-react'

const CHART_DATA = [
  { month: 'Jan', revenue: 32400, users: 2100, sessions: 8400 },
  { month: 'Feb', revenue: 29800, users: 1980, sessions: 7900 },
  { month: 'Mar', revenue: 35600, users: 2340, sessions: 9200 },
  { month: 'Apr', revenue: 38200, users: 2510, sessions: 10100 },
  { month: 'May', revenue: 36800, users: 2420, sessions: 9800 },
  { month: 'Jun', revenue: 42100, users: 2680, sessions: 11200 },
  { month: 'Jul', revenue: 44500, users: 2790, sessions: 11800 },
  { month: 'Aug', revenue: 43200, users: 2720, sessions: 11500 },
  { month: 'Sep', revenue: 47800, users: 3010, sessions: 12400 },
  { month: 'Oct', revenue: 51200, users: 3180, sessions: 13100 },
  { month: 'Nov', revenue: 54600, users: 3350, sessions: 13800 },
  { month: 'Dec', revenue: 58900, users: 3520, sessions: 14500 },
]

export const PERIOD_OPTIONS = [
  { value: '12m', label: 'Last 12 months', months: 12 },
  { value: '6m', label: 'Last 6 months', months: 6 },
  { value: '3m', label: 'Last 3 months', months: 3 },
]

const METRICS = [
  {
    key: 'revenue',
    label: 'Revenue',
    color: '#a855f7',
    gradientFrom: '#c084fc',
    gradientTo: '#f472b6',
    formatFull: (v) => `$${v.toLocaleString()}`,
    summaryFormat: (v) => `$${(v / 1000).toFixed(1)}k`,
  },
  {
    key: 'users',
    label: 'Users',
    color: '#0ea5e9',
    gradientFrom: '#38bdf8',
    gradientTo: '#818cf8',
    formatFull: (v) => v.toLocaleString(),
    summaryFormat: (v) => v.toLocaleString(),
  },
  {
    key: 'sessions',
    label: 'Sessions',
    color: '#f97316',
    gradientFrom: '#fb923c',
    gradientTo: '#f472b6',
    formatFull: (v) => v.toLocaleString(),
    summaryFormat: (v) => v.toLocaleString(),
  },
]

const formatYAxis = (value, metricKey) => {
  if (metricKey === 'revenue') return `$${Math.round(value / 1000)}k`
  return `${Math.round(value / 1000)}k`
}

const ChartTooltip = ({ active, payload, label, activeMetric }) => {
  if (!active || !payload?.length) return null

  const metric = METRICS.find((m) => m.key === activeMetric)
  const value = payload[0]?.value

  return (
    <div className="rounded-xl border border-white/40 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">
        {metric?.formatFull(value)}
      </p>
      <p className="text-xs text-gray-500">{metric?.label}</p>
    </div>
  )
}

const AnalyticsOverview = ({ period = '12m' }) => {
  const [activeMetric, setActiveMetric] = useState('revenue')

  const chartData = useMemo(() => {
    const months = PERIOD_OPTIONS.find((p) => p.value === period)?.months ?? 12
    return CHART_DATA.slice(-months)
  }, [period])

  const summary = useMemo(() => {
    const metric = METRICS.find((m) => m.key === activeMetric)
    const values = chartData.map((d) => d[activeMetric])
    const total = values.reduce((sum, v) => sum + v, 0)
    const latest = values[values.length - 1] ?? 0
    const previous = values[values.length - 2] ?? latest
    const change = previous ? ((latest - previous) / previous) * 100 : 0

    return { total, metric, isPositive: change >= 0, change }
  }, [chartData, activeMetric])

  const activeConfig = METRICS.find((m) => m.key === activeMetric)
  const periodLabel = PERIOD_OPTIONS.find((p) => p.value === period)?.label

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Total {activeConfig?.label}
            <span className="ml-2 text-xs font-normal text-gray-400">{periodLabel}</span>
          </p>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-3xl font-bold tracking-tight text-gray-900">
              {summary.metric?.summaryFormat(summary.total)}
            </span>
            <span
              className={clsx(
                'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
                summary.isPositive
                  ? 'bg-success-100 text-success-700'
                  : 'bg-red-100 text-red-700'
              )}
            >
              {summary.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {summary.isPositive ? '+' : ''}
              {summary.change.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {METRICS.map((metric) => (
            <button
              key={metric.key}
              type="button"
              onClick={() => setActiveMetric(metric.key)}
              className={clsx(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
                activeMetric === metric.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="overviewGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={activeConfig?.gradientFrom} stopOpacity={0.35} />
                <stop offset="100%" stopColor={activeConfig?.gradientTo} stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(v) => formatYAxis(v, activeMetric)}
              width={48}
            />

            <Tooltip
              content={<ChartTooltip activeMetric={activeMetric} />}
              cursor={{
                stroke: activeConfig?.color,
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
            />

            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={activeConfig?.color}
              strokeWidth={2.5}
              fill="url(#overviewGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: activeConfig?.color,
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AnalyticsOverview
