import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StoryTypesForUserChart(props) {
  const { sprint, people } = props
  const { stories } = sprint
  const features = stories.filter(story => story.story_type === "feature")
  const bugs = stories.filter(story => story.story_type === "bug")
  const chores = stories.filter(story => story.story_type === "chore")

  const uniq = (val, index, self) => self.indexOf(val) === index

  const ownerIds = stories.map(story => story.owned_by_id).filter(uniq)

  const data = ownerIds.map(id => ({
    name: people.filter(p => p.id === id)[0].name,
    features: features.filter(f => f.owned_by_id === id).length,
    bugs: bugs.filter(b => b.owned_by_id === id).length,
    chores: chores.filter(c => c.owned_by_id === id).length,
  }))

	const renderTooltipContent = (o) => {
		const { payload, label } = o;

		return (
			<Paper className="customized-tooltip-content" style={{ padding: '.5rem 1rem .5rem 1rem' }}>
				<p className="total">{label}</p>
				<ul className="list">
					{payload.map((entry, index) => {
						let display = entry.name.split('_').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(" ")
						return (
							<li key={`item-${index}`} style={{ color: entry.color }}>
								{`${display}: ${entry.value}`}
							</li>
						)
					})}
				</ul>
			</Paper>
		);
	};

  return (
    <Stack spacing={2} alignItems="center" style={{ marginTop: '1rem', flex: 1 }}>
      <Typography variant="h5">Developer Story Counts</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip content={renderTooltipContent} cursor={{ stroke: '#1c374f', fill: '#1c374f', strokeWidth: 2 }} />
          <Bar dataKey="features" stackId="a" fill="#90ee90" />
          <Bar dataKey="bugs" stackId="a" fill="#ff7376" />
          <Bar dataKey="chores" stackId="a" fill="#939592" />
        </BarChart>
      </ResponsiveContainer>
			<Stack direction="row" spacing={3} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<Typography variant="body1">
					<FontAwesomeIcon icon={faSquare} color="#90ee90" style={{ marginRight: '.5rem' }} />
					Features
				</Typography>
				<Divider orientation="vertical" variant="middle" flexItem />
				<Typography variant="body1">
					<FontAwesomeIcon icon={faSquare} color="#ff7376" style={{ marginRight: '.5rem' }} />
					Bugs
				</Typography>
				<Divider orientation="vertical" variant="middle" flexItem />
				<Typography variant="body1">
					<FontAwesomeIcon icon={faSquare} color="#939592" style={{ marginRight: '.5rem' }} />
					Chores
				</Typography>
			</Stack>
    </Stack>
  )
}