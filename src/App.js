import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import React from 'react'
import Navbar from './components/Navbar';
import PreviousFourSprints from './components/PreviousFourSprints';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CurrentSprint from './components/CurrentSprint';
import People from './components/People';


function App() {
  const [projectId, setProjectId] = React.useState("866453")

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar theme={theme} projectId={projectId} setProjectId={setProjectId} />
        <Routes>
          <Route path="/" element={<CurrentSprint projectId={projectId} />} />
          <Route path="/people" element={<People projectId={projectId} />} />
          <Route path="previous_four_sprints" element={<PreviousFourSprints projectId={projectId} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
