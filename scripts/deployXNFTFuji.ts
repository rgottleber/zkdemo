// deployXNFTFuji.ts

import { network } from "hardhat";
import { ethers } from "ethers";

async function main() {
    const ccipRouterAddressFuji = `0xF694E193200268f9a4868e4Aa017A0118C9a8177`;
    const linkTokenAddressFuji = `0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846`;
    const chainIdFuji = `14767482510784806043`;

    const xNft = await ethers.deployContract("XNFT", [
        ccipRouterAddressFuji,
        linkTokenAddressFuji,
        chainIdFuji
    ]);

    await xNft.waitForDeployment();

    console.log(`XNFT deployed on ${network.name} with address ${xNft.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});