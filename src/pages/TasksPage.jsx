// src/pages/TasksPage.jsx
import React, { useMemo, useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import EventIcon from '@mui/icons-material/Event'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import GroupIcon from '@mui/icons-material/Group'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const initialEvents = [
  {
    id: 1,
    title: 'Еженедельный созвон руководства',
    date: '2025-09-09',
    time: '10:00',
    scope: 'exec', // общий график руководства
    scopeLabel: 'Общий график руководства',
    description: 'Подведение итогов недели и планирование задач.',
    participants: 'Все директора, руководители направлений',
    myRole: 'участник',
    myStatus: 'confirmed'
  },
  {
    id: 2,
    title: '1:1 встреча с руководителем',
    date: '2025-09-10',
    time: '15:30',
    scope: 'manager', // график руководителя, виден подчинённым
    scopeLabel: 'График руководителя',
    description: 'Обсуждение индивидуальных целей и прогресса.',
    participants: 'Вы и ваш руководитель',
    myRole: 'сотрудник',
    myStatus: 'pending'
  },
  {
    id: 3,
    title: 'Онбординг нового сотрудника',
    date: '2025-09-11',
    time: '11:00',
    scope: 'employee', // график сотрудника, виден руководителю
    scopeLabel: 'График сотрудника',
    description: 'Знакомство с командой и основными процессами.',
    participants: 'Новый сотрудник, HR, тимлид',
    myRole: 'руководитель',
    myStatus: 'confirmed'
  }
]

const statusLabelMap = {
  pending: 'Ожидает подтверждения',
  confirmed: 'Подтверждено',
  declined: 'Отклонено'
}

export default function TasksPage () {
  const theme = useTheme()
  const navigate = useNavigate()

  const [filterScope, setFilterScope] = useState('all')
  const [events, setEvents] = useState(initialEvents)

  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newScope, setNewScope] = useState('manager')
  const [newParticipants, setNewParticipants] = useState('')

  const filteredEvents = useMemo(() => {
    if (filterScope === 'all') return events
    return events.filter(e => e.scope === filterScope)
  }, [events, filterScope])

  const sortedEvents = useMemo(
    () =>
      [...filteredEvents].sort((a, b) =>
        `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
      ),
    [filteredEvents]
  )

  const handleAddEvent = () => {
    const title = newTitle.trim()
    if (!title || !newDate || !newTime) return

    const scopeLabelMap = {
      exec: 'Общий график руководства',
      manager: 'График руководителя',
      employee: 'График сотрудника'
    }

    const newEvent = {
      id: Date.now(),
      title,
      date: newDate,
      time: newTime,
      scope: newScope,
      scopeLabel: scopeLabelMap[newScope],
      description: 'Новое мероприятие, созданное в календаре.',
      participants: newParticipants || 'Участники не указаны',
      myRole: 'участник',
      myStatus: 'pending'
    }

    setEvents(prev => [...prev, newEvent])
    setNewTitle('')
    setNewDate('')
    setNewTime('')
    setNewScope('manager')
    setNewParticipants('')
  }

  const handleStatusChange = (id, status) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === id
          ? {
              ...e,
              myStatus: status
            }
          : e
      )
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <PageHeader title="Календарь и график" />
      {/* Заголовок + кнопка назад */}
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
          Календарь и график
        </Typography>
      </Box> */}

      {/* Фильтры по типу графика */}
      <Stack
        direction='row'
        spacing={1}
        sx={{ mb: 1, flexWrap: 'wrap' }}
      >
        <Chip
          label='Все'
          size='small'
          clickable
          color={filterScope === 'all' ? 'primary' : 'default'}
          variant={filterScope === 'all' ? 'filled' : 'outlined'}
          onClick={() => setFilterScope('all')}
        />
        <Chip
          label='Общий график руководства'
          size='small'
          clickable
          color={filterScope === 'exec' ? 'primary' : 'default'}
          variant={filterScope === 'exec' ? 'filled' : 'outlined'}
          onClick={() => setFilterScope('exec')}
        />
        <Chip
          label='Графики руководителей'
          size='small'
          clickable
          color={filterScope === 'manager' ? 'primary' : 'default'}
          variant={filterScope === 'manager' ? 'filled' : 'outlined'}
          onClick={() => setFilterScope('manager')}
        />
        <Chip
          label='Графики сотрудников'
          size='small'
          clickable
          color={filterScope === 'employee' ? 'primary' : 'default'}
          variant={filterScope === 'employee' ? 'filled' : 'outlined'}
          onClick={() => setFilterScope('employee')}
        />
      </Stack>

      {/* Форма добавления мероприятия */}
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
        }}
      >
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}
        >
          Новое мероприятие
        </Typography>

        <Stack spacing={1}>
          <TextField
            size='small'
            placeholder='Название мероприятия...'
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            fullWidth
          />

          <Stack direction='row' spacing={1}>
            <TextField
              size='small'
              type='date'
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              size='small'
              type='time'
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          <Box>
            <Typography
              sx={{
                fontSize: 11,
                color: theme.palette.text.secondary,
                mb: 0.5
              }}
            >
              Тип графика / доступ
            </Typography>
            <ToggleButtonGroup
              size='small'
              exclusive
              value={newScope}
              onChange={(_, value) => value && setNewScope(value)}
            >
              <ToggleButton value='exec'>
                Руководство
              </ToggleButton>
              <ToggleButton value='manager'>
                Руководитель
              </ToggleButton>
              <ToggleButton value='employee'>
                Сотрудник
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <TextField
            size='small'
            placeholder='Участники (через запятую)...'
            value={newParticipants}
            onChange={e => setNewParticipants(e.target.value)}
            fullWidth
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant='contained'
              size='small'
              onClick={handleAddEvent}
            >
              Добавить
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Список мероприятий (интерактивный календарь в виде ленты) */}
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          mt: 0.5
        }}
      >
        Ближайшие мероприятия
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          pb: 1
        }}
      >
        {sortedEvents.map(event => (
          <Paper
            key={event.id}
            sx={{
              p: 1.5,
              borderRadius: 3,
              boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
            }}
          >
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, mb: 0.5 }}
            >
              {event.title}
            </Typography>

            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ mb: 0.5, flexWrap: 'wrap' }}
            >
              <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
              >
                <EventIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: 12 }}>
                  {event.date}
                </Typography>
              </Stack>
              <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
              >
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: 12 }}>
                  {event.time}
                </Typography>
              </Stack>
              <Chip
                label={event.scopeLabel}
                size='small'
                sx={{ fontSize: 10, height: 22 }}
                variant='outlined'
              />
            </Stack>

            <Typography
              sx={{
                fontSize: 12,
                color: theme.palette.text.secondary,
                mb: 0.5
              }}
            >
              {event.description}
            </Typography>

            <Stack
              direction='row'
              spacing={0.5}
              alignItems='center'
              sx={{ mb: 0.5 }}
            >
              <GroupIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 12 }}>
                {event.participants}
              </Typography>
            </Stack>

            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              justifyContent='space-between'
              sx={{ mt: 0.5 }}
            >
              <Stack direction='row' spacing={1} alignItems='center'>
                <Typography sx={{ fontSize: 11 }}>
                  Ваш статус:
                </Typography>
                <Chip
                  size='small'
                  label={statusLabelMap[event.myStatus]}
                  color={
                    event.myStatus === 'confirmed'
                      ? 'success'
                      : event.myStatus === 'declined'
                      ? 'error'
                      : 'warning'
                  }
                  sx={{ fontSize: 10, height: 22 }}
                />
              </Stack>

              <Stack direction='row' spacing={0.5}>
                <Button
                  size='small'
                  variant={
                    event.myStatus === 'confirmed'
                      ? 'contained'
                      : 'outlined'
                  }
                  onClick={() =>
                    handleStatusChange(event.id, 'confirmed')
                  }
                >
                  Подтвердить
                </Button>
                <Button
                  size='small'
                  variant={
                    event.myStatus === 'declined'
                      ? 'contained'
                      : 'outlined'
                  }
                  color='inherit'
                  onClick={() =>
                    handleStatusChange(event.id, 'declined')
                  }
                >
                  Отклонить
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}

        {sortedEvents.length === 0 && (
          <Typography
            sx={{
              fontSize: 12,
              color: theme.palette.text.secondary,
              mt: 1
            }}
          >
            Пока нет запланированных мероприятий. Добавьте первое
            событие в календарь.
          </Typography>
        )}
      </Box>
    </Box>
  )
}
