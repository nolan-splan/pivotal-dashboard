import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, Container } from '@mui/material'
import { fetchProjectMemberships } from '../pivotal_api'

export default function People(props) {
	const { projectId } = props

	const [people, setPeople] = React.useState([])

  const getPeopleFromMemberships = (memberships) => {
    const peeps = memberships.map(membership => membership.person)
    setPeople(peeps)
  }

	React.useEffect(() => {
		fetchProjectMemberships(projectId, getPeopleFromMemberships)
	}, [projectId])

	const createData = (person) => {
		const { id, name, username, email, initials } = person
		return { id, name, username, email, initials }
	}

	const rows = people.map(person => createData(person))
	const headers = [
		{
			id: 'id',
			numeric: true,
			label: 'ID',
		},
		{
			id: 'name',
			numeric: false,
			label: 'Name',
		},
		{
			id: 'username',
			numeric: false,
			label: 'Username',
		},
		{
			id: 'email',
			numeric: false,
			label: 'Email',
		},
		{
			id: 'initials',
			numeric: false,
			label: 'Initials',
		}
	]

	return (
		<Container maxWidth="md">
			<TableContainer component={Paper} style={{ marginTop: '1rem' }}>
				<Table size="small" sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							{ headers.map((header, i) => (
								<TableCell key={header.id} align={i === 0 ? "left" : "right"}>{header.label}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{ rows.map(person => (
							<TableRow key={person.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">{person.id}</TableCell>
								<TableCell align="right">{person.name}</TableCell>
								<TableCell align="right">{person.username}</TableCell>
								<TableCell align="right">{person.email}</TableCell>
								<TableCell align="right">{person.initials}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}