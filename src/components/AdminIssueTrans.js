import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import TranscriptExchangeContract from '../abi/TranscriptExchange.json';
import { async } from 'q';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccount, setDeployedNetwork, storeContract, writeHash, writeTransaction, recordIndex } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons' 
import './components.css';




class AdminIssueTrans extends Component {
constructor(props){
  super(props);

this.state ={
  contractInstance: null,
  fileURL: null
}

  this.generateHash = this.generateHash.bind(this);
}

//save account information, wire these up later to redux
  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      //dispatch redux action to save account to store
      this.props.setAccount(accounts);
      //get instance of the contract
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TranscriptExchangeContract.networks[networkId];
      //set network information in redux store
      this.props.setDeployedNetwork(deployedNetwork);
      const instance = new web3.eth.Contract(
        TranscriptExchangeContract.abi,
        deployedNetwork && deployedNetwork.address
      )
      console.log(instance);
     //set contract information in local state
     //async issue with storing this in redux store
     this.setState({contractInstance: instance});
   
    } catch (error){
      //set an error message
      console.log(error);
    }; 
     
  }

  //helper function to generate hash
generateHash = async (buffer) => {
  const digestBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const digestArray = Array.from(new Uint8Array(digestBuffer)) //convert buffer to byte array
  const digestHex = `0x${digestArray.map(item => item.toString(16).padStart(2, '0')).join('')}`; //convert to hex string for display
  return digestHex;
}



  instantiateContract = async () => {
    console.log(this.props.state)
    let index = Math.random() + Date.now();
    console.log(Math.floor(index));
    //invoke issue transcript contract method
    const response = await this.state.contractInstance.methods.issueTranscript(this.props.state.account[0],this.props.state.docHash, Math.floor(index)).send({from: this.props.state.account[0]});
    console.log(response)
    this.props.writeTransaction(response);
    //redirect
    if(this.props.state.transaction !== ''){
      this.props.recordIndex(Math.floor(index));
      this.props.history.push('/success')
    } //write an error message here too
    
  }
  //grab file that is uploaded, using file reader pass file into buffer to get a file to send to IPFS
  //rename this
  saveFile = (e) => {
    console.log('save file');
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend= async () =>{
      const buffer = Buffer(reader.result);
      console.log(buffer);
      const digest = await this.generateHash(buffer);
      this.props.writeHash(digest);
    }
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

  onSubmit = async (e) => {
    console.log('submit')
    e.preventDefault();
     //invoke smart contract
     this.instantiateContract();

    //invoke contract to add transaction to blockchain
 
  }


  render(){
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-1'></div>
          <div className='col-sm-10'>
            <div className='card border rounded shadow p-3 mb-5 bg-white'style={{marginTop:20}}>
        <h3 className='card-title text-center'>Issue a Transcript</h3>
        <div className='card-body text-center'>
        <form onSubmit={this.onSubmit}>
          <iframe className='file-preview'style={ this.state.fileURL ? { display:'block'} : {display: 'none'}}src={this.state.fileURL} />
          <div className='input-group mb3'>
            <div className='custom-file'>
          <input type='file' className='custom-file-input'id='inputFile'onChange={this.onChange}></input>
          <label className='custom-file-label' for='inputFile'>Choose File</label>
          </div>
          <div className='input-group-append'>
          <button type='submit'className='btn btn-primary'><FontAwesomeIcon icon={faCloudUploadAlt}/></button>
          </div>
          </div>
        </form>
        </div>
        </div>
        </div>
        <div className='col-sm-1'></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {state}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAccount, setDeployedNetwork, storeContract, writeHash, writeTransaction, recordIndex }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminIssueTrans);