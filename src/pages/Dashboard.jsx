import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

export default function Dashboard(){
  const { user } = useAuth()
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography paragraph>Welcome, {user?.name || user?.email} — this is a protected page.</Typography>
      <Box display="flex" gap={2}>
        <Button component={Link} to="/demo" variant="outlined">Notes demo</Button>
        <Button component={Link} to="/profile" variant="contained">Edit profile</Button>
      </Box>
    </Box>
  )
}
