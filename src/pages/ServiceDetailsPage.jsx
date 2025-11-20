// src/pages/ServiceDetailsPage.jsx
import React, { useMemo } from 'react'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Divider,
  useTheme
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { services } from '../lib/data'
import PageHeader from '../components/PageHeader'

// Дополнительная “фейковая” информация по сервисам для детализации
const extraInfo = {
  'it-helpdesk': {
    owner: 'Команда IT Поддержки',
    sla: 'В течение 1 рабочего дня',
    requests: [
      'Проблемы с ноутбуком или монитором',
      'Нет доступа к VPN или корпоративной почте',
      'Не устанавливается необходимое программное обеспечение'
    ],
    statuses: ['Новая', 'В работе', 'Ожидает информации', 'Решена', 'Закрыта']
  },
  'hardware-request': {
    owner: 'IT Оборудование',
    sla: 'До 3 рабочих дней',
    requests: [
      'Выдача нового ноутбука или монитора',
      'Замена сломанной мыши или клавиатуры',
      'Запрос док-станции или гарнитуры'
    ],
    statuses: ['Новая', 'Согласование', 'Заказано', 'Выдано']
  },
  'vacation-request': {
    owner: 'HR Отдел',
    sla: 'До 2 рабочих дней',
    requests: [
      'Запрос ежегодного отпуска',
      'Отпуск без сохранения заработной платы',
      'Перенос дат уже согласованного отпуска'
    ],
    statuses: ['Черновик', 'На согласовании', 'Одобрено', 'Отклонено']
  },
  // остальные можно описать более общими текстами
}

export default function ServiceDetailsPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()

  const service = useMemo(
    () => services.find(s => s.id === id),
    [id]
  )

  if (!service) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ alignSelf: 'flex-start' }}
        >
          Назад
        </Button>
        <Typography variant='h6' sx={{ fontWeight: 700 }}>
          Сервис не найден
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          Возможно, ссылка устарела или сервис был удалён.
        </Typography>
      </Box>
    )
  }

  const details =
    extraInfo[id] || {
      owner: 'Ответственный отдел',
      sla: 'В течение 1–3 рабочих дней',
      requests: [
        'Создание или изменение заявки по данному направлению',
        'Уточнение статуса уже отправленного обращения'
      ],
      statuses: ['Новая', 'В работе', 'Решена', 'Закрыта']
    }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <PageHeader title={service.name} />
      {/* Верхняя панель с кнопкой "Назад" */}
      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 1
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ minWidth: 0, paddingLeft: 0 }}
        >
          Назад
        </Button>
      </Box> */}

      {/* Основная карточка сервиса */}
      <Paper
        sx={{
          p: 1.8,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant='h6'
              sx={{ fontWeight: 700, fontSize: 18, mb: 0.5 }}
            >
              {service.name}
            </Typography>
            {service.category && (
              <Chip
                label={service.category}
                size='small'
                sx={{ fontSize: 11, height: 22 }}
              />
            )}
          </Box>
        </Box>

        {service.description && (
          <Typography
            sx={{ fontSize: 13, color: theme.palette.text.secondary }}
          >
            {service.description}
          </Typography>
        )}

        <Divider sx={{ my: 1 }} />

        {/* Блок "Кому адресован сервис" */}
        <Box>
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}
          >
            Ответственный и сроки
          </Typography>
          <Typography sx={{ fontSize: 12, mb: 0.3 }}>
            Ответственный: <strong>{details.owner}</strong>
          </Typography>
          <Typography sx={{ fontSize: 12 }}>
            Ожидаемый срок обработки: <strong>{details.sla}</strong>
          </Typography>
        </Box>

        {/* Примеры заявок */}
        <Box>
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}
          >
            Примеры заявок
          </Typography>
          {details.requests.map((text, idx) => (
            <Typography
              key={idx}
              sx={{ fontSize: 12, mb: 0.25 }}
            >
              • {text}
            </Typography>
          ))}
        </Box>

        {/* Статусы заявок */}
        <Box>
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}
          >
            Возможные статусы обращения
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {details.statuses.map(status => (
              <Chip
                key={status}
                label={status}
                size='small'
                variant='outlined'
                sx={{ fontSize: 11, height: 22 }}
              />
            ))}
          </Box>
        </Box>

        {/* Имитация отправки заявки (MVP) */}
        <Box
          sx={{
            mt: 1,
            p: 1.2,
            borderRadius: 2,
            background:
              theme.palette.mode === 'light'
                ? 'rgba(37, 99, 235, 0.04)'
                : 'rgba(37, 99, 235, 0.12)'
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: theme.palette.text.secondary,
              mb: 0.5
            }}
          >
            В рамках MVP вы можете показать, что отсюда пользователь
            отправит заявку в этот сервис, выберет тип запроса, опишет
            проблему и будет отслеживать статус в разделе{' '}
            <strong>«Мои задачи»</strong>.
          </Typography>
          <Button
            variant='contained'
            size='small'
            sx={{ mt: 0.5 }}
            onClick={() => alert('Здесь в будущем будет форма создания заявки')}
          >
            Создать заявку (демо)
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
