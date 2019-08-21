import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons' 
import { connect } from 'react-redux';


class AdminSuccess extends Component {

  render(){
    return(
  
  
      <div className='container'>
        <div className='row'>
          <div className='col-sm-2'></div>
          <div className='col-sm-8'>
            <div className='card border rounded shadow p-3 mb-5 bg-white'style={{marginTop:20}}>
        <h3 className='card-title text-center'>Success!</h3>
           <FontAwesomeIcon icon={faCheckCircle} className='success-icon text-success'/>
        <div className='card-body text-center'>
          <p> Your student now needs the same file you've uploaded here and this number: {this.props.index}</p>
         
          </div>
        </div>
        </div>
        </div>
        <div className='col-sm-2'></div>
        </div>
  )
  }
}
  
function mapStateToProps(state){
  return {
    index: state.index
  };
}


export default connect(mapStateToProps)(AdminSuccess);