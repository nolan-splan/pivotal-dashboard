import { Divider, Grid, Paper, Stack, Typography, Badge } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBug, faStar, faCog } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import IterationBreakdownTable from '../IterationBreakdownTable';
import { fetchIterations, fetchProjectMemberships } from '../pivotal_api';

export default function PreviousFourSprints(props) {
  const [iterations, setIterations] = React.useState([])
  const [people, setPeople] = React.useState([])
  const projectId = "866453"

  const getPeopleFromMemberships = (memberships) => {
    const peeps = memberships.map(membership => membership.person)
    setPeople(peeps)
  }

  const reducer = (acc, currentVal) => acc + currentVal

  const sumIterationPoints = (stories) => {
    const filtered = stories.filter(story => !["bug", "chore"].includes(story.story_type))
    const points = filtered.map(story => story.estimate)
    const sum = points.reduce(reducer)
    return sum
  }

  React.useEffect(() => {
    fetchProjectMemberships(projectId, getPeopleFromMemberships)
  }, [])

  React.useEffect(() => {
    fetchIterations(projectId, setIterations)
  }, [])

  return (
    iterations.length > 0 && people.length > 0 && (
      <Stack spacing={2} style={{ marginTop: '1rem' }}>
        { iterations.map(iteration => {
          const totalIterationPoints = sumIterationPoints(iteration.stories)
          return (
            <Grid container>
              <Grid item xs={6}>
                <Paper key={iteration.number} style={{ padding: '1rem', marginLeft: '1rem' }}>
                  <Typography variant="h5" style={{ marginBottom: '1rem' }}>Sprint #{iteration.number} - {totalIterationPoints} Points</Typography>
                  <Divider />
                  <IterationBreakdownTable iteration={iteration} people={people} totalIterationPoints={totalIterationPoints} />
                </Paper>
              </Grid>
            </Grid>
          )
        })}
      </Stack>
    )
  )
}