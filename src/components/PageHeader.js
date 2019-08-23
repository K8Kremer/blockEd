import React, {Component} from 'react';
import { connect } from 'react-redux';



class PageHeader extends Component{
 
  render(){
  if(Object.keys(this.props.account).length === 0){
  return(
    <nav className="navbar navbar-light" style={{backgroundColor: "#0093B2", height: 75}}>
      <h3 style={{fontFamily: 'Concert One', color: 'white'}}>BlockEd</h3>
      <a href='/login' style={{fontFamily: 'Concert One', color: 'white'}}>Sign In</a>
  </nav>

  )} else{
    return(
      <nav className="navbar navbar-light" style={{backgroundColor: "#0093B2", height: 75}}>
        <h3 style={{fontFamily: 'Concert One', color: 'white'}}>BlockEd</h3>
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