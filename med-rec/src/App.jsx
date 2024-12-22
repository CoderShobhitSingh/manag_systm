import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Home />} />
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* NavBar page */}
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
}

export default App;
