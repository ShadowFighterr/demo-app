// src/pages/HrLeavePage.jsx
import React, { useMemo, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  useTheme
} from '@mui/material'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import AttachmentIcon from '@mui/icons-material/Attachment'
import EventIcon from '@mui/icons-material/Event'
import PageHeader from '../components/PageHeader'

const initialRequests = [
  {
    id: 1,
    type: 'vacation',
    typeLabel: 'Отпуск',
    startDate: '2025-08-20',
    endDate: '2025-08-29',
    status: 'approved',
    statusLabel: 'Одобрено',
    statusColor: 'success',
    hasAttachment: true,
    comment: 'Летний отпуск',
    createdAt: '2025-06-01'
  },
  {
    id: 2,
    type: 'sick',
    typeLabel: 'Больничный',
    startDate: '2025-09-02',
    endDate: '2025-09-05',
    status: 'closed',
    statusLabel: 'Закрыт',
    statusColor: 'primary',
    hasAttachment: true,
    comment: 'ОРВИ, больничный лист приложен',
    createdAt: '2025-09-02'
  },
  {
    id: 3,
    type: 'business',
    typeLabel: 'Командировка',
    startDate: '2025-09-15',
    endDate: '2025-09-18',
    status: 'pending',
    statusLabel: 'На согласовании',
    statusColor: 'warning',
    hasAttachment: false,
    comment: 'Поездка в Актобе, встреча с подрядчиком',
    createdAt: '2025-08-30'
  }
]

