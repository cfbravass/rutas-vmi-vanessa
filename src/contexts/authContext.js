import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseApp'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'

const AuthContext = createContext({
  currentUser: null,
  login: null,
  register: null,
  logout: null,
  forgotPassword: null,
  resetPassword: null,
  isAuthenticated: null,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line
  }, [])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    return signOut(auth)
  }

  function isAuthenticated() {
    return !!currentUser
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
