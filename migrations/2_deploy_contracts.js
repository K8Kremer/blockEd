const TranscriptExchange = artifacts.require('./TranscriptExchange.sol');
const SchoolNetwork = artifacts.require('./SchoolNetwork.sol');

module.exports = function(deployer) {
  deployer.deploy(TranscriptExchange);
  deployer.deploy(SchoolNetwork);
};