import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';

class AdminVerify extends Component {

  //rehash document - on file upload
  // generateHash = async (buffer) => {
  //   const digestBuffer = await crypto.subtle.digest('SHA-256', buffer);
  //   const digestArray = Array.from(new Uint8Array(digestBuffer)) //convert buffer to byte array
  //   const digestHex = digestArray.map(item => item.toString(16).padStart(2, '0')).join(''); //convert to hex string for display
  //   return digestHex;
  // }

  // saveFile = (e) => {
  //   console.log('save file');
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   const reader = new window.FileReader();
  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend= async () =>{
  //     const buffer = Buffer(reader.result);
  //     console.log(e)
  //     const digest = await this.generateHash(buffer);
  //     this.props.writeHash(digest);
  //   }

  // }

  // //onSubmit
  // onSubmit = async (e) => {
  //   e.preventDefault();
  //   //save input value from form
    
  //   const txHashToMatch = document.getElementById('hash').value;
  //   console.log(txHashToMatch)
 
  // //use smart contract to locate transaction...handle in smart contract
  // const web3 = await getWeb3();
  // const blockTransaction = await web3.eth.getTransaction(txHashToMatch);
  // console.log(blockTransaction)
  // console.log('broken')
  // }

  //verify unchanged - check that doc hashes match

  //verify origin - check that addresses of issuer match

   //form - collect transaction hash and file input and school issuer address

  render(){
    return (
      <div>
        <h2>Upload File</h2>
        <form onSubmit={this.onSubmit}>
          <input type='file' onChange={this.saveFile}></input>
          <input placeholder="transaction hash" id='hash'></input>
          <button type='submit'className='btn btn-primary'>Submit</button>
        </form>
      </div>
    )
  }
}

export default AdminVerify;