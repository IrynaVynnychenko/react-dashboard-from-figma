import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users as UsersIcon } from 'lucide-react'
import clsx from 'clsx'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState('month') // month, week, day

  // Sample events
  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(2025, 9, 8, 10, 0), // Oct 8, 2025, 10:00
      duration: '1h',
      color: 'purple',
      location: 'Conference Room A',
      attendees: 5
    },
    {
      id: 2,
      title: 'Project Review',
      date: new Date(2025, 9, 10, 14, 30), // Oct 10, 2025, 14:30
      duration: '2h',
      color: 'pink',
      location: 'Online',
      attendees: 8
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: new Date(2025, 9, 12, 11, 0), // Oct 12, 2025, 11:00
      duration: '1.5h',
      color: 'orange',
      location: 'Meeting Room B',
      attendees: 3
    },
    {
      id: 4,
      title: 'Design Workshop',
      date: new Date(2025, 9, 15, 9, 0), // Oct 15, 2025, 9:00
      duration: '3h',
      color: 'success',
      location: 'Creative Studio',
      attendees: 12
    },
    {
      id: 5,
      title: 'Sprint Planning',
      date: new Date(2025, 9, 6, 15, 0), // Oct 6, 2025, 15:00
      duration: '2h',
      color: 'secondary',
      location: 'Online',
      attendees: 7
    }
  ]

  // Get calendar days for current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const weekDaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const isToday = (date) => {
    const today = new Date()
    return date && 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  const isSelected = (date) => {
    return date &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
  }

  const getEventsForDate = (date) => {
    if (!date) return []
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    )
  }

  const getEventsForSelectedDate = () => {
    return getEventsForDate(selectedDate).sort((a, b) => a.date - b.date)
  }

  const getColorClass = (color) => {
    const colors = {
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      orange: 'bg-accent-500',
      success: 'bg-success-500',
      secondary: 'bg-secondary-500'
    }
    return colors[color] || 'bg-purple-500'
  }

  const getColorLightClass = (color) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      success: 'bg-success-100 text-success-800 border-success-200',
      secondary: 'bg-secondary-100 text-secondary-800 border-secondary-200'
    }
    return colors[color] || 'bg-purple-100 text-purple-800 border-purple-200'
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your schedule and events</p>
        </div>
        <button className="btn btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar view */}
        <div className="lg:col-span-2 card p-3 sm:p-6">
          {/* Calendar header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={goToToday}
                className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium px-2 py-1 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Today
              </button>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={goToPreviousMonth}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {/* Week day headers */}
            {weekDays.map((day, index) => (
              <div
                key={day}
                className="text-center text-xs sm:text-sm font-semibold text-gray-600 py-1 sm:py-2"
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="inline sm:hidden">{weekDaysShort[index]}</span>
              </div>
            ))}

            {/* Calendar days */}
            {days.map((date, index) => {
              const dayEvents = getEventsForDate(date)
              return (
                <div
                  key={index}
                  onClick={() => date && setSelectedDate(date)}
                  className={clsx(
                    'min-h-[60px] sm:min-h-[80px] md:min-h-[100px] p-1 sm:p-2 border border-gray-100 rounded cursor-pointer transition-all relative',
                    date ? 'hover:bg-gray-50 active:bg-gray-100' : 'bg-gray-50/50 cursor-default',
                    isSelected(date) && 'ring-1 sm:ring-2 ring-purple-500 bg-purple-50',
                    isToday(date) && 'border-purple-300 border-2'
                  )}
                >
                  {date && (
                    <>
                      <div className={clsx(
                        'text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full mx-auto sm:mx-0',
                        isToday(date) && 'bg-purple-600 text-white',
                        !isToday(date) && 'text-gray-700'
                      )}>
                        {date.getDate()}
                      </div>
                      {/* Show event indicators on mobile, full events on larger screens */}
                      <div className="hidden sm:block space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={clsx(
                              'text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded truncate',
                              getColorLightClass(event.color)
                            )}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 px-2">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                      {/* Mobile: show dots for events */}
                      {dayEvents.length > 0 && (
                        <div className="sm:hidden flex justify-center gap-0.5 mt-1">
                          {dayEvents.slice(0, 3).map((event, i) => (
                            <div
                              key={i}
                              className={clsx('w-1 h-1 rounded-full', getColorClass(event.color))}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="w-1 h-1 rounded-full bg-gray-400" />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Events sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Selected date info */}
          <div className="card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {getEventsForSelectedDate().length === 0 ? (
                <p className="text-xs sm:text-sm text-gray-500">No events scheduled</p>
              ) : (
                getEventsForSelectedDate().map((event) => (
                  <div
                    key={event.id}
                    className={clsx(
                      'p-2.5 sm:p-3 rounded-lg border',
                      getColorLightClass(event.color)
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className={clsx(
                        'w-1 h-full rounded-full flex-shrink-0 mt-1',
                        getColorClass(event.color)
                      )} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs sm:text-sm mb-1 truncate">{event.title}</h4>
                        <div className="space-y-0.5 sm:space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Clock className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">
                              {event.date.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })} ({event.duration})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <UsersIcon className="w-3 h-3 flex-shrink-0" />
                            <span>{event.attendees} attendees</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming events */}
          <div className="card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Upcoming Events
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {events
                .filter(event => event.date >= new Date())
                .sort((a, b) => a.date - b.date)
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className={clsx('w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0', getColorClass(event.color))} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {event.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}, {event.date.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar

