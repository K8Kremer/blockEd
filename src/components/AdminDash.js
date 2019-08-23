import React, {Component } from 'react';
import _ from 'lodash';
import getWeb3 from '../utils/getWeb3';
import Record from './Record'
import { bindActionCreators } from 'redux';
import { setAccount, fetchIssuedRecords } from '../actions';

import { connect } from 'react-redux';



class AdminDash extends Component {

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
    console.log(this.props.records)
     this.props.fetchIssuedRecords(this.props.account)
     console.log(this.props.records)
  }
renderRows(){
  console.log('renderrows')
  return _.map(this.props.records, record =>{
    return (
      <Record key={record._id} record={record}/>
    )
  })
}

render(){
  if(!this.props.records){
    return(
      <h3>Please hold....</h3>
    )
  } else{
    return(
    <div className='container'>
      <table className='shadow p-3 mb-5 bg-white rounded'>
        <tr>
          {/* change the way the index is calc, extract file name and add to db, student name */}
          <th>Doc Id</th> 
          <th>File Name</th>
          <th>Student Name</th>
          <th>Date Issued</th>
          <th>Verified By:</th>
        </tr>
          <tbody>
           {this.renderRows()}
          </tbody>
      </table>
    </div>
  )
  }
  



}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAccount, fetchIssuedRecords }, dispatch);
}

function mapStateToProps(state){
  return {
    account: state.account,
    records: state.issuedRecords
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDash);

