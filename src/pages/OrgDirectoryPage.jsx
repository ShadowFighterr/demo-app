// src/pages/OrgDirectoryPage.jsx
import React, { useMemo, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Chip,
  Stack,
  Avatar,
  IconButton,
  useTheme
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import GroupIcon from '@mui/icons-material/Group'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import BadgeIcon from '@mui/icons-material/Badge'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

// Условные подразделения
const departments = [
  { id: 'all', label: 'Все подразделения' },
  { id: 'hq', label: 'Штаб-квартира' },
  { id: 'it', label: 'IT' },
  { id: 'hr', label: 'HR' },
  { id: 'ops', label: 'Операционный блок' }
]

// Справочник сотрудников (упрощённый)
const employees = [
  {
    id: 1,
    name: 'Ерлан Саржанов',
    initials: 'ЕС',
    position: 'Head of Product',
    department: 'hq',
    departmentName: 'Штаб-квартира',
    orgPath: 'Компания → Штаб-квартира → Продукт',
    location: 'Astana',
    status: 'В офисе',
    statusColor: 'success',
    manager: null,
    level: 'director'
  },
  {
    id: 2,
    name: 'Динара Касым',
    initials: 'ДК',
    position: 'Product Manager',
    department: 'hq',
    departmentName: 'Штаб-квартира',
    orgPath: 'Компания → Штаб-квартира → Продукт',
    location: 'Astana',
    status: 'В отпуске',
    statusColor: 'warning',
    manager: 'Ерлан Саржанов',
    level: 'manager'
  },
  {
    id: 3,
    name: 'Руслан Мусаев',
    initials: 'РМ',
    position: 'Senior Frontend Engineer',
    department: 'it',
    departmentName: 'IT',
    orgPath: 'Компания → IT → Внутренние сервисы',
    location: 'Almaty',
    status: 'В офисе',
    statusColor: 'success',
    manager: 'Динара Касым',
    level: 'staff'
  },
  {
    id: 4,
    name: 'Айдана Тлеген',
    initials: 'АТ',
    position: 'HR Business Partner',
    department: 'hr',
    departmentName: 'HR',
    orgPath: 'Компания → HR → Корпоративные сервисы',
    location: 'Astana',
    status: 'Больничный',
    statusColor: 'error',
    manager: 'HR Director',
    level: 'staff'
  },
  {
    id: 5,
    name: 'Ильдар Сеитов',
    initials: 'ИС',
    position: 'Operations Manager',
    department: 'ops',
    departmentName: 'Операционный блок',
    orgPath: 'Компания → Операционный блок → Офисная инфраструктура',
    location: 'Aktobe',
    status: 'В офисе',
    statusColor: 'success',
    manager: 'COO',
    level: 'manager'
  }
]

// Режимы видимости (роль)
const viewModes = [
  { id: 'employee', label: 'Сотрудник' },
  { id: 'manager', label: 'Руководитель' },
  { id: 'hr', label: 'HR' }
]

export default function OrgDirectoryPage () {
  const theme = useTheme()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [activeDept, setActiveDept] = useState('all')
  const [viewMode, setViewMode] = useState('employee')

  // Фильтрация по отделу и поиску
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      if (
        activeDept !== 'all' &&
        emp.department !== activeDept
      ) {
        return false
      }

      if (!search.trim()) return true

      const q = search.trim().toLowerCase()
      const haystack = [
        emp.name,
        emp.position,
        emp.departmentName
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(q)
    })
  }, [activeDept, search])

  // Имитация ролевой видимости
  const visibleEmployees = useMemo(() => {
    if (viewMode === 'hr') {
      // HR видит всех
      return filteredEmployees
    }
    if (viewMode === 'manager') {
      // Руководитель видит директоров + менеджеров + свой отдел
      return filteredEmployees.filter(
        emp => emp.level !== 'staff' || emp.department === 'it'
      )
    }
    // Обычный сотрудник — без статусов топ-менеджмента
    return filteredEmployees.filter(emp => emp.level !== 'director')
  }, [filteredEmployees, viewMode])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <PageHeader title="Сотрудники" />
      {/* Заголовок + назад */}
      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 0.5
        }}
      >
        <IconButton size='small' onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon fontSize='small' />
        </IconButton>
        <Typography
          variant='h6'
          sx={{ fontWeight: 700, fontSize: 18 }}
        >
          Сотрудники и оргструктура
        </Typography>
      </Box> */}

      {/* Описание блока из требований */}
      <Paper
        sx={{
          p: 1.25,
          borderRadius: 3,
          boxShadow: '0 4px 14px rgba(15,23,42,0.06)'
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: theme.palette.text.secondary
          }}
        >
          Дерево оргструктуры компании, подразделения, список
          сотрудников с фото и контактами. Поиск по ФИО, должности
          или отделу. Статусы сотрудников: отпуск, больничный, другие
          неявки (демо-имитация интеграции с 1С).
        </Typography>
      </Paper>

      {/* Режим просмотра (роль) */}
      <Box>
        <Typography
          sx={{
            fontSize: 11,
            color: theme.palette.text.secondary,
            mb: 0.5
          }}
        >
          Режим просмотра (распределение видимости)
        </Typography>
        <Stack direction='row' spacing={1}>
          {viewModes.map(mode => (
            <Chip
              key={mode.id}
              label={mode.label}
              size='small'
              clickable
              color={
                viewMode === mode.id ? 'primary' : 'default'
              }
              variant={
                viewMode === mode.id ? 'filled' : 'outlined'
              }
              onClick={() => setViewMode(mode.id)}
              sx={{ fontSize: 11, height: 24 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Фильтр по подразделениям */}
      <Box>
        <Typography
          sx={{
            fontSize: 11,
            color: theme.palette.text.secondary,
            mb: 0.5,
            mt: 0.5
          }}
        >
          Подразделения
        </Typography>
        <Stack
          direction='row'
          spacing={1}
          sx={{ flexWrap: 'wrap' }}
        >
          {departments.map(dep => (
            <Chip
              key={dep.id}
              label={dep.label}
              size='small'
              clickable
              color={
                activeDept === dep.id ? 'primary' : 'default'
              }
              variant={
                activeDept === dep.id ? 'filled' : 'outlined'
              }
              onClick={() => setActiveDept(dep.id)}
              sx={{ fontSize: 11, height: 24 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Поиск по ФИО / должности / отделу */}
      <TextField
        size='small'
        placeholder='Поиск по ФИО, должности или отделу...'
        value={search}
        onChange={e => setSearch(e.target.value)}
        fullWidth
      />

      {/* Список сотрудников */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          pb: 1
        }}
      >
        {visibleEmployees.map(emp => (
          <Paper
            key={emp.id}
            sx={{
              p: 1.25,
              borderRadius: 3,
              boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 0.75
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  mr: 1,
                  bgcolor:
                    theme.palette.mode === 'light'
                      ? '#e0f2fe'
                      : '#0f172a',
                  color:
                    theme.palette.mode === 'light'
                      ? '#0f172a'
                      : '#e5e7eb',
                  fontWeight: 600
                }}
              >
                {emp.initials}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600 }}
                >
                  {emp.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: theme.palette.text.secondary
                  }}
                >
                  {emp.position}
                </Typography>
              </Box>

              <Chip
                size='small'
                label={emp.status}
                color={emp.statusColor}
                sx={{ fontSize: 11, height: 22 }}
              />
            </Box>

            <Box sx={{ mb: 0.5 }}>
              <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
              >
                <GroupIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: 12 }}>
                  {emp.departmentName}
                </Typography>
              </Stack>

              <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
                sx={{ mt: 0.25 }}
              >
                <BadgeIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: 12 }}>
                  {emp.orgPath}
                </Typography>
              </Stack>

              <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
                sx={{ mt: 0.25 }}
              >
                <LocationOnIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: 12 }}>
                  {emp.location}
                </Typography>
              </Stack>
            </Box>

            {emp.manager && (
              <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
                sx={{ mt: 0.25 }}
              >
                <ManageAccountsIcon sx={{ fontSize: 14 }} />
                <Typography
                  sx={{
                    fontSize: 12,
                    color: theme.palette.text.secondary
                  }}
                >
                  Руководитель: {emp.manager}
                </Typography>
              </Stack>
            )}
          </Paper>
        ))}

        {visibleEmployees.length === 0 && (
          <Typography
            sx={{
              fontSize: 12,
              color: theme.palette.text.secondary,
              mt: 1
            }}
          >
            Сотрудники не найдены. Измените фильтр или запрос
            поиска.
          </Typography>
        )}
      </Box>
    </Box>
  )
}
