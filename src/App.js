import { Button, Container, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import { fetchProject, fetchIterations } from './pivotal_api';

function App() {
  const reducer = (acc, currentVal) => acc + currentVal
  const uniq = (val, index, self) => self.indexOf(val) === index

  const getNameFromId = (id) => {
    if (id === 3138117) {
      return "Richy"
    } else if (id === 1325118) {
      return "Dom"
    } else if (id === 2896513) {
      return "Nolan"
    } else if (id === 1491212) {
      return "Jason"
    }
  }

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

  const handleFetchProjectIterationsClicked = (event) => {
    fetchIterations(projectId, setIterations)
  }

  const [projectId, setProjectId] = React.useState("866453")
  const [project, setProject] = React.useState({})
  const [iterations, setIterations] = React.useState([])

  console.log('Project ID: ', projectId)
  console.log('Project: ', project)
  console.log('Iterations: ', iterations)
  return (
    <Container fluid="lg" style={{ marginTop: '1rem' }}>
      <Stack direction="row" spacing={2}>
        <TextField id="project-id" label="Project ID" variant="outlined" value={projectId} onChange={handleProjectIdChanged}/>
        <Button id="fetch-project-button" color="primary" size="large" variant="outlined" onClick={handleFetchProjectClicked}>Fetch Project</Button>
        <Button id="fetch-project-iterations-button" color="secondary" size="large" variant="outlined" onClick={handleFetchProjectIterationsClicked}>Fetch Project Iterations</Button>
      </Stack>
      { iterations.length > 0 && (
        <Stack direction="row" spacing={2}>
          { iterations.map(iteration => {
            const totalIterationPoints = sumIterationPoints(iteration.stories)
            return (
              <Paper key={iteration.number} style={{ padding: '1rem', width: '100%' }}>
                <Typography variant="h5">Iteration #{iteration.number}</Typography>
                <Divider />
                <Typography variant="body2">Story Count: {iteration.stories.length}</Typography>
                <Typography variant="body2">Total Points: {totalIterationPoints}</Typography>
                { iteration.stories.map(story => story.owned_by_id).filter(uniq).map(userId => {
                  let storiesForUser = iteration.stories.filter(story => story.owned_by_id === userId)
                  let totalPointsForUser = storiesForUser.filter(story => !["bug", "chore"].includes(story.story_type)).map(story => story.estimate).reduce(reducer)
                  return (
                    <Typography key={userId} variant="body2">{getNameFromId(userId)}: {totalPointsForUser} ({Math.floor((totalPointsForUser / totalIterationPoints) * 100)}%)</Typography>
                  )
                }) }
              </Paper>
            )
          })}
        </Stack>
      )}
    </Container>
  );
}

export default App;
