const path = require('path');
const env = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require('dotenv').config({
  path: path.join(__dirname, '../' + env)
});

module.exports = Object.freeze({
  env                 : process.env.NODE_ENV || 'production',
  port                : process.env.PORT || 3001,
  logs                : process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  logLevels           : {
    file              : process.env.FILE_LOG_LEVEL || 'info',
    console           : process.env.CONSOLE_LOG_LEVEL || 'debug',
    sentry            : process.env.SENTRY_LOG_LEVEL || 'error'
  },
  redisCfg            : {
    url               : process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    reportChannel     : process.env.REDIS_REPORT_CHANNEL || 'monitors.report',
    isReportEnable    : process.env.REDIS_REPORT_ENABLE || 'true',
  },
  requestTimeout      : parseInt(process.env.REQUEST_TIMEOUT) || 50000,
  shortTimeout        : parseInt(process.env.SHORT_REQUEST_TIMEOUT) || 5000,
  overrideBlockInterval: parseInt(process.env.OVERRIDE_START_BLOCK_INTERVAL) || 30000,
  monitorDelayInterval: parseInt(process.env.MONITOR_FULLNODE_DELAY_INTERVAL) || 60000,
  networks            : process.env.MONITOR_NETWORKS ? process.env.MONITOR_NETWORKS.split(',') : [],
  cronTime            : process.env.CRON_TIME || '*/1 * * * * *',
  preparers           : process.env.PREPARERS || 'vnd-devs',
  rsaKeys             : {
    public            : process.env.RSA_PUB,
    private           : process.env.RSA_PRIV
  },
  kafkaCfg            : {
    clientId          : process.env.KAFKA_CLIENT_ID || 'crypto-wallet',
    urls              : process.env.KAFKA_URLS || '127.0.0.1:9092',
    schemaRegistry    : process.env.KAFKA_SCHEMA_REGISTRY || 'http://127.0.0.1:8081',
    groupId           : process.env.KAFKA_GROUP_ID || 'crypto-wallet',
    heartbeatInterval : parseInt(process.env.KAFKA_HEARTBEAT_INTERVAL) || 3000,
    sessionTimeout    : parseInt(process.env.KAFKA_SESSION_TIMEOUT) || 10000
  },
  kafkaTopicCfg       : {
    deposit           : process.env.KAFKA_MONITOR_DEPOSIT_TOPIC || 'deposit',
    transaction       : process.env.KAFKA_MONITOR_TRANSACTION_TOPIC || 'transaction',
    withdraw           : process.env.KAFKA_WITHDRAW_TOPIC || 'withdraw',
    fund              : process.env.KAFKA_FUND_TOPIC || 'fund',
    paymentTopic       : process.env.KAFKA_FUND_REQUEST_TOPIC || 'digitrust-fund-request-development',
  },
  blockCache          : {
    networks          : process.env.BLOCK_CACHE_NETWORKS || 'klaytn',
    cacheTime         : process.env.BLOCK_CACHE_TIME || 3600
  },
  aptosCfg:{
    hdPath            : `m/44'/637'/0'/0'/`,
  },
  dgtCfg:{
      name: 'dgt',
      network: process.env.DGT_NETWORK || 'testnet',
      contractOwnerPriv: process.env.DGT_CONTRACT_OWNER_PRIV || 'b5c03e290e78040b117c807f9389eb24b0a02f3005d98d901e9af63aee43ecb5',
      contractOwnerAddr: process.env.DGT_CONTRACT_OWNER_ADDR || '0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E',
      providerUrl: process.env.DGT_API_URL || 'https://api.baobab.klaytn.net:8651',
      dgtTokenAddress: process.env.DGT_TOKEN_ADDRESS || '0xee42Cf6E3E575b5aBC2B3Ae760BA1AF2c05791df',
      dgtWalletAddress: process.env.DGT_WALLET_ADDRESS || '0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E',
      dgtAdminAddress: process.env.DGT_ADMIN_ADDRESS || '0xF7FCCFc3DE0789362B5B998782992a27b12040c8',
      dgtAdminPriv: process.env.DGT_ADMIN_PRIV || '6ee44874d355c054c138a417c5a725cccf7353460892125e028e60ebc8c77129',
      dgtChallengeAddress: process.env.DGT_CHALLENGE_ADDRESS || '0x24F3F152Bfb4C6C14e7c09053eDef984C2Fc5709',
      gasPrice: process.env.DGT_GAS_PRICE
  },
  dgtPriceURL: process.env.DGT_PRICE_URL || "https://dgt-dbank-monitor-api.dgt-dbank-monitor-dev.vncdevs.com/hook/mt5_pricings/price?symbol=",
  tokenParams:{
    tokenAddress: process.env.DGT_TOKEN || '0x8Dc5B2Ccb8F325898832129e5507237268d561A8',
    owner    : process.env.DGT_TOKEN_OWNER || '0x90de83fd2cd4d01660cd6909692568a14661cdf1',
    gasPrice: 25000000000,
    gasLimit: 8500000,
  },
  vaultParams:{
    dgtVaultAddres: process.env.DGT_VAULT_ADDRESS || '0x304A3B0f093D25c98159F87621C2e72F528831a0',
    from: process.env.DGT_ADMIN_ADDRESS || '0x90de83fd2cd4d01660cd6909692568a14661cdf1',
    gasPrice: 25000000000,
    gasLimit: 8500000,
  },
  evmCfg:{
    name: 'klaytn',
    symbol            : 'KLAY',
    masterPubKey      : process.env.KLAYTN_MASTER_PUB_KEY,
    masterPrivKey     : process.env.KLAYTN_MASTER_PRIV_KEY,
    hdPath            : 'm/44/714/',
    network: process.env.KLAYTN_NETWORK || 'mainnet',
    chainId: parseInt(process.env.KLAYTN_CHAINID) || 8217, // 97 for testnet
    minConfirmation   : parseInt(process.env.KLAYTN_MIN_CONFIRMATION) || 20,
    networkId         : parseInt(process.env.KLAYTN_NETWORK_ID) || 97,
    rpcUrls           : process.env.KLAYTN_RPC_URLS,
    withdrawalAddr    : process.env.KLAYTN_WITHDRAWAL_ADDR,
    withdrawalPriv    : process.env.KLAYTN_WITHDRAWAL_PRIV,
    centralizeAddr    : process.env.KLAYTN_CENTRALIZE_ADDR,
    fees:{
      gasPrice: parseInt(process.env.KLAYTN_GAS_PRICE) || 10000000000,
      maxGasPrice: parseInt(process.env.KLAYTN_MAX_GAS_PRICE) || 150000000000,
      maxGasLimit     : parseInt(process.env.KLAYTN_ETH_GAS_LIMIT) || 21000,
      maxBep20GasLimit: parseInt(process.env.KLAYTN_MAX_ERC20_GAS_LIMIT) || 100000
    },
    gasTrackerApi     : process.env.KLAYTN_GAS_TRACKER_API || ``,
    gasTrackerKey     : process.env.KLAYTN_GAS_TRACKER_KEY || ``,
    maxDelayedBlock   : parseInt(process.env.KLAYTN_MAX_DELAYED_BLOCK) || 100,
    withdrawalDelay   : parseInt(process.env.KLAYTN_WITHDRAWAL_DELAY_SEC) || 2, // delay 2 second each transaction send from the withdrawal address
    centralizeDelay   : parseInt(process.env.KLAYTN_CENTRALIZE_DELAY_SEC) || 5, // not sure, have to check on mainnet
  },
  decimalCfg: parseInt(process.env.DECIMAL_CONFIG) || 8,
});
