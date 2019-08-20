import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';

import TranscriptExchangeContract from '../abi/TranscriptExchange.json';
import { async } from 'q';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccount } from '../actions';


class AdminIssueTrans extends Component {
  constructor(props){

    super(props);

    this.state = {
      accounts: null,
      contract: null,
      digest: null, 
      transaction: null
    }
    

    this.saveFile=this.saveFile.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
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
      console.log(deployedNetwork);
      console.log(accounts);
      const instance = new web3.eth.Contract(
        TranscriptExchangeContract.abi,
        deployedNetwork && deployedNetwork.address
      )
      console.log(instance);
 //for now set local component state
 this.setState({accounts, contract: instance})
    } catch (error){
      console.log(error);
    }; 
     
  }




  //helper function to generate hash
generateHash = async(buffer) => {
  const digestBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const digestArray = Array.from(new Uint8Array(digestBuffer)) //convert buffer to byte array
  const digestHex = digestArray.map(item => item.toString(16).padStart(2, '0')).join(''); //convert to hex string for display
  return digestHex;
}

  renderSuccessMessage(){
    return(
    //  add if statement here so success doesn't always show
      <h5>Transaction was successful. Transaction Hash is: ${this.state.transaction}</h5>
    )
  }

  instantiateContract = async () => {
    console.log('instantiate');
    // const contract = require('truffle-contract')
    const { accounts, digest, contract } = this.state;

    //invoke issue transcript contract method
    const response = await contract.methods.issueTranscript(digest).send({from: accounts[0]});
    // const response = await contract.methods.get().call();
    console.log(response);
    this.setState({transaction: response.transactionHash})
    
  }
  //grab file that is uploaded, using file reader pass file into buffer to get a file to send to IPFS
  saveFile(e){
    console.log('save file');
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend= async () => {
      const buffer = Buffer(reader.result);
      const digest = await this.generateHash(buffer);
      this.setState({digest: digest});
    }

  }

  async onSubmit(e){
    console.log('submit')
    e.preventDefault();
     //invoke smart contract
     this.instantiateContract();

    //invoke contract to add transaction to blockchain
 
  }


  render(){
    return (
      <div>
        <h2>Upload File</h2>
        <form onSubmit={this.onSubmit}>
          <input type='file' onChange={this.saveFile}></input>
          <button type='submit'className='btn btn-primary'>Submit</button>
        </form>
        <div>
          {this.renderSuccessMessage()}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAccount }, dispatch);
}
export default connect(null, mapDispatchToProps)(AdminIssueTrans);