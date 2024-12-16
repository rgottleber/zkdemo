// scripts/enableChain.ts

import { network } from "hardhat";
import { ethers, Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `zkSyncSepoliaTestnet`) {
    console.error(`Must be called from zkSync Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.ZKSYNC_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressZKsync = `0x128A98fc6115923Efb448E299CD4c42eB635B676`;
  const xNftAddressSepolia = `0x85928Ef6C186cdf7b2EcAb43D50144Fd0842f22c`;
  const chainSelectorSepolia = `16015286601757825753`;
  const ccipExtraArgs = `0x97a657c90000000000000000000000000000000000000000000000000000000000030d40`;

  const xNft: XNFT = XNFT__factory.connect(xNftAddressZKsync, signer);

  const tx = await xNft.enableChain(
      chainSelectorSepolia,
      xNftAddressSepolia,
      ccipExtraArgs
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});