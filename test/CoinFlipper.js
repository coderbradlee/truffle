var solc = require("solc");
var fs   = require('fs');

var source=fs.readFileSync("../contracts/betandflip.sol","utf8");
var cacl=solc.compile(source,1);
var abi= JSON.parse(cacl.contracts[':CoinFlipper'].interface);
var bytecode=cacl.contracts[':CoinFlipper'].bytecode;	

var Web3 = require('web3');
// var web3 = new Web3('http://172.16.5.7:7545');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://172.16.5.7:7545"));

// abi address
var address = "0xb391a1b2e3a7d8bca69858ee95296ed78853f579";

//contract ABI
var coinflipper = new web3.eth.Contract(abi, address);
// var coinflipper = new web3.eth.Contract(MyTokenABI, '0x72Ee92F65196492adff1B292502543aB0F95f486');
console.log("contract lastresult: "+coinflipper);
// var ret=coinflipper.getEndowmentBalance();
// console.log("getEndowmentBalance: "+ret);
coinflipper.methods.getEndowmentBalance()
.call({from:'0x469B0E89aE64fF9B90FF93D078dfAA5732Fc0061'}, function(error, result){
console.log('error: ' + error+"||||"+'getEndowmentBalance:'+result);
// console.log('getEndowmentBalance:':+result);
});

// coinflipper.methods.betAndFlip().send({from:'0x469B0E89aE64fF9B90FF93D078dfAA5732Fc0061', value: 1000000000000000000}, function(error, result){
//     console.log('error: ' + error+"||||"+'betAndFlip:'+result);
// });

coinflipper.methods.getResultOfLastFlip()
.call({from:'0x469B0E89aE64fF9B90FF93D078dfAA5732Fc0061'}, function(error, result){
    console.log('error: ' + error+"||||"+'getResultOfLastFlip:'+result);
});
coinflipper.methods.getResultOfLastFlip()
.call({from:'0x469B0E89aE64fF9B90FF93D078dfAA5732Fc0061'}, function(error, result){
    console.log('error: ' + error+"||||"+'getResultOfLastFlip:'+result);
});
coinflipper.methods.getPlayerGainLossOnLastFlip()
.call({from:'0x469B0E89aE64fF9B90FF93D078dfAA5732Fc0061'}, function(error, result){
    console.log('error: ' + error+"||||"+'getPlayerGainLossOnLastFlip:'+result);
});
// ret=coinflipper.betAndFlip.sendTransaction({from:eth.coinbase, value: 1000000000000000000}); // 1 ETH. Let's see what happens
// //"0xc78a24881c7f70d25a817dcfcdce3347ca0cd265b7ba30a60df61e5639482bcf"
// ret=coinflipper.getResultOfLastFlip();
// //"no wagers yet"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet?
// //"no wagers yet"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet?
// //"no wagers yet"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet? I'm waiting...
// //"no wagers yet"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet? I'm waiting...
// //"win"
// ret=coinflipper.getPlayerGainLossOnLastFlip();
// //1000000000000000000
// ret=web3.fromWei(coinflipper.getPlayerGainLossOnLastFlip());
// //1
// ret=coinflipper.getEndowmentBalance();
// //5000000000000000000
// ret=coinflipper.betAndFlip.sendTransaction({from:eth.coinbase, value: 3000000000000000000}); // 3 ETH. Let's see what happens
// //"0xcae272652649e07c343674d15b40a086c559408d9c66d8022de3f54932bf3d9f"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet? I'm waiting...
// //"loss"
// ret=coinflipper.getEndowmentBalance();
// //8000000000000000000
// ret=web3.fromWei(coinflipper.getPlayerGainLossOnLastFlip());
// //-3
// ret=web3.eth.getBalance(eth.coinbase);
// //1806931309200681965
// ret=web3.fromWei(web3.eth.getBalance(eth.coinbase));
// //1.806931309200681965
// ret=coinflipper.betAndFlip.sendTransaction({from:eth.coinbase, value: 1500000000000000000}); // 1.5 ETH. Let's see what happens
// ////"0xc99add577b3180ca58b1a8219f2cd282f6b77edb63e1e384b05abc434753b1a1"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet? I'm waiting...
// //"win"
// ret=web3.fromWei(web3.eth.getBalance(eth.coinbase));
// //3.304471659200681965
// ret=web3.fromWei(web3.eth.getBalance(eth.coinbase));
// ret=coinflipper.kill.sendTransaction({from:eth.coinbase});
// //"0xed9f9e49cca76965ba32acce2b2f0b17ada467e52d55b803c26cc7132ba108fa"
  
// ret=coinflipper.getEndowmentBalance();   // 1 eth
// //1000000000000000000
// ret=coinflipper.betAndFlip.sendTransaction({from:eth.coinbase, value: 3000000000000000000}); // 3 ETH, more than endowment can handle. Let's see what happens
// //"0x66b5ae12f215d1bcf1a1656f79ccedc69612dc891f35dce5dbd6ead8854f0cb1"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet? I'm waiting...
// //"no wagers yet"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet? I'm waiting...
// //"no wagers yet"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet? I'm waiting...
// //"no wagers yet"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet? I'm waiting...
// //"wager larger than contract's ability to pay"
// ret=coinflipper.getEndowmentBalance();
// //1000000000000000000
// ret=coinflipper.betAndFlip.sendTransaction({from:eth.coinbase, value: 500000000000000000}); // .5 ETH.
// //"0x16ef5f3f0778b1252dcfd3b55f09ab97382f23d8ad7489f1f1b45d88eb7588f5"
// ret=coinflipper.getResultOfLastFlip(); // has the tx been mined yet? I'm waiting...
// //"loss"