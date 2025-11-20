// src/pages/Services.jsx
import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  IconButton,
  useTheme
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import GroupIcon from '@mui/icons-material/Group'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import BuildIcon from '@mui/icons-material/Build'
import { useNavigate } from 'react-router-dom'
// доп. иконки для разных типов сервисов
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import HealingIcon from '@mui/icons-material/Healing'
import DescriptionIcon from '@mui/icons-material/Description'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

import { services } from '../lib/data'

// если захочешь в будущем использовать отдельные иконки по id
const iconsById = {
  'it-helpdesk': <HeadsetMicIcon sx={{ fontSize: 24 }} />,
  'hardware-request': <DesktopWindowsIcon sx={{ fontSize: 24 }} />,
  'access-request': <VpnKeyIcon sx={{ fontSize: 24 }} />,
  'vacation-request': <BeachAccessIcon sx={{ fontSize: 24 }} />,
  'sick-leave': <HealingIcon sx={{ fontSize: 24 }} />,
  'hr-docs': <DescriptionIcon sx={{ fontSize: 24 }} />,
  'business-trip': <FlightTakeoffIcon sx={{ fontSize: 24 }} />
}

// русские категории, как на макете
const CATEGORIES = ['Все', 'Поддержка', 'HR', 'Финансы', 'Операции']

// иконка по категории
const categoryIconMap = {
  Поддержка: HeadsetMicIcon,
  HR: GroupIcon,
  Финансы: AccountBalanceWalletIcon,
  Операции: BuildIcon
}

export default function Services() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Все')

  const filteredServices = useMemo(() => {
    const q = query.toLowerCase()

    return services.filter(s => {
      const category = (s.category || '').toLowerCase()

      const matchCategory =
        activeCategory === 'Все' ||
        category === activeCategory.toLowerCase()

      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        category.includes(q)

      return matchCategory && matchQuery
    })
  }, [query, activeCategory])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Заголовок с кнопкой "Назад" */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 0.5
        }}
      >
        <IconButton
          edge="start"
          size="small"
          onClick={() => navigate(-1)}
          sx={{ mr: 0.5 }}
          aria-label="Назад"
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontSize: 18 }}
        >
          Сервисы компании
        </Typography>
      </Box>

      {/* Подзаголовок */}
      <Typography
        sx={{ fontSize: 12, color: theme.palette.text.secondary }}
      >
        Выберите нужный сервис для заявок, обращений и задач.
      </Typography>

      {/* Поиск */}
      <TextField
        fullWidth
        size="small"
        placeholder="Поиск по сервисам"
        value={query}
        onChange={e => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          )
        }}
      />

      {/* Фильтр по категории */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          pb: 0.5
        }}
      >
        {CATEGORIES.map(cat => (
          <Chip
            key={cat}
            label={cat}
            size="small"
            clickable
            color={activeCategory === cat ? 'primary' : 'default'}
            variant={activeCategory === cat ? 'filled' : 'outlined'}
            onClick={() => setActiveCategory(cat)}
            sx={{ fontSize: 11 }}
          />
        ))}
      </Box>

      {/* Список сервисов */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
        {filteredServices.map(service => {
          const Icon =
            categoryIconMap[service.category] || HeadsetMicIcon

          return (
            <Paper
              key={service.id || service.name}
              sx={{
                p: 1.5,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1.2,
                boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
                cursor: service.id ? 'pointer' : 'default'
              }}
              onClick={() => {
                if (service.id) {
                  navigate(`/services/${service.id}`)
                }
              }}
            >
              {/* слева – круг с иконкой */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background:
                    theme.palette.mode === 'light'
                      ? '#e0f2fe'
                      : 'rgba(148,197,255,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon
                  sx={{
                    fontSize: 22,
                    color:
                      theme.palette.mode === 'light'
                        ? '#2563eb'
                        : theme.palette.primary.light
                  }}
                />
              </Box>

              {/* текст */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    mb: 0.3,
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
                      mb: 0.3
                    }}
                  >
                    {service.description}
                  </Typography>
                )}

                {service.category && (
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: theme.palette.text.secondary
                    }}
                  >
                    Категория: {service.category}
                  </Typography>
                )}
              </Box>
            </Paper>
          )
        })}

        {filteredServices.length === 0 && (
          <Typography
            sx={{ fontSize: 13, color: theme.palette.text.secondary }}
          >
            По вашему запросу ничего не найдено.
          </Typography>
        )}
      </Box>
    </Box>
  )
}
