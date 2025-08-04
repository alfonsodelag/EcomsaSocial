/* eslint react-refresh/only-export-components: off */
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('currentUser')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  function signup(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    setUser(newUser)
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existing = users.find(
      u => u.email === email && u.password === password,
    )
    if (existing) {
      localStorage.setItem('currentUser', JSON.stringify(existing))
      setUser(existing)
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
