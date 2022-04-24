import React from 'react'
import { Stack, Typography, Divider } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

export default function CurrentSprintHeader(props) {
	const { project, sprint } = props
	const { start, finish, number } = sprint

	return (
		<Stack direction="row" spacing={3} alignItems="center">
			{/* <Typography variant="h2">{project.name}</Typography>
			<Divider orientation="vertical" variant="middle" flexItem /> */}
			<Typography variant="h2">Sprint #{number}</Typography>
			<Divider orientation="vertical" variant="middle" flexItem />
			{/* <Divider orientation="vertical" variant="middle" flexItem /> */}
			{/* <Typography variant="h4">
				{futureDates.length} Days To Go
				<FontAwesomeIcon icon={faFire} color="orange" style={{ marginLeft: '1rem' }} />
			</Typography> */}
		</Stack>
	)
}