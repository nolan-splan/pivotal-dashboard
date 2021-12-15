import { Stack, Typography } from '@mui/material';
import React, { PureComponent } from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

export default function StorySizeMap(props) {
	const { sprint } = props
	const { stories } = sprint

	const features = stories.filter(story => story.story_type === "feature")

	const dataz = features.map(story => ({
		name: story.name,
		size: story.estimate
	}))
	const data = [
		{
			name: 'Features',
			children: dataz,
		},
	];

	return (
		<Stack spacing={2} alignItems="center" style={{ marginTop: '1rem', flex: 2 }}>
			<Typography variant="h5">Story Size Map</Typography>
			<ResponsiveContainer width="100%" height={400}>
				<Treemap width={400} height={200} aspectRation={1} data={data} dataKey="size" ratio={4 / 3} stroke="#000" fill="#90ee90" />
			</ResponsiveContainer>
		</Stack>
	);
}
