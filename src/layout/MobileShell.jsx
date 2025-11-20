// src/layout/MobileShell.jsx
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BottomTabs } from '../components/BottomTabs'

import {
  IconButton,
  Avatar,
  Tooltip,
  useTheme
} from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useNavigate } from 'react-router-dom'

export function MobileShell({ children, mode, toggleMode }) {
  const { user } = useAuth()
  const theme = useTheme()
  const navigate = useNavigate()

  const phoneMaxWidth = 430
  const phoneHeight = 760 // reduced height so it does not fill full screen

  const handleAvatarClick = () => {
    if (user) {
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }

  const avatarInitials = (user?.name || user?.email || 'U')
    .split(' ')
    .map(s => s[0])
    .join('')
    .slice(0, 2)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FF7F1F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: '100%',
          maxWidth: phoneMaxWidth,
          height: phoneHeight,
          maxHeight: 'calc(100vh - 32px)',
          background: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 40px rgba(0,0,0,0.35)',
          borderRadius: 28,
          overflow: 'hidden'
        }}
      >
        {/* Top bar (status + title) */}
        <header
          style={{
            height: 60,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.palette.divider}`,
            background: theme.palette.background.paper
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Demo</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconButton
              onClick={toggleMode}
              size="small"
              aria-label="toggle theme"
            >
              {mode === 'light' ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
            </IconButton>

            <Tooltip title={user ? 'Открыть профиль' : 'Войти'}>
              <IconButton
                size="small"
                onClick={handleAvatarClick}
                sx={{ p: 0 }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 12
                  }}
                >
                  {avatarInitials}
                </Avatar>
              </IconButton>
            </Tooltip>
          </div>
        </header>

        {/* Scrollable page content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 12px 8px 12px'
          }}
        >
          {children}
        </div>

        {/* Bottom navigation tabs */}
        <BottomTabs />
      </div>
    </div>
  )
}
