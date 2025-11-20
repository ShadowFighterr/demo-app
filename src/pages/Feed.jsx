// src/pages/Feed.jsx
import React, { useMemo, useState } from 'react'
import { feed } from '../lib/data'
import { Box, Typography, TextField, Button } from '@mui/material'

export default function Feed(){
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return feed
    return feed.filter(f =>
      f.title.toLowerCase().includes(s) ||
      (f.excerpt || '').toLowerCase().includes(s) ||
      (f.team || '').toLowerCase().includes(s)
    )
  }, [q])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Company Feed</Typography>
      <Typography color="textSecondary" paragraph>Latest news, announcements and product updates</Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          placeholder="Search feed..."
          size="small"
          sx={{ flex: 1 }}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <Button variant="outlined" onClick={() => setQ('')}>Clear</Button>
      </Box>

      <Box display="grid" gap={2}>
        {filtered.map(f => (
          <Box key={f.id} sx={{ bgcolor:'background.paper', p:2, borderRadius:2, boxShadow:2, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{f.title}</Typography>
              <Typography color="textSecondary" variant="body2">{f.excerpt}</Typography>
              <Typography color="textSecondary" variant="caption" mt={1}>{f.date} · {f.team}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={1} ml={2}>
              <Button variant="contained" size="small" onClick={() => alert('Open: ' + f.title)}>Open</Button>
              <Button variant="outlined" size="small" onClick={() => navigator.share ? navigator.share({title: f.title, text: f.excerpt}) : alert('Share: ' + f.title)}>Share</Button>
            </Box>
          </Box>
        ))}
        {filtered.length === 0 && <Typography color="textSecondary">No results — try another search.</Typography>}
      </Box>
    </Box>
  )
}
