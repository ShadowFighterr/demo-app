// src/pages/PostDetailsPage.jsx
import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Chip,
  useTheme
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById } from '../data/posts'

export default function PostDetailsPage () {
  const theme = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()

  const post = getPostById(id)

  if (!post) {
    return (
      <Box sx={{ p: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
          Новость не найдена
        </Typography>
        <Typography
          sx={{ fontSize: 12, color: theme.palette.text.secondary }}
        >
          Возможно, ссылка устарела или была указана неверно.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {/* Кнопка назад + канал */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <IconButton size='small' onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon fontSize='small' />
        </IconButton>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 12,
              color: theme.palette.text.secondary
            }}
          >
            {post.channel}
          </Typography>
          <Typography
            sx={{ fontSize: 11, color: theme.palette.text.secondary }}
          >
            {post.time}
          </Typography>
        </Box>
        {post.badge && (
          <Chip
            label={post.badge}
            size='small'
            sx={{ fontSize: 10, height: 22 }}
            color='secondary'
          />
        )}
      </Box>

      {/* Заголовок */}
      <Typography
        variant='h6'
        sx={{ fontWeight: 700, fontSize: 18 }}
      >
        {post.title}
      </Typography>

      {/* Обложка новости */}
      {post.image && (
        <Box sx={{ mb: 1 }}>
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              borderRadius: 16,
              display: 'block'
            }}
          />
        </Box>
      )}

      {/* Текст новости */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {post.content.map((paragraph, idx) => (
          <Typography
            key={idx}
            sx={{ fontSize: 13, color: theme.palette.text.primary }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
