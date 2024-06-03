/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-05-23 13:54:10
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-05-23 16:45:52
 * @FilePath: /defi_chainreward/contract/test/tokens/RCToken.test.ts
 * @Description: 测试示例文件
 */
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("RCToken", function () {
  let contract: Contract;

  beforeEach(async function () {
    const Token = await ethers.getContractFactory("RCToken");
    contract = await upgrades.deployProxy(Token);
    await contract.deployed();
  });
  it("RCToken test", async () => {
    expect(contract).to.be.instanceOf(Contract);
    expect(await contract.name()).to.equal("RewardChainToken");
    expect(await contract.symbol()).to.equal("RCT");
  });

  it("shoule get Role to Mint", async () => {
    const [owner, add1, add2] = await ethers.getSigners();
    await contract.mint(owner.address, 100);
    expect(await contract.balanceOf(owner.address)).to.equal(100);
    const revertedWith = `AccessControl: account ${ethers.utils
      .getAddress(add1.address)
      .toLowerCase()} is missing role ${ethers.utils.id("MINTER_ROLE")}`;
    await expect(
      contract.connect(add1).mint(add1.address, 100)
    ).to.be.revertedWith(revertedWith);

    await contract.grantRole(ethers.utils.id("MINTER_ROLE"), add1.address);
    await contract.mint(add1.address, 100);
    expect(await contract.balanceOf(add1.address)).to.equal(100);
    ``;

    await contract.revokeRole(ethers.utils.id("MINTER_ROLE"), add1.address);
    await expect(
      contract.connect(add1).mint(add1.address, 100)
    ).to.be.revertedWith(revertedWith);
  });
});
