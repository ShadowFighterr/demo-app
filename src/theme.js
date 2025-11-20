// src/theme.js
import { createTheme } from '@mui/material/styles'
import { deepOrange, amber, grey, blueGrey } from '@mui/material/colors'

const common = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    // add more if needed
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // card background will adapt automatically based on palette.background.paper
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          textTransform: 'none'
        }
      }
    }
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: blueGrey[700] },
    secondary: { main: amber[700] },
    background: { default: '#f4f6f8', paper: '#ffffff' },
    text: { primary: '#343a40', secondary: '#616161' },
    divider: '#e0e0e0'
  },
  ...common
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: deepOrange[400] },
    secondary: { main: amber[200] },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#e0e0e0', secondary: '#9e9e9e' },
    divider: 'rgba(255,255,255,0.12)'
  },
  ...common
})
