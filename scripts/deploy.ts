import { ethers } from 'hardhat';

async function main() {
  const Greeter = await ethers.getContractFactory('GiftCard');
  const greeter = await Greeter.deploy();

  await greeter.deployed();

  console.log('GiftCard deployed to:', greeter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
