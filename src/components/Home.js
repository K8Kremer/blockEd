import React from 'react';
import './components.css';

function Home () {
  return(
    <>
    <div className='view jarallax hero-image' data-jarallax='{"speed":0.2}'> 
    <img className='backpic' src="https://cdn.pixabay.com/photo/2019/01/25/19/33/degree-3955169__340.jpg"/>
    <div className='img-overlay d-flex justify-content-center align-items-center'>
    <h1>Student-Owned Credentials</h1>

    </div>
    
    </div>
    </>
  )
}

export default Home