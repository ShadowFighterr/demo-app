// src/layout/MobileShell.jsx
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BottomTabs } from '../components/BottomTabs'

import { IconButton, Avatar, useTheme } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

// путь до файла в public/
// public/images/logo_caepco_ru.png  →  /images/logo_caepco_ru.png
const LOGO_SRC = '/images/logo_caepco_ru.png'

export function MobileShell({ children, mode, toggleMode }) {
  const { user } = useAuth()
  const theme = useTheme()

  const phoneMaxWidth = 430
  const phoneHeight = 760 // reduce height so it does not fill full screen

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
          maxHeight: 'calc(100vh - 32px)', // keep margin on very small screens
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
          {/* logo + название компании */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <img
              src={LOGO_SRC}
              alt="Центрально-Азиатская Электроэнергетическая Корпорация"
              style={{
                height: 40,
                display: 'block'
              }}
            />
            {/* если нужно, можно спрятать текст или упростить */}
            <span
              style={{
                fontWeight: 600,
                fontSize: 14,
                whiteSpace: 'nowrap'
              }}
            >
              {/* ЦАЭК */}
            </span>
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

            {user && (
              <Avatar sx={{ width: 30, height: 30, fontSize: 12 }}>
                {(user?.name || user?.email || 'U')
                  .split(' ')
                  .map(s => s[0])
                  .join('')
                  .slice(0, 2)}
              </Avatar>
            )}
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
