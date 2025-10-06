import { useState } from 'react'
import { 
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  File,
  Check,
  CheckCheck,
  Circle,
  ArrowLeft
} from 'lucide-react'

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showChatWindow, setShowChatWindow] = useState(false)

  const chats = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      lastMessage: 'Hey! How are you doing today?',
      time: '2m ago',
      unread: 3,
      online: true,
      messages: [
        { id: 1, text: 'Hey there!', time: '10:30 AM', sent: false },
        { id: 2, text: 'Hi! How can I help you?', time: '10:31 AM', sent: true },
        { id: 3, text: 'I need help with the project dashboard', time: '10:32 AM', sent: false },
        { id: 4, text: 'Sure! What specific part do you need help with?', time: '10:33 AM', sent: true },
        { id: 5, text: 'The analytics section', time: '10:34 AM', sent: false },
        { id: 6, text: 'Let me check that for you', time: '10:35 AM', sent: true },
        { id: 7, text: 'Hey! How are you doing today?', time: '10:36 AM', sent: false }
      ]
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'MC',
      lastMessage: 'The meeting is scheduled for 3 PM',
      time: '1h ago',
      unread: 0,
      online: true,
      messages: [
        { id: 1, text: 'Good morning!', time: '9:00 AM', sent: false },
        { id: 2, text: 'Morning! Ready for the meeting?', time: '9:05 AM', sent: true },
        { id: 3, text: 'The meeting is scheduled for 3 PM', time: '9:10 AM', sent: false }
      ]
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'EW',
      lastMessage: 'Thanks for your help! 😊',
      time: '3h ago',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: 'Can you review my code?', time: '8:00 AM', sent: false },
        { id: 2, text: 'Of course! Send it over', time: '8:15 AM', sent: true },
        { id: 3, text: 'Thanks for your help! 😊', time: '8:30 AM', sent: false }
      ]
    },
    {
      id: 4,
      name: 'Alex Turner',
      avatar: 'AT',
      lastMessage: 'Project deadline is next week',
      time: '5h ago',
      unread: 1,
      online: false,
      messages: [
        { id: 1, text: 'Hi, checking on the project status', time: '7:00 AM', sent: false },
        { id: 2, text: 'It\'s going well, almost done', time: '7:30 AM', sent: true },
        { id: 3, text: 'Project deadline is next week', time: '7:45 AM', sent: false }
      ]
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      avatar: 'LA',
      lastMessage: 'Great work on the presentation!',
      time: '1d ago',
      unread: 0,
      online: true,
      messages: [
        { id: 1, text: 'Hey! Did you see the new designs?', time: 'Yesterday', sent: false },
        { id: 2, text: 'Yes, they look amazing!', time: 'Yesterday', sent: true },
        { id: 3, text: 'Great work on the presentation!', time: 'Yesterday', sent: false }
      ]
    },
    {
      id: 6,
      name: 'Tom Roberts',
      avatar: 'TR',
      lastMessage: 'Let\'s catch up tomorrow',
      time: '2d ago',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: 'Are you free this week?', time: '2 days ago', sent: false },
        { id: 2, text: 'I have some availability', time: '2 days ago', sent: true },
        { id: 3, text: 'Let\'s catch up tomorrow', time: '2 days ago', sent: false }
      ]
    }
  ]

  const currentChat = chats.find(chat => chat.id === selectedChat)
  
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Logic to send message
      console.log('Sending message:', messageText)
      setMessageText('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId)
    setShowChatWindow(true)
  }

  const handleBackToList = () => {
    setShowChatWindow(false)
  }

  const getAvatarGradient = (index) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-purple-500'
    ]
    return gradients[index % gradients.length]
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-sm sm:text-base text-gray-600">Stay connected with your team</p>
      </div>

      {/* Messages container */}
      <div className="card overflow-hidden h-[600px] lg:h-[calc(100vh-240px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Chat list sidebar */}
          <div className={`lg:col-span-1 border-r border-gray-200 flex flex-col h-full ${showChatWindow ? 'hidden lg:flex' : 'flex'}`}>
            {/* Search bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat, index) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`
                    w-full p-4 flex items-start gap-3 transition-colors border-b border-gray-100
                    ${selectedChat === chat.id 
                      ? 'bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50' 
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarGradient(index)} flex items-center justify-center`}>
                      <span className="text-white font-medium text-sm">{chat.avatar}</span>
                    </div>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Chat info */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="ml-2 flex-shrink-0 px-2 py-0.5 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className={`lg:col-span-2 flex flex-col bg-gray-50 ${showChatWindow ? 'flex' : 'hidden lg:flex'} h-full overflow-hidden`}>
            {currentChat ? (
              <>
                {/* Chat header */}
                <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    {/* Back button for mobile */}
                    <button 
                      onClick={handleBackToList}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(currentChat.id - 1)} flex items-center justify-center`}>
                        <span className="text-white font-medium text-sm">{currentChat.avatar}</span>
                      </div>
                      {currentChat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{currentChat.name}</h3>
                      <p className="text-xs text-gray-500">
                        {currentChat.online ? 'Active now' : 'Offline'}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
                  {currentChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`
                          max-w-[70%] rounded-2xl px-4 py-2.5
                          ${message.sent
                            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-br-none'
                            : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                          }
                        `}
                      >
                        <p className="text-sm break-words">{message.text}</p>
                        <div className={`flex items-center gap-1 mt-1 ${message.sent ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-xs ${message.sent ? 'text-white/80' : 'text-gray-500'}`}>
                            {message.time}
                          </span>
                          {message.sent && (
                            <CheckCheck className="w-3 h-3 text-white/80" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message input */}
                <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                  <div className="flex items-end gap-2">
                    {/* Attachment buttons */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    {/* Text input */}
                    <div className="flex-1 relative">
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        rows="1"
                        className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                        style={{ minHeight: '42px', maxHeight: '120px' }}
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Smile className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Send button */}
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="p-2.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quick actions */}
                  <div className="flex items-center gap-2 mt-3">
                    <button className="text-xs text-gray-600 hover:text-purple-600 flex items-center gap-1 px-2 py-1 hover:bg-purple-50 rounded transition-colors">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Image</span>
                    </button>
                    <button className="text-xs text-gray-600 hover:text-purple-600 flex items-center gap-1 px-2 py-1 hover:bg-purple-50 rounded transition-colors">
                      <File className="w-3.5 h-3.5" />
                      <span>File</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-sm text-gray-600">Choose a chat from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Circle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Unread</p>
              <p className="text-lg font-bold text-gray-900">
                {chats.reduce((acc, chat) => acc + chat.unread, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Online</p>
              <p className="text-lg font-bold text-gray-900">
                {chats.filter(chat => chat.online).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Send className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Total Chats</p>
              <p className="text-lg font-bold text-gray-900">{chats.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <CheckCheck className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Sent Today</p>
              <p className="text-lg font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages

