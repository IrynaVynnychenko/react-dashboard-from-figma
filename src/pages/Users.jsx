import { useState } from 'react'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ShieldCheck,
  UserX,
  Edit,
  Trash2
} from 'lucide-react'
import clsx from 'clsx'

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15',
      avatar: 'JD',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      status: 'active',
      lastLogin: '2024-01-14',
      avatar: 'JS',
      phone: '+1 (555) 234-5678',
      location: 'Los Angeles, CA',
      joinDate: '2023-03-20'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'Moderator',
      status: 'inactive',
      lastLogin: '2024-01-10',
      avatar: 'BJ',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      joinDate: '2023-02-10'
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: 'User',
      status: 'active',
      lastLogin: '2024-01-15',
      avatar: 'AB',
      phone: '+1 (555) 456-7890',
      location: 'Miami, FL',
      joinDate: '2023-04-05'
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie.wilson@example.com',
      role: 'User',
      status: 'pending',
      lastLogin: '2024-01-12',
      avatar: 'CW',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA',
      joinDate: '2023-05-15'
    },
    {
      id: 6,
      name: 'Diana Lee',
      email: 'diana.lee@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15',
      avatar: 'DL',
      phone: '+1 (555) 678-9012',
      location: 'Boston, MA',
      joinDate: '2023-01-01'
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    return statusConfig[status] || 'bg-gray-100 text-gray-800'
  }

  const getRoleIcon = (role) => {
    return role === 'Admin' ? Shield : role === 'Moderator' ? ShieldCheck : UserX
  }

  const getRoleColor = (role) => {
    const roleConfig = {
      Admin: 'bg-red-100 text-red-800',
      Moderator: 'bg-blue-100 text-blue-800',
      User: 'bg-green-100 text-green-800'
    }
    return roleConfig[role] || 'bg-gray-100 text-gray-800'
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  const stats = [
    { label: 'Total Users', value: users.length, color: 'text-blue-600' },
    { label: 'Active Users', value: users.filter(u => u.status === 'active').length, color: 'text-green-600' },
    { label: 'Pending Users', value: users.filter(u => u.status === 'pending').length, color: 'text-yellow-600' },
    { label: 'Admins', value: users.filter(u => u.role === 'Admin').length, color: 'text-red-600' }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage your users and their permissions</p>
        </div>
        <button className="btn btn-primary mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card p-4">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className={clsx('text-2xl font-bold', stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters and search */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Role filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="role">Sort by Role</option>
            <option value="status">Sort by Status</option>
            <option value="lastLogin">Sort by Last Login</option>
          </select>

          <button className="btn btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Users table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role)
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-800">
                            {user.avatar}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getRoleColor(user.role)
                      )}>
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        getStatusBadge(user.status)
                      )}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone className="w-3 h-3 mr-1" />
                          {user.phone}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {user.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {user.lastLogin}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                <span className="font-medium">{users.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
