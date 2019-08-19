import React, { Component } from 'react';
// import ipfs from '../ipfs';
// import TranscriptExchangeContract from '../../build/contracts/TranscriptExchange.json';

class AdminIssueTrans extends Component {
  constructor(props){
    super(props)

    this.saveFile=this.saveFile.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
  //grab file that is uploaded, using file reader pass file into buffer to get a file to send to IPFS
  saveFile(e){
    console.log('save file');
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend= () => {
      this.setState({buffer: Buffer(reader.result)})
    }
  }

  onSubmit(e){
    e.preventDefault();
    console.log('form submit')
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

export default AdminIssueTrans;