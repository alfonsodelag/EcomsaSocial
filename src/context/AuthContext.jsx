/* eslint react-refresh/only-export-components: off */
import { createContext, useState, useEffect } from 'react'

const adminUser = {
  name: 'Admin',
  email: 'admin@ecomsa.com',
  password: 'admin',
  age: '',
  position: '',
  bio: '',
  photo: '',
  role: 'admin',
}

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('currentUser')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  function signup(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const newUser = {
      name,
      email,
      password,
      age: '',
      position: '',
      bio: '',
      photo: '',
      role: 'employee',
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    setUser(newUser)
  }

  function login(email, password) {
    if (email === adminUser.email && password === adminUser.password) {
      localStorage.setItem('currentUser', JSON.stringify(adminUser))
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (!users.find(u => u.email === adminUser.email)) {
        users.push(adminUser)
        localStorage.setItem('users', JSON.stringify(users))
      }
      setUser(adminUser)
      return true
    }
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

  function updateProfile(updates) {
    setUser(prev => {
      const updated = { ...prev, ...updates }
      localStorage.setItem('currentUser', JSON.stringify(updated))
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const index = users.findIndex(u => u.email === updated.email)
      if (index !== -1) {
        users[index] = updated
        localStorage.setItem('users', JSON.stringify(users))
      }
      return updated
    })
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
