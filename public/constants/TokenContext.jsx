import React, { createContext, useContext, useState } from 'react'

export const tokenContext = createContext()

export const TokenProvider = ({ children }) => {
  const [tokens, setTokens] = useState([{ name: '', amount: parseInt('') }])

  return (
    <tokenContext.Provider value={{ tokens, setTokens }}>
      {children}
    </tokenContext.Provider>
  )
}

export const useTokenContext = () => {
  return useContext(tokenContext)
}
