import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ARBITRUM_SEPOLIA_RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC_URL;
const FUJI_RPC_URL = process.env.FUJI_RPC_URL;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
          version: '0.8.20',
          settings: {
              evmVersion: 'paris'
          }
      }
    ]
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIA_RPC_URL !== undefined ? ARBITRUM_SEPOLIA_RPC_URL : '',
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 421614
    },
    fuji: {
      url: FUJI_RPC_URL !== undefined ? FUJI_RPC_URL : '',
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 43113
    },
  }
};

export default config;