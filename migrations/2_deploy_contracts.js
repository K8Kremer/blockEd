const TranscriptExchange = artifacts.require('./TranscriptExchange.sol');

module.exports = function(deployer) {
  deployer.deploy(TranscriptExchange);
};