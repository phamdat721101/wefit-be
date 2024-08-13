const axios = require('axios');

// investment history of user
const history = async (user) => {
    // fetch from sui network
    let resp = await axios.post("https://explorer-rpc.devnet.sui.io/", {
        "jsonrpc":"2.0",
        "id":"6",
        "method":"suix_queryTransactionBlocks",
        "params":[{"filter":{"ToAddress":"0x20cc2eb9d2559127da7c3eebd70169d5c95ff7eda490498951d32a3c53c50622"},"options":{"showEffects":true,"showInput":true}},null,100,true]
    })
    
    // return response
    return res.status(200).json({
        message: resp
    });
};

async function vault_generator(){
    return "PQD"
}

module.exports = vault_generator

// fetch("https://explorer-rpc.devnet.sui.io/", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "client-sdk-type": "typescript",
//     "client-sdk-version": "0.46.1",
//     "client-target-api-version": "1.15.0",
//     "content-type": "application/json",
//     "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site",
//     "Referer": "https://suiexplorer.com/",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "{
//     "jsonrpc":\"2.0\",\"id\":\"6\",\"method\":\"suix_queryTransactionBlocks\",\"params\":[{\"filter\":{\"ToAddress\":\"0x20cc2eb9d2559127da7c3eebd70169d5c95ff7eda490498951d32a3c53c50622\"},\"options\":{\"showEffects\":true,\"showInput\":true}},null,100,true]}",
//   "method": "POST"
// });