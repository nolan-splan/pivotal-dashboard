import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { Divider, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

export default function SprintPercentComplete(props) {
	const { acceptedPoints, totalPoints } = props
	const data = [
		{
			name: 'Accepted',
			value: acceptedPoints
		},
		{
			name: 'Unaccepted',
			value: totalPoints - acceptedPoints
		},
	]

	const COLORS = ['#90ee90', '#ff7376', '#939592'];

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5
		const x = cx + (radius + 20) * Math.cos(-midAngle * RADIAN)
		const y = cy + (radius + 20) * Math.sin(-midAngle * RADIAN)

		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${totalPoints * percent} (${(percent * 100).toFixed(0)}%)`}
			</text>
		)
	}

	return (
		<Stack spacing={2} style={{ textAlign: 'center', marginTop: '1rem' }}>
			<Typography variant="h5">Sprint Completion</Typography>
			<ResponsiveContainer width="100%" height={250}>
				<PieChart width={400} height={500}>
					<Pie
						data={data}
						cx="50%"
						labelLine={false}
						label={renderCustomizedLabel}
						innerRadius={80}
						outerRadius={100}
						fill="#8884d8"
						paddingAngle={5}
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
						<Label stroke="white" value={`${((acceptedPoints / totalPoints) * 100).toFixed(2)}%`} position="center" />
					</Pie>
				</PieChart>
			</ResponsiveContainer>
			<Stack direction="row" spacing={3} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<Typography variant="body1">
					<FontAwesomeIcon icon={faSquare} color="#90ee90" style={{ marginRight: '.5rem' }} />
					Accepted Points
				</Typography>
				<Divider orientation="vertical" variant="middle" flexItem />
				<Typography variant="body1">
					<FontAwesomeIcon icon={faSquare} color="#ff7376" style={{ marginRight: '.5rem' }} />
					Unaccepted Points
				</Typography>
			</Stack>
		</Stack>
	)
}