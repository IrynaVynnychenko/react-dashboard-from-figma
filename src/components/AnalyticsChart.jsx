import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

const AnalyticsChart = () => {
  // Sample data for the chart
  const data = [
    { name: 'Jan', users: 4000, revenue: 2400, orders: 2400 },
    { name: 'Feb', users: 3000, revenue: 1398, orders: 2210 },
    { name: 'Mar', users: 2000, revenue: 9800, orders: 2290 },
    { name: 'Apr', users: 2780, revenue: 3908, orders: 2000 },
    { name: 'May', users: 1890, revenue: 4800, orders: 2181 },
    { name: 'Jun', users: 2390, revenue: 3800, orders: 2500 },
    { name: 'Jul', users: 3490, revenue: 4300, orders: 2100 },
    { name: 'Aug', users: 3000, revenue: 3900, orders: 2200 },
    { name: 'Sep', users: 4200, revenue: 5200, orders: 2800 },
    { name: 'Oct', users: 3800, revenue: 4800, orders: 2600 },
    { name: 'Nov', users: 4500, revenue: 6000, orders: 3000 },
    { name: 'Dec', users: 5000, revenue: 6500, orders: 3200 },
  ]

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#d946ef" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis 
            dataKey="name" 
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px'
            }}
          />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="#0ea5e9"
            fill="url(#colorUsers)"
            strokeWidth={3}
            name="Users"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stackId="2"
            stroke="#22c55e"
            fill="url(#colorRevenue)"
            strokeWidth={3}
            name="Revenue"
          />
          <Area
            type="monotone"
            dataKey="orders"
            stackId="3"
            stroke="#d946ef"
            fill="url(#colorOrders)"
            strokeWidth={3}
            name="Orders"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AnalyticsChart
