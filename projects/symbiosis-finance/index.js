const sdk = require('@defillama/sdk');

const indexToAsset = require("./abi/indexToAsset.json");
const BigNumber = require("bignumber.js");

const config = {
  pool: {
    chain: 'boba_bnb',
    address: '0x6148FD6C649866596C3d8a971fC313E5eCE84882',
    decimals: 18
  },
  stables: [
    {
      chain: 'ethereum',
      synthIndex: '0',
      original: 'ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    },
    {
      chain: 'bsc',
      synthIndex: 1,
      original: 'bsc:0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
    },
    {
      chain: 'avax',
      synthIndex: 2,
      original: 'avax:0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', // USDC.e
    },
    {
      chain: 'polygon',
      synthIndex: 3,
      original: 'polygon:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
    },
    {
      chain: 'telos',
      synthIndex: 8,
      original: 'telos:0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b', // USDC
    },
    {
      chain: 'boba',
      synthIndex: 5,
      original: 'boba:0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc', // USDC
    },
    {
      chain: 'boba_avax',
      synthIndex: 7,
      original: 'avax:0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // USDC
    },
    {
      chain: 'boba_bnb',
      synthIndex: 4,
      original: 'bsc:0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
    },
  ]
}

module.exports = {
  methodology: 'Counts the amount of locked assets in multi-stable pool',
};

config.stables.forEach(stable => {
  const {chain, synthIndex, original} = stable
  module.exports[chain] = {
    tvl: async () => {
      const {output: asset} = await sdk.api.abi.call({
        target: config.pool.address,
        chain: config.pool.chain,
        abi: indexToAsset,
        params: [synthIndex]
      })

      const delimiter = new BigNumber(10).pow(config.pool.decimals)
      const multiplier = new BigNumber(10).pow(asset.decimals)
      const balance = new BigNumber(asset.cash)
        .dividedBy(delimiter)
        .multipliedBy(multiplier)
        .toString();

      return {[original]: balance}
    }
  }
})