export default function HrLeavePage () {
  const theme = useTheme()

  const [filterType, setFilterType] = useState('all')
  const [requests, setRequests] = useState(initialRequests)

  const [newType, setNewType] = useState('vacation')
  const [newStart, setNewStart] = useState('')
  const [newEnd, setNewEnd] = useState('')
  const [newComment, setNewComment] = useState('')
  const [newHasAttachment, setNewHasAttachment] = useState(false)

  const filteredRequests = useMemo(() => {
    if (filterType === 'all') return requests
    return requests.filter(r => r.type === filterType)
  }, [requests, filterType])

  const sortedRequests = useMemo(
    () =>
      [...filteredRequests].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      ),
    [filteredRequests]
  )

  const handleAddRequest = () => {
    if (!newStart || !newEnd) return

    const typeMap = {
      vacation: 'Отпуск',
      sick: 'Больничный',
      business: 'Командировка'
    }

    const now = new Date()
    const createdAt = now.toISOString().slice(0, 10)

    const newReq = {
      id: Date.now(),
      type: newType,
      typeLabel: typeMap[newType],
      startDate: newStart,
      endDate: newEnd,
      status: 'pending',
      statusLabel: 'На согласовании',
      statusColor: 'warning',
      hasAttachment: newHasAttachment,
      comment: newComment || 'Новая заявка',
      createdAt
    }

    setRequests(prev => [newReq, ...prev])
    setNewStart('')
    setNewEnd('')
    setNewComment('')
    setNewHasAttachment(false)
    setNewType('vacation')
  }

  const summary = useMemo(() => {
    const approvedVacations = requests.filter(
      r => r.type === 'vacation' && r.status === 'approved'
    )
    const pending = requests.filter(r => r.status === 'pending').length

    return {
      usedVacation: approvedVacations.length * 5, // условно
      pendingCount: pending,
      vacationLeft: 24 - approvedVacations.length * 5 // условный год = 24 дн.
    }
  }, [requests])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
      <PageHeader title='Отпуск, неявки, командировки' />

      {/* Баланс */}
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 4px 14px rgba(15,23,42,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
          Мой баланс
        </Typography>
        <Stack
          direction='row'
          spacing={1}
          sx={{ flexWrap: 'wrap' }}
        >
          <Chip
            label={`Оставшийся отпуск: ${summary.vacationLeft} дн.`}
            size='small'
            color='success'
            sx={{ fontSize: 11 }}
          />
          <Chip
            label={`Использовано: ${summary.usedVacation} дн.`}
            size='small'
            variant='outlined'
            sx={{ fontSize: 11 }}
          />
          <Chip
            label={`Заявок в работе: ${summary.pendingCount}`}
            size='small'
            color='warning'
            sx={{ fontSize: 11 }}
          />
        </Stack>
      </Paper>

      {/* Фильтры */}
      <Paper
        sx={{
          p: 1.2,
          borderRadius: 3,
          boxShadow: '0 3px 10px rgba(15,23,42,0.04)'
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            color: theme.palette.text.secondary,
            mb: 0.5
          }}
        >
          Тип заявки
        </Typography>
        <Stack direction='row' spacing={1}>
          <Chip
            label='Все'
            size='small'
            clickable
            color={filterType === 'all' ? 'primary' : 'default'}
            variant={filterType === 'all' ? 'filled' : 'outlined'}
            onClick={() => setFilterType('all')}
            sx={{ fontSize: 11, height: 24 }}
          />
          <Chip
            icon={<BeachAccessIcon sx={{ fontSize: 14 }} />}
            label='Отпуск'
            size='small'
            clickable
            color={filterType === 'vacation' ? 'primary' : 'default'}
            variant={filterType === 'vacation' ? 'filled' : 'outlined'}
            onClick={() => setFilterType('vacation')}
            sx={{ fontSize: 11, height: 24 }}
          />
          <Chip
            icon={<LocalHospitalIcon sx={{ fontSize: 14 }} />}
            label='Больничный'
            size='small'
            clickable
            color={filterType === 'sick' ? 'primary' : 'default'}
            variant={filterType === 'sick' ? 'filled' : 'outlined'}
            onClick={() => setFilterType('sick')}
            sx={{ fontSize: 11, height: 24 }}
          />
          <Chip
            icon={<FlightTakeoffIcon sx={{ fontSize: 14 }} />}
            label='Командировка'
            size='small'
            clickable
            color={filterType === 'business' ? 'primary' : 'default'}
            variant={filterType === 'business' ? 'filled' : 'outlined'}
            onClick={() => setFilterType('business')}
            sx={{ fontSize: 11, height: 24 }}
          />
        </Stack>
      </Paper>

      {/* Новая заявка */}
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            Новая заявка
          </Typography>
          <Typography
            sx={{
              fontSize: 11,
              color: theme.palette.text.secondary
            }}
          >
            Черновик не отправляется в HR
          </Typography>
        </Box>

        <Stack spacing={1.2}>
          <Box>
            <Typography
              sx={{
                fontSize: 11,
                color: theme.palette.text.secondary,
                mb: 0.5
              }}
            >
              Тип
            </Typography>
            <ToggleButtonGroup
              size='small'
              exclusive
              value={newType}
              onChange={(_, v) => v && setNewType(v)}
            >
              <ToggleButton value='vacation'>Отпуск</ToggleButton>
              <ToggleButton value='sick'>Больничный</ToggleButton>
              <ToggleButton value='business'>Командировка</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Stack direction='row' spacing={1}>
            <TextField
              size='small'
              type='date'
              label='Начало'
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={newStart}
              onChange={e => setNewStart(e.target.value)}
            />
            <TextField
              size='small'
              type='date'
              label='Окончание'
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={newEnd}
              onChange={e => setNewEnd(e.target.value)}
            />
          </Stack>

          <TextField
            size='small'
            label='Комментарий'
            placeholder='Причина, детали поездки и т.п.'
            fullWidth
            multiline
            minRows={2}
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />

          <Stack direction='row' spacing={1} alignItems='center'>
            <Chip
              icon={<AttachmentIcon sx={{ fontSize: 16 }} />}
              label={
                newHasAttachment
                  ? 'Вложение добавлено (демо)'
                  : 'Добавить вложение (демо)'
              }
              size='small'
              variant={newHasAttachment ? 'filled' : 'outlined'}
              color={newHasAttachment ? 'primary' : 'default'}
              onClick={() => setNewHasAttachment(v => !v)}
              sx={{ fontSize: 11, height: 26 }}
            />
            <Typography
              sx={{
                fontSize: 11,
                color: theme.palette.text.secondary
              }}
            >
              В реальном приложении здесь загружается файл.
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant='contained'
              size='small'
              onClick={handleAddRequest}
            >
              Отправить заявку
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Лента заявок */}
      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
        Мои заявки
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          pb: 1
        }}
      >
        {sortedRequests.map(req => (
          <Paper
            key={req.id}
            sx={{
              p: 1.5,
              borderRadius: 3,
              boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* цветная полоска слева по типу */}
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 4,
                background:
                  req.type === 'vacation'
                    ? '#22c55e'
                    : req.type === 'sick'
                    ? '#0ea5e9'
                    : '#f97316'
              }}
            />

            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              sx={{ mb: 0.5, pl: 0.3 }}
            >
              <Stack direction='row' spacing={0.5} alignItems='center'>
                {req.type === 'vacation' && (
                  <BeachAccessIcon sx={{ fontSize: 16 }} />
                )}
                {req.type === 'sick' && (
                  <LocalHospitalIcon sx={{ fontSize: 16 }} />
                )}
                {req.type === 'business' && (
                  <FlightTakeoffIcon sx={{ fontSize: 16 }} />
                )}
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {req.typeLabel}
                </Typography>
              </Stack>
              <Chip
                label={req.statusLabel}
                size='small'
                color={req.statusColor}
                sx={{ fontSize: 11, height: 22 }}
              />
            </Stack>

            <Stack
              direction='row'
              spacing={0.5}
              alignItems='center'
              sx={{ mb: 0.5, pl: 0.3 }}
            >
              <EventIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 12 }}>
                {req.startDate} — {req.endDate}
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: 12,
                color: theme.palette.text.secondary,
                mb: 0.5,
                pl: 0.3
              }}
            >
              {req.comment}
            </Typography>

            <Stack direction='row' spacing={1} sx={{ pl: 0.3 }}>
              {req.hasAttachment && (
                <Chip
                  icon={<AttachmentIcon sx={{ fontSize: 16 }} />}
                  label='Есть вложение'
                  size='small'
                  variant='outlined'
                  sx={{ fontSize: 11, height: 22 }}
                />
              )}
              <Typography
                sx={{
                  fontSize: 11,
                  color: theme.palette.text.secondary
                }}
              >
                Создано: {req.createdAt}
              </Typography>
            </Stack>
          </Paper>
        ))}

        {sortedRequests.length === 0 && (
          <Typography
            sx={{
              fontSize: 12,
              color: theme.palette.text.secondary
            }}
          >
            Заявок пока нет. Создайте первую заявку на отпуск или
            командировку.
          </Typography>
        )}
      </Box>
    </Box>
  )
}
