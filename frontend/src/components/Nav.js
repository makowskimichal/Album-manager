import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Nav() {
  return (
    <div className="container-fluid">
      <nav
        className="row"
        style={{
          backgroundColor: '#000'
        }}>
        <Link
          className='col text'
          to="/"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            margin: 10
          }}>
          FRONTPAGE
        </Link>
        <Link
          className='col text'
          to="/search"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            margin: 10
          }}>
          SEARCH
        </Link>
        <Link
        className='col text'
          to="/favorites"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            margin: 10,
          }}>
          FAVORITES
        </Link>
        <Link
        className='col text'
          to="/bought"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            margin: 10
          }}>
          BOUGHT
        </Link>
        <Link
        className='col text'
          to="/wishlist"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            margin: 10,
          }}>
          WISHLIST
        </Link>
        <Link
        className='col text'
          to="/purchased"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            margin: 10
          }}>
          HISTORY
        </Link>
        <Link
        className='col text'
          to="/recommend"
          style={{
            fontSize: '180%',
            textDecoration: 'none',
            margin: 10
          }}>
          RECOMMENDED
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
