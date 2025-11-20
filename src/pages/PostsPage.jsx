// src/pages/PostsPage.jsx
import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Chip,
  Paper,
  Avatar,
  Button,
  useTheme
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { posts } from '../data/posts'

export default function PostsPage () {
  const theme = useTheme()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'Все публикации' },
    { id: 'actual', label: 'Актуальные' },
    { id: 'events', label: 'Мероприятия' }
  ]

  const filteredPosts = useMemo(() => {
    if (activeTab === 'all') return posts
    if (activeTab === 'actual') {
      return posts.filter(p => p.type === 'actual')
    }
    if (activeTab === 'events') {
      return posts.filter(p => p.type === 'event')
    }
    return posts
  }, [activeTab])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Заголовок */}
      <Box>
        <Typography
          variant='h6'
          sx={{ fontWeight: 700, fontSize: 18, mb: 0.5 }}
        >
          Публикации
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: theme.palette.text.secondary
          }}
        >
          Следите за последними событиями компании в каналах.
        </Typography>
      </Box>

      {/* Фильтры */}
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5 }}>
        {tabs.map(tab => (
          <Chip
            key={tab.id}
            label={tab.label}
            size='small'
            clickable
            color={activeTab === tab.id ? 'primary' : 'default'}
            variant={activeTab === tab.id ? 'filled' : 'outlined'}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </Box>

      {/* Список публикаций */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {filteredPosts.map(post => (
          <Paper
            key={post.id}
            sx={{
              p: 1.5,
              borderRadius: 3,
              boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  mr: 1,
                  fontSize: 13,
                  backgroundColor:
                    theme.palette.mode === 'light' ? '#fee2e2' : '#1e293b',
                  color: theme.palette.mode === 'light' ? '#b91c1c' : '#fecaca'
                }}
              >
                {post.channel.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {post.channel}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: theme.palette.text.secondary
                  }}
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

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                mb: 0.5
              }}
            >
              {post.title}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: theme.palette.text.secondary,
                mb: 1
              }}
            >
              {post.short}
            </Typography>

            <Button
              size='small'
              variant='text'
              sx={{ fontSize: 12, paddingLeft: 0 }}
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              Читать дальше
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}
