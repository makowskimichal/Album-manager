import React from 'react'; // ES6 js
import { Link } from 'react-router-dom';
// import 'react-bootstrap';
import '../App.css';

function Nav() {
    return(
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to='/' className='navbar'>
          FRONTPAGE
        </Link>
        <Link to='/search' className='navbar'>SEARCH</Link>
        <Link to='/favorites' className='navbar'>FAVORITES</Link>
        <Link to='/bought' className='navbar'>BOUGHT</Link>
        <Link to='/wishlist' style={{ fontSize: "200%", textDecoration: "none", fontFamily: "Gill Sans", margin: 10 }}>WISHLIST</Link>
        <Link to='/recommend' style={{ fontSize: "200%", textDecoration: "none", fontFamily: "Gill Sans", margin: 10 }}>RECOMMENDED</Link>
      </nav>
    </div>
    );
}

export default Nav;

