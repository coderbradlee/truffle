var solc = require("solc");
var fs   = require('fs');
// var bignum = require('./bignum');
// var bignum = require('bignum');

var source=fs.readFileSync("../contracts/etclottery.sol","utf8");
var cacl=solc.compile(source,1);
var abi= JSON.parse(cacl.contracts[':etclottery'].interface);
var bytecode=cacl.contracts[':etclottery'].bytecode;	

var Web3 = require('web3');
// var web3 = new Web3('http://172.16.5.7:7545');
var host="http://172.16.2.12:18545";
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider(host));

// abi address
var address = "0x22436eead1c943525fa1a0a8f98faf0412b591f8";

//contract ABI
var etclottery = new web3.eth.Contract(abi, address);

// etclottery.methods.buy(1).send({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea', value: 50000000000000000,gas:8000000}, function(error, result){
//     console.log('error: ' + error+"||||"+'buy:'+result);
// });

etclottery.methods.getCreator()
.call({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea'}, function(error, result){
    console.log('error: ' + error+"||||"+'getCreator:'+result);
});  
etclottery.methods.getFee()
.call({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea'}, function(error, result){
    console.log('error: ' + error+"||||"+'getFee:'+result);
});    

etclottery.methods.playerWithdraw(1e16)//1eth
.call({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea',gas:20000000}, function(error, result){
    console.log('error: ' + error+"||||playerWithdraw");
    console.log("true: "+result[0]);
    console.log("left: "+result[1]);
    console.log("amount: "+result[2]);
    console.log("address: "+result[3]);
});
// etclottery.methods.playerWithdraw(web3.toBigNumber('0xDE0B6B3A7640000'))//1eth
// .call({from:'0x4A605e60d03453F038ff3b49D21053fC63e9f45A',gas:20000000}, function(error, result){
//     console.log('error: ' + error+"||||"+'withdraw:'+result);
// });
// etclottery.methods.reinvest(2000000000000000000,0)
// .call({from:'0x4A605e60d03453F038ff3b49D21053fC63e9f45A',gas:20000000}, function(error, result){
//     console.log('error: ' + error+"||||"+'reinvest:'+result);
// });
// etclottery.methods.reinvest(100000000,0)
// .call({from:'0x4A605e60d03453F038ff3b49D21053fC63e9f45A',gas:20000000}, function(error, result){
//     console.log('error: ' + error+"||||"+'reinvest:'+result);
// });
etclottery.methods.getCurrentRoundLeft()
.call({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea'}, function(error, result){
    console.log('error: ' + error+"||||"+'getCurrentRoundLeft:'+result);
});
etclottery.methods.getEndowmentBalance()
.call({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea'}, function(error, result){
    console.log('error: ' + error+"||||"+'getEndowmentBalance:'+result);
});

etclottery.methods.getRoundInfo(1)
.call({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea'}, function(error, result){
    console.log('error: ' + error+"||||"+'getRoundInfo(1):'+result);
    if(!error){
        console.log("rid: "+result[0]);
        console.log("addr: "+result[1]);
        console.log("strt: "+result[2]);
        console.log("end: "+result[3]);
        console.log("etc: "+result[4]);
        console.log("etc0: "+result[5]);
        console.log("etc1: "+result[6]);
        console.log("pot: "+result[7]);
        console.log("ended: "+result[8]);
        console.log("winTeam: "+result[9]);
        console.log("////////////////////////////////////////////");
    }
});
etclottery.methods.getCurrentInfo()
.call({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea'}, function(error, result){
    console.log('error: ' + error+"||||"+'getCurrentInfo:'+result);
    if(!error){
    console.log("rid: "+result[0]);
    console.log("addr: "+result[1]);
    console.log("strt: "+result[2]);
    console.log("end: "+result[3]);
    console.log("etc: "+result[4]);
    console.log("etc0: "+result[5]);
    console.log("etc1: "+result[6]);
    console.log("pot: "+result[7]);
    console.log("ended: "+result[8]);
    console.log("winTeam: "+result[9]);
    console.log("////////////////////////////////////////////");
    }
});
etclottery.methods.getTotalInfo()
.call({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea'}, function(error, result){
    console.log('error: ' + error+"||||"+'getTotalInfo:'+result);
    if(!error){
    console.log("totalIn: "+result[0]);
    console.log("bullTotalIn: "+result[1]);
    console.log("bearTotalIn: "+result[2]);
    console.log("bullTotalWin: "+result[3]);
    console.log("bearTotalWin: "+result[4]);
    console.log("////////////////////////////////////////////");
    }
});
etclottery.methods.getPlayerInfoByAddress('0x7b6d393414d77cce0177ecd6883b08a0b5b881ea')
.call({from:'0x7b6d393414d77cce0177ecd6883b08a0b5b881ea'}, function(error, result){
    console.log('error: ' + error+"||||"+'getPlayerInfoByAddress:0x7b6d393414d77cce0177ecd6883b08a0b5b881ea');
    if(!error){
    console.log("currentroundIn: "+result[0]);
    console.log("lastRoundIn: "+result[1]);
    console.log("allRoundIn: "+result[2]);
    console.log("win: "+result[3]);
    console.log("lastwin: "+result[4]);
    console.log("withdrawed: "+result[5]);
    console.log("lrnd: "+result[6]);
    console.log("teamId: "+result[7]);
    console.log("////////////////////////////////////////////");
    }
});

