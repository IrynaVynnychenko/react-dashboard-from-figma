import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { USERS } from '../data/users'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Plus,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ShieldCheck,
  UserX,
  Edit,
  Trash2,
  X
} from 'lucide-react'
import clsx from 'clsx'

const DEFAULT_ADVANCED_FILTERS = {
  status: 'all',
  location: 'all',
  joinDateFrom: '',
  joinDateTo: '',
  lastLoginFrom: '',
  lastLoginTo: '',
}

const matchesDateRange = (date, from, to) => {
  if (from && date < from) return false
  if (to && date > to) return false
  return true
}

const Users = () => {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') ?? '')
  const [filterRole, setFilterRole] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState(DEFAULT_ADVANCED_FILTERS)

  useEffect(() => {
    setSearchTerm(searchParams.get('q') ?? '')
  }, [searchParams])

  const users = USERS

  const locations = useMemo(
    () => [...new Set(users.map((user) => user.location))].sort(),
    [users]
  )

  const advancedFilterCount = useMemo(() => {
    let count = 0
    if (advancedFilters.status !== 'all') count++
    if (advancedFilters.location !== 'all') count++
    if (advancedFilters.joinDateFrom) count++
    if (advancedFilters.joinDateTo) count++
    if (advancedFilters.lastLoginFrom) count++
    if (advancedFilters.lastLoginTo) count++
    return count
  }, [advancedFilters])

  const updateAdvancedFilter = (key, value) => {
    setAdvancedFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearAdvancedFilters = () => {
    setAdvancedFilters(DEFAULT_ADVANCED_FILTERS)
  }

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

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole =
        filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase()
      const matchesStatus =
        advancedFilters.status === 'all' || user.status === advancedFilters.status
      const matchesLocation =
        advancedFilters.location === 'all' || user.location === advancedFilters.location
      const matchesJoinDate = matchesDateRange(
        user.joinDate,
        advancedFilters.joinDateFrom,
        advancedFilters.joinDateTo
      )
      const matchesLastLogin = matchesDateRange(
        user.lastLogin,
        advancedFilters.lastLoginFrom,
        advancedFilters.lastLoginTo
      )

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesLocation &&
        matchesJoinDate &&
        matchesLastLogin
      )
    })
  }, [users, searchTerm, filterRole, advancedFilters])

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      switch (sortBy) {
        case 'role':
          return a.role.localeCompare(b.role)
        case 'status':
          return a.status.localeCompare(b.status)
        case 'lastLogin':
          return b.lastLogin.localeCompare(a.lastLogin)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })
  }, [filteredUsers, sortBy])

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
          <div className="flex-1 input-search-wrap">
            <Search className="input-search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-search"
            />
          </div>

          {/* Role filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="select"
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
            className="select"
          >
            <option value="name">Sort by Name</option>
            <option value="role">Sort by Role</option>
            <option value="status">Sort by Status</option>
            <option value="lastLogin">Sort by Last Login</option>
          </select>

          <button
            type="button"
            onClick={() => setShowMoreFilters((prev) => !prev)}
            className={clsx(
              'btn btn-secondary relative',
              (showMoreFilters || advancedFilterCount > 0) && 'ring-2 ring-purple-300 dark:ring-purple-700'
            )}
          >
            <Filter className="w-4 h-4 mr-2" />
            More Filters
            {advancedFilterCount > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-purple-500 px-1.5 text-xs font-semibold text-white">
                {advancedFilterCount}
              </span>
            )}
          </button>
        </div>

        {showMoreFilters && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-sm font-medium text-gray-900">Advanced Filters</h3>
              {advancedFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAdvancedFilters}
                  className="inline-flex items-center text-xs font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  <X className="mr-1 h-3.5 w-3.5" />
                  Clear filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">Status</label>
                <select
                  value={advancedFilters.status}
                  onChange={(e) => updateAdvancedFilter('status', e.target.value)}
                  className="select w-full"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">Location</label>
                <select
                  value={advancedFilters.location}
                  onChange={(e) => updateAdvancedFilter('location', e.target.value)}
                  className="select w-full"
                >
                  <option value="all">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">Join Date From</label>
                <input
                  type="date"
                  value={advancedFilters.joinDateFrom}
                  onChange={(e) => updateAdvancedFilter('joinDateFrom', e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">Join Date To</label>
                <input
                  type="date"
                  value={advancedFilters.joinDateTo}
                  onChange={(e) => updateAdvancedFilter('joinDateTo', e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">Last Login From</label>
                <input
                  type="date"
                  value={advancedFilters.lastLoginFrom}
                  onChange={(e) => updateAdvancedFilter('lastLoginFrom', e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">Last Login To</label>
                <input
                  type="date"
                  value={advancedFilters.lastLoginTo}
                  onChange={(e) => updateAdvancedFilter('lastLoginTo', e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </div>
        )}
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
              {sortedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    No users match your search
                  </td>
                </tr>
              ) : (
              sortedUsers.map((user) => {
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
              })
              )}
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedUsers.length}</span> of{' '}
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
