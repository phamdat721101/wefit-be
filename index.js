const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const user = require('./routes/user.route')
const token = require('./routes/token.route')

const token_ctrl = require('./controllers/token.controller')

const vault_generator = require('./services/history');

const mongoose = require("mongoose");
require("dotenv").config();

// const db_url = process.env.DB_URL || "mongodb://0.0.0.0:27017"

// mongoose.Promise = global.Promise;

// mongoose.connect(db_url);
// let conn = mongoose.connection;

// conn.on("connected", function(){
//     console.log("Mongoose connected to " + db_url);
// });

// conn.on("error", function(err){
//     console.log("Mongoose connection error" + err);
// });

// conn.on("disconnected", function(){
//     console.log("Mongoose disconnected");
// });
  
app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}));
app.use('/v1', user)
app.use('/v1', token)

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

app.listen(process.env.PORT || 3001, () =>{
    console.log("Listening at 3001")
});

module.exports = app;