// src/pages/Profile.jsx
import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  useTheme,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'

const profileData = {
  name: 'Аружан Бек',
  initials: 'АБ',
  position: 'Product Manager',
  location: 'Astana, KZ',
  status: 'В отпуске',
  vacationDays: 12,
  balance: '45 000 Т',
  email: 'aruzhan@example.kz',
  phone: '+7 701 222 33 44',
  description: 'Отвечаю за развитие Qollab и внутренних сервисов компании.',
  manager: 'Ерлан Саржанов, Head of Product',
  team: ['Динара К.', 'Руслан М.']
}

const notifications = [
  {
    id: 1,
    title: 'Завершить отчёт по Q3',
    details: 'Дедлайн завтра, 12:00'
  },
  {
    id: 2,
    title: 'All-hands митинг',
    details: 'Пятница, 10:00'
  }
]

const historyItems = [
  {
    id: 1,
    title: 'Отпуск 2025-08-20 — 10 дней (HR)',
    status: 'Одобрено',
    statusColor: 'success'
  },
  {
    id: 2,
    title: 'Запрос на ноутбук',
    status: 'Выполнено',
    statusColor: 'primary'
  },
  {
    id: 3,
    title: 'Поддержка VPN',
    status: 'В работе',
    statusColor: 'warning'
  }
]

export default function Profile () {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {/* Заголовок страницы */}
      <Typography
        variant='h6'
        sx={{ fontWeight: 700, fontSize: 18, mb: 0.5 }}
      >
        Профиль
      </Typography>

      {/* Основная карточка профиля */}
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
        }}
      >
        {/* Аватар + ФИО, должность, город */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background:
                theme.palette.mode === 'light' ? '#e0f2fe' : '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5,
              fontWeight: 600,
              fontSize: 18
            }}
          >
            {profileData.initials}
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
              {profileData.name}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: theme.palette.text.secondary
              }}
            >
              {profileData.position}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: theme.palette.text.secondary
              }}
            >
              {profileData.location}
            </Typography>
          </Box>
        </Box>

        {/* Статус + остаток отпускных дней */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5
          }}
        >
          <Chip
            label={profileData.status}
            size='small'
            color='success'
            sx={{ fontSize: 11, height: 24 }}
          />
          <Typography sx={{ fontSize: 12 }}>
            Отпускных дней:{' '}
            <Box component='span' sx={{ fontWeight: 600 }}>
              {profileData.vacationDays}
            </Box>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Баланс + действия */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography sx={{ fontSize: 13 }}>
            Баланс:{' '}
            <Box component='span' sx={{ fontWeight: 600 }}>
              {profileData.balance}
            </Box>
          </Typography>
          <Stack direction='row' spacing={1}>
            <Button size='small' variant='outlined'>
              Выйти
            </Button>
            <Button size='small' variant='contained'>
              Редактировать
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Контактные данные */}
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
        }}
      >
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, mb: 0.75 }}
        >
          Контактные данные
        </Typography>
        <Typography sx={{ fontSize: 12, mb: 0.25 }}>
          Почта: {profileData.email}
        </Typography>
        <Typography sx={{ fontSize: 12, mb: 0.25 }}>
          Телефон: {profileData.phone}
        </Typography>
        <Typography
          sx={{ fontSize: 12, color: theme.palette.text.secondary }}
        >
          Описание: {profileData.description}
        </Typography>
      </Paper>

      {/* Структура */}
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
        }}
      >
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, mb: 0.75 }}
        >
          Структура
        </Typography>
        <Typography sx={{ fontSize: 12, mb: 0.5 }}>
          Руководитель: {profileData.manager}
        </Typography>
        <Typography sx={{ fontSize: 12, mb: 0.25 }}>
          Команда:
        </Typography>
        <Box sx={{ pl: 1.5 }}>
          {profileData.team.map(member => (
            <Typography
              key={member}
              sx={{ fontSize: 12 }}
            >
              – {member}
            </Typography>
          ))}
        </Box>
      </Paper>

      {/* Уведомления — компактный список с буллетами */}
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
        }}
      >
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, mb: 0.75 }}
        >
          Уведомления
        </Typography>

        <List dense sx={{ py: 0 }}>
          {notifications.map((n, idx) => (
            <ListItem
              key={n.id}
              sx={{
                alignItems: 'flex-start',
                px: 0,
                pb: idx === notifications.length - 1 ? 0 : 0.5
              }}
            >
              <ListItemIcon sx={{ minWidth: 20, pt: 0.4 }}>
                <CircleIcon
                  sx={{
                    fontSize: 8,
                    color: theme.palette.primary.main
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 500 }}
                  >
                    {n.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: theme.palette.text.secondary
                    }}
                  >
                    {n.details}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* История обращений — с чипами статусов */}
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
          mb: 1
        }}
      >
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, mb: 0.75 }}
        >
          История обращений
        </Typography>

        <List dense sx={{ py: 0 }}>
          {historyItems.map(item => (
            <ListItem
              key={item.id}
              sx={{ alignItems: 'flex-start', px: 0, pb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 20, pt: 0.4 }}>
                <CircleIcon
                  sx={{
                    fontSize: 8,
                    color: theme.palette.text.secondary
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 500 }}
                  >
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Box sx={{ mt: 0.3 }}>
                    <Chip
                      label={item.status}
                      size='small'
                      color={item.statusColor}
                      sx={{ fontSize: 11, height: 22 }}
                    />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
