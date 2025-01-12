import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './Components/LandingPage';  

import Dashboard from './Components/Dashboard';
import LoginPage from './Components/Login';
import Signup from './Components/Signup';
import UserPage from './Components/UserPage';
import Portfolio from './Components/Portfolio';
import LearnPage from './Components/Learnpage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/learn" element={<LearnPage />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
