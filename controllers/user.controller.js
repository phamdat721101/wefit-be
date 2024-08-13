const axios = require("axios")

const { User } = require('../model/user')

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