import { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera,
  Save,
  Bell,
  Lock,
  Globe,
  Briefcase,
  Calendar
} from 'lucide-react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [formData, setFormData] = useState({
    firstName: 'User',
    lastName: 'Name',
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    company: 'Tech Company',
    position: 'Administrator',
    bio: 'Passionate about technology and innovation.',
    website: 'https://example.com'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Save logic here
    console.log('Saving profile...', formData)
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your profile and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with avatar */}
        <div className="lg:col-span-1">
          <div className="card p-4 sm:p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    {formData.firstName[0]}{formData.lastName[0]}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>
              </div>
              <h2 className="mt-4 text-lg sm:text-xl font-bold text-gray-900 text-center">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">{formData.position}</p>
              <p className="text-xs text-gray-500 mt-1 break-all">{formData.email}</p>
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Projects</span>
                  <span className="text-sm font-medium text-gray-900">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tasks</span>
                  <span className="text-sm font-medium text-gray-900">142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Member since</span>
                  <span className="text-sm font-medium text-gray-900">2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="card p-4 sm:p-6">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-2 sm:space-x-6 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center px-2 sm:px-3 py-3 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap flex-shrink-0
                        ${activeTab === tab.id 
                          ? 'border-purple-500 text-purple-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input pl-9 sm:pl-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input pl-9 sm:pl-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input pl-9 sm:pl-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input pl-9 sm:pl-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="input pl-9 sm:pl-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                      </div>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="input pl-9 sm:pl-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="input pl-9 sm:pl-10 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                      </div>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="input pl-9 sm:pl-10 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="input resize-none text-sm"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex justify-end">
                  <button onClick={handleSave} className="btn btn-primary text-sm">
                    <Save className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Save Changes</span>
                    <span className="sm:hidden">Save</span>
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="input text-sm"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="input text-sm"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="input text-sm"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-700">Enable two-factor authentication</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="btn btn-primary text-sm">
                    <Lock className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Update Security</span>
                    <span className="sm:hidden">Update</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Project Updates', desc: 'Get notified about project status changes' },
                      { title: 'Task Assignments', desc: 'Receive notifications when tasks are assigned to you' },
                      { title: 'Comments', desc: 'Get notified when someone comments on your work' },
                      { title: 'Weekly Reports', desc: 'Receive weekly summary reports via email' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500 truncate">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input type="checkbox" className="sr-only peer" defaultChecked={index % 2 === 0} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="btn btn-primary text-sm">
                    <Bell className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Save Preferences</span>
                    <span className="sm:hidden">Save</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

