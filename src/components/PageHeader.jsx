// src/components/PageHeader.jsx
import React from 'react'
import { Box, Typography, IconButton, useTheme } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from 'react-router-dom'

export default function PageHeader({ title }) {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
        background: theme.palette.background.paper,
      }}
    >
      <IconButton onClick={() => navigate(-1)} size="small">
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
      <Typography sx={{ fontWeight: 700, fontSize: 17 }}>
        {title}
      </Typography>
    </Box>
  )
}
