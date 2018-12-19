var SafeMath = artifacts.require("./SafeMath.sol");
var NameFilter = artifacts.require("./NameFilter.sol");
var FETCKeysCalcLong = artifacts.require("./FETCKeysCalcLong.sol");
var FETCdatasets = artifacts.require("./FETCdatasets.sol");

var FomoETC = artifacts.require("./FomoETC.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.deploy(FETCdatasets);
  deployer.deploy(NameFilter);
  deployer.link(SafeMath, FETCKeysCalcLong);
  deployer.deploy(FETCKeysCalcLong);

  deployer.link(SafeMath, FomoETC);
  deployer.link(FETCdatasets, FomoETC);
  deployer.link(NameFilter, FomoETC);
  deployer.link(FETCKeysCalcLong, FomoETC);
  deployer.deploy(FomoETC);
};
