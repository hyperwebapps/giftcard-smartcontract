import "dotenv/config";
import { expect } from "chai";
import { ethers } from "hardhat";

const appleHash: string = process.env.APPLE_HASH || "";
const greencardHash: string = process.env.GREENCARD_HASH || "";
const googleHash: string = process.env.GOOGLE_HASH || "";
const ottoHash: string = process.env.OTTO_HASH || "";
const robloxHash: string = process.env.ROBLOX_HASH || "";

describe("GiftCard Story #1", function () {
  let contractAddress: string = "";
  let counter = 0;

  this.beforeAll(async () => {
    const GiftCard = await ethers.getContractFactory("GiftCard");
    const contract = await GiftCard.deploy();
    await contract.deployed();

    contractAddress = contract.address;
    console.log(contractAddress);
  });

  it("add apple gift card", async () => {
    const contract = await ethers.getContractAt("GiftCard", contractAddress);
    const tx = await contract.functions.addCard(appleHash, 30, counter);
    await tx.wait();
    expect(await contract.cardSize()).to.equal(1);
    counter++;
  });

  it("add greencard gift card", async () => {
    const contract = await ethers.getContractAt("GiftCard", contractAddress);
    const tx = await contract.functions.addCard(greencardHash, 30, counter);
    await tx.wait();
    expect(await contract.cardSize()).to.equal(2);
    counter++;
  });

  it("add google gift card", async () => {
    const contract = await ethers.getContractAt("GiftCard", contractAddress);
    const tx = await contract.functions.addCard(googleHash, 30, counter);
    await tx.wait();
    expect(await contract.cardSize()).to.equal(3);
    counter++;
  });

  it("add otto gift card", async () => {
    const contract = await ethers.getContractAt("GiftCard", contractAddress);
    const tx = await contract.functions.addCard(ottoHash, 30, counter);
    await tx.wait();
    expect(await contract.cardSize()).to.equal(4);
    counter++;
  });

  it("add roblox gift card", async () => {
    const contract = await ethers.getContractAt("GiftCard", contractAddress);
    const tx = await contract.functions.addCard(robloxHash, 30, counter);
    await tx.wait();
    expect(await contract.cardSize()).to.equal(5);
    counter++;
  });
});
