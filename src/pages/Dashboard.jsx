import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import clsx from 'clsx'
import AnalyticsChart from '../components/AnalyticsChart'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,650',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-success-500 to-success-600'
    },
    {
      title: 'Growth',
      value: '23.4%',
      change: '-2.1%',
      changeType: 'negative',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-secondary-500 to-secondary-600'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+5.3%',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-gradient-to-br from-accent-500 to-accent-600'
    }
  ]

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'created a new project', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'updated user profile', time: '5 minutes ago' },
    { id: 3, user: 'Bob Johnson', action: 'completed task', time: '10 minutes ago' },
    { id: 4, user: 'Alice Brown', action: 'uploaded new file', time: '15 minutes ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={clsx('p-3 rounded-full', stat.color)}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="w-4 h-4 text-success-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={clsx(
                  'ml-1 text-sm font-medium',
                  stat.changeType === 'positive' ? 'text-success-600' : 'text-red-600'
                )}>
                  {stat.change}
                </span>
                <span className="ml-2 text-sm text-dark-500">vs last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Analytics Overview</h3>
            <div className="flex items-center space-x-4">
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 outline-none">
                <option>Last 12 months</option>
                <option>Last 6 months</option>
                <option>Last 3 months</option>
              </select>
            </div>
          </div>
          <AnalyticsChart />
        </div>

        {/* Recent activity */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-purple-800">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium">
            View all activity
          </button>
        </div>
      </div>

      {/* Additional content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="btn btn-primary">Add User</button>
            <button className="btn btn-secondary">Create Project</button>
            <button className="btn btn-secondary">Generate Report</button>
            <button className="btn btn-secondary">Send Message</button>
          </div>
        </div>

        {/* System status */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-600">Server Status</span>
              <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-600">Database</span>
              <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-600">API Response</span>
              <span className="px-2 py-1 text-xs font-medium bg-warning-100 text-warning-800 rounded-full">
                245ms
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
