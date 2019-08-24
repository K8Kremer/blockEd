import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import TranscriptExchangeContract from '../abi/TranscriptExchange.json';
import SchoolNetworkContract from '../abi/SchoolNetwork.json';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccount, setDeployedNetwork, storeContract, writeHash, writeTransaction, updateRecord } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons' 
import './components.css';



class AdminVerify extends Component {
  constructor(props){
    super(props);
  
  this.state ={
    fileURL: null,
    hashMatch: null,
    
  }
  this.checkHash = this.checkHash.bind(this);
  this.onClick = this.onClick.bind(this);
}
  componentDidMount = async () => {

    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      //dispatch redux action to save account to store
      this.props.setAccount(accounts);
      //get instance of the contract
      const networkId = await web3.eth.net.getId();
      //rename this to reflect transcript contract deployment
      const deployedNetwork = TranscriptExchangeContract.networks[networkId];
      const deployedSchoolNetwork = SchoolNetworkContract.networks[networkId];
      //set network information in redux store
      this.props.setDeployedNetwork(deployedNetwork);
      const instance = new web3.eth.Contract(
        TranscriptExchangeContract.abi,
        deployedNetwork && deployedNetwork.address
      )
      const networkInstance = new web3.eth.Contract(
        SchoolNetworkContract.abi,
        deployedSchoolNetwork && deployedSchoolNetwork.address
      )
     //set contract information in local state
     //async issue with storing this in redux store
     this.setState({contractInstance: instance});
     this.setState({schoolNetwork: networkInstance});
    } catch (error){
      //set an error message
      console.log(error);
    }; 
  }
     

  //rehash document - on file upload
  generateHash = async (buffer) => {
    const digestBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const digestArray = Array.from(new Uint8Array(digestBuffer)) //convert buffer to byte array
    const digestHex = `0x${digestArray.map(item => item.toString(16).padStart(2, '0')).join('')}`    
    return digestHex;
  }

  saveFile = (e) => {
    console.log('save file');
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend= async () =>{
      const buffer = Buffer(reader.result);
      const digest = await this.generateHash(buffer);
      this.props.writeHash(digest);
      //this gets saved to redux store as docHash for later comparison
    }

  }

  checkHash(){
    console.log(this.state.returnedHash);
    console.log(this.props.state.docHash);
    if(this.state.returnedHash == this.props.state.docHash){
      this.setState({hashMatch: true});
      console.log(this.state);
    }
  }

  verifyOrigin= async () => {
    const response = await this.state.schoolNetwork.methods.getSchool(this.state.issuerAddress).call({from: this.props.state.account[0]});
    console.log(response);
    this.setState({issuerName: response});
    //make call to local server and db here
  }

  //rename this to better describe action 
  instantiateContract = async (index) => {
    console.log(this.state)
    const response = await this.state.contractInstance.methods.verifyUnchanged(index).call({from: this.props.state.account[0]});
    console.log(response);
    //set component state values with response...refactor later to use this correctly with redux promise
    this.setState({issuerAddress: response.issuerAddress})
    this.setState({returnedHash: response.transcript_hash})
    this.checkHash();
    this.verifyOrigin();
//look up school information for associated address to display origin
  }


  convertFileToPreview = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const url = reader.result
      this.setState({fileURL: url});
      console.log(this.state)
    }
  }

  //trigger two actions
  onChange = (e) => {
    this.saveFile(e);
    this.convertFileToPreview(e);
  }

  //onSubmit
  onSubmit = async (e) => {
    e.preventDefault();
    //save input value from form
    
    const indexLookup = document.getElementById('index').value;
    this.setState({index: indexLookup});
    this.instantiateContract(indexLookup);  
  }

  onClick= async (e) => {
    console.log('click')
    e.preventDefault();
    const response = await this.state.schoolNetwork.methods.getSchool(this.props.state.account[0]).call({from: this.props.state.account[0]});
    this.props.updateRecord(this.state.index, response);
  }
 //render notification status based upon redux store state of record verified
renderNotification(){
  if(this.props.state.recordVerified){
  return(
    <h3>School has been notified.</h3>
  )
  } else{
   return(
     <>
    <div className='col-sm-3'></div>
        <div className='col-sm-6 verify-content'>
         
          <a href='verify' className='issue-link-button btn btn-success shadow btn-block' onClick={this.onClick} id='notify-button'>Notify Last School of New Enrollment</a>
          
        </div>
        </>
    )
  
  }
}

  render(){
    return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-6'>
          <div className='card border rounded shadow p-3 mb-5 bg-white'style={{marginTop:20}}>
      <h3 className='card-title text-center'>Your Record</h3>
      <div className='card-body text-center'>
      <form onSubmit={this.onSubmit}>
        <iframe className='file-preview'style={ this.state.fileURL ? { display:'block'} : {display: 'none'}}src={this.state.fileURL} />
        <div className='input-group mb3'>
          <div className='custom-file'>
        <input type='file' className='custom-file-input'id='inputFile'onChange={this.onChange}></input>
        <label className='custom-file-label' for='inputFile' id='labelForFile'>Choose File</label>
        </div>
        <div className='input-group-append'>
        <button type='submit'className='btn btn-primary'><FontAwesomeIcon icon={faCloudUploadAlt}/></button>
        </div>
        </div>
        <div className='input-group mb3' id='id-input'>
        <input className='form-control'type='text' placeholder="Document Id" id='index'></input>
        <div className='input-group-append'>
          <button type='submit'className='btn btn-primary'>Submit</button>
          </div>
          </div>
          <p className='hash-text'>Hash:{this.props.state.docHash}</p>

      </form>
      </div>
      </div>
      </div>
      <div className='col-sm-6'>
      <div className='card border rounded shadow p-3 mb-5 bg-white'style={{marginTop:20}}>
        
      <h3 className='card-title text-center'>Blockchain Record</h3>
            <p>Hash: {this.state.returnedHash}</p>
            <p>Issuer: {this.state.issuerName}</p>
            <FontAwesomeIcon icon= { this.state.hashMatch ? faCheckCircle : faTimesCircle} className={ this.state.hashMatch ? 'match' : 'noMatch'}/>
            <p className='match-status-text'>Content Match Status</p>
      </div>
      </div>
      </div>
      <div className='row'>
        {this.renderNotification()}
        <div className='col-sm-3'></div>
      </div>
    </div>
    )
  }
}
  

function mapStateToProps(state){
  return {state}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAccount, setDeployedNetwork, storeContract, writeHash, writeTransaction, updateRecord }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminVerify);

