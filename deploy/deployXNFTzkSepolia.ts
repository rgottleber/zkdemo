import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { Wallet, Provider } from "zksync-ethers";

export default async function (hre: HardhatRuntimeEnvironment) {
    console.log("Running deploy script for XNFT contract");

    // Get private key from env
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
    if (!PRIVATE_KEY) {
        throw new Error("⛔️ Private key not detected! Add it to your .env file!");
    }

    // Initialize the wallet
    const provider = new Provider("https://sepolia.era.zksync.dev");
    const wallet = new Wallet(PRIVATE_KEY, provider);
    
    // Create deployer
    const deployer = new Deployer(hre, wallet);
    
    console.log(`Deployer address: ${deployer.zkWallet.address}`);

    const ccipRouterAddressZKSepolia = `0xA1fdA8aa9A8C4b945C45aD30647b01f07D7A0B16`;
    const linkTokenAddressZKSepolia = `0x23A1aFD896c8c8876AF46aDc38521f4432658d1e`;
    const chainIdZKSepolia = `6898391096552792247`;

    // Deploy the contract
    console.log("Deploying XNFT contract...");
    const artifact = await deployer.loadArtifact("XNFT");
    
    const xNft = await deployer.deploy(artifact, [
        ccipRouterAddressZKSepolia,
        linkTokenAddressZKSepolia,
        chainIdZKSepolia
    ]);

    // Show deployment info
    const address = await xNft.getAddress();
    console.log(`XNFT deployed to: ${address}`);

    // Verify the contract
    console.log('Verifying contract on zkSync Explorer...');
    await hre.run("verify:verify", {
        address: address,
        contract: "contracts/XNFT.sol:XNFT",
        constructorArguments: [
            ccipRouterAddressZKSepolia,
            linkTokenAddressZKSepolia,
            chainIdZKSepolia
        ],
    });

    console.log("Contract verified successfully!");
}