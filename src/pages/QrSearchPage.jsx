// src/pages/QrSearchPage.jsx
import React, { useMemo, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
  useTheme,
  IconButton
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

// Небольшой набор "виртуальных" QR-кодов
const qrItems = [
  {
    id: 1,
    title: 'Ссылка на портал Qollab',
    description: 'Быстрый переход в корпоративный портал.',
    url: 'https://example.com/qollab-portal'
  },
  {
    id: 2,
    title: 'Опрос по вовлечённости',
    description: 'Анонимный опрос для оценки вовлечённости сотрудников.',
    url: 'https://example.com/engagement-survey'
  },
  {
    id: 3,
    title: 'FAQ по отпускам и больничным',
    description: 'Ответы на частые вопросы по отпускам, больничным и декрету.',
    url: 'https://example.com/hr-faq'
  }
]

export default function QrSearchPage () {
  const theme = useTheme()
  const navigate = useNavigate()

  const [currentId, setCurrentId] = useState(() => qrItems[0].id)

  const current = useMemo(
    () => qrItems.find(i => i.id === currentId) ?? qrItems[0],
    [currentId]
  )

  const handleRandom = () => {
    const others = qrItems.filter(i => i.id !== current.id)
    const next = others[Math.floor(Math.random() * others.length)]
    setCurrentId(next.id)
  }

  const qrSrc = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        current.url
      )}&size=220x220`,
    [current.url]
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <PageHeader title="Поиск по QR-коду" />
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
          Поиск по QR-коду
        </Typography>
      </Box> */}

      <Paper
        sx={{
          p: 1.5,
          borderRadius: 3,
          boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
        }}
      >
        <Stack direction='row' spacing={1} alignItems='center' mb={1}>
          <QrCodeScannerIcon />
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            Считывание QR-кодов
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: 12,
            color: theme.palette.text.secondary,
            mb: 1
          }}
        >
          В реальном приложении здесь используется камера смартфона для
          считывания QR-кодов, отображения информации на экране и перехода по
          ссылкам. В демо мы показываем случайный QR-код и связанные с ним
          данные.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 2
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              backgroundColor:
                theme.palette.mode === 'light' ? '#ffffff' : '#020617',
              boxShadow: '0 8px 24px rgba(15,23,42,0.18)'
            }}
          >
            <img
              src={qrSrc}
              alt='QR code'
              style={{
                width: 220,
                height: 220,
                display: 'block'
              }}
            />
          </Box>
        </Box>

        <Typography
          sx={{ fontSize: 13, fontWeight: 600, mb: 0.25 }}
        >
          {current.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: theme.palette.text.secondary,
            mb: 1
          }}
        >
          {current.description}
        </Typography>

        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
          sx={{ mb: 1 }}
        >
          <Chip
            size='small'
            label='Ссылка QR-кода'
            variant='outlined'
            sx={{ fontSize: 11, height: 22 }}
          />
          <Typography
            sx={{
              fontSize: 11,
              color: theme.palette.text.secondary
            }}
          >
            {current.url}
          </Typography>
        </Stack>

        <Stack
          direction='row'
          spacing={1}
          justifyContent='space-between'
        >
          <Button
            variant='outlined'
            size='small'
            onClick={handleRandom}
          >
            Случайный QR
          </Button>

          <Button
            variant='contained'
            size='small'
            endIcon={<OpenInNewIcon />}
            component='a'
            href={current.url}
            target='_blank'
            rel='noreferrer'
          >
            Открыть ссылку
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
