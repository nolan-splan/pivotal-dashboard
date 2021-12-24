import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-regular-svg-icons'
import {
  AppBar,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'

export default function Navbar(props) {
  const { projectId, setProjectId } = props
  const handleProjectIdChanged = (e) => setProjectId(e.target.value)

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
            <NavLink to="/people" style={({ isActive }) => {
              return {
                color: 'white',
                textDecoration: 'none',
                fontWeight: isActive ? "bold" : ""
              }
            }}>
              People
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
          <TextField id="project-id" label="Project ID" variant="outlined" value={projectId} onChange={handleProjectIdChanged} style={{ marginLeft: 'auto' }} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}