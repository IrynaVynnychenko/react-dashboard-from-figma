import { createContext, useContext } from 'react'

const LayoutContext = createContext()

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a Layout')
  }
  return context
}

const Layout = ({ children }) => {
  return (
    <LayoutContext.Provider value={{}}>
      <div className="flex h-screen bg-gray-50">
        {children}
      </div>
    </LayoutContext.Provider>
  )
}

export default Layout
