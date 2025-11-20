// src/pages/MainPage.jsx
import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  useTheme
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AppsIcon from '@mui/icons-material/Apps'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import GroupIcon from '@mui/icons-material/Group'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { useNavigate } from 'react-router-dom'

import { services } from '../lib/data'

// каждая плитка теперь знает свою иконку и роут
const featuredItems = [
  { id: 'all', label: 'Все сервисы', route: '/services', icon: AppsIcon },
  { id: 'ideas', label: 'Банк идей', route: '/ideas', icon: LightbulbIcon },
  {
    id: 'leave',
    label: 'Отпуск / неявки',
    route: '/hr-leave',
    icon: BeachAccessIcon
  },
  { id: 'org', label: 'Сотрудники', route: '/org', icon: GroupIcon },
  { id: 'tasks', label: 'Мои задачи', route: '/tasks', icon: CheckCircleIcon },
  { id: 'qr', label: 'Поиск по QR', route: '/qr', icon: QrCode2Icon }
]

export default function MainPage () {
  const theme = useTheme()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filteredServices = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return services
    return services.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        (s.category && s.category.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Заголовок + поиск */}
      <Box sx={{ mb: 1 }}>
        <Typography
          variant='h6'
          sx={{ fontWeight: 700, mb: 1, fontSize: 18 }}
        >
          Сервисы компании
        </Typography>
        <TextField
          fullWidth
          size='small'
          placeholder='Поиск сервисов'
          value={query}
          onChange={e => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Подразделения – сетка 2х3 с иконками */}
      <Box sx={{ mb: 1 }}>
        <Typography
          variant='subtitle2'
          sx={{ mb: 1, fontWeight: 600, fontSize: 13 }}
        >
          Подразделения
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 1
          }}
        >
          {featuredItems.map(item => {
            const Icon = item.icon
            return (
              <Paper
                key={item.id}
                sx={{
                  height: 90,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
                  transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 24px rgba(15,23,42,0.12)'
                  }
                }}
                onClick={() => navigate(item.route)}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background:
                      theme.palette.mode === 'light'
                        ? '#FF7F1F'
                        : theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: 20,
                      color: '#fff'
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  {item.label}
                </Typography>
              </Paper>
            )
          })}
        </Box>
      </Box>

      {/* Список сервисов */}
      <Box>
        <Typography
          variant='subtitle2'
          sx={{ mb: 1, fontWeight: 600, fontSize: 13 }}
        >
          Все сервисы
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {filteredServices.map(service => (
            <Paper
              key={service.id || service.name}
              sx={{
                borderRadius: 3,
                p: 1.2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1.2,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
              }}
              // теперь клик по сервису ведёт на детальную страницу
              onClick={() => navigate(`/services/${service.id}`)}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background:
                    theme.palette.mode === 'light'
                      ? '#e0f2fe'
                      : 'rgba(148, 197, 255, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                  color:
                    theme.palette.mode === 'light'
                      ? '#0f172a'
                      : theme.palette.primary.light
                }}
              >
                {(service.name || '?').charAt(0)}
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    mb: 0.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {service.name}
                </Typography>
                {service.description && (
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: theme.palette.text.secondary,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {service.description}
                  </Typography>
                )}
              </Box>

              {service.category && (
                <Chip
                  label={service.category}
                  size='small'
                  sx={{ fontSize: 10, height: 22 }}
                />
              )}
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
