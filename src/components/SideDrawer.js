import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

const SideDrawer = () => (
  <div>
    <nav id='sidebar'>
      <div>
        <ul className='list-unstyled'>
          <li className='menu-item'>
            <a href='/admindash' id='link'>
              <div className='card ' id='nav-card'>
                DASHBOARD</div></a>
          </li>
          <li className='menu-item'>
            <Link to={'issue'} id='link'>
              <div className='card ' id='nav-card'>
                ISSUE</div></Link>
          </li>
          <li className='menu-item'>
            <Link to={'verify'} id='link'>
              <div className='card ' id='nav-card'>
                VERIFY</div></Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
)

export default SideDrawer;