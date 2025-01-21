import React from 'react'
import { useState,useEffect } from 'react'
export const AuthContext = React.createContext()
const AuthProvider = ({children}) => {
  const [Port, setPort] = useState('http://127.0.0.1:9000')
  return (
    <div>
        <AuthContext.Provider value={Port}>
      {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider