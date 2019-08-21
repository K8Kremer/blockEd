import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import TranscriptExchangeContract from '../abi/TranscriptExchange.json';
import { async } from 'q';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAccount, setDeployedNetwork, storeContract, writeHash, writeTransaction } from '../actions';



class AdminIssueTrans extends Component {
constructor(props){
  super(props);

this.state ={
  contractInstance: null
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
    const response = await this.state.contractInstance.methods.issueTranscript(this.props.state.docHash, Math.floor(index)).send({from: this.props.state.account[0]});
    console.log(response)
    this.props.writeTransaction(response);
    //redirect
    if(this.props.state.transaction !== ''){
      this.props.history.push('/admin/success')
    } //write an error message here too
    
  }
  //grab file that is uploaded, using file reader pass file into buffer to get a file to send to IPFS
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

  onSubmit = async (e) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminIssueTrans);