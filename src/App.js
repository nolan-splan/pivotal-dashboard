import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import { Button, Container, Divider, Paper, Stack, TextField, Typography, Grid } from '@mui/material';
import React from 'react'
import { fetchProject, fetchIterations, fetchProjectMemberships } from './pivotal_api';
import IterationBreakdownTable from './IterationBreakdownTable';

function App() {
  const reducer = (acc, currentVal) => acc + currentVal

  const sumIterationPoints = (stories) => {
    const filtered = stories.filter(story => !["bug", "chore"].includes(story.story_type))
    const points = filtered.map(story => story.estimate)
    const sum = points.reduce(reducer)
    return sum
  }

  const handleProjectIdChanged = (event) => {
    setProjectId(event.target.value)
  }

  const handleFetchProjectClicked = (event) => {
    fetchProject(projectId, setProject)
  }

  const getPeopleFromMemberships = (memberships) => {
    const people = memberships.map(membership => membership.person)
    setPeople(people)
  }

  const handleFetchProjectIterationsClicked = (event) => {
    fetchProjectMemberships(projectId, getPeopleFromMemberships)
    fetchIterations(projectId, setIterations)
  }

  const [projectId, setProjectId] = React.useState("866453")
  const [project, setProject] = React.useState({})
  const [iterations, setIterations] = React.useState([])
  const [people, setPeople] = React.useState([])

  return (
    <Container fluid="lg" style={{ marginTop: '1rem' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack direction="row" spacing={2}>
          <TextField id="project-id" label="Project ID" variant="outlined" value={projectId} onChange={handleProjectIdChanged}/>
          <Button id="fetch-project-button" color="primary" size="large" variant="outlined" onClick={handleFetchProjectClicked}>Fetch Project</Button>
          <Button id="fetch-project-iterations-button" color="secondary" size="large" variant="outlined" onClick={handleFetchProjectIterationsClicked}>Fetch Project Iterations</Button>
        </Stack>
        { iterations.length > 0 && people.length > 0 && (
          <Stack spacing={2} style={{ marginTop: '1rem' }}>
            { iterations.map(iteration => {
              const totalIterationPoints = sumIterationPoints(iteration.stories)
              return (
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Paper key={iteration.number} style={{ padding: '1rem' }}>
                      <Typography variant="h5">Iteration #{iteration.number}</Typography>
                      <Divider />
                      <Typography variant="body2">Story Count: {iteration.stories.length}</Typography>
                      <Typography variant="body2">Total Points: {totalIterationPoints}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={9}>
                    <IterationBreakdownTable iteration={iteration} people={people} totalIterationPoints={totalIterationPoints} />
                  </Grid>
                </Grid>
              )
            })}
          </Stack>
        )}
      </ThemeProvider>
    </Container>
  );
}

export default App;
