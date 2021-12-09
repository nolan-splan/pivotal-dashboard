import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function IterationBreakdownTable(props) {
  const { iteration, people, totalIterationPoints } = props
  const reducer = (acc, currentVal) => acc + currentVal
  const uniq = (val, index, self) => self.indexOf(val) === index

  return (
    <Table sx={{ minWidth: 650 }} size="small" aria-label="points-table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Total Stories</TableCell>
          <TableCell align="right">Features</TableCell>
          <TableCell align="right">Bugs</TableCell>
          <TableCell align="right">Chores</TableCell>
          <TableCell align="right">Completed Points</TableCell>
          <TableCell align="right">Percent of Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { iteration.stories.map(story => story.owned_by_id).filter(uniq).map(userId => {
          let person = people.filter(p => p.id === userId)[0]
          let storiesForUser = iteration.stories.filter(story => story.owned_by_id === userId)
          let totalPointsForUser = storiesForUser.filter(story => !["bug", "chore"].includes(story.story_type)).map(story => story.estimate).reduce(reducer)
          let featureCount = storiesForUser.filter(story => story.story_type === "feature").length
          let bugCount = storiesForUser.filter(story => story.story_type === "bug").length
          let choreCount = storiesForUser.filter(story => story.story_type === "chore").length
          return (
            <TableRow key={userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{person.name}</TableCell>
              <TableCell align="right">{storiesForUser.length}</TableCell>
              <TableCell align="right">{featureCount}</TableCell>
              <TableCell align="right">{bugCount}</TableCell>
              <TableCell align="right">{choreCount}</TableCell>
              <TableCell align="right">{totalPointsForUser}</TableCell>
              <TableCell align="right">{Math.floor((totalPointsForUser / totalIterationPoints) * 100)}%</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}