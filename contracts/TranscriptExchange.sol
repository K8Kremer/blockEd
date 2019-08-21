pragma solidity ^0.5.0;

contract TranscriptExchange {

  struct RecordStruct {
    bytes32 transcript_hash;
    uint index;
  }
//create mapping to allow for lookup by the hash of record itself
  mapping(uint  => RecordStruct) public records;
//create array of records
  uint[] public recordArray;

function issueTranscript(
  bytes32 transcript_hash,
  uint index)
  public
  returns (uint){
  records[index].transcript_hash = transcript_hash;
  records[index].index = index;
  recordArray.push(index);
  return records[index].index;
  //generate transcript hash on front end on file upload using SHA256

  //create new record using the struct and store on chain through mapping

}

function verifyUnchanged(uint index) public view returns (bytes32 transcript_hash){
  return records[index].transcript_hash;
}

// constructor() public {
//   issueTranscript('123wer459werreed189');
// }
}