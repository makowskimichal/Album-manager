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
import { createBrowserHistory } from 'history';
import { getUserFromLocalStorage } from './components/auth/AuthService';
import { Authentication } from './components/auth/Auth';

function App() {
  const user = getUserFromLocalStorage();
  const history = createBrowserHistory();

  if (!user) {
    history.push('/login');
  } else if (history.location.pathname === '/login') {
    history.push('/');
  }

  return (
    <div className='App'>
      {user && (
        <div>
          Welcome back {user.username}!
          <button
              className="btn btn-primary"
              onClick={() => {
                  localStorage.removeItem('user');
                  window.location.reload(true);
              }}
          >
              Logout
          </button>
        </div>
      )}
      <AlertProvider timeouts={{ warning: 2000, success: 1000 }}>
        <Router history={history}>
          <div className="App">
            {history.location.pathname !== "/login" && <Nav />}
            <Routes>
              <Route path="/login" element={<Authentication />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/bought" element={<Bought />} />
              <Route path="/recommend" element={<Recommendations />} />
              <Route path="/" element={<Search />} />
            </Routes>
          </div>
        </Router>
      </AlertProvider>
    </div>

  );
}

export default App;
