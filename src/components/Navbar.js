import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-regular-svg-icons'
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'

export default function Navbar(props) {
  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FontAwesomeIcon size="2x" color="#90ee90" icon={faCompass} style={{ marginRight: '.5rem' }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Pivotal Dashboard
          </Typography>

          <Button sx={{ my: 2, color: 'white', display: 'block' }}>
            <NavLink to="/" style={({ isActive }) => {
              return {
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? "bold" : ""
              }
            }}>
              Current Sprint
            </NavLink>
          </Button>
          <Button sx={{ my: 2, color: 'white', display: 'block' }}>
            <NavLink to="/previous_four_sprints" style={({ isActive }) => {
              return {
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? "bold" : ""
              }
            }}>
              Previous 4 Sprints
            </NavLink>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}