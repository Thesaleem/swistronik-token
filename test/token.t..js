const {expect} = require("chai")
const hre = require("hardhat")
const {ethers} = require("hardhat")

describe("Verify Tokens", function() {
    it("Should be able to verify if address as 100 tokens in it or not", 
        async function () {
            // Get a test address
            // Hardhat returns owner's address in a test environment
            const [owner] = await ethers.getSigners();
            
            // Deploy the Whitelist Contract
            const Token = await hre.ethers.deployContract("Token", []);
            await Token.waitForDeployment();
            
            const ownerBalance = await Token.balanceOf(owner.address)
            console.log("Check Owner's Balance:", Number(BigInt(ownerBalance)));
            console.log("Check Total Supply", Number(BigInt( await Token.totalSupply())));


            
            expect(Number(BigInt(ownerBalance)) / 10 ** 18).to.equal(100);
        }
    )
})