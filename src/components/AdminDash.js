import React, {Component } from 'react';
import _ from 'lodash';
import DonutChart from 'react-donut-chart';
import getWeb3 from '../utils/getWeb3';
import Record from './Record'
import { bindActionCreators } from 'redux';
import { setAccount, fetchIssuedRecords } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileSignature, faUserCheck } from '@fortawesome/free-solid-svg-icons' 
import { connect } from 'react-redux';




class AdminDash extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchTerm:'',
      currentlyDisplayed: []
    };
    this.fireSearch = this.fireSearch.bind(this);
  }


  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      
      const accounts = await web3.eth.getAccounts();
      //dispatch redux action to save account to store
      this.props.setAccount(accounts);
      //attach event listener to listen for account changes from metamask
    
    } catch (error){
      //set an error message
      console.log(error);
    }; 
    console.log(this.props.records)
     this.props.fetchIssuedRecords(this.props.account)
    //listen for account change event from metamask and reload page with new account information
      const account = await window.ethereum.on('accountsChanged', function(accounts){
        window.location.reload(true)
     //attach a focus listener so that api gets called on redirect back to this page
  
    })
     console.log(this.props.records)
  }


  fireSearch(e){
    let filter = e.target.value.toLowerCase();
    console.log(this.props.records)
    let newDisplay = _.filter(this.props.records, record => record.studentName.toLowerCase().includes(filter));
    this.setState({
      searchTerm: e.target.value,
      currentlyDisplayed: newDisplay
    });
  }

renderRowsWithSearch(){
  return _.map(this.state.currentlyDisplayed, record =>{
    return (
      <Record key={record._id} record={record}/>
    )
  })
}

renderRows(){
 return _.map(this.props.records, record => {
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
      <>
      <div className='row dash-row'>
        <div className='col-sm-8 table-background'>
        <h3 className='table-title'>Transcripts Issued</h3>
          <input type='text' placeholder='Search'id='search-bar' onChange={this.fireSearch}></input>
      <table className='p-3 mb-5 bg-white rounded table-bordered admin-table-issued'>
        <thead className='thead-light text-center'>
        <tr className='table-row'>
          {/* change the way the index is calc, extract file name and add to db, student name */}
  
          <th className='table-head-20'>Student Name</th>
          <th className='table-head-20'>File Name</th>
          <th className='table-head-10'>Doc Id</th> 
          <th className='table-head-10'>Date Issued</th>
          <th className='table-head-20'>Verified By:</th>
        </tr>
        </thead>
          <tbody className='scroll-container'>
           {this.state.searchTerm ? this.renderRowsWithSearch() : this.renderRows()}
          </tbody>
      </table>
      </div>
      <div className='col-sm-4 action-row'>
        <div className='card'>
          <div className='card-header text-center action-header'>Actions</div>
          <div className='card-body actions'>
            
         <a href='/issue' className='issue-link-card card mb-5 bg-white rounded' id='issue-button'><FontAwesomeIcon icon={faFileSignature} className='sigpic'/>Issue Transcript</a>
         <a href='/verify' className='issue-link-card card' id='verify-button'><FontAwesomeIcon icon={faUserCheck} className='sigpic'/>Verify Transcript</a>
         </div>
        </div>
      </div>
      </div>
  
      </>
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

