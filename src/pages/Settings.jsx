import { useState } from 'react'
import { 
  Settings as SettingsIcon,
  Globe,
  Bell,
  Shield,
  Moon,
  Sun,
  Monitor,
  Palette,
  Languages,
  Save,
  Eye,
  EyeOff,
  Lock,
  Database,
  Trash2,
  Download
} from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    // General
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    
    // Appearance
    theme: 'light',
    accentColor: 'purple',
    
    // Privacy
    profileVisibility: 'public',
    showEmail: false,
    showActivity: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true
  })

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSelect = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    console.log('Saving settings...', settings)
    // Save logic here
  }

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ]

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ]

  const accentColors = [
    { value: 'purple', color: 'from-purple-500 to-pink-500' },
    { value: 'blue', color: 'from-blue-500 to-cyan-500' },
    { value: 'green', color: 'from-green-500 to-emerald-500' },
    { value: 'orange', color: 'from-orange-500 to-red-500' }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar navigation */}
        <div className="lg:col-span-1">
          <div className="card p-2 sm:p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-800 shadow-md' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 ${
                      activeTab === tab.id ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <span className="text-left truncate">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="card p-4 sm:p-6">
            
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Languages className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                        </div>
                        <select
                          value={settings.language}
                          onChange={(e) => handleSelect('language', e.target.value)}
                          className="input pl-9 sm:pl-10 text-sm"
                        >
                          <option value="en">English</option>
                          <option value="uk">Українська</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                        </div>
                        <select
                          value={settings.timezone}
                          onChange={(e) => handleSelect('timezone', e.target.value)}
                          className="input pl-9 sm:pl-10 text-sm"
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">Eastern Time</option>
                          <option value="America/Los_Angeles">Pacific Time</option>
                          <option value="Europe/London">London</option>
                          <option value="Europe/Kiev">Kyiv</option>
                          <option value="Asia/Tokyo">Tokyo</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => handleSelect('dateFormat', e.target.value)}
                        className="input text-sm"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button onClick={handleSave} className="btn btn-primary text-sm">
                    <Save className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Save Changes</span>
                    <span className="sm:hidden">Save</span>
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Appearance Settings</h3>
                  
                  <div className="space-y-6">
                    {/* Theme Selection */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3">
                        Theme
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {themeOptions.map((option) => {
                          const Icon = option.icon
                          return (
                            <button
                              key={option.value}
                              onClick={() => handleSelect('theme', option.value)}
                              className={`
                                p-4 rounded-lg border-2 transition-all
                                ${settings.theme === option.value
                                  ? 'border-purple-500 bg-purple-50 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                                }
                              `}
                            >
                              <Icon className={`w-6 h-6 mx-auto mb-2 ${
                                settings.theme === option.value ? 'text-purple-600' : 'text-gray-400'
                              }`} />
                              <p className={`text-sm font-medium ${
                                settings.theme === option.value ? 'text-purple-800' : 'text-gray-700'
                              }`}>
                                {option.label}
                              </p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3">
                        Accent Color
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {accentColors.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => handleSelect('accentColor', color.value)}
                            className={`
                              w-12 h-12 rounded-lg bg-gradient-to-r ${color.color} transition-all
                              ${settings.accentColor === color.value
                                ? 'ring-4 ring-purple-200 ring-offset-2 scale-110'
                                : 'hover:scale-105'
                              }
                            `}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Display Options */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-900">Compact mode</p>
                            <p className="text-xs text-gray-500">Reduce spacing for a denser layout</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-900">Animations</p>
                            <p className="text-xs text-gray-500">Enable UI animations and transitions</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button onClick={handleSave} className="btn btn-primary text-sm">
                    <Save className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Save Changes</span>
                    <span className="sm:hidden">Save</span>
                  </button>
                </div>
              </div>
            )}

            {/* Privacy & Security Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Profile Visibility
                      </label>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) => handleSelect('profileVisibility', e.target.value)}
                        className="input text-sm"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="contacts">Contacts Only</option>
                      </select>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-purple-500 flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-medium text-gray-900">Show email address</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Make your email visible on your profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={settings.showEmail}
                            onChange={() => handleToggle('showEmail')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <EyeOff className="w-4 h-4 text-pink-500 flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-medium text-gray-900">Show activity status</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Let others see when you're active</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={settings.showActivity}
                            onChange={() => handleToggle('showActivity')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Security</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Lock className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Change Password</p>
                          <p className="text-xs text-gray-500">Update your account password</p>
                        </div>
                      </div>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-100 rounded-lg">
                          <Database className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Download Data</p>
                          <p className="text-xs text-gray-500">Export all your personal data</p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-left">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-900">Delete Account</p>
                          <p className="text-xs text-red-600">Permanently delete your account</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button onClick={handleSave} className="btn btn-primary text-sm">
                    <Save className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Save Changes</span>
                    <span className="sm:hidden">Save</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900">Email Notifications</p>
                        <p className="text-xs text-gray-500 mt-1">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.emailNotifications}
                          onChange={() => handleToggle('emailNotifications')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900">Push Notifications</p>
                        <p className="text-xs text-gray-500 mt-1">Receive push notifications in browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.pushNotifications}
                          onChange={() => handleToggle('pushNotifications')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900">Weekly Digest</p>
                        <p className="text-xs text-gray-500 mt-1">Get a weekly summary of your activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.weeklyDigest}
                          onChange={() => handleToggle('weeklyDigest')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Activity Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Project Updates', desc: 'Changes in projects you follow' },
                      { title: 'Task Assignments', desc: 'When tasks are assigned to you' },
                      { title: 'Comments & Mentions', desc: 'When someone mentions or comments' },
                      { title: 'Team Invitations', desc: 'Invitations to join teams or projects' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg">
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

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button onClick={handleSave} className="btn btn-primary text-sm">
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

export default Settings

