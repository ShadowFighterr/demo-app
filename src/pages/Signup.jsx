// src/pages/Signup.jsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material'

export default function Signup () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const auth = useAuth()
  const navigate = useNavigate()

  function onSubmit (data) {
    // создаём аккаунт в локальном AuthContext
    auth.signup({
      name: data.name,
      email: data.email,
      password: data.password
    })

    // показываем уведомление и отправляем пользователя на главную
    alert('Аккаунт успешно создан')
    navigate('/') // можно заменить на '/profile', если захотите открывать профиль
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Typography variant='h5' mb={2}>
        Создать аккаунт
      </Typography>

      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label='Имя'
          fullWidth
          margin='normal'
          {...register('name', { required: 'Укажите имя' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label='Email'
          fullWidth
          margin='normal'
          {...register('email', {
            required: 'Укажите email',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Некорректный email'
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label='Пароль'
          type='password'
          fullWidth
          margin='normal'
          {...register('password', {
            required: 'Укажите пароль',
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Box mt={2} display='flex' gap={2}>
          <Button type='submit' variant='contained'>
            Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
