import React from 'react'
import { faCheck, faTimes, faStar, faCog, faBug } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Paper, Typography, Stack } from '@mui/material'

export default function StoriesBreakdown(props) {
	const { currentSprint } = props
	const { stories } = currentSprint

	const bugs = stories.filter(story => story.story_type === "bug")
	const chores = stories.filter(story => story.story_type === "chore")
	const features = stories.filter(story => story.story_type === "feature")

	const startedFeatures = features.filter(story => story.current_state === "started")
	const finishedFeatures = features.filter(story => story.current_state === "finished")
	const deliveredFeatures = features.filter(story => story.current_state === "delivered")
	const acceptedFeatures = features.filter(story => story.current_state === "accepted")
	const rejectedFeatures = features.filter(story => story.current_state === "rejected")
	console.log('features: ', features)

	const startedPoints = startedFeatures.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)
	const finishedPoints = finishedFeatures.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)
	const deliveredPoints = deliveredFeatures.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)
	const acceptedPoints = acceptedFeatures.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)
	const rejectedPoints = rejectedFeatures.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)
	const totalPoints = features.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)

	const storyIsStarted = story => startedFeatures.includes(story)
	const storyIsFinished = story => finishedFeatures.includes(story)
	const storyIsDelivered = story => deliveredFeatures.includes(story)
	const storyIsAccepted = story => acceptedFeatures.includes(story)
	const storyIsRejected = story => rejectedFeatures.includes(story)

	const getIconForStoryType = (story) => {
		switch(story.story_type) {
			case("feature"):
				return faStar
			case("bug"):
				return faBug
			case("chore"):
				return faCog
			default:
				return faStar
		}
	}

	// backgroundColor: storyIsAccepted(story) ? "#90ee90" : "#f3f3d1", border: storyIsAccepted(story) ? "1px solid #90ee90" : "1px solid #ff7376"

	return (
		<Stack direction="row" spacing={5} justifyContent="space-around" sx={{ marginTop: '1rem' }}>
			<Stack spacing={2} justifyContent="flex-start">
				<Typography variant="h3">Features</Typography>
				<Divider variant="middle" />
				{ features.map(story => (
					<Paper sx={{ padding: '1rem', width: '100%' }}>
						<Stack direction="row" spacing={1}>
							<FontAwesomeIcon icon={getIconForStoryType(story)} color="#e0c85e" size="lg" />
							<Divider variant="middle" orientation="vertical" flexItem />
							<Typography variant="subtitle" sx={{ fontWeight: 'bold' }}>{story.estimate}</Typography>
							<Divider variant="middle" orientation="vertical" flexItem />
							<Typography variant="subtitle" sx={{ fontWeight: 'bold' }}>{story.name}</Typography>
						</Stack>
						{/* { storyIsAccepted(story) ?
							<FontAwesomeIcon icon={faCheck} color="#90ee90" /> :
							<FontAwesomeIcon icon={faTimes} color="#ff7376" />
						} */}
					</Paper>
				))}
			</Stack>

			<Stack spacing={2} justifyContent="flex-start">
				<Typography variant="h3">Bugs</Typography>
				<Divider variant="middle" />
				{ bugs.map(story => (
					<Paper sx={{ padding: '1rem', width: '100%' }}>
						<Stack direction="row" spacing={1}>
							<FontAwesomeIcon icon={getIconForStoryType(story)} size="lg" color="#ff7376" />
							<Divider variant="middle" orientation="vertical" flexItem />
							<Typography variant="subtitle" sx={{ fontWeight: 'bold' }}>{story.name}</Typography>
						</Stack>
					</Paper>
				))}
			</Stack>

			<Stack spacing={2} justifyContent="flex-start">
				<Typography variant="h3">Chores</Typography>
				<Divider variant="middle" />
				{ chores.map(story => (
					<Paper sx={{ padding: '1rem', width: '100%' }}>
						<Stack direction="row" spacing={1}>
							<FontAwesomeIcon icon={getIconForStoryType(story)} size="lg" color="#939592" />
							<Divider variant="middle" orientation="vertical" flexItem />
							<Typography variant="subtitle" sx={{ fontWeight: 'bold' }}>{story.name}</Typography>
						</Stack>
					</Paper>
				))}
			</Stack>
		</Stack>
	)
}