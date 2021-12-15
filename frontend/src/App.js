import React from 'react';
import Nav from './components/Nav';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Bought from './components/Bought';
// import Listened from './components/Listened';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/bought" element={<Bought />} />
        {/* <Route path="/listened" element={<Listened />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
