import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Eye,
  MousePointer,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import AnalyticsChart from '../components/AnalyticsChart'

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  // Sample metrics data
  const metrics = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Orders',
      value: '2,847',
      change: '-2.1%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Page Views',
      value: '156,789',
      change: '+15.3%',
      trend: 'up',
      icon: Eye,
      color: 'bg-orange-500'
    },
    {
      title: 'Click Rate',
      value: '3.2%',
      change: '+0.5%',
      trend: 'up',
      icon: MousePointer,
      color: 'bg-pink-500'
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      change: '-1.2%',
      trend: 'down',
      icon: Clock,
      color: 'bg-indigo-500'
    }
  ]

  const periodOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">
            Track your performance and insights across all metrics
          </p>
        </div>
        
        {/* Period Selector */}
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const isPositive = metric.trend === 'up'
          
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Analytics Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
            </div>
          </div>
          <AnalyticsChart />
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <PieChart className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Conversion Funnel</h2>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Visitors', value: 10000, percentage: 100, color: 'bg-blue-500' },
              { label: 'Leads', value: 2500, percentage: 25, color: 'bg-green-500' },
              { label: 'Trial Users', value: 750, percentage: 7.5, color: 'bg-yellow-500' },
              { label: 'Customers', value: 150, percentage: 1.5, color: 'bg-purple-500' }
            ].map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{step.label}</span>
                  <span className="text-sm text-gray-600">{step.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${step.color} transition-all duration-300`}
                    style={{ width: `${step.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{step.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Activity className="w-5 h-5 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Real-time Activity</h2>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'Made a purchase', time: '2 minutes ago', amount: '$99.99' },
            { user: 'Sarah Wilson', action: 'Signed up', time: '5 minutes ago', amount: null },
            { user: 'Mike Johnson', action: 'Added to cart', time: '8 minutes ago', amount: '$49.99' },
            { user: 'Emily Brown', action: 'Viewed product', time: '12 minutes ago', amount: null },
            { user: 'David Lee', action: 'Completed checkout', time: '15 minutes ago', amount: '$149.99' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-white">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.amount && (
                  <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                )}
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics
