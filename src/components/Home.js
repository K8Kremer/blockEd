import React from 'react';
import {Link} from 'react-router-dom'
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPaperPlane, faUserCheck } from '@fortawesome/free-solid-svg-icons' 

function Home () {
  return(
    <>
      <div className='hero-image'> 
      <img className='backpic img-fluid' src="https://cdn.pixabay.com/photo/2019/01/25/19/33/degree-3955169__340.jpg"/>
        <div className='img-overlay align-items-center'>
        <div className='row'>
        <h1 className='intro-header img-text1'>Student-Owned Credentials</h1>
        </div>
          <div className='row'>
            <h3 className='img-text'>A Blockchain Solution for K-12 Academic Records</h3>
        </div>
        </div>
      </div>
      <div className='row how-works'>
        <div className='col-sm-12 text-center'>
        <h1 className='expl-title'>How it Works</h1>
        </div>
        <div className='card-group text-center'>
          <div className='card hoverable-card' id='remove-border1'>
            <div className='card-body expl-text'>
            <FontAwesomeIcon icon={faLink } className='intro-icon'/>
            <div className='card-title home-heading'>Issue a Transcript</div>
            <div className='card-text home-text'>Simply upload a transcript and it is recorded on the established private blockchain.</div>
            </div>
          </div>
          <div className='card hoverable-card' id='remove-border1'>
            <div className='card-body expl-text'>
            <FontAwesomeIcon icon={faPaperPlane} className='intro-icon'/>
            <div className='card-title home-heading'>Deliver</div>
            <div className='card-text  home-text'>Provide the same file and the number you receive to your student.</div>
            </div>
          </div>
          <div className='card hoverable-card' id='remove-border1'>
            <div className='card-body expl-text'>
            <FontAwesomeIcon icon={faUserCheck} className='intro-icon'/>
            <div className='card-title home-heading'>Verify</div>
            <div className='card-text  home-text'>Upload any transcript and document id you receive to check its authenticity and origin.</div>
            </div>
          </div>
        </div>

      
        
      </div>

    
    </>
  )
}

export default Home