import React from 'react';
import { Link } from 'react-router-dom';


function PageHeader () {
  return(
    <nav className="navbar navbar-light" style={{backgroundColor: "#4287f5", height: 75}}>
      <h3 style={{fontFamily: 'Concert One', color: 'white'}}>BlockEd</h3>
  </nav>

  )
}

export default PageHeader