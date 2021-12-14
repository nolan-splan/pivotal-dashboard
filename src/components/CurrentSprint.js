import { faCircle, faDotCircle, faFlagCheckered, faArrowDown, faRocket, faFire } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleEmpty } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { fetchCurrentIteration } from '../pivotal_api'
import moment from 'moment'
import StoriesBreakdown from './StoriesBreakdown'
import PointsBreakdownPieChart from './PointsBreakdownPieChart'
import AcceptedPointsAreaChart from './AcceptedPointsAreaChart'
import SprintPercentComplete from './charts/pie/SprintPercentComplete'
import PointOwnership from './charts/radar/PointOwnership'
import { fetchProjectMemberships, fetchStoryTransitions } from '../pivotal_api'

import StoryCompletionTime from './charts/scatter/StoryCompletionTime'
window.moment = moment

export default function CurrentSprint(props) {
	const [currentSprint, setCurrentSprint] = React.useState({})
	const [people, setPeople] = React.useState([])
	const [transitions, setTransitions] = React.useState([])


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

	// fix this1
	React.useEffect(() => {
		if (currentSprint.stories) {
			fetchStoryTransitions(projectId, currentSprint.stories.filter(story => story.story_type === "feature").map(story => story.id), setTransitions)
		}
	}, [currentSprint.stories])

	const { start, finish, number } = currentSprint

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

	const startDate = moment(start)
	const currentDate = moment()
	const endDate = moment(finish)

	// We have start and end and the current date
	// put dates between start and current in one array, and dates between current and finish in another
	const previousDates = []
	const futureDates = []
	for(let i = 0; i < currentDate.diff(startDate, 'days'); i++) {
		let fakeDate = moment(start)
		let d = fakeDate.add(i, 'days')
		previousDates.push(d)
	}

	for(let i = 0; i < endDate.diff(currentDate, 'days') + 1; i++) {
		let fakeDate = moment()
		let d = fakeDate.add(i, 'days')
		futureDates.push(d)
	}

	return(
		<Container maxWidth="lg">
			{ Object.keys(currentSprint).length > 0 && people.length > 0 && transitions.length > 0 ? (
				<React.Fragment>
					<Stack direction="row" spacing={3}>
						<Typography variant="h1">Sprint #{number}</Typography>
						{/* <Divider orientation="vertical" variant="middle" flexItem />
						<Typography variant="h4" style={{ marginTop: '2.5rem' }}>
							Points: {totalPoints}
						</Typography> */}
						<Divider orientation="vertical" variant="middle" flexItem />
						<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} style={{ flex: 1 }}>
							{ previousDates.map((date, index) => (
								<Stack key={index} spacing={1}>
									{ index === 0 && (
										<FontAwesomeIcon icon={faRocket} color="lightblue" size="lg" style={{ marginLeft: '.5rem' }} />
									)}
									<FontAwesomeIcon icon={faCircle} color="#90ee90" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
									<Typography variant="caption" style={{ display: index === 0 ? 'flex' : 'none' }}>{date.format("MM/D")}</Typography>
								</Stack>
							))}
							{ futureDates.map((date, index) => (
								<Stack key={index} spacing={1}>
									{ index === 0 && (
										<FontAwesomeIcon icon={faArrowDown} size="lg" color="red" style={{ marginLeft: '.5rem' }} />
									)}
									{ index === futureDates.length - 1 && (
										<FontAwesomeIcon icon={faFlagCheckered} size="lg" color="lightgreen" style={{ marginLeft: '.5rem' }} />
									)}
									<FontAwesomeIcon color="#ff7376" icon={date.format('LLL') === currentDate.format('LLL') ? faDotCircle : faCircleEmpty} style={{ marginLeft: 'auto', marginRight: 'auto' }}/>
									<Typography variant="caption" style={{ display: (index === 0 || index === futureDates.length - 1) ? 'flex' : 'none' }}>{date.format("MM/D")}</Typography>
								</Stack>
							))}
						</Stack>
						<Divider orientation="vertical" variant="middle" flexItem />
						<Typography variant="h4" style={{ marginTop: '2rem' }}>
							{futureDates.length} Days To Go
							<FontAwesomeIcon icon={faFire} color="orange" style={{ marginLeft: '1rem' }} />
						</Typography>
					</Stack>
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
						<Grid item xs={6}>
							<PointOwnership stories={currentSprint.stories} people={people} />
						</Grid>
						{/* <Grid item xs={6}>
							<StoryCompletionTime startDate={start} endDate={finish} stories={currentSprint.stories} transitions={transitions} />
						</Grid> */}
					</Grid>
					{/** completion time vs story estimate graph? scatter plot */}
					{/** point distribution by user? radar chart */}
					{/** story time spent tree map (longer stories take up more space) simple tree map*/}
					<StoriesBreakdown currentSprint={currentSprint} />
				</React.Fragment>
			) : (
				renderLoadingSpinner()
			)}
		</Container>
	)
}