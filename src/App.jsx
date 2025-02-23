import { useState } from 'react'
import './App.module.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, Grid2 } from '@mui/material'
import FosterSMS from './FosterSMS';
import Home from './Home';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <>
      <Router>
        <Navbar />

        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/foster-sms' element={<FosterSMS />}/>
          </Routes>
      </Router>
    </>
  );
}

export default App
