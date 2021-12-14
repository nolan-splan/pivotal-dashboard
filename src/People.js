import { Typography } from '@mui/material'
import React from 'react'

const whitelist = ['Nolan Splan', 'Dominic Diehn', 'Richy Carpenter', 'Jason Poll']

export default function People(props) {
  const { people } = props
  const filteredPeople = people.filter(person => whitelist.includes(person.name))
  return (
    <Typography variant="h3">People</Typography>
  )
}