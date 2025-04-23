import './App.module.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FosterSMS from './FosterSMS';
import AdminHome from './admin/AdminHome';
import AdminSettings from './admin/Settings';

/* This is the general App Page 
  This file is involved in all the needed things to be initialized for the application to run
  For this version of the app, the only needed information for the app is the routes to each page
*/
function App() {
//routes for browser input 
  return (
    <>
      <Router>
        <Routes>
            <Route path='/foster-sms' element={<FosterSMS />}/>
            <Route path='/admin' element={<AdminHome />}/>
            <Route path='/admin/settings' element={<AdminSettings />}/>
          </Routes>
      </Router>
    </>
  );
}

export default App
