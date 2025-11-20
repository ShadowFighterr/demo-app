// src/pages/IdeasBankPage.jsx
import React, { useMemo, useRef, useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  TextField,
  Divider,
  useTheme,
  IconButton,
  Avatar,
  Snackbar,
  Fab
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

// Внутренние статусы для логики
const STATUS = {
  NEW: 'new',
  REVIEW: 'review',
  DONE: 'done'
}

// Отображаемые статусы
const STATUS_LABELS = {
  [STATUS.NEW]: 'Новые',
  [STATUS.REVIEW]: 'На рассмотрении',
  [STATUS.DONE]: 'Реализовано'
}

// Цвета для бейджей статусов
const STATUS_COLOR = {
  [STATUS.NEW]: '#2563eb', // синий
  [STATUS.REVIEW]: '#f97316', // оранжевый
  [STATUS.DONE]: '#16a34a' // зелёный
}

// Темы идей
const TOPICS = ['IT', 'HR', 'Офис']

// «Стартовые» идеи для демо
const INITIAL_IDEAS = [
  {
    id: 1,
    title: 'Установить больше переговорных комнат',
    description:
      'Часто не хватает свободных переговорок для 1:1 созвонов и встреч с партнёрами. Можно переоборудовать часть опенспейса под маленькие комнаты.',
    status: STATUS.NEW,
    topic: 'Офис',
    author: 'Ильдар С.',
    date: '2025-09-10',
    likes: 8,
    comments: 3
  },
  {
    id: 2,
    title: 'Добавить ментальную поддержку в ДМС',
    description:
      'Сделать доступными консультации с психологом в рамках корпоративной медицинской страховки.',
    status: STATUS.REVIEW,
    topic: 'HR',
    author: 'Анна П.',
    date: '2025-09-05',
    likes: 15,
    comments: 6
  },
  {
    id: 3,
    title: 'Автоматизировать выдачу ноутбуков',
    description:
      'Добавить шаблон бизнес-процесса в IT-сервис, чтобы ускорить согласования и выдачу оборудования новым сотрудникам.',
    status: STATUS.DONE,
    topic: 'IT',
    author: 'Руслан М.',
    date: '2025-08-20',
    likes: 21,
    comments: 4
  }
]

const STATUS_FILTERS = ['Все', STATUS_LABELS[STATUS.NEW], STATUS_LABELS[STATUS.REVIEW], STATUS_LABELS[STATUS.DONE]]
const TOPIC_FILTERS = ['Все темы', ...TOPICS]

// Порядок вывода блоков по статусу
const STATUS_ORDER = [STATUS.NEW, STATUS.REVIEW, STATUS.DONE]

export default function IdeasBankPage() {
  const theme = useTheme()
  const navigate = useNavigate()

  const [ideas, setIdeas] = useState(INITIAL_IDEAS)
  const [statusFilter, setStatusFilter] = useState('Все')
  const [topicFilter, setTopicFilter] = useState('Все темы')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('IT')
  const [snackOpen, setSnackOpen] = useState(false)

  const formRef = useRef(null)

  const TITLE_LIMIT = 80
  const DESC_LIMIT = 500

  // Кол-во идей всего и «по фильтру»
  const ideasCount = ideas.length

  // Фильтрация по статусу и теме
  const filteredIdeas = useMemo(() => {
    return ideas.filter(idea => {
      const matchStatus =
        statusFilter === 'Все' ||
        STATUS_LABELS[idea.status] === statusFilter

      const matchTopic =
        topicFilter === 'Все темы' || idea.topic === topicFilter

      return matchStatus && matchTopic
    })
  }, [ideas, statusFilter, topicFilter])

  // Группировка по статусам
  const grouped = useMemo(() => {
    const map = {}
    STATUS_ORDER.forEach(s => {
      map[s] = []
    })
    filteredIdeas.forEach(idea => {
      if (!map[idea.status]) map[idea.status] = []
      map[idea.status].push(idea)
    })
    return map
  }, [filteredIdeas])

  const handleAddIdea = () => {
    if (!title.trim() || !description.trim()) return

    const newIdea = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      status: STATUS.NEW,
      topic,
      author: 'Вы',
      date: new Date().toLocaleDateString('ru-RU'),
      likes: 0,
      comments: 0
    }

    setIdeas(prev => [newIdea, ...prev])
    setTitle('')
    setDescription('')
    setTopic('IT')
    setSnackOpen(true)

    // Скроллим к только что добавленной идее (вверх списка)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLikeToggle = id => {
    setIdeas(prev =>
      prev.map(i =>
        i.id === id
          ? {
              ...i,
              liked: !i.liked,
              likes: i.liked ? i.likes - 1 : i.likes + 1
            }
          : i
      )
    )
  }

  const handleFakeComment = id => {
    setIdeas(prev =>
      prev.map(i =>
        i.id === id ? { ...i, comments: i.comments + 1 } : i
      )
    )
  }

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Box sx={{ position: 'relative', pb: 8 }}>
      {/* Заголовок страницы */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 1.5
        }}
      >
        <IconButton
          size="small"
          onClick={() => navigate(-1)}
          sx={{ mr: 0.5 }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: 18, lineHeight: 1.2 }}
          >
            Банк идей
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: theme.palette.text.secondary,
              mt: 0.25
            }}
          >
            {ideasCount} предложений от сотрудников
          </Typography>
        </Box>
      </Box>

      {/* Описание модуля */}
      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          mb: 1.5,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            sx={{
              mt: 0.3,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background:
                theme.palette.mode === 'light'
                  ? 'rgba(250, 204, 21, 0.2)'
                  : 'rgba(250, 204, 21, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LightbulbOutlinedIcon
              sx={{
                fontSize: 16,
                color:
                  theme.palette.mode === 'light'
                    ? '#f59e0b'
                    : '#facc15'
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 12, mb: 0.25 }}>
              Здесь сотрудники оставляют предложения по улучшениям.
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: theme.palette.text.secondary
              }}
            >
              Ответственные специалисты просматривают идеи, меняют
              статус и дают обратную связь. В демо доступно добавление
              идей, лайки и фильтрация по статусу и теме.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Sticky-фильтры */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          pb: 1,
          mb: 1,
          background: theme.palette.background.default
        }}
      >
        {/* Фильтр статуса */}
        <Typography
          sx={{ fontSize: 12, fontWeight: 600, mb: 0.5 }}
        >
          Статус
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            mb: 1
          }}
        >
          {STATUS_FILTERS.map(label => (
            <Chip
              key={label}
              label={label}
              size="small"
              clickable
              color={statusFilter === label ? 'primary' : 'default'}
              variant={statusFilter === label ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter(label)}
              sx={{ fontSize: 11, height: 26 }}
            />
          ))}
        </Box>

        {/* Фильтр тематики */}
        <Typography
          sx={{ fontSize: 12, fontWeight: 600, mb: 0.5 }}
        >
          Тематика
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap'
          }}
        >
          {TOPIC_FILTERS.map(label => (
            <Chip
              key={label}
              label={label}
              size="small"
              clickable
              color={topicFilter === label ? 'primary' : 'default'}
              variant={topicFilter === label ? 'filled' : 'outlined'}
              onClick={() => setTopicFilter(label)}
              sx={{ fontSize: 11, height: 26 }}
            />
          ))}
        </Box>
      </Box>

      {/* Блок "Новая идея" */}
      <Paper
        ref={formRef}
        sx={{
          p: 1.5,
          borderRadius: 3,
          mb: 1.5,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LightbulbOutlinedIcon
            sx={{
              fontSize: 18,
              color:
                theme.palette.mode === 'light'
                  ? '#f59e0b'
                  : '#facc15',
              mr: 1
            }}
          />
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            Новая идея
          </Typography>
        </Box>

        <TextField
          fullWidth
          size="small"
          placeholder="Краткое название идеи…"
          value={title}
          onChange={e => setTitle(e.target.value.slice(0, TITLE_LIMIT))}
          sx={{ mb: 1 }}
          inputProps={{ maxLength: TITLE_LIMIT }}
          helperText={`${title.length} / ${TITLE_LIMIT}`}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={6}
          size="small"
          placeholder="Опишите проблему и предлагаемое решение…"
          value={description}
          onChange={e =>
            setDescription(e.target.value.slice(0, DESC_LIMIT))
          }
          sx={{ mb: 0.5 }}
          inputProps={{ maxLength: DESC_LIMIT }}
          helperText={`${description.length} / ${DESC_LIMIT}`}
        />

        <Typography
          sx={{ fontSize: 12, fontWeight: 600, mb: 0.5 }}
        >
          Тематика
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          {TOPICS.map(t => (
            <Chip
              key={t}
              label={t}
              size="small"
              clickable
              color={topic === t ? 'primary' : 'default'}
              variant={topic === t ? 'filled' : 'outlined'}
              onClick={() => setTopic(t)}
              sx={{ fontSize: 11, height: 26 }}
            />
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="medium"
          disabled={!title.trim() || !description.trim()}
          onClick={handleAddIdea}
          sx={{ textTransform: 'none', fontSize: 14, mt: 0.5 }}
        >
          Добавить идею
        </Button>
      </Paper>

      {/* Список идей, сгруппированный по статусам */}
      {STATUS_ORDER.map(status => {
        const items = grouped[status] || []
        if (!items.length) return null

        return (
          <Box key={status} sx={{ mb: 1.5 }}>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                mb: 0.5,
                color: theme.palette.text.secondary
              }}
            >
              {STATUS_LABELS[status]}
            </Typography>

            {items.map(idea => (
              <Paper
                key={idea.id}
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  mb: 1,
                  boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
                }}
              >
                {/* Заголовок + статус */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 0.75,
                    gap: 1
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: 1.3
                    }}
                  >
                    {idea.title}
                  </Typography>

                  <Chip
                    label={STATUS_LABELS[idea.status] || 'Статус'}
                    size="small"
                    sx={{
                      fontSize: 11,
                      height: 22,
                      backgroundColor:
                        STATUS_COLOR[idea.status] || '#e5e7eb',
                      color: '#fff'
                    }}
                  />
                </Box>

                {/* Описание */}
                <Typography
                  sx={{
                    fontSize: 12,
                    color: theme.palette.text.secondary,
                    mb: 1
                  }}
                >
                  {idea.description}
                </Typography>

                {/* Тематика, автор, дата */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 0.75,
                    gap: 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={idea.topic}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 11, height: 22 }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 22,
                          height: 22,
                          fontSize: 11,
                          bgcolor:
                            theme.palette.mode === 'light'
                              ? '#e5e7eb'
                              : '#1f2937'
                        }}
                      >
                        {idea.author
                          .split(' ')
                          .map(x => x[0])
                          .join('')
                          .slice(0, 2)}
                      </Avatar>
                      <Typography sx={{ fontSize: 11 }}>
                        {idea.author}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: theme.palette.text.secondary
                    }}
                  >
                    {idea.date}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 0.75 }} />

                {/* Действия: лайки и комментарии */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={
                        idea.liked ? (
                          <ThumbUpAltIcon fontSize="small" />
                        ) : (
                          <ThumbUpOffAltIcon fontSize="small" />
                        )
                      }
                      onClick={() => handleLikeToggle(idea.id)}
                      sx={{
                        textTransform: 'none',
                        fontSize: 12,
                        minWidth: 0,
                        paddingInline: 1
                      }}
                    >
                      {idea.likes}
                    </Button>

                    <Button
                      size="small"
                      startIcon={
                        <ChatBubbleOutlineIcon fontSize="small" />
                      }
                      onClick={() => handleFakeComment(idea.id)}
                      sx={{
                        textTransform: 'none',
                        fontSize: 12,
                        minWidth: 0,
                        paddingInline: 1
                      }}
                    >
                      {idea.comments}
                    </Button>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: theme.palette.text.secondary
                    }}
                  >
                    Лайки и комментарии работают в демо-режиме
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        )
      })}

      {filteredIdeas.length === 0 && (
        <Typography
          sx={{
            fontSize: 13,
            color: theme.palette.text.secondary,
            mt: 2
          }}
        >
          По заданным фильтрам идей пока нет.
        </Typography>
      )}

      {/* FAB "Добавить идею" */}
      <Fab
        color="primary"
        size="medium"
        onClick={scrollToForm}
        sx={{
          position: 'fixed',
          bottom: 88, // учёт нижних табов
          right: 'max(16px, calc((100vw - 430px) / 2 + 16px))',
          boxShadow: '0 10px 25px rgba(15,23,42,0.25)'
        }}
      >
        <AddIcon />
      </Fab>

      {/* Snackbar об успешном добавлении */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        message="Идея добавлена (демо)"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
