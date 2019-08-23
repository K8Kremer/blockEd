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
      <div className='row'>
        <div className='col-sm-8'>
      <table className='shadow p-3 mb-5 bg-white rounded table-bordered admin-table-issued'>
        <thead className='thead-light text-center'>
        <tr>
          {/* change the way the index is calc, extract file name and add to db, student name */}
          <th className='table-head-10'>Status</th>
          <th className='table-head-20'>Student Name</th>
          <th className='table-head-20'>File Name</th>
          <th className='table-head-10'>Doc Id</th> 
          <th className='table-head-10'>Date Issued</th>
          <th className='table-head-20'>Verified By:</th>
        </tr>
        </thead>
          <tbody className='scroll-container'>
           {this.renderRows()}
          </tbody>
      </table>
      </div>
      <div className='col-sm-4'>
        <div className='card shadow'>
          <div className='card-header'>Actions</div>
          <div className='card-body actions'>
         <a href='/issue' className='issue-link-button btn btn-primary btn-block shadow mb-5 bg-white rounded' id='issue-button'>Issue</a>
         </div>
        </div>
      </div>
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

