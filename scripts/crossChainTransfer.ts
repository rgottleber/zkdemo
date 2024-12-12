// scripts/crossChainTransfer.ts

import { ethers, network } from "hardhat";
import { Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `fuji`) {
    console.error(`Must be called from Arbitrum Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.FUJI_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressFuji = `0xAC91DbC7cf20e00810803647f53b2bF7afa22C47`;
  
  const from = `0xeA3977eCC954a820cc709f6Edf8b467FDbe085A9`;
  const to = `0xeA3977eCC954a820cc709f6Edf8b467FDbe085A9`;
  const tokenId = 0; // put NFT token id here
  const destinationChainSelector = `3478487238524512106`;
  const payFeesIn = 1; // 0 - Native, 1 - LINK

  const xNft: XNFT = XNFT__factory.connect(xNftAddressFuji, signer);

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