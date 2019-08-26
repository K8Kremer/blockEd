pragma solidity ^0.5.0;

contract TranscriptExchange {

  struct RecordStruct {
    address issuerAddress;
    bytes32 transcript_hash;
    uint index;
  }
//create mapping to allow for lookup by the hash of record itself
  mapping(uint  => RecordStruct) public records;
//create array of records
  uint[] public recordArray;

function issueTranscript(
  address issuerAddress,
  bytes32 transcript_hash,
  uint index)
  public
  returns (uint){
  records[index].issuerAddress = issuerAddress;
  records[index].transcript_hash = transcript_hash;
  records[index].index = index;
  recordArray.push(index);
  return records[index].index;
}

function verifyUnchanged(uint index) public view returns (bytes32 transcript_hash, address issuerAddress){
  return (
    records[index].transcript_hash,
    records[index].issuerAddress);
}

}