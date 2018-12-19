// var MetaCoin = artifacts.require("../contracts/PSL.sol");

// contract('PSL', function(accounts) {
//   // it("should put 10000 MetaCoin in the first account", function() {
//   //   return PSL.totalSupply().then(function(instance) {
//   //     return instance.totalSupply.call(accounts[0]);
//   //   }).then(function(balance) {
//   //     console.log(balance.valueOf())
//   //     assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
//   //   });
//   // });
//   it("should call a function that depends on a linked library", function() {
//     var meta;
//     var metaCoinBalance;
//     var metaCoinEthBalance;
//     return PSL.deployed().then(function(instance) {
//         meta = instance;
//         return meta.totalSupply();
//       }).then(function(supply) {
//           // assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpeced function, linkage may be broken");
//           console.log(supply);
//         });
//     // return PSL.deployed().then(function(instance) {
//     //   meta = instance;
//     //   return meta.buy.call(accounts[0]);
//     // }).then(function(outCoinBalance) {
//     //   metaCoinBalance = outCoinBalance.toNumber();
//     //   return meta.getBalanceInEth.call(accounts[0]);
//     // }).then(function(outCoinBalanceEth) {
//     //   metaCoinEthBalance = outCoinBalanceEth.toNumber();
//     // }).then(function() {
//     //   assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpeced function, linkage may be broken");
//     // });
//   });

// //   it("should send coin correctly", function() {
// //     var meta;

// //     //    Get initial balances of first and second account.
// //     var account_one = accounts[0];
// //     var account_two = accounts[1];

// //     var account_one_starting_balance;
// //     var account_two_starting_balance;
// //     var account_one_ending_balance;
// //     var account_two_ending_balance;

// //     var amount = 10;

// //     return MetaCoin.deployed().then(function(instance) {
// //       meta = instance;
// //       return meta.getBalance.call(account_one);
// //     }).then(function(balance) {
// //       account_one_starting_balance = balance.toNumber();
// //       return meta.getBalance.call(account_two);
// //     }).then(function(balance) {
// //       account_two_starting_balance = balance.toNumber();
// //       return meta.sendCoin(account_two, amount, {from: account_one});
// //     }).then(function() {
// //       return meta.getBalance.call(account_one);
// //     }).then(function(balance) {
// //       account_one_ending_balance = balance.toNumber();
// //       return meta.getBalance.call(account_two);
// //     }).then(function(balance) {
// //       account_two_ending_balance = balance.toNumber();

