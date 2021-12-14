import React from 'react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Stack, Typography, Paper, Divider } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

export default function PointOwnership(props) {
	const uniq = (val, index, self) => self.indexOf(val) === index

	const { stories, people } = props

	const features = stories.filter(story => story.story_type === "feature")

	const ownerIds = features.map(story => story.owned_by_id).filter(uniq)


	let data = ownerIds.map(id => ({
		owner: people.filter(person => person.id === id)[0].name,
		points: features.filter(story => story.owned_by_id === id).map(story => story.estimate).reduce((ps, a) => ps + a, 0)
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
		<Stack spacing={2} style={{ textAlign: 'center', marginTop: '1rem' }}>
			<React.Fragment>
				<Typography variant="h5">Point Ownership</Typography>
				<ResponsiveContainer width="100%" height={400}>
					<RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
						<PolarGrid />
						<PolarAngleAxis dataKey="owner" stroke="white" />
						<PolarRadiusAxis stroke="white" />
						<Radar name="points" dataKey="points" stroke="#90ee90" fill="#90ee90" fillOpacity={0.6} />
						<Tooltip content={renderTooltipContent}/>
					</RadarChart>
				</ResponsiveContainer>
        <Stack direction="row" spacing={3} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Typography variant="body1">
            <FontAwesomeIcon icon={faSquare} color="#90ee90" style={{ marginRight: '.5rem' }} />
            Points Owned
          </Typography>
        </Stack>
			</React.Fragment>
		</Stack>
	)
}