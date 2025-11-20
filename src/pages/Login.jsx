// src/pages/Login.jsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Box, Button, TextField, Typography } from '@mui/material'

export default function Login () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // по умолчанию перенаправляем на главную
  const from = location.state?.from?.pathname || '/'

  function onSubmit (data) {
    const res = auth.login({ email: data.email, password: data.password })
    if (res.ok) {
      navigate(from, { replace: true })
    } else {
      alert(res.error || 'Не удалось выполнить вход')
    }
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Typography variant='h5' mb={2}>
        Вход
      </Typography>

      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label='Электронная почта'
          fullWidth
          margin='normal'
          {...register('email', { required: 'Укажите электронную почту' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label='Пароль'
          type='password'
          fullWidth
          margin='normal'
          {...register('password', { required: 'Введите пароль' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Box mt={2} display='flex' gap={2}>
          <Button type='submit' variant='contained'>
            Войти
          </Button>
          <Button
            component={RouterLink}
            to='/signup'
            variant='outlined'
          >
            Создать аккаунт
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
