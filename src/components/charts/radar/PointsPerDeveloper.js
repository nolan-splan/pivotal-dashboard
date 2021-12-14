import React from 'react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Stack, Typography } from '@mui/material'

export default function PointsPerDeveloper(props) {
	const uniq = (val, index, self) => self.indexOf(val) === index

	const { stories } = props

	const features = stories.filter(story => story.story_type === "feature")

	const ownerIds = features.map(story => story.owned_by_id).filter(uniq)

	const data = ownerIds.map(id => ({
		owner: id,
		points: features.filter(story => story.owned_by_id === id).map(story => story.estimate).reduce((ps, a) => ps + a, 0)
	}))

	return (
		<Stack spacing={2} style={{ textAlign: 'center', marginTop: '1rem' }}>
			<Typography variant="h5">Point Ownership</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="owner" stroke="white" />
          <PolarRadiusAxis stroke="white" />
          <Radar name="points" dataKey="points" stroke="#90ee90" fill="#90ee90" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
		</Stack>
	)
}