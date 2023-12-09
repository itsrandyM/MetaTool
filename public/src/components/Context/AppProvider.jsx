// AppProvider.js
import React, { useState, useContext } from 'react'
import AppContext from './AppContext'

const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])

  const updateTransactions = (newTransactions) => {
    setTransactions(newTransactions)
  }

  return (
    <AppContext.Provider value={{ transactions, updateTransactions }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
    return useContext(AppContext)
  };

export {AppProvider, useAppContext}
