// scripts/enableChainArbitrum.ts

import { ethers, network } from "hardhat";
import { Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `arbitrumSepolia`) {
    console.error(`Must be called from Arbitrum Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.ARBITRUM_SEPOLIA_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressArbitrumSepolia = `0xB92F4a8e3e42b594a7fC0A756256352c6563855f`;
  const xNftAddressFuji = `0xAC91DbC7cf20e00810803647f53b2bF7afa22C47`;
  const chainSelectorFuji = `14767482510784806043`;
  const ccipExtraArgs = `0x97a657c90000000000000000000000000000000000000000000000000000000000030d40`;

  const xNft: XNFT = XNFT__factory.connect(xNftAddressArbitrumSepolia, signer);

  const tx = await xNft.enableChain(
      chainSelectorFuji,
      xNftAddressFuji,
      ccipExtraArgs
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});