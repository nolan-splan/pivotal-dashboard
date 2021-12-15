import React from 'react'
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Stack, Typography, Paper, CircularProgress } from '@mui/material'

import moment from 'moment';

export default function StoryCompletionTime(props) {
	const { stories, transitions, startDate, endDate } = props
	const features = stories.filter(story => story.story_type === "feature")
	// const startedFeatures = features.filter(story => ["started", "finished", "delivered", "accepted", "rejected"].includes(story.current_state))
	const acceptedFeatures = features.filter(story => ["accepted"].includes(story.current_state))
	const start = moment(startDate)
	const end = moment(endDate)
	const data = acceptedFeatures.map(story => {
		const transitionsForStory = transitions.filter(trans => trans.story_id === story.id)
		const startedTransitions = transitionsForStory.filter(trans => trans.state === "started")
		const acceptedTransitions = transitionsForStory.filter(trans => trans.state === "accepted")
		const startedTransition = startedTransitions.filter(trans => moment(trans) >= moment(start))[startedTransitions.length - 1]
		const acceptedTransition = acceptedTransitions[acceptedTransitions.length - 1]
		const startDate = moment(startedTransition.occurred_at)
		const endDate = acceptedTransition ? moment(acceptedTransition.occurred_at) : moment()

		const hours = endDate.diff(startDate, 'hours')
		return { id: story.id, hours, points: story.estimate }
	})

	return (
		<Stack spacing={2} style={{ textAlign: 'center', marginTop: '1rem' }}>
			<React.Fragment>
				<Typography variant="h5">Story Acceptance Times</Typography>
				<ResponsiveContainer width="100%" height={400}>
					<ScatterChart
						width={400}
						height={400}
						margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					>
						<CartesianGrid />
						<XAxis type="number" dataKey="hours" name="Hours" unit="hr" />
						<YAxis type="number" dataKey="points" name="Points" unit="pt" />
						<Tooltip cursor={{ strokeDasharray: '3 3' }} />
						<Scatter name="acceptance time" data={data} fill="#90ee90" />
					</ScatterChart>
				</ResponsiveContainer>
			</React.Fragment>
		</Stack>
	)
}