// scripts/enableChain.ts

import { ethers, network } from "hardhat";
import { Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `fuji`) {
    console.error(`Must be called from Ethereum Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.FUJI_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressFuji = `0xAC91DbC7cf20e00810803647f53b2bF7afa22C47`;
  const xNftAddressArbitrumSepolia = `0xB92F4a8e3e42b594a7fC0A756256352c6563855f`;
  const chainSelectorArbitrumSepolia = `3478487238524512106`;
  const ccipExtraArgs = `0x97a657c90000000000000000000000000000000000000000000000000000000000030d40`;

  const xNft: XNFT = XNFT__factory.connect(xNftAddressFuji, signer);

  const tx = await xNft.enableChain(
      chainSelectorArbitrumSepolia,
      xNftAddressArbitrumSepolia,
      ccipExtraArgs
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});