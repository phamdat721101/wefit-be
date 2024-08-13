const Web3 = require('web3');
const Contract = require('web3-eth-contract');
const tokenAbi = require('../config/abi/dgt.json')
const vaultAbi = require('../config/abi/dgt_vault.json')
const axios = require('axios');
const HDWalletProvider = require("@truffle/hdwallet-provider");

exports.contractProvider = require('web3-eth-contract');

const {dgtCfg, tokenParams,vaultParams} = require('../config/vars')
// const {getNonce} = require('./priceFeed_service')

const {provider} = require('../utils/provider')
const vault_provider = new HDWalletProvider({ 
    privateKeys: ['eedddc0cdc167430de9383d213a9b53c67aefd61bf3c277e3dbe01ee206f9230'], 
    providerOrUrl: dgtCfg.providerUrl,
    pollingInterval: 8000
});
const web3 = new Web3(dgtCfg.providerUrl)

Contract.setProvider(vault_provider)
const contract = new this.contractProvider(vaultAbi, vaultParams.dgtVaultAddres)
const tokenContract = new this.contractProvider(tokenAbi, tokenParams.tokenAddress)
exports.mint_token = async(req) =>{
    try {
        let user_email = req.sender
        let investor = '0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E'
        let package_type =  1
        let contract_params = {
            from: '0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E',
            gasPrice: 25000000000,
            gasLimit: 8500000,
        }
        let receipt = await contract.methods.buy_vault(user_email, package_type).send(Object.assign(contract_params));
        console.log("Transaction receipt: ", receipt)
        return receipt
    } catch (err) {
        return err.message
    }
}

exports.getTokenSupply = async(req) =>{
    let contract = new Contract(tokenAbi, req.assetAddress)
    let nonce = await getNonce(dgtCfg.contractOwnerAddr)
    try {
        let receipt = await contract.methods.getChallengeInfo().call()
        console.log("Asset info: ", receipt)
        return receipt
    } catch (err) {
        console.log("Error get asset: ", err.message)
        return err.message
    }
}

exports.user_balance = async(req,res, next) =>{
    let email = req.query.email 

    if(email == undefined || email.length == 0 || !email){
        email = "dgt@gmail.com"
    }

    let receipt = await tokenContract.methods.get_user_balance(email).call();

    if(receipt == 0){
        receipt = 100
    }
    const user_balance = {
        "user_email": email,
        "amount":receipt,
    }

    res.json(user_balance)
}

exports.claim_token = async(req, res, next) =>{
        const scriptURLGet = "https://script.google.com/macros/s/AKfycbwpKywlfgvuc_P_6ZYtAArtiKW9pgEmGuuKpmWOsqcAqQbG2C1My2kaV3eQkUdMicTK/exec"
        const url = `${scriptURLGet}?email=${req.body.email}`;
        const user_info = await axios.get(url);
        let to_adr = user_info.data.wallet
        let amount =  100
        let user = req.body.email
        let contract_params = {
            from: '0x90de83fd2cd4d01660cd6909692568a14661cdf1',
            gasPrice: 25000000000,
            gasLimit: 8500000,
        }
        let receipt = await contract.methods.vault_transfer(to_adr, amount, user).send(Object.assign(contract_params));
        console.log("Transaction receipt: ", receipt)
        res.json(receipt)
}