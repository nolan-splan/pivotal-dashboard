import React from 'react'
import { Stack, Typography, Divider } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDotCircle, faFlagCheckered, faArrowDown, faRocket, faFire } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleEmpty } from '@fortawesome/free-regular-svg-icons'
import moment from 'moment'

export default function CurrentSprintHeader(props) {
	const { sprint } = props
	const { start, finish, number } = sprint

	const startDate = moment(start)
	const currentDate = moment()
	const endDate = moment(finish)

	// We have start and end and the current date
	// put dates between start and current in one array, and dates between current and finish in another
	const previousDates = []
	const futureDates = []
	for(let i = 0; i < currentDate.diff(startDate, 'days'); i++) {
		let fakeDate = moment(start)
		let d = fakeDate.add(i, 'days')
		previousDates.push(d)
	}

	for(let i = 0; i < endDate.diff(currentDate, 'days') + 1; i++) {
		let fakeDate = moment()
		let d = fakeDate.add(i, 'days')
		futureDates.push(d)
	}

	return (
		<Stack direction="row" spacing={3}>
			<Typography variant="h1">Sprint #{number}</Typography>
			<Divider orientation="vertical" variant="middle" flexItem />
			<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} style={{ flex: 1 }}>
				{ previousDates.map((date, index) => (
					<Stack key={index} spacing={1}>
						{ index === 0 && (
							<FontAwesomeIcon icon={faRocket} color="lightblue" size="lg" style={{ marginLeft: '.5rem' }} />
						)}
						<FontAwesomeIcon icon={faCircle} color="#90ee90" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
						<Typography variant="caption" style={{ display: index === 0 ? 'flex' : 'none' }}>{date.format("MM/D")}</Typography>
					</Stack>
				))}
				{ futureDates.map((date, index) => (
					<Stack key={index} spacing={1}>
						{ index === 0 && (
							<FontAwesomeIcon icon={faArrowDown} size="lg" color="red" style={{ marginLeft: '.5rem' }} />
						)}
						{ index === futureDates.length - 1 && (
							<FontAwesomeIcon icon={faFlagCheckered} size="lg" color="lightgreen" style={{ marginLeft: '.5rem' }} />
						)}
						<FontAwesomeIcon color="#ff7376" icon={date.format('LLL') === currentDate.format('LLL') ? faDotCircle : faCircleEmpty} style={{ marginLeft: 'auto', marginRight: 'auto' }}/>
						<Typography variant="caption" style={{ display: (index === 0 || index === futureDates.length - 1) ? 'flex' : 'none' }}>{date.format("MM/D")}</Typography>
					</Stack>
				))}
			</Stack>
			<Divider orientation="vertical" variant="middle" flexItem />
			<Typography variant="h4" style={{ marginTop: '2rem' }}>
				{futureDates.length} Days To Go
				<FontAwesomeIcon icon={faFire} color="orange" style={{ marginLeft: '1rem' }} />
			</Typography>
		</Stack>
	)
}