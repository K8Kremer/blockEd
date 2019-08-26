import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faFileContract, faLaptopCode, faLockOpen, faFileSignature, faHandsHelping } from '@fortawesome/free-solid-svg-icons'


function Authenticity() {
  return (
    <>
      <div className='row' id='authenticity-row'>
        <div className='col-sm-4'>
          <FontAwesomeIcon icon={faFileContract} className='display-icon' />
          <FontAwesomeIcon icon={faLaptopCode} className='display-icon' />
        </div>
        <div className='card col-sm-8' id='authenticity-card'>
          <h3 className='integrity-heading'>Document Integrity</h3>
          <div className='card-body'>
            <div className='card-text' id='authenticity-text'>
              Documents are hashed using a one-way hashing algorithm.  Given the same input, the algorithm will always produce the same hash.
              If the document has been altered in any way, the output will be different.  In this way, you can trust
              that the document provided to you by the student has not been altered if the hash matches the original hash recorded on the blockchain.
              </div>
          </div>
        </div>
      </div>
      <div className='row' id='authenticity-row'>
        <div className='card col-sm-8' id='authenticity-card'>
          <h3 className='integrity-heading'>Document Origin</h3>
          <div className='card-body'>
            <div className='card-text' id='authenticity-text'>
              Your school peers are trusted nodes on this private network.  Their account and school name have been mapped and recorded
               on the blockchain.  It is that same account that is used to sign the transaction when the transcript is recorded on the blockchain,
               making an immutable record of origin.
              </div>
          </div>
        </div>
        <div className='col-sm-4'>
          <FontAwesomeIcon icon={faFileSignature} className='display-icon' />
          <FontAwesomeIcon icon={faLockOpen} className='display-icon' />
        </div>
      </div>
      <div className='row' id='authenticity-row'>
        <div className='col-sm-4'>
          <FontAwesomeIcon icon={faLink} className='display-icon' />
          <FontAwesomeIcon icon={faHandsHelping} className='display-icon' />
        </div>
        <div className='card col-sm-8' id='authenticity-card'>
          <h3 className='integrity-heading'>Blockchain: Harnessing the Power</h3>
          <div className='card-body'>
            <div className='card-text' id='authenticity-text'>
              By making use of the decentralized ledger theory behind blockchain, BlockEd enables students to own
              their own records and for those records to be independently verified by any other node on the chain
              when provided the key to access the document.  No more third-parties, no more waiting for official records
              to come in the mail - just trust and transparency!
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Authenticity