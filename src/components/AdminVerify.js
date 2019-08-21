import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import TranscriptExchangeContract from '../abi/TranscriptExchange.json';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccount, setDeployedNetwork, storeContract, writeHash, writeTransaction } from '../actions';



class AdminVerify extends Component {

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
      console.log(e)
      const digest = await this.generateHash(buffer);
      this.props.writeHash(digest);
    }

  }
  instantiateContract = async (index) => {
    console.log('contract');
    const response = await this.state.contractInstance.methods.verifyUnchanged(index).call({from: this.props.state.account[0]});
    // const response = await this.state.contractInstance.methods.recordArray(1).send({from: this.props.state.account[0]});
    console.log(response);
  }

  //onSubmit
  onSubmit = async (e) => {
    e.preventDefault();
    //save input value from form
    
    const indexLookup = document.getElementById('index').value;
    this.instantiateContract(indexLookup);
   
 
  //use smart contract to locate transaction...handle in smart contract
  
  }
 
 
 

  //verify unchanged - check that doc hashes match

  //verify origin - check that addresses of issuer match

   //form - collect transaction hash and file input and school issuer address

  render(){
    return (
      <div>
        <h2>Upload File</h2>
        <form onSubmit={this.onSubmit}>
          <input type='file' onChange={this.saveFile}></input>
          <input placeholder="index" id='index'></input>
          <button type='submit'className='btn btn-primary'>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {state}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAccount, setDeployedNetwork, storeContract, writeHash, writeTransaction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminVerify);