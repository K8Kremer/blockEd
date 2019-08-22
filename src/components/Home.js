import React from 'react';
import {Link} from 'react-router-dom'
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPaperPlane, faUserCheck } from '@fortawesome/free-solid-svg-icons' 

function Home () {
  return(
    <>
      <div className='view jarallax hero-image' data-jarallax='{"speed":0.2}'> 
      <img className='backpic' src="https://cdn.pixabay.com/photo/2019/01/25/19/33/degree-3955169__340.jpg"/>
        <div className='img-overlay justify-content-center align-items-center'>
        <div className='row'>
        <h1 className='intro-header'>Student-Owned Credentials</h1>
        </div>
          <div className='row'>
            <div className='col-sm-6 align-items-center'>
        <button className='issue-link-button btn btn-primary btn-block shadow mb-5 bg-white rounded' id='issue-button'>Issue</button>
        </div>
        <div className='col-sm-6'>
        <button className='issue-link-button btn btn-primary btn-block' id='verify-button'>Verify</button>
        </div>
        </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12 text-center'>
        <h1 className='expl-title'>How it Works</h1>
        </div>
        <div className='card-group text-center'>
          <div className='card hoverable-card'>
            <div className='card-body expl-text'>
            <FontAwesomeIcon icon={faLink } className='intro-icon'/>
            <div className='card-title'>Issue a Transcript</div>
            <div className='card-text'>Follow a simple two step process to record the transcript on the blockchain and thus transfer ownership to the student.</div>
            </div>
          </div>
          <div className='card hoverable-card'>
            <div className='card-body expl-text'>
            <FontAwesomeIcon icon={faPaperPlane} className='intro-icon'/>
            <div className='card-title'>Deliver</div>
            <div className='card-text'>Follow a simple two step process to record the transcript on the blockchain and thus transfer ownership to the student.</div>
            </div>
          </div>
          <div className='card hoverable-card'>
            <div className='card-body expl-text'>
            <FontAwesomeIcon icon={faUserCheck} className='intro-icon'/>
            <div className='card-title'>Verify</div>
            <div className='card-text'>Follow a simple two step process to record the transcript on the blockchain and thus transfer ownership to the student.</div>
            </div>
          </div>
        </div>

      
        
      </div>

    
    </>
  )
}

export default Home