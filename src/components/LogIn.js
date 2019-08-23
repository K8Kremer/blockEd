import React, {Component } from 'react';
import getWeb3 from '../utils/getWeb3';
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
    <div className='container'>
      <form>
        <div className='form-group'>
          <label htmlFor='address'>Account Address:</label>
          <input type='text' className='form-control' id='address' placeholder='Address'>
          </input>
          </div>
          <div class="form-group">
             <label for="exampleInputPassword1">Password:</label>
             <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
          </div>
          <button type='submit' className='btn btn-primary'>Log In</button>
      </form>

    </div>
  )

}
}

function mapStateToProps(state){
  return {
    account: state.account
  }
}

export default connect(mapStateToProps)(LogIn);

