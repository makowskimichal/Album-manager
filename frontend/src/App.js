import React from 'react';
import Nav from './components/Nav';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Wishlist from './components/Wishlist';
import Bought from './components/Bought';
import Frontpage from './components/Frontpage';
import PurchaseHistory from './components/PurchaseHistory';
import AlbumInfo from './components/AlbumInfo';
import UserInfo from './components/UserInfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Recommendations from './components/Recommendations';
import { AlertProvider } from 'react-bootstrap-hooks-alert';
import { createBrowserHistory } from 'history';
import { getUserFromLocalStorage } from './components/auth/AuthService';
import { Authentication } from './components/auth/Auth';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {
  const user = getUserFromLocalStorage();
  const history = createBrowserHistory();

  if (!user) {
    history.push('/login');
  } else if (history.location.pathname === '/login') {
    history.push('/');
  }

  return (
    <div className="App" style={{ height: '100vh' }}>
      <AlertProvider timeouts={{ warning: 2000, success: 1000 }}>
        <Router history={history}>
          <div className="App">
            {history.location.pathname !== '/login' && <Nav />}
            {user && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  backgroundColor: '#121212',
                  marginRight: '2%',
                  marginTop: '1%'
                }}>
                <LogoutIcon
                  className='logout'
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload(true);
                  }} />
              </div>
            )}
            <Routes>
              <Route path="/login" element={<Authentication />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/bought" element={<Bought />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/recommend" element={<Recommendations />} />
              <Route path="/album/:albumId" element={<AlbumInfo />} />
              <Route path="/user/:username" element={<UserInfo />} />
              <Route path="/purchased" element={<PurchaseHistory />} />
              <Route path="/" element={<Frontpage />} />
            </Routes>
          </div>
        </Router>
      </AlertProvider>
    </div>
  );
}

export default App;
