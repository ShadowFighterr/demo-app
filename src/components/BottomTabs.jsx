// src/components/BottomTabs.jsx
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme, Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ArticleIcon from '@mui/icons-material/Article'
import ChatIcon from '@mui/icons-material/Chat'
import PersonIcon from '@mui/icons-material/Person'

const tabs = [
  { to: '/', label: 'Главная', icon: HomeIcon },
  { to: '/posts', label: 'Публикации', icon: ArticleIcon },
  { to: '/chat', label: 'Чаты', icon: ChatIcon },
  { to: '/profile', label: 'Профиль', icon: PersonIcon }
]

export function BottomTabs() {
  const location = useLocation()
  const theme = useTheme()

  return (
    <nav
      style={{
        height: 56,
        borderTop: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
        display: 'flex'
      }}
    >
      {tabs.map(tab => {
        const isActive =
          tab.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(tab.to)

        const Icon = tab.icon

        const color = isActive ? '#FF7F1F' : theme.palette.text.secondary

        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            style={{
              flex: 1,
              textDecoration: 'none'
            }}
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.3
              }}
            >
              {/* icon */}
              <Icon
                sx={{
                  fontSize: 20,
                  color
                }}
              />
              {/* label */}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: isActive ? 600 : 500,
                  color
                }}
              >
                {tab.label}
              </span>
            </Box>
          </NavLink>
        )
      })}
    </nav>
  )
}
