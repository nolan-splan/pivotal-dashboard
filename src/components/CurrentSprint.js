import { faCircle, faDotCircle, faFlagCheckered, faArrowDown, faRocket, faFire, faCheck } from '@fortawesome/free-solid-svg-icons'
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
window.moment = moment

export default function CurrentSprint(props) {
	const [currentSprint, setCurrentSprint] = React.useState({})
	const projectId = 866453
	React.useEffect(() => {
		fetchCurrentIteration(projectId, setCurrentSprint)
	}, [])

	const { start, finish, stories, teamStrength: team_strength, number } = currentSprint

	window.sprint = currentSprint
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
	for(var i = 0; i < currentDate.diff(startDate, 'days'); i++) {
		var fakeDate = moment(start)
		var d = fakeDate.add(i, 'days')
		previousDates.push(d)
	}

	for(var i = 0; i < endDate.diff(currentDate, 'days') + 1; i++) {
		var fakeDate = moment()
		var d = fakeDate.add(i, 'days')
		futureDates.push(d)
	}

	return(
		<Container maxWidth="lg">
			{ Object.keys(currentSprint).length > 0 ? (
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
								<Stack spacing={1}>
									{ index === 0 && (
										<FontAwesomeIcon icon={faRocket} color="lightblue" size="lg" style={{ marginLeft: '.5rem' }} />
									)}
									<FontAwesomeIcon icon={faCircle} color="#90ee90" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
									<Typography variant="caption" style={{ display: index === 0 ? 'flex' : 'none' }}>{date.format("MM/D")}</Typography>
								</Stack>
							))}
							{ futureDates.map((date, index) => (
								<Stack spacing={1}>
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
						{/* <Grid item xs={4}>
							<PointsBreakdownPieChart stories={currentSprint.stories} />
						</Grid>
						<Grid item xs={4}>
							<PointsBreakdownPieChart stories={currentSprint.stories} />
						</Grid> */}
						<Grid item xs={6}>
							<AcceptedPointsAreaChart sprint={currentSprint} />
						</Grid>
						<Grid item xs={3}>
							<Box sx={{ textAlign: 'center' }}>
								<Typography variant="h5">Sprint Completion</Typography>
								<Typography variant="subtitle1">(By Accepted Points)</Typography>
								<Typography variant="h1">{Math.floor((currentSprint.stories.filter(story => story.story_type === "feature").filter(story => story.current_state === "accepted").map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0) / currentSprint.stories.filter(story => story.story_type === "feature").map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)) * 100)}%</Typography>
							</Box>
						</Grid>
					</Grid>
					<Divider style={{ marginTop: '1rem' }} />
					<StoriesBreakdown currentSprint={currentSprint} />
				</React.Fragment>
			) : (
				renderLoadingSpinner()
			)}
		</Container>
	)
}