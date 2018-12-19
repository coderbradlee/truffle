var solc = require("solc");
var fs   = require('fs');

var source=fs.readFileSync("../contracts/etclottery.sol","utf8");
var cacl=solc.compile(source,1);
var abi= JSON.parse(cacl.contracts[':etclottery'].interface);
var bytecode=cacl.contracts[':etclottery'].bytecode;	

var Web3 = require('web3');
    const mepAddress =
    '0x22436eead1c943525fa1a0a8f98faf0412b591f8';
    web3 = new Web3()
    const eventProvider = new Web3.providers.WebsocketProvider('ws://172.16.2.12:18546')
    web3.setProvider(eventProvider)

    let mep = new web3.eth.Contract(abi, mepAddress);
    
    // var transactions = mep.allEvents(options).get();
    mep.events.allEvents({
    // filter: {event:'onBuys'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
    }, function(error, event){ console.log(event); })
    .on('data', function(event){
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function(event){
        console.log(event);
    })
    .on('error', console.error);