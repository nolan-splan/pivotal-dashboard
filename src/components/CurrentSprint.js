import { CircularProgress, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { fetchCurrentIteration } from '../pivotal_api'
import StoriesBreakdown from './StoriesBreakdown'
import PointsBreakdownPieChart from './PointsBreakdownPieChart'
import AcceptedPointsAreaChart from './AcceptedPointsAreaChart'
import SprintPercentComplete from './charts/pie/SprintPercentComplete'
import PointOwnership from './charts/radar/PointOwnership'
import { fetchProjectMemberships } from '../pivotal_api'
import SprintBurndownChart from './charts/line/SprintBurndownChart'
import CurrentSprintHeader from './CurrentSprintHeader'

export default function CurrentSprint(props) {
	const [currentSprint, setCurrentSprint] = React.useState({})
	const [people, setPeople] = React.useState([])

	const projectId = 866453

  const getPeopleFromMemberships = (memberships) => {
    const peeps = memberships.map(membership => membership.person)
    setPeople(peeps)
  }

  React.useEffect(() => {
    fetchProjectMemberships(projectId, getPeopleFromMemberships)
  }, [])

	React.useEffect(() => {
		fetchCurrentIteration(projectId, setCurrentSprint)
	}, [])

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
			{ Object.keys(currentSprint).length > 0 && people.length > 0 ? (
				<React.Fragment>
					<CurrentSprintHeader sprint={currentSprint} />
					<Divider />
					<Grid container alignItems="center" spacing={3}>
						<Grid item xs={3}>
							<PointsBreakdownPieChart stories={currentSprint.stories} />
						</Grid>
						<Grid item xs={6}>
							<AcceptedPointsAreaChart sprint={currentSprint} />
						</Grid>
						<Grid item xs={3}>
							<SprintPercentComplete
								acceptedPoints={
									currentSprint.stories
										.filter(story => story.story_type === "feature" && story.current_state === "accepted")
										.map(story => story.estimate)
										.reduce((partial_sum, a) => partial_sum + a, 0)
								}
								totalPoints={
									currentSprint.stories
										.filter(story => story.story_type === "feature")
										.map(story => story.estimate)
										.reduce((partial_sum, a) => partial_sum + a, 0)
								}
							/>
						</Grid>
					</Grid>
					<Divider style={{ marginTop: '1rem' }} />
					<Grid container alignItems="center" spacing={3}>
						<Grid item xs={3}>
							<PointOwnership stories={currentSprint.stories} people={people} />
						</Grid>
            <Grid item xs={6}>
              <SprintBurndownChart sprint={currentSprint} />
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={2} alignItems="center" justifyContent="space-around">
                <Typography variant="h4">Team Strength</Typography>
                <Typography variant="h1">{currentSprint.team_strength * 100}%</Typography>
              </Stack>
            </Grid>
					</Grid>
					{/** completion time vs story estimate graph? scatter plot */}
					{/** point distribution by user? radar chart */}
					{/** story time spent tree map (longer stories take up more space) simple tree map*/}
					{/* <StoriesBreakdown currentSprint={currentSprint} /> */}
				</React.Fragment>
			) : (
				renderLoadingSpinner()
			)}
		</Container>
	)
}