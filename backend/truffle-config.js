module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Ganache host (default)
      port: 8545,        // Ganache port (default)
      network_id: "*",   // Any network ID (match any network)
    },
  },

  compilers: {
    solc: {
      version: "^0.8.0", // Specify the Solidity compiler version
    },
  },
};