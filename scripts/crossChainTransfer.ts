// scripts/crossChainTransfer.ts

import { network } from "hardhat";
import { ethers, Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `zkSyncSepoliaTestnet`) {
    console.error(`Must be called from ZKsync Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.ZKSYNC_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressZKSync = `0x128A98fc6115923Efb448E299CD4c42eB635B676`;
  
  const from = `0xeA3977eCC954a820cc709f6Edf8b467FDbe085A9`;
  const to = `0xeA3977eCC954a820cc709f6Edf8b467FDbe085A9`;
  const tokenId = 1; // put NFT token id here
  const destinationChainSelector = `16015286601757825753`;
  const payFeesIn = 1; // 0 - Native, 1 - LINK

  const xNft: XNFT = XNFT__factory.connect(xNftAddressZKSync, signer);

  const tx = await xNft.crossChainTransferFrom(
      from,
      to,
      tokenId,
      destinationChainSelector,
      payFeesIn
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});