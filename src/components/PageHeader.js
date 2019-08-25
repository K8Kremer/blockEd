import React, {Component} from 'react';
import { connect } from 'react-redux';



class PageHeader extends Component{
 
  render(){
  if(Object.keys(this.props.account).length === 0){
  return(
    <nav className="navbar navbar-light" style={{zIndex: 1,backgroundColor: "#0093B2", height: 75}} id='sticky'>
      <a href='/' id='logo'style={{fontFamily: 'Concert One', color: 'white'}}>BlockEd</a>
      <a href='/admindash' style={{fontFamily: 'Concert One', color: 'white'}}>Sign In</a>
  </nav>

  )} else{
    return(
      <nav className="navbar navbar-light" style={{backgroundColor: "#0093B2", height: 75}}>
        <a href='/' id='logo'style={{fontFamily: 'Concert One', color: 'white'}}>BlockEd</a>
        <h5 style={{fontFamily: 'Concert One', color: 'white'}}>Current Account: {this.props.account[0]}</h5>
    </nav>
    )
  }
}
}

function mapStateToProps(state){
  return {
    account: state.account
  }
}
export default connect(mapStateToProps)(PageHeader);