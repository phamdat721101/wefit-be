const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const user = require('./routes/user.route')
const vault = require('./routes/vault.route')
const investment = require('./routes/investment.route')
const asset = require('./routes/asset.route')
const token = require('./routes/token.route')
const chain = require('./routes/chain.route')

const token_ctrl = require('./controllers/token.controller')

const vault_generator = require('./services/history');

// const adr_sub_event = require('./sui_event')

// adr_sub_event()

const mongoose = require("mongoose");
require("dotenv").config();

const db_url = process.env.DB_URL || "mongodb://0.0.0.0:27017"

mongoose.Promise = global.Promise;

mongoose.connect(db_url);
let conn = mongoose.connection;

conn.on("connected", function(){
    console.log("Mongoose connected to " + db_url);
});

conn.on("error", function(err){
    console.log("Mongoose connection error" + err);
});

conn.on("disconnected", function(){
    console.log("Mongoose disconnected");
});

// mongoose.connection.db.admin().command({ ping: 1 });

// async function getData() {
//     const url = 'http://localhost:4001/v1/status';
//     const response = await fetch(url);
//     const jsonResponse = await response.json();
//     console.log("PQD: ", jsonResponse);
// } 
  
app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}));
app.use('/v1', user)
app.use('/v1', vault)
app.use('/v1', investment)
app.use('/v1', asset)
app.use('/v1', token)
app.use('/v1', chain)

// app.post("/api/investments", (req, res) => {
//     const invesments = new Investment(req.body);
  
//     invesments.save((err, doc) => {
//       if (err) return res.json({ success: false, err });
//       res.status(200).json({
//         success: true,
//         invesments: doc
//       });
//     });
// });

app.get('/', async (req, res) => {
    // let resp = await axios.get('http://109.123.233.65:4001/v1/asset?assetAddress=0x23926749Faf9F9AB807e57010999e9f274390421')

    // console.log("resp after: ", resp.data.data)
    let resp = await vault_generator()
    res.json({
        code: 0,
        data: resp
    })
})

app.get('/v1/asset', async (req, res) => {
    let request = req.query.assetAddress
    let resp = await axios.get(`http://109.123.233.65:4001/v1/asset?assetAddress=${request}`)

    res.json({
        code: 0,
        data: resp.data.data
    })
})

app.post('/withdraw', async (req, res) =>{
    let withraw_req = {
        receiver: req.body.receiver,
        amount: req.body.amount,
        package: req.body.package,
        token: req.body.token,
        manager: req.body.manager
    }
    
    res.json({
        code: 0,
        data: "0xd"
    })
})

app.post('/deposit', async (req, res) =>{
    let deposit_req = {
        sender: req.body.sender,
        amount: req.body.amount,
        package: req.body.package,
        token: req.body.token,
        manager: req.body.manager,
        created_at: req.body.created_at
    }

    let resp = await token_ctrl.mint_token(deposit_req)
    
    res.json(resp)
})

const evm_history = async (req) =>{
    let resp = await axios.get(`https://api-baobab.klaytnscope.com/v2/accounts/${req}/txs`)
    let transactions = resp.data.result
    let listTx = []
    let tx_length = 0

    if(transactions.length >3){
        tx_length = transactions.length % 3
    }

    console.log("Length: ", transactions.length, " -tx: ", tx_length)


    for(let i = 0; i < tx_length; i++){
        let type = i % 2 == 0 ? "Deposit" : "Withdraw"

        // console.log("Timestamp: ", resp[i].timestamp, " -cv: ")
        dateFormat = new Date(parseInt(transactions[i].createdAt) * 1000)
        date_resp = dateFormat.getDate()+ "/" +(dateFormat.getMonth()+1)+
           "/"+dateFormat.getFullYear()+
           " "+dateFormat.getHours()+
           ":"+dateFormat.getMinutes()+
           ":"+dateFormat.getSeconds();

        let tx_detail = await axios.get(`https://api-baobab.klaytnscope.com/v2/txs/${transactions[i].txHash}/ftTransfers`)
        // console.log("Tx_detail: ", tx_detail.data.result)
        let amount = 0
        if(tx_detail.data.result.length >= 1){
            amount = tx_detail.data.result[0].amount / (10**17)
        }

        let his_detail = {
            "wallet":transactions[i].fromAddress,
            "type":type,
            "amount":amount,
            "tx_hash":transactions[i].txHash,
            "url":`https://baobab.klaytnscope.com/tx/${transactions[i].txHash}?tabId=internalTx`,
            "timestamp": date_resp
        }

        listTx.push(his_detail)
    }

    return listTx
}

app.get('/v1/history', async (req, res) =>{
    let user_id = req.query.wallet
    let chain = req.query.chain
    if(chain == "evm" || !chain){
        let resp_his = await evm_history(user_id)
        res.json(resp_his)
        return
    }
    let digest = await get_digest(user_id)
    let transactions = digest.result.data1h
    
    let resp = []

    for(let i = 0; i < transactions.length; i++){
        let txInfo = await history(transactions[i].digest)
        // console.log("Tx info: ", txInfo)
        if(txInfo.result.length == 0){
            continue
        }

        // console.log("Timestamp: ", transactions[i])
        txInfo.result[0].timestamp = transactions[i].timestampMs
        //making connection for blockchain developer if they generate multiple version f
        //finalized version to start: focus on building PQD <> DGT as the defi solution 
        let desofi_protocol = async function dgt(){
            
        }
        resp.push(txInfo.result[0])
    }

    // let resp = await history("6xKtWLEizBRy3hoJQZkRWu95H8iJKvakn47MbEQ2hMGJ")
    console.log("History resp: ", resp)
    let res_history = []
    for(let i = 0; i < resp.length; i++){
        let type = resp[i].type
        type = type.split("::")
        type = type[2] ? type[2] : "nil"
        type = type == "DepositEvent" ? "Gửi" : "Rút"

        // console.log("Timestamp: ", resp[i].timestamp, " -cv: ")
        dateFormat = new Date(parseInt(resp[i].timestamp))
        date_resp = dateFormat.getDate()+ "/" +(dateFormat.getMonth()+1)+
           "/"+dateFormat.getFullYear()+
           " "+dateFormat.getHours()+
           ":"+dateFormat.getMinutes()+
           ":"+dateFormat.getSeconds();

        let his_detail = {
            "wallet":resp[i].sender,
            "type":type,
            "amount":resp[i].parsedJson.amount,
            "tx_hash":resp[i].id.txDigest,
            "url":`https://suiexplorer.com/txblock/${resp[i].id.txDigest}?network=testnet`,
            "timestamp": date_resp
        }

        res_history.push(his_detail)
    }

    res.json(res_history)
})


app.listen(process.env.PORT || 3001, () =>{
    console.log("Listening at 3001")
});

module.exports = app;