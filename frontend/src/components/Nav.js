import React from 'react'; // ES6 js
import { Link } from 'react-router-dom';
// import 'react-bootstrap';
import '../App.css';

function Nav() {
    return(
    <div>
      <nav
        style={{
          backgroundColor: "#a0aecd"
        }}
      >
        <Link to='/' style={{ fontSize: "180%", textDecoration: "none", fontFamily: "Sora", margin: 10, color: "#000000" }}>
          FRONTPAGE
        </Link>
        <Link to='/search' style={{ fontSize: "180%", textDecoration: "none", fontFamily: "Sora", margin: 10, color: "#000000" }}>SEARCH</Link>
        <Link to='/favorites' style={{ fontSize: "180%", textDecoration: "none", fontFamily: "Sora", margin: 10, color: "#000000" }}>FAVORITES</Link>
        <Link to='/bought' style={{ fontSize: "180%", textDecoration: "none", fontFamily: "Sora", margin: 10, color: "#000000" }}>BOUGHT</Link>
        <Link to='/wishlist' style={{ fontSize: "180%", textDecoration: "none", fontFamily: "Sora", margin: 10, color: "#000000" }}>WISHLIST</Link>
        <Link to='/purchased' style={{ fontSize: "180%", textDecoration: "none", fontFamily: "Sora", margin: 10, color: "#000000" }}>PURCHASE HISTORY</Link>
        <Link to='/recommend' style={{ fontSize: "180%", textDecoration: "none", fontFamily: "Sora", margin: 10, color: "#000000" }}>RECOMMENDED</Link>
      </nav>
    </div>
    );
}

export default Nav;

