const hre  = require("hardhat");
require("dotenv").config({ path: ".env" });

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // URL from where we can extract the metadata for a LW3Punks

  // prior to this new version, we use gercontractfactory and call the contract, but now,
  // we just deploy straight calling out the contract
  const tokenContract = await hre.ethers.deployContract("Token", [])


  await tokenContract.waitForDeployment()

  // print the address of the deployed contract
  console.log("Verify Contract Address:", await tokenContract.getAddress());

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: tokenContract.target,
    constructorArguments: [],
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



