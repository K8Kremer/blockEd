pragma solidity ^0.5.0;

contract SchoolNetwork {

  struct SchoolStruct {
    address schoolAddress;
    string schoolName;
  }
//create mapping to allow for lookup by the address of school
  mapping(address  => SchoolStruct) public schools;
//create array of records
  address[] public addressArray;

function addSchool(
  address schoolAddress,
  string memory schoolName)
  public
  returns (bool){
  schools[schoolAddress].schoolAddress = schoolAddress;
  schools[schoolAddress].schoolName = schoolName;
  addressArray.push(schoolAddress);
  return true;
}

function getSchool(address schoolAddress) public view returns (string memory){
  return (
    schools[schoolAddress].schoolName);
}

//add schools for demo to the chain, using first three accounts from ganache
constructor() public {
 addSchool(0x7f4917B272d72907549bB46dA4dFd6Bd958b0Ad5, 'Misty Plains High School');
 addSchool(0x8342fFb34ebe162F242Da6D4099AB59eDd3d3bFe, 'Southview High School');
 addSchool(0x3a1437067e5b6D74A40B1727eeb0341cF16034CC, 'Dundalk High School');

}
}