import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#58a6ff',
    },
    secondary: {
      main: '#ff80ab',
    },
    background: {
      default: '#0d1117',
      paper: '#323a45',
    },
    error: {
      main: '#da4336',
    },
  },
})

export default theme