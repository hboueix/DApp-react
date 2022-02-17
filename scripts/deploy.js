// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  const PepiCoin = await hre.ethers.getContractFactory("PepiCoin");
  const pepicoin = await PepiCoin.deploy();

  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy("0xdd2fd4581271e230360230f9337d5c0430bf44c0", "0xbda5747bfd65f08deb54cb465eb87d40e51b197e");

  await greeter.deployed();
  await pepicoin.deployed();
  await staking.deployed();

  console.log("Greeter deployed to:", greeter.address);
  console.log("PepiCoin deployed to:", pepicoin.address);
  console.log("Staking deployed to:", staking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
