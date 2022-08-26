import { ethers } from "hardhat";

async function main() {
  const GiftCard = await ethers.getContractFactory("GiftCard");
  const contract = await GiftCard.deploy();

  await contract.deployed();

  console.log("GiftCard deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
