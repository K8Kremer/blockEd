import React, {Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import { bindActionCreators } from 'redux';

import { setAccount } from '../actions';

import { connect } from 'react-redux';

class LogIn extends Component {

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      //dispatch redux action to save account to store
      this.props.setAccount(accounts);
    } catch (error){
      //set an error message
      console.log(error);
    }; 
     
  }

render(){
  return(
    <h1>some placeholder stuff here</h1>
  )



}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAccount }, dispatch);
}

function mapStateToProps(state){
  return {
    account: state.account
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

