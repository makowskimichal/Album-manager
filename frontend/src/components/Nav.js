import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Nav() {
  return (
    <div className="container-fluid">
      <nav
        className="row"
        style={{
          backgroundColor: '#a0aecd'
        }}>
        <Link
          className='col'
          to="/"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            fontFamily: 'Sora',
            margin: 10,
            color: '#000000'
          }}>
          FRONTPAGE
        </Link>
        <Link
          className='col'
          to="/search"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            fontFamily: 'Sora',
            margin: 10,
            color: '#000000'
          }}>
          SEARCH
        </Link>
        <Link
        className='col'
          to="/favorites"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            fontFamily: 'Sora',
            margin: 10,
            color: '#000000'
          }}>
          FAVORITES
        </Link>
        <Link
        className='col'
          to="/bought"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            fontFamily: 'Sora',
            margin: 10,
            color: '#000000'
          }}>
          BOUGHT
        </Link>
        <Link
        className='col'
          to="/wishlist"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            fontFamily: 'Sora',
            margin: 10,
            color: '#000000'
          }}>
          WISHLIST
        </Link>
        <Link
        className='col'
          to="/purchased"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            fontFamily: 'Sora',
            margin: 10,
            color: '#000000'
          }}>
          HISTORY
        </Link>
        <Link
        className='col'
          to="/recommend"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            fontFamily: 'Sora',
            margin: 10,
            color: '#000000'
          }}>
          RECOMMENDED
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
