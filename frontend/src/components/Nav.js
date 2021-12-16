import React from 'react'; // ES6 js
import { Link } from 'react-router-dom';
import 'react-bootstrap';

function Nav() {
    return(
      <div>
      <h1>Melomaniac</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to='/' style={{ margin: 10 }}>Search</Link>
        <Link to='/favorites' style={{ margin: 10 }}>Favorites</Link>
        <Link to='/bought' style={{ margin: 10 }}>Bought</Link>
        <Link to='/recommend' style={{ margin: 10 }}>Recommendations</Link>
      </nav>
    </div>
    );
}

export default Nav;

