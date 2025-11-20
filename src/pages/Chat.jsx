// src/pages/Chat.jsx
import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Button,
  Chip,
  useTheme
} from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'

const CHANNELS = [
  { id: 'team', label: 'Командный чат' },
  { id: 'direct', label: 'Личный чат · Ерлан' },
  { id: 'design', label: 'Design Club' } // можно оставить как название канала
]

const INITIAL_MESSAGES = {
  team: [
    {
      id: 1,
      author: 'Erlan',
      time: '07:24 PM',
      text: 'Voice message • 0:23',
      isMe: false
    },
    {
      id: 2,
      author: 'You',
      time: '07:30 PM',
      text: '👍 ❤️ 😂',
      isMe: true
    },
    {
      id: 3,
      author: 'Erlan',
      time: '07:35 PM',
      text: 'Voice message • 0:23',
      isMe: false
    }
  ],
  direct: [
    {
      id: 4,
      author: 'Erlan',
      time: '09:10 AM',
      text: 'Привет! Ты видел обновлённый дизайн главной?',
      isMe: false
    },
    {
      id: 5,
      author: 'You',
      time: '09:12 AM',
      text: 'Да, выглядит гораздо ближе к мобильному приложению 👍',
      isMe: true
    }
  ],
  design: [
    {
      id: 6,
      author: 'Design Bot',
      time: 'Yesterday',
      text: 'Напоминание: завтра в 15:00 созвон по обновлению UI.',
      isMe: false
    }
  ]
}

function formatTime () {
  const date = new Date()
  const h = date.getHours()
  const m = date.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hh = ((h + 11) % 12) + 1
  return `${hh}:${m} ${ampm}`
}

export default function Chat () {
  const theme = useTheme()

  const [activeChannel, setActiveChannel] = useState('team')
  const [conversations, setConversations] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')

  const messagesEndRef = useRef(null)

  // scroll to bottom when channel or messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeChannel, conversations])

  const currentMessages = conversations[activeChannel] || []

  const handleSend = () => {
    const text = input.trim()
    if (!text) return

    const newMsg = {
      id: Date.now(),
      author: 'You',
      time: formatTime(),
      text,
      isMe: true
    }

    setConversations(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg]
    }))

    setInput('')

    // simple simulated reply
    setTimeout(() => {
      setConversations(prev => ({
        ...prev,
        [activeChannel]: [
          ...(prev[activeChannel] || []),
          {
            id: Date.now() + 1,
            author:
              activeChannel === 'direct'
                ? 'Erlan'
                : activeChannel === 'design'
                ? 'Design Bot'
                : 'System',
            time: formatTime(),
            text: 'Принял, спасибо за сообщение 👌',
            isMe: false
          }
        ]
      }))
    }, 800)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Page title + channel tabs */}
      <Box sx={{ mb: 1 }}>
        <Typography
          variant='h6'
          sx={{ fontWeight: 700, fontSize: 18, mb: 1 }}
        >
          Командный чат
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {CHANNELS.map(ch => (
            <Chip
              key={ch.id}
              label={ch.label}
              size='small'
              clickable
              color={activeChannel === ch.id ? 'primary' : 'default'}
              variant={
                activeChannel === ch.id ? 'filled' : 'outlined'
              }
              onClick={() => setActiveChannel(ch.id)}
            />
          ))}
        </Box>
      </Box>

      {/* Messages area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          mb: 1,
          borderRadius: 3,
          background: theme.palette.background.paper,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
          p: 1.5
        }}
      >
        {currentMessages.map(m => (
          <Box
            key={m.id}
            sx={{
              display: 'flex',
              justifyContent: m.isMe ? 'flex-end' : 'flex-start',
              mb: 1.2
            }}
          >
            <Paper
              sx={{
                maxWidth: '80%',
                p: 1,
                borderRadius: 3,
                backgroundColor: m.isMe
                  ? theme.palette.mode === 'light'
                    ? '#dbeafe'
                    : '#1e293b'
                  : theme.palette.mode === 'light'
                  ? '#eff6ff'
                  : '#111827'
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  color: theme.palette.text.secondary,
                  mb: 0.5
                }}
              >
                {m.author} · {m.time}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>{m.text}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pt: 1,
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <IconButton size='small'>
          <AttachFileIcon fontSize='small' />
        </IconButton>
        <IconButton size='small'>
          <MicIcon fontSize='small' />
        </IconButton>
        <TextField
          size='small'
          placeholder='Напишите сообщение...'
          fullWidth
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant='contained'
          size='small'
          endIcon={<SendIcon fontSize='small' />}
          onClick={handleSend}>
        </Button>
      </Box>
    </Box>
  )
}
