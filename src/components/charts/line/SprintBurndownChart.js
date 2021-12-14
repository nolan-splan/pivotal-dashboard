import React from 'react';
import { ComposedChart, XAxis, YAxis, Line, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

export default function SprintBurndownChart(props) {
	const { sprint } = props
	const { stories } = sprint
	const features = stories.filter(story => story.story_type === "feature")
	const acceptedFeatures = features.filter(story => story.current_state === "accepted")

	const totalPoints = features.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)


	const startDate = moment(sprint.start)
	const endDate = moment(sprint.finish)

	const sprintDates = []
	for(var i = 0; i < endDate.diff(startDate, 'days'); i++) {
		var fakeDate = moment(sprint.start)
		var d = fakeDate.add(i, 'days')
		sprintDates.push(d)
	}

  console.log('dates length', sprintDates.length)
	const data = sprintDates.map((date, index) => ({
		date: date.format('MM/D'),
		remaining_points: totalPoints - acceptedFeatures.filter(story => moment(story.accepted_at).endOf('day') <= date.endOf('day')).map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0), // Just make that a >= to make itt a burndown instead of burn up???????????????????
		ideal_remaining_points: ((totalPoints / sprintDates.length) * (sprintDates.length - index))
		// points: acceptedFeatures.filter(story => moment(story.accepted_at).format('MM/D') === date.format('MM/D')).map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)
	}))

	const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

	const getPercent = (value, total) => {
		const ratio = total > 0 ? value / total : 0
		return toPercent(ratio, 2)
	}

	const renderTooltipContent = (o) => {
		const { payload, label } = o;
		// const total = payload.reduce((result, entry) => result + entry.value, 0);
		const total = features.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)

		return (
			<Paper className="customized-tooltip-content" style={{ padding: '.5rem 1rem .5rem 1rem' }}>
				<p className="total">{label}</p>
				<ul className="list">
					{payload.map((entry, index) => {
						let display = entry.name.split('_').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(" ")
						return (
							<li key={`item-${index}`} style={{ color: entry.color }}>
								{`${display}: ${entry.value} (${getPercent(entry.value, total)})`}
							</li>
						)
					})}
				</ul>
			</Paper>
		);
	};

	return (
		<Stack spacing={2} style={{ marginTop: '1rem' }}>
			<Typography variant="h5">Sprint Burndown</Typography>
			<ResponsiveContainer width="100%" height={350} style={{ marginLeft: '2rem' }}>
				<ComposedChart
					width={500}
					height={400}
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					{/* <CartesianGrid strokeDasharray="3 3" /> */}
					<XAxis dataKey="date" stroke="white" />
					<YAxis stroke="white" label={{ value: 'Points Remaining', angle: -90, position: 'insideLeft', stroke: 'white' }} domain={[0, features.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)]} />
					<Tooltip content={renderTooltipContent} />
					<Line dataKey="ideal_remaining_points" connectNulls="true" stroke="#ff7376" />
					<Line type="monotone" dataKey="remaining_points" stroke="#90ee90" fill="#90ee90" />
				</ComposedChart>
			</ResponsiveContainer>
			<Stack direction="row" spacing={3} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<Typography variant="body1">
					<FontAwesomeIcon icon={faSquare} color="#90ee90" style={{ marginRight: '.5rem' }} />
					Actual Points Remaining
				</Typography>
				<Divider orientation="vertical" variant="middle" flexItem />
				<Typography variant="body1">
					<FontAwesomeIcon icon={faSquare} color="#ff7376" style={{ marginRight: '.5rem' }} />
					Ideal Points Remaining
				</Typography>
			</Stack>
		</Stack>
	);
}
