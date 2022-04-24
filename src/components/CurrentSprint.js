import { CircularProgress, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { fetchCurrentIteration, fetchProjectMemberships, fetchProject, fetchIteration, fetchIterations } from '../pivotal_api'
import PointsBreakdownPieChart from './PointsBreakdownPieChart'
import AcceptedPointsAreaChart from './AcceptedPointsAreaChart'
import SprintPercentComplete from './charts/pie/SprintPercentComplete'
import PointOwnership from './charts/radar/PointOwnership'
import SprintBurndownChart from './charts/line/SprintBurndownChart'
import CurrentSprintHeader from './CurrentSprintHeader'
import StoryTypesForUserChart from './charts/bar/StoryTypesForUserChart'
import Timeline from './Timeline'

export default function CurrentSprint(props) {
	const [currentSprint, setCurrentSprint] = React.useState({})
	const [people, setPeople] = React.useState([])
	const [project, setProject] = React.useState({})
  const [memberships, setMemberships] = React.useState([])
  const [iterations, setIterations] = React.useState([])

	const { projectId } = props

  React.useEffect(() => {
    fetchProject(projectId, setProject)
  }, [projectId])

  React.useEffect(() => {
    fetchProjectMemberships(projectId, setMemberships)
  }, [projectId])

	React.useEffect(() => {
		fetchCurrentIteration(projectId, setCurrentSprint)
		// fetchIteration(projectId, 241, setCurrentSprint)
	}, [projectId])

  React.useEffect(() => {
    fetchIterations(projectId, setIterations)
  }, [projectId])

  // const getPeopleFromMemberships = (memberships) => {
  //   const peeps = memberships.map(membership => membership.person)
  //   setPeople(peeps)
  // }

	const renderLoadingSpinner = () => (
		<Paper style={{ textAlign: 'center', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem' }}>
			<Box style={{ padding: '1rem' }}>

				<CircularProgress />
				<Typography variant="h5">
					Fetching Current Sprint...
				</Typography>
			</Box>
		</Paper>
	)

  const renderSpinner = () => (
    <CircularProgress />
  )

  const handleIterationChanged = (event) => {
    let iteration = iterations.filter(p => p.id === event.target.value)[0]
    console.log(iteration)
    setCurrentSprint(iteration)
    // setCurrentProject(project)
    // setCurrentProjectId(project.id)
  }

	return(
		<Container maxWidth="lg">
      <Stack direction="row" spacing={2} justifyContent="space-around">
        <FormControl sx={{ marginTop: '1rem', marginLeft: '1rem' }} fullWidth>
          <InputLabel id="iteration-select-label">Iteration</InputLabel>
          <Select
            labelId="iteration-select-label"
            id="iteration-select"
            value={currentSprint}
            label="Iteration"
            onChange={handleIterationChanged}
          >
            { iterations.length > 0 ? iterations.map((iteration) => (
              <MenuItem key={iteration.id} value={iteration.id}>Sprint #{iteration.number}</MenuItem>
            )) : (
              <MenuItem value="iterationId"></MenuItem>
            )}
          </Select>
        </FormControl>
      </Stack>
			{ Object.keys(project).length > 0 && Object.keys(currentSprint).length > 0 && memberships.length > 0 ? (
				<React.Fragment>
					{/* <CurrentSprintHeader project={project} sprint={currentSprint} /> */}
					<Divider />
					<Stack direction="row" spacing={2} justifyContent="space-around">
						{/* <PointsBreakdownPieChart stories={currentSprint.stories} /> */}
						{/* <AcceptedPointsAreaChart sprint={currentSprint} /> */}
						{/* <SprintBurndownChart sprint={currentSprint} /> */}
						<PointOwnership stories={currentSprint.stories} memberships={memberships} />
						<StoryTypesForUserChart sprint={currentSprint} memberships={memberships} />
						{/* <SprintPercentComplete sprint={currentSprint} /> */}
					</Stack>

					{/* <Divider style={{ marginTop: '1rem' }} /> */}

					{/* <Stack direction="row" spacing={2} justifyContent="space-around">
						<PointOwnership stories={currentSprint.stories} people={people} />
						<StoryTypesForUserChart sprint={currentSprint} people={people} />
						<Stack spacing={2} alignItems="center" justifyContent="center" flex={1}>
							<Typography variant="h4">Team Strength</Typography>
							<Typography variant="h1">{currentSprint.team_strength * 100}%</Typography>
						</Stack>
					</Stack>
					<div style={{ marginTop: '1rem' }}>
						<Timeline project={project} sprint={currentSprint} />
					</div> */}
				</React.Fragment>
			) : (
				renderLoadingSpinner()
			)}
		</Container>
	)
}