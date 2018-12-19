// Allows us to use ES6 in our migrations and tests.
// truffle compile, truffle migrate
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '172.16.5.7',
      port: 7545,
      network_id: '*', // Match any network id
      gas:1000000
    },
    // rpc: {
    //   host: "47.91.31.224",
    //   gas: 4712388,
    //   port: 2301
    // },
    // solc: {
    //   optimizer: {
    //     enabled: true,
    //     runs: 200
    //   }
    // },
  }
}