// //       assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
// //       assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
// //     });
// //   });
// });
var MyTokenABI='[{"constant":true,"inputs":[],"name":"getBuyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"bytes32"},{"name":"_team","type":"uint256"},{"name":"_etc","type":"uint256"}],"name":"reLoadXname","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"activate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pIDxAddr_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"airDropTracker_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"round_","outputs":[{"name":"plyr","type":"uint256"},{"name":"team","type":"uint256"},{"name":"end","type":"uint256"},{"name":"ended","type":"bool"},{"name":"strt","type":"uint256"},{"name":"keys","type":"uint256"},{"name":"etc","type":"uint256"},{"name":"pot","type":"uint256"},{"name":"mask","type":"uint256"},{"name":"ico","type":"uint256"},{"name":"icoGen","type":"uint256"},{"name":"icoAvg","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"}],"name":"plyrNames_","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"fees_","outputs":[{"name":"gen","type":"uint256"},{"name":"psl","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"pIDxName_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"uint256"},{"name":"_team","type":"uint256"},{"name":"_etc","type":"uint256"}],"name":"reLoadXid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"address"},{"name":"_all","type":"bool"}],"name":"registerNameXaddr","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_pID","type":"uint256"},{"name":"_addr","type":"address"},{"name":"_name","type":"bytes32"},{"name":"_laff","type":"uint256"}],"name":"receivePlayerInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"rndTmEth_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rID_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pID","type":"uint256"}],"name":"getPlayerVaults","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"bytes32"},{"name":"_all","type":"bool"}],"name":"registerNameXname","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentRoundInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"address"},{"name":"_team","type":"uint256"},{"name":"_etc","type":"uint256"}],"name":"reLoadXaddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"uint256"},{"name":"_team","type":"uint256"}],"name":"buyXid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_pID","type":"uint256"},{"name":"_name","type":"bytes32"}],"name":"receivePlayerNameList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_nameString","type":"string"},{"name":"_affCode","type":"uint256"},{"name":"_all","type":"bool"}],"name":"registerNameXID","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"address"},{"name":"_team","type":"uint256"}],"name":"buyXaddr","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"plyrRnds_","outputs":[{"name":"etc","type":"uint256"},{"name":"keys","type":"uint256"},{"name":"mask","type":"uint256"},{"name":"ico","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_affCode","type":"bytes32"},{"name":"_team","type":"uint256"}],"name":"buyXname","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_otherFETC","type":"address"}],"name":"setOtherFomo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"potSplit_","outputs":[{"name":"gen","type":"uint256"},{"name":"psl","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTimeLeft","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_rID","type":"uint256"},{"name":"_etc","type":"uint256"}],"name":"calcKeysReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_keys","type":"uint256"}],"name":"iWantXKeys","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"activated_","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"airDropPot_","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"plyr_","outputs":[{"name":"addr","type":"address"},{"name":"name","type":"bytes32"},{"name":"win","type":"uint256"},{"name":"gen","type":"uint256"},{"name":"aff","type":"uint256"},{"name":"lrnd","type":"uint256"},{"name":"laff","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"potSwap","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getPlayerInfoByAddress","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"playerID","type":"uint256"},{"indexed":true,"name":"playerAddress","type":"address"},{"indexed":true,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"isNewPlayer","type":"bool"},{"indexed":false,"name":"affiliateID","type":"uint256"},{"indexed":false,"name":"affiliateAddress","type":"address"},{"indexed":false,"name":"affiliateName","type":"bytes32"},{"indexed":false,"name":"amountPaid","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onNewName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"etcIn","type":"uint256"},{"indexed":false,"name":"keysBought","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"},{"indexed":false,"name":"PSLAmount","type":"uint256"},{"indexed":false,"name":"genAmount","type":"uint256"},{"indexed":false,"name":"potAmount","type":"uint256"},{"indexed":false,"name":"airDropPot","type":"uint256"}],"name":"onEndTx","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"playerID","type":"uint256"},{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"etcOut","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"etcOut","type":"uint256"},{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"},{"indexed":false,"name":"PSLAmount","type":"uint256"},{"indexed":false,"name":"genAmount","type":"uint256"}],"name":"onWithdrawAndDistribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"etcIn","type":"uint256"},{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"},{"indexed":false,"name":"PSLAmount","type":"uint256"},{"indexed":false,"name":"genAmount","type":"uint256"}],"name":"onBuyAndDistribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"playerName","type":"bytes32"},{"indexed":false,"name":"compressedData","type":"uint256"},{"indexed":false,"name":"compressedIDs","type":"uint256"},{"indexed":false,"name":"winnerAddr","type":"address"},{"indexed":false,"name":"winnerName","type":"bytes32"},{"indexed":false,"name":"amountWon","type":"uint256"},{"indexed":false,"name":"newPot","type":"uint256"},{"indexed":false,"name":"PSLAmount","type":"uint256"},{"indexed":false,"name":"genAmount","type":"uint256"}],"name":"onReLoadAndDistribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"affiliateID","type":"uint256"},{"indexed":false,"name":"affiliateAddress","type":"address"},{"indexed":false,"name":"affiliateName","type":"bytes32"},{"indexed":true,"name":"roundID","type":"uint256"},{"indexed":true,"name":"buyerID","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"onAffiliatePayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"roundID","type":"uint256"},{"indexed":false,"name":"amountAddedToPot","type":"uint256"}],"name":"onPotSwapDeposit","type":"event"}]';
var Web3 = require('web3');
var web3 = new Web3('http://172.16.2.12:8545');
// or
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// change provider
// web3.setProvider('ws://localhost:8546');
// // or
// web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

// // Using the IPC provider in node.js
// var net = require('net');
// var web3 = new Web3('/Users/myuser/Library/Ethereum/geth.ipc', net); // mac os path

var tokenContract = new web3.eth.contract(MyTokenABI, '0x9e325C8066f705Bc000DcE9bCf5Dbdf2e03E1230');
console.log("contract name "+tokenContract.name);
// tokenContract.name.call(null,function(error,result){
//         console.log("contract name "+result);
//     })
// 调用合约函数
// 合约的函数除了指明返回值是constant的以外,都需要发起事务,这时候就需要指定调用者,因为要花费该账户的gas.
// 这里调用一下transfer函数.

tokenContract.methods.activate().send({from: '0xe0e1b1e5d63e0ead6bfefcfc5a9dce543913cc15'})
.on('transactionHash', function(hash){
})
.on('confirmation', function(confirmationNumber, receipt){
})
.on('receipt', function(receipt){
    // receipt example
    console.log(receipt); //查询这里可以得到结果
})
.on('error', console.error); // If a out of gas error, the second parameter is the receipt.
// 监听事件
// 刚刚调用transfer的时候还会触发合约的事件Transfer,如果程序关注谁给谁进行了转账,那么就可以通过监听该事件.
// 通过指定fromBlock,toBlock可以限制事件发生的范围,除了这个还有一个filter参数可以进行更详细的限制,
// 如有兴趣可以查询文档web3文档

// tokenContract.events.Transfer({
//     fromBlock: 0,
//     toBlock:'latest'
// }, function(error, event){ /*console.log("result:\n"+JSON.stringify(event)); */})
// .on('data', function(event){
//     console.log(event); // same results as the optional callback above
// })
// .on('changed', function(event){
//     // remove event from local database
// })
// .on('error', console.error);