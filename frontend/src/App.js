import React from 'react';
import Nav from './components/Nav';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Bought from './components/Bought';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Recommendations from './components/Recommendations';
import { AlertProvider } from 'react-bootstrap-hooks-alert';

function App() {
  return (
    <AlertProvider timeouts={{ warning: 2000, success: 1000 }}>
      <Router>
        <div className="App">
          <Nav />
          <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/bought" element={<Bought />} />
          <Route path="/recommend" element={<Recommendations />} />
          </Routes>
        </div>
      </Router>
    </AlertProvider>
  );
}

export default App;
