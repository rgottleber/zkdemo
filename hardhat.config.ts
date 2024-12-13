import { HardhatUserConfig } from 'hardhat/config';
import '@matterlabs/hardhat-zksync-deploy';
import '@matterlabs/hardhat-zksync-solc';
import '@matterlabs/hardhat-zksync-verify';

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ARBITRUM_SEPOLIA_RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC_URL;
const FUJI_RPC_URL = process.env.FUJI_RPC_URL;

const config: HardhatUserConfig = {
  zksolc: {
    version: "1.5.8", // Latest version
    compilerSource: "binary",
    settings: {},
  },
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          evmVersion: 'paris'
        }
      }
    ]
  },
  networks: {
    hardhat: {
      chainId: 31337,
      zksync: false
    },
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIA_RPC_URL !== undefined ? ARBITRUM_SEPOLIA_RPC_URL : '',
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 421614,
      zksync: false,
    },
    fuji: {
      url: FUJI_RPC_URL !== undefined ? FUJI_RPC_URL : '',
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 43113,
      zksync: false,
    },
    zkSyncSepoliaTestnet: {
      url: 'https://sepolia.era.zksync.dev',
      ethNetwork: 'sepolia', // The network that zkSync is connected to
      zksync: true,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      verifyURL: 'https://explorer.sepolia.era.zksync.dev/contract_verification',
    },
  }
};

export default config;