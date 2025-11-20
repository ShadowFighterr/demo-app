import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
  const { user } = useAuth()
  const loc = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: loc }} replace />
  }
  return children
}
