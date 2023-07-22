import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Demo from './views/Demo/Demo';
import Welcome from './views/Welcome/Welcome'
import Home from './views/Home/Home'
import './App.css'; // Import CSS file

const App: React.FC = () => {
  // const openGithub = () => {
  //   window.open('https://github.com/nickpiccaro', '_blank');
  // };
  // const openLinkedin = () => {
  //   window.open('https://www.linkedin.com/in/nicholas-piccaro-03a128182', '_blank');
  // };
  // const openEmail = () => {
  //   window.open('mailto:npiccaro10@gmail.com', '_blank');
  // };

  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <NavLink to="/demo" className="active">
                Demo
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;