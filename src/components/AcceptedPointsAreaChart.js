import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import { Paper, Stack, Typography } from '@mui/material';

export default function Example(props) {
	const { sprint } = props
	const { stories } = sprint
	console.log(sprint)
	const features = stories.filter(story => story.story_type === "feature")
	const bugs = stories.filter(story => story.story_type === "bug")
	const chores = stories.filter(story => story.story_type === "chore")
	const acceptedFeatures = features.filter(story => story.current_state === "accepted")
	const acceptedBugs = bugs.filter(story => story.current_state === "accepted")
	const acceptedChores = chores.filter(story => story.current_state === "accepted")

	const storyIsAccepted = (story) => acceptedFeatures.includes(story)

	const startDate = moment(sprint.start)
	const currentDate = moment()
	const endDate = moment(sprint.finish)

	const sprintDates = []
	for(var i = 0; i < currentDate.diff(startDate, 'days'); i++) {
		var fakeDate = moment(sprint.start)
		var d = fakeDate.add(i, 'days')
		sprintDates.push(d)
	}

	const data = sprintDates.map(date => ({
		date: date.format('MM/D'),
		features: acceptedFeatures.filter(story => moment(story.accepted_at).format('MM/D') === date.format('MM/D')).length,
		bugs: acceptedBugs.filter(story => moment(story.accepted_at).format('MM/D') === date.format('MM/D')).length,
		chores: acceptedChores.filter(story => moment(story.accepted_at).format('MM/D') === date.format('MM/D')).length,
		points: acceptedFeatures.filter(story => moment(story.accepted_at) <= date).map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)
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
				<p className="total">{`${label} (Total Points: ${total})`}</p>
				<ul className="list">
					{payload.map((entry, index) => (
						<li key={`item-${index}`} style={{ color: entry.color }}>
							{`accepted ${entry.name}: ${entry.value} (${getPercent(entry.value, total)})`}
						</li>
					))}
				</ul>
			</Paper>
		);
	};

	return (
		<Stack spacing={2} style={{ marginTop: '1rem' }}>
			<Typography variant="h5">Points Accepted By Date</Typography>
			<ResponsiveContainer width="100%" height={250} style={{ marginLeft: '2rem' }}>
				<AreaChart
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
					<YAxis stroke="white" label={{ value: 'Points', angle: -90, position: 'insideLeft', stroke: 'white' }} domain={[0, features.map(story => story.estimate).reduce((partial_sum, a) => partial_sum + a, 0)]} />
					<Tooltip content={renderTooltipContent} />
					<Area type="monotone" dataKey="points" stroke="#90ee90" fill="#90ee90" />
					{/* <Area type="monotone" dataKey="features" stackId="1" stroke="#90ee90" fill="#90ee90" /> */}
					{/* <Area type="monotone" dataKey="bugs" stackId="1" stroke="#ff7376" fill="#ff7376" />
					<Area type="monotone" dataKey="chores" stackId="1" stroke="#939592" fill="#939592" /> */}
				</AreaChart>
			</ResponsiveContainer>
		</Stack>
	);
}
