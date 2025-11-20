import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const FAKE_DB_USER_KEY = 'startup_demo_user'
const FAKE_TOKEN_KEY = 'startup_demo_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem(FAKE_DB_USER_KEY)
    const token = localStorage.getItem(FAKE_TOKEN_KEY)
    if (raw && token) {
      try {
        const u = JSON.parse(raw)
        setUser(u)
      } catch {
        setUser(null)
      }
    }
  }, [])

  function signup({ name, email, password }) {
    const u = { id: Date.now(), name, email }
    localStorage.setItem(FAKE_DB_USER_KEY, JSON.stringify(u))
    localStorage.setItem(FAKE_TOKEN_KEY, 'fake-jwt-token.' + btoa(email))
    setUser(u)
    return { ok: true }
  }

  function login({ email, password }) {
    const raw = localStorage.getItem(FAKE_DB_USER_KEY)
    if (!raw) return { ok: false, error: 'No user found. Please signup.' }
    try {
      const u = JSON.parse(raw)
      if (u.email === email) {
        localStorage.setItem(FAKE_TOKEN_KEY, 'fake-jwt-token.' + btoa(email))
        setUser(u)
        return { ok: true }
      } else {
        return { ok: false, error: 'Invalid credentials' }
      }
    } catch {
      return { ok: false, error: 'Corrupt user record' }
    }
  }

  function logout() {
    localStorage.removeItem(FAKE_TOKEN_KEY)
    setUser(null)
  }

function updateProfile(updates = {}){
  const raw = localStorage.getItem(FAKE_DB_USER_KEY)
  if (!raw) return { ok: false, error: 'No user' }
  try {
    const u = JSON.parse(raw)
    const next = { ...u, ...updates }
    localStorage.setItem(FAKE_DB_USER_KEY, JSON.stringify(next))
    setUser(next)
    return { ok: true }
  } catch {
    return { ok: false, error: 'Failed to update' }
  }
}


  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){ return useContext(AuthContext) }
