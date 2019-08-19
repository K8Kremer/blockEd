pragma solidity ^0.5.0;

contract TranscriptExchange {
uint public recordCount = 0;

  struct Record {
    string transcript_hash;
    string issuer_pubkey;
  // use IPFS to generate hash of data
  }
//create mapping to allow for lookup by the hash of record itself
  mapping(uint256 => Record) public records;

function issueTranscript(string memory _transcript_hash, string memory _issuer_pubkey) public {
  recordCount ++;
  //generate transcript hash on front end on file upload using SHA256

  //create new record using the struct and store on chain through mapping
  records[recordCount] = Record(_transcript_hash, _issuer_pubkey);
}

constructor() public {
  issueTranscript('123wer459werreed189', '12345sdftsdfsd896');
}
}