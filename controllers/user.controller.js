const axios = require("axios")
const sui_monitor = require('../chains/monitor/sui_monitor')
const evm_adr = require('../chains/address/evm.address')
const apt_adr = require('../chains/address/apt.address')
const algo_adr = require('../chains/address/algo.address')

const { Wallet } = require('ethers')
const wallet = Wallet.createRandom()
const vaults = require('../services/vault')
const { User } = require('../model/user')
const { Profile } = require('../model/profile')

exports.get_list_follower = async(req, res, next) =>{
    const { profileId } = req.params;

    try {
        // Find the user profile by user_id
        const userProfile = await Profile.findOne({ profile_id: profileId });
        if (!userProfile) {
        return res.status(404).send({ message: 'User profile not found' });
        }

        // Return the list of followers
        res.status(200).send(userProfile.followers);
    } catch (error) {
        console.error("Error getting followers:", error);
        res.status(500).send({ message: 'Error getting followers', error });
    }
}

exports.follow_profile = async(req, res, next) =>{
    const { profileId } = req.params;
    const { followerName } = req.body;

    try {
        // Find the user profile to follow
        const userProfile = await Profile.findOne({ profile_id: profileId });
        if (!userProfile) {
        return res.status(404).send({ message: 'User profile not found' });
        }

        // Add the follower to the user's followers list
        userProfile.followers.push({ name: followerName });

        // Save the updated user profile
        await userProfile.save();

        res.status(200).send({ message: 'Successfully followed the user', profile: userProfile });
    } catch (error) {
        console.error("Error following user:", error);
        res.status(500).send({ message: 'Error following user', error });
    }
}

exports.register = async(req, res, next) =>{
    const user = new User(req.body)
    console.log("PQD go there: ", user)

    if(!user || user == undefined){
        res.json({
            "Error":"DB connection error"
        })
        return 
    }

    let resp = user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            user: doc
        });
    })
}

exports.subscribe = async(req, res, next) =>{
    let user_info = {
        "chain": req.body.chain, 
        "wallet": req.body.wallet, 
    }
    let resp = await subscribe_signal(user_info)
    if(resp.length <= 0){
        return "Error subscrtiption"
    }
    res.json({
        "dgt_id": resp[0].objectId,
        "digest": resp[0].digest
    })
}
exports.vault_balance = async(req, res, next) =>{
    let vault_id = req.query.vault_id
    const vault_balance = [
        {
            "vault_id":"dgt_v1",
            "balance":24111306, 
            "staked": 20051998
        }
    ]

    res.json(vault_balance)
}

exports.profile = async (req, res, next) => {
    try {
        const user_email = req.query.email

        const userProfile = await User.findOne({ email: user_email });

        if(!userProfile || userProfile == undefined){
            res.json("Error: invalid user")
        }

        const user_resp = {
            "name":"Pnha2411",
            "wallet":"0x7D...E95",
            "adr_url":"https://app.dappflow.org/explorer/account/I5ZVS5JQFRG4SBQPEYPP4UDTEMSMHXY6RO5BQ3GNTDKTFQWV3S7JXMYPCI/transactions",
            "des":"It is the best capital for funding allocation",
            "balance":"54241$", 
            "twitter": "https://x.com/pqd_2411",
            "allTimeProfit":{
                "amount": "323,4",
                "profitloss": "3.4%",
            },
            "bestPerformer":{
                "coinID":"sol_1",
                "amount": "14.23",
                "profitloss": "4.5%",
            },
            "worstPerformer":{
                "coinID":"blas_v2",
                "amount": "3.412",
                "profitloss": "5.7%",
            },
            "assets":[
                {
                    "asset": "NOT coin",
                    "symbol": "NOT",
                    "contract": "0x138234234",
                    "chain": "btc layer-2",
                    "invest_amount":10, 
                    "weight":"67.4%", 
                    "holding":"1348$",
                    "price_change":{
                        "24h":"5.5",                
                    },
                    "status":true,
                    "total_usd":"1.67$",
                    "token_amount":"5000",
                    "price":"0.000059$",
                    "profit":"20%",
                    "created_at": Date.now(),
                    "logo_url":"https://dd.dexscreener.com/ds-data/tokens/ton/eqavlwfdxgf2lxm67y4yzc17wykd9a0guwpkms1gosm__not.png",
                    "asset_url": "https://app.dappflow.org/explorer/asset/3797/transactions"
                },
                {
                    "asset": "Resistance DOG",
                    "symbol": "REDO",
                    "contract": "0x138234234",
                    "chain": "btc layer-2",
                    "invest_amount":90, 
                    "weight":"32.6%", 
                    "holding":"652$",
                    "price_change":{
                        "24h":"6.5",                
                    },
                    "dgt_score": 8,
                    "status":true,
                    "total_usd":"24.7$",
                    "token_amount":"2407",
                    "price":"0.000013259$",
                    "profit":"24.5%",
                    "created_at": Date.now(),
                    "logo_url":"https://dd.dexscreener.com/ds-data/tokens/ton/eqbz_cafpydr5kuts0anxh0ztdhkpezonmlja2sngllm4cko.png",
                    "asset_url": "https://app.dappflow.org/explorer/asset/10984/transactions"
                }
            ],
            "logo_url":"https://drive.google.com/file/d/1PHKQkJsCCvxi1PWc1kDoCsCZgsMHMK0O/view?usp=sharing",
        }
        res.json(user_resp);
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
};

exports.user_portfolio = async(req, res, next)=>{
    const pool_adr = "0xbd85f61a1b755b6034c62f16938d6da7c85941705d9d10aa1843b809b0e35582"
    const chain = "sui"
    let signal_info = await axios.get(`https://api.dexscreener.com/latest/dex/pairs/${chain}/${pool_adr}`)
    // console.log("Signal info: ", signal_info.data.pairs)

    const portfolio = signal_info.data.pairs

    res.json(portfolio)
}

exports.user_history = async(req, res, next)=>{
    let adr = req.query.email
    console.log("User address: ", adr)
    const user_tracker = [
        {
            "date": "7/6/2024",
            "manager": "DigiTrust",
            "package_type": "Low-risk",
            "amount":100,
            "price":36,
            "expected_return": 27,
            "tx_hash": "0x123",
            "expire_date": "9/10/2024"
        }
    ]

    res.json(user_tracker)
}

exports.sub_deposit_event = async(req, res, next) =>{
    //making connection + 
    const event_resp = await sui_monitor.emit_investor_deposit()
    res.json(event_resp)
}

exports.get_evm_address = async(req, res, next) =>{
    let account_id = req.query.account_id
    let address_id = req.query.address_id

    let adr_resp = await evm_adr.generate(account_id, address_id)

    res.json(adr_resp)
}

exports.get_apt_address = async(req, res, next) =>{
    let account_id = req.query.account_id

    let adr_resp = await apt_adr.aptos_address(wallet.mnemonic.phrase, account_id)

    res.json(adr_resp)
}

exports.get_algo_address = async(req, res, next) =>{
    let account_id = req.query.account_id

    let adr_resp = await algo_adr.createAddress()

    res.json(adr_resp)
}