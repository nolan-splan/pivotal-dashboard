import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import { Container } from '@mui/material';
import React from 'react'
import Navbar from './components/Navbar';
import PreviousFourSprints from './components/PreviousFourSprints';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar theme={theme} />
        <Routes>
          <Route path="/" element={<h1>Current sprint</h1>} />
          <Route path="previous_four_sprints" element={<PreviousFourSprints />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
