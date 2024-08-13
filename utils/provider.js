const HDWalletProvider = require("@truffle/hdwallet-provider");
const {dgtCfg} = require('../config/vars');
exports.contractProvider = require('web3-eth-contract');

exports.provider = new HDWalletProvider({ 
    privateKeys: [dgtCfg.contractOwnerPriv], 
    providerOrUrl: dgtCfg.providerUrl,
    pollingInterval: 8000
});

exports.adminProvider = new HDWalletProvider({
    privateKeys: [dgtCfg.dgtAdminPriv],
    providerOrUrl: dgtCfg.providerUrl,
    pollingInterval: 8000,
    networkCheckTimeout: 1000000,
    timeoutBlocks: 200
})

this.contractProvider.setProvider(this.provider)
