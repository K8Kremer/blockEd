import React, {Component} from 'react';

class Record extends Component {
  render(){
    const { record } = this.props;
    return(
      <tr className='table-row'>
        <td>{record.studentName}</td>
        <td>{record.fileName}</td>
        <td>{record.index}</td>
        <td>{record.dateCreated}</td>
        <td>{record.verifiedBy}</td>
      </tr>
    )
  }
}

export default Record