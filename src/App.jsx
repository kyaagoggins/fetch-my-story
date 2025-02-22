import { useState } from 'react'
import './App.module.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, Grid2 } from '@mui/material'
import FosterSMS from './FosterSMS';
import Home from './Home';

function App() {

  return (
    <>
      <Router>
        <Grid2 container>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/foster-sms'>Foster SMS</Link></li>
            </ul>
          </nav>
        </Grid2>

        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/foster-sms' element={<FosterSMS />}/>
          </Routes>
      </Router>
    </>
  );
}

export default App
