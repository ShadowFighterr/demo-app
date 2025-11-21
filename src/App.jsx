// src/App.jsx
import React, { useState, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import QrSearchPage from './pages/QrSearchPage'
import PostDetailsPage from './pages/PostDetailsPage'
import Feed from './pages/Feed'
import TasksPage from './pages/TasksPage'
import PostsPage from './pages/PostsPage'
import Services from './pages/Services'
import Chat from './pages/Chat'
import DemoResource from './pages/DemoResource'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import MainPage from './pages/MainPage'
import OrgDirectoryPage from './pages/OrgDirectoryPage'
import HrLeavePage from './pages/HrLeavePage'
import IdeasBankPage from './pages/IdeasBankPage'
import ServiceDetailsPage from './pages/ServiceDetailsPage'

import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  useMediaQuery
} from '@mui/material'

import { MobileShell } from './layout/MobileShell'

function makeTheme (mode) {
  const isLight = mode === 'light'

  return createTheme({
    palette: {
      mode,
      primary: { main: isLight ? '#1976d2' : '#90caf9' },
      secondary: { main: isLight ? '#00bfa5' : '#66f0d6' },
      background: {
        default: isLight ? '#f4f6f8' : '#0b0f12',
        paper: isLight ? '#ffffff' : '#0f1316'
      },
      text: {
        primary: isLight ? '#0f172a' : '#e6eef8',
        secondary: isLight ? '#4b5563' : '#9aa6b2'
      },
      divider: isLight
        ? 'rgba(15,23,42,0.06)'
        : 'rgba(255,255,255,0.06)'
    },

    // новая современная типографика
    typography: {
      fontFamily:
        '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

      h4: {
        fontWeight: 700,
        letterSpacing: 0.2
      },
      h5: {
        fontWeight: 700,
        letterSpacing: 0.2
      },
      h6: {
        fontWeight: 700,
        letterSpacing: 0.1
      },
      body1: {
        fontSize: 14,
        lineHeight: 1.5
      },
      body2: {
        fontSize: 13,
        lineHeight: 1.5
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: 0.2
      }
    },

    shape: { borderRadius: 10 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isLight
              ? '0 8px 28px rgba(16,24,40,0.06)'
              : '0 6px 18px rgba(0,0,0,0.6)'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? '#fff' : '#0b0f12',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isLight
                ? 'rgba(15,23,42,0.08)'
                : 'rgba(255,255,255,0.06)'
            }
          },
          input: {
            color: isLight ? '#0f172a' : '#e6eef8'
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: isLight
              ? 'rgba(15,23,42,0.6)'
              : 'rgba(255,255,255,0.6)'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none' },
          containedPrimary: { boxShadow: 'none' }
        }
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? '#cbd5e1' : '#2a2f33',
            color: isLight ? '#0f172a' : '#fff'
          }
        }
      },
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? '#0b74d1' : '#1f2937',
            color: '#fff'
          }
        }
      }
    }
  })
}

export default function App () {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const saved =
    (typeof window !== 'undefined' &&
      localStorage.getItem('app_theme')) ||
    (prefersDark ? 'dark' : 'light')

  const [mode, setMode] = useState(saved)

  const toggleMode = () => {
    const next = mode === 'light' ? 'dark' : 'light'
    setMode(next)
    try {
      localStorage.setItem('app_theme', next)
    } catch (e) {
      // ignore
    }
  }

  const theme = useMemo(() => makeTheme(mode), [mode])

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Оболочка "мобильного телефона" с нижними вкладками */}
        <MobileShell mode={mode} toggleMode={toggleMode}>
          <Routes>
            {/* Главная вкладка */}
            <Route path='/' element={<MainPage />} />

            {/* Публикации */}
            <Route path='/posts' element={<PostsPage />} />
            <Route path='/posts/:id' element={<PostDetailsPage />} />

            {/* Сервисы и дополнительные страницы */}
            <Route path='/services' element={<Services />} />
            <Route path='/services/:id' element={<ServiceDetailsPage />} />
            <Route path='/tasks' element={<TasksPage />} />
            <Route path='/org' element={<OrgDirectoryPage />} />
            <Route path='/qr' element={<QrSearchPage />} />
            <Route path='/hr-leave' element={<HrLeavePage />} />
            <Route path='/ideas' element={<IdeasBankPage />} />

            {/* Авторизация */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            {/* Защищённые страницы */}
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/demo'
              element={
                <PrivateRoute>
                  <DemoResource />
                </PrivateRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path='/chat'
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />

            {/* 404 */}
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </MobileShell>
      </ThemeProvider>
    </AuthProvider>
  )
}
