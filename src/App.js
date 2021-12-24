import { CssBaseline, Grid, ThemeProvider } from '@mui/material'
import theme from './theme'
import React from 'react'
import PreviousFourSprints from './components/PreviousFourSprints';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CurrentSprint from './components/CurrentSprint';
import People from './components/People';
import ControlPanel from './components/ControlPanel';
import { fetchProject } from './pivotal_api';


function App() {
  const [projectId, setProjectId] = React.useState("866453")
  const [currentProject, setCurrentProject] = React.useState({})

  React.useEffect(() => {
    if (projectId) {
      fetchProject(projectId, setCurrentProject)
    }
  }, [projectId])

  console.log(currentProject)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <ControlPanel projectId={projectId} />
          </Grid>
          <Grid item xs={10} sx={{ padding: '1rem' }}>
            <Routes>
              {/* <Route path="/" element={<ControlPanel projectId={projectId} />} /> */}
              <Route path="/dashboard" element={<CurrentSprint projectId={projectId} />} />
              <Route path="/people" element={<People projectId={projectId} />} />
              <Route path="previous_four_sprints" element={<PreviousFourSprints projectId={projectId} />} />
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
