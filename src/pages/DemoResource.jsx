// src/pages/DemoResource.jsx
import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  useTheme
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from 'react-router-dom'

export default function DemoResource () {
  const theme = useTheme()
  const navigate = useNavigate()

  const [note, setNote] = useState('')
  const [notes, setNotes] = useState(['hello'])

  const handleAdd = () => {
    const trimmed = note.trim()
    if (!trimmed) return
    setNotes(prev => [trimmed, ...prev])
    setNote('')
  }

  const handleClear = () => {
    setNotes([])
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Back + title */}
      <Box
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
          Demo: Заметки
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            mb: 1
          }}
        >
          Локальные заметки (MVP)
        </Typography>

        <TextField
          multiline
          minRows={2}
          fullWidth
          size='small'
          placeholder='Напишите короткую заметку...'
          value={note}
          onChange={e => setNote(e.target.value)}
          sx={{ mb: 1 }}
        />

        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Button
            variant='contained'
            size='small'
            onClick={handleAdd}
          >
            Добавить
          </Button>
          <Button
            variant='outlined'
            size='small'
            color='error'
            onClick={handleClear}
          >
            Очистить
          </Button>
        </Box>

        <List dense>
          {notes.map((n, idx) => (
            <ListItem key={idx} disableGutters>
              <ListItemText
                primary={n}
                primaryTypographyProps={{
                  fontSize: 13,
                  color: theme.palette.text.primary
                }}
              />
            </ListItem>
          ))}
          {notes.length === 0 && (
            <Typography
              sx={{
                fontSize: 12,
                color: theme.palette.text.secondary
              }}
            >
              Пока нет заметок.
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  )
}
