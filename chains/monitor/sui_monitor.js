const axios = require('axios');
const { getFullnodeUrl, SuiClient } = require('@mysten/sui.js/client');

const client = new SuiClient({
  url: getFullnodeUrl('testnet'),
});

// calls RPC method 'suix_subscribeEvent' with params:
// const unsubscribe = await client.subscribeEvent({
// 	filter: {
// 		Sender: '0xa4c033f96e0997bd61ae2141012837c0f51c7b9b635e35879511bdf3b6cd4a33',
// 	},
// 	onMessage(event) {
// 		// handle subscription notification message here. This function is called once per subscription message.
//     console.log("Event data: ", event)
// 	},
// });

const pool_id = '0xbd85f61a1b755b6034c62f16938d6da7c85941705d9d10aa1843b809b0e35582'

const url = `https://api.dexscreener.com/latest/dex/pairs/sui/${pool_id}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  }
};

exports.get_pool_info = async function(){
  let resp = await axios.get(url, options)

  return resp
}

exports.emit_investor_deposit = async function(){
  const resp = await client.queryEvents({
    query: { Sender: '0xa4c033f96e0997bd61ae2141012837c0f51c7b9b635e35879511bdf3b6cd4a33'},
    limit: 9,
  });
  
  return resp
}