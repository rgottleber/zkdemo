import { ethers, network } from "hardhat";


async function main() {
    // First check if we're on the right network
    if (network.name !== 'fuji') {
        throw new Error('Must be run on Fuji network');
    }

    console.log("Deploying XNFT contract to Fuji...");

    // Get the deployer's signer
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Check deployer balance
    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "AVAX");

    const ccipRouterAddressFuji = "0xF694E193200268f9a4868e4Aa017A0118C9a8177";
    const linkTokenAddressFuji = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";
    const chainIdFuji = "14767482510784806043";

    // Get the contract factory
    const XNFT = await hre.ethers.getContractFactory("XNFT");
    
    console.log("Starting deployment...");
    const xNft = await XNFT.deploy(
        ccipRouterAddressFuji,
        linkTokenAddressFuji,
        chainIdFuji
    );

    console.log("Waiting for deployment...");
    await xNft.waitForDeployment();

    const deployedAddress = await xNft.getAddress();
    console.log(`XNFT deployed on ${network.name} at address: ${deployedAddress}`);
    
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });