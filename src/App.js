import React from 'react'
import theme from './theme'
import { 
  FormControl, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select,
  Typography,
  ThemeProvider,
  CssBaseline
} from '@mui/material'

import { fetchMyProjects } from './pivotal_api';
import CurrentSprint from './components/CurrentSprint';

function App() {
  const [projects, setProjects] = React.useState([])
  const [currentProject, setCurrentProject] = React.useState({})
  const [currentProjectId, setCurrentProjectId] = React.useState('')

  React.useEffect(() => {
    fetchMyProjects(setProjects)
  }, [])

  const handleProjectChanged = (event) => {
    let project = projects.filter(p => p.id === event.target.value)[0]
    console.log(project)
    setCurrentProject(project)
    setCurrentProjectId(project.id)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl sx={{ marginTop: '1rem', marginLeft: '1rem' }} fullWidth>
            <InputLabel id="project-select-label">Project</InputLabel>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={currentProjectId}
              label="Project"
              onChange={handleProjectChanged}
            >
              { projects.length > 0 ? projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
              )) : (
                <MenuItem value="projectid"></MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          { Object.keys(currentProject).length > 0 && (
            <Typography sx={{ marginTop: '1rem', marginLeft: '1rem' }} variant="h3">Sprint #{currentProject.current_iteration_number}</Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          { Object.keys(currentProject).length > 0 && (
            <CurrentSprint projectId={currentProject.id} />
          )}
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}

export default App;
