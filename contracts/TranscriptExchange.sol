pragma solidity ^0.5.0;

contract TranscriptExchange {
uint public recordCount = 0;

  struct Record {
    string transcript_hash;
  }
//create mapping to allow for lookup by the hash of record itself
  mapping(uint  => Record) public records;

function issueTranscript(string memory _transcript_hash) public {
  recordCount ++;
  //generate transcript hash on front end on file upload using SHA256

  //create new record using the struct and store on chain through mapping
  records[recordCount] = Record(_transcript_hash);
}

constructor() public {
  issueTranscript('123wer459werreed189');
}
}