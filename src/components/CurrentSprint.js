import { CircularProgress, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { fetchCurrentIteration, fetchProjectMemberships, fetchProject } from '../pivotal_api'
import PointsBreakdownPieChart from './PointsBreakdownPieChart'
import AcceptedPointsAreaChart from './AcceptedPointsAreaChart'
import SprintPercentComplete from './charts/pie/SprintPercentComplete'
import PointOwnership from './charts/radar/PointOwnership'
import SprintBurndownChart from './charts/line/SprintBurndownChart'
import CurrentSprintHeader from './CurrentSprintHeader'
import StoryTypesForUserChart from './charts/bar/StoryTypesForUserChart'

export default function CurrentSprint(props) {
	const [currentSprint, setCurrentSprint] = React.useState({})
	const [people, setPeople] = React.useState([])
  const [project, setProject] = React.useState({})

	const { projectId } = props

  const getPeopleFromMemberships = (memberships) => {
    const peeps = memberships.map(membership => membership.person)
    setPeople(peeps)
  }

  React.useEffect(() => {
    fetchProject(projectId, setProject)
  }, [projectId])

  React.useEffect(() => {
    fetchProjectMemberships(projectId, getPeopleFromMemberships)
  }, [projectId])

	React.useEffect(() => {
		fetchCurrentIteration(projectId, setCurrentSprint)
	}, [projectId])

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

	return(
		<Container maxWidth="lg">
			{ Object.keys(project).length > 0 && Object.keys(currentSprint).length > 0 && people.length > 0 ? (
				<React.Fragment>
					<CurrentSprintHeader project={project} sprint={currentSprint} />
					<Divider />
					<Stack direction="row" spacing={2} justifyContent="space-around">
						<PointsBreakdownPieChart stories={currentSprint.stories} />
						<AcceptedPointsAreaChart sprint={currentSprint} />
						<SprintBurndownChart sprint={currentSprint} />
						<SprintPercentComplete sprint={currentSprint} />
					</Stack>

					<Divider style={{ marginTop: '1rem' }} />

					<Stack direction="row" spacing={2} justifyContent="space-around">
						<PointOwnership stories={currentSprint.stories} people={people} />
            <StoryTypesForUserChart sprint={currentSprint} people={people} />
						<Stack spacing={2} alignItems="center" justifyContent="center" flex={1}>
							<Typography variant="h4">Team Strength</Typography>
							<Typography variant="h1">{currentSprint.team_strength * 100}%</Typography>
						</Stack>
					</Stack>
				</React.Fragment>
			) : (
				renderLoadingSpinner()
			)}
		</Container>
	)
}