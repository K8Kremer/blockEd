import React, {Component} from 'react';

class Record extends Component {
  render(){
    const { record } = this.props;
    console.log(record)
    return(
      <tr>
        <td>{record.index}</td>
        <td>placeholder for file name</td>
        <td>placeholder for student name</td>
        <td>{record.dateCreated}</td>
        <td>{record.verifiedBy}</td>
      </tr>
    )
  }
}

export default Record