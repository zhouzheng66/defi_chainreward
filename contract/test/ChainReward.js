const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("ChainReward", function () {
  let Token, token, ChainReward, chainReward, owner, addr1, addr2;

  beforeEach(async function () {
    // 部署ERC20代币合约
    [owner, addr1, addr2, _] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("RCToken");
    token = await upgrades.deployProxy(Token);
    await token.deployed();

    // 部署ChainReward合约
    ChainReward = await ethers.getContractFactory("ChainReward");

    chainReward = await ChainReward.deploy(token.address, 0);
    await chainReward.deployed();

    // 给addr1和addr2分发一些代币
    // await token.transfer(addr1.address, ethers.utils.parseEther("1000"));
    // await token.transfer(addr2.address, ethers.utils.parseEther("1000"));
    amount = ethers.utils.parseEther("1000");
    await token.connect(owner).mint(addr1.address, amount);
    await token.connect(owner).mint(addr2.address, amount);
  });

  it("should create a bounty", async function () {
    const reward = ethers.utils.parseEther("100");
    console.log(reward);
    const expire = 180000000; // 1分钟后的时间戳
    console.log(expire);
    const describe = "这是一个测试任务";
    await token.connect(addr1).approve(chainReward.address, reward);
    await chainReward.connect(addr1).createBounty(reward, describe, expire);

    const bounty = await chainReward.getBounty(0);
    expect(bounty[0]).to.equal(addr1.address);
    expect(bounty[1]).to.equal(reward);
    expect(bounty[2]).to.equal(describe);
    expect(bounty[3]).to.be.true;
    expect(bounty[4]).to.be.false;
    expect(bounty[5]).to.be.equal(expire);
  });

  // it("should accept a bounty with collateral", async function () {
  //   const reward = ethers.utils.parseEther("100");
  //   const collateral = reward.div(10); // 10% collateral

  //   await token.connect(addr1).approve(chainReward.address, reward);
  //   await chainReward.connect(addr1).createBounty(reward);

  //   await token.connect(addr2).approve(chainReward.address, collateral);
  //   await chainReward.connect(addr2).acceptBounty(0);

  //   const task = await chainReward.getTaskDetails(0);
  //   expect(task[0]).to.equal(addr2.address);
  //   expect(task[1]).to.equal(collateral);
  //   expect(task[2]).to.be.false;
  // });

  // it("should submit and review task", async function () {
  //   const reward = ethers.utils.parseEther("100");
  //   const collateral = reward.div(10); // 10% collateral

  //   await token.connect(addr1).approve(chainReward.address, reward);
  //   await chainReward.connect(addr1).createBounty(reward);

  //   await token.connect(addr2).approve(chainReward.address, collateral);
  //   await chainReward.connect(addr2).acceptBounty(0);

  //   await chainReward.connect(addr2).submitTaskResult(0);

  //   let task = await chainReward.getTaskDetails(0);
  //   expect(task[2]).to.be.true; // Task submitted

  //   await chainReward.connect(owner).reviewTask(0, true);

  //   const bounty = await chainReward.getBountyDetails(0);
  //   expect(bounty[3]).to.be.true; // Bounty completed

  //   // 检查余额
  //   const finalBalance = await token.balanceOf(addr2.address);
  //   expect(finalBalance).to.equal(ethers.utils.parseEther("1100")); // 1000 initial + 100 reward
  // });

  // it("should blacklist a user", async function () {
  //   await chainReward.connect(owner).addToBlacklist(addr1.address);
  //   expect(await chainReward.blacklist(addr1.address)).to.be.true;

  //   await chainReward.connect(owner).removeFromBlacklist(addr1.address);
  //   expect(await chainReward.blacklist(addr1.address)).to.be.false;
  // });
});
