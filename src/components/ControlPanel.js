import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
	Container, Divider, Typography,
	Box, Drawer, AppBar, Toolbar,
	List, ListItem, ListItemIcon,
	ListItemText, ListItemButton, Paper, Stack
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUsers, faThLarge, faRedo  } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from '@fortawesome/free-regular-svg-icons'


export default function ControlPanel(props) {
	const [selectedRoute, setSelectedRoute] = React.useState("/")
	let navigate = useNavigate()

	const handleDashboardClicked = () => {
		setSelectedRoute('/dashboard')
		navigate("/dashboard")
	}

	const handleIterationsClicked = () => {
		setSelectedRoute('/iterations')
		navigate("/iterations")
	}

	const handleStoriesClicked = () => {
		setSelectedRoute('/stories')
		navigate("/stories")
	}

	const handlePeopleClicked = () => {
		setSelectedRoute('/people')
		navigate("/people")
	}

	return (
		<Paper sx={{
			width: '100%',
			margin: '1rem',
			height: '97vh',
			borderRadius: 4,
			padding: '1rem',
		}}>
			<Stack style={{ marginBottom: '1rem' }} direction="row" spacing={2} justifyContent="center" alignItems="center">
				<FontAwesomeIcon size="2x" color="#90ee90" icon={faCompass} />
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
				>
					Pivotal Dashboard
				</Typography>
			</Stack>
			<Divider />
			<List>
				<ListItemButton
					alignItems="center"
					onClick={handleDashboardClicked}
					selected={selectedRoute === "/dashboard"}
					sx={{ borderRadius: 2 }}
				>
					<ListItemIcon>
						<FontAwesomeIcon size="2x" icon={faThLarge} />
					</ListItemIcon>
					<ListItemText>
						<Typography variant="h5">Dashboard</Typography>
					</ListItemText>
				</ListItemButton>

				<ListItemButton
					alignItems="center"
					onClick={handleIterationsClicked}
					selected={selectedRoute === "/iterations"}
					sx={{ borderRadius: 2 }}
				>
					<ListItemIcon>
						<FontAwesomeIcon size="2x" icon={faRedo} />
					</ListItemIcon>
					<ListItemText>
						<Typography variant="h5">Iterations</Typography>
					</ListItemText>
				</ListItemButton>

				<ListItemButton alignItems="center" onClick={handleStoriesClicked} selected={selectedRoute === "/stories"}>
					<ListItemIcon>
						<FontAwesomeIcon size="2x" icon={faBook} />
					</ListItemIcon>
					<ListItemText>
						<Typography variant="h5">Stories</Typography>
					</ListItemText>
				</ListItemButton>

				<ListItemButton alignItems="center" onClick={handlePeopleClicked} selected={selectedRoute === "/people"}>
					<ListItemIcon>
						<FontAwesomeIcon size="2x" icon={faUsers} />
					</ListItemIcon>
					<ListItemText>
						<Typography variant="h5">People</Typography>
					</ListItemText>
				</ListItemButton>
			</List>
		</Paper>
	)
}