const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ChainReward", function () {
  let fUSDT, chainReward, owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // 部署fUSDT合约
    const fUSDTContract = await ethers.getContractFactory("fUSDT");
    fUSDT = await fUSDTContract.deploy();
    await fUSDT.deployed();

    // 分发一些fUSDT给用户
    await fUSDT.connect(owner).transfer(user1.address, ethers.utils.parseUnits("1000", 18));
    await fUSDT.connect(owner).transfer(user2.address, ethers.utils.parseUnits("1000", 18));

    // 部署ChainReward合约
    const ChainReward = await ethers.getContractFactory("ChainReward");
    chainReward = await ChainReward.deploy(fUSDT.address, ethers.utils.parseUnits("10", 18));
    await chainReward.deployed();
  });

  describe("Admin functions", function () {
    it("Should set fee by admin", async function () {
      await chainReward.setFee(ethers.utils.parseUnits("5", 18));
      expect(await chainReward.fee()).to.equal(ethers.utils.parseUnits("5", 18));
    });

    it("Should add to and remove from blacklist by admin", async function () {
      await chainReward.addToBlacklist(user1.address);
      expect(await chainReward.blacklist(user1.address)).to.be.true;

      await chainReward.removeFromBlacklist(user1.address);
      expect(await chainReward.blacklist(user1.address)).to.be.false;
    });
  });

  describe("Issuer functions", function () {
    it("Should create a bounty", async function () {
      const reward = ethers.utils.parseUnits("100", 18);
      const fee = ethers.utils.parseUnits("10", 18);
      const description = "ipfs_hash";
      const expiry = Math.floor(Date.now() / 1000) + 3600;

      await fUSDT.connect(user1).approve(chainReward.address, reward.add(fee));
      await chainReward.connect(user1).createBounty(reward, description, expiry);

      const bounty = await chainReward.getBounty(0);
      expect(bounty.issuer).to.equal(user1.address);
      expect(bounty.reward).to.equal(reward.sub(fee));
    });

    it("Should adjust a bounty reward", async function () {
      // Create a bounty first
      const reward = ethers.utils.parseUnits("100", 18);
      const fee = ethers.utils.parseUnits("10", 18);
      const description = "ipfs_hash";
      const expiry = Math.floor(Date.now() / 1000) + 3600;

      await fUSDT.connect(user1).approve(chainReward.address, reward.add(fee));
      await chainReward.connect(user1).createBounty(reward, description, expiry);

      // Adjust the reward
      const newReward = ethers.utils.parseUnits("150", 18);
      await chainReward.connect(user1).adjustReward(0, newReward);

      const bounty = await chainReward.getBounty(0);
      expect(bounty.reward).to.equal(newReward);
    });

    it("Should cancel a bounty", async function () {
      // Create a bounty first
      const reward = ethers.utils.parseUnits("100", 18);
      const fee = ethers.utils.parseUnits("10", 18);
      const description = "ipfs_hash";
      const expiry = Math.floor(Date.now() / 1000) + 3600;

      await fUSDT.connect(user1).approve(chainReward.address, reward.add(fee));
      await chainReward.connect(user1).createBounty(reward, description, expiry);

      // Cancel the bounty
      await chainReward.connect(user1).cancelBounty(0);

      const bounty = await chainReward.getBounty(0);
      expect(bounty.isActive).to.be.false;
    });
  });

  describe("Acceptor functions", function () {
    it("Should accept a bounty", async function () {
      // Create a bounty first
      const reward = ethers.utils.parseUnits("100", 18);
      const fee = ethers.utils.parseUnits("10", 18);
      const description = "ipfs_hash";
      const expiry = Math.floor(Date.now() / 1000) + 3600;

      await fUSDT.connect(user1).approve(chainReward.address, reward.add(fee));
      await chainReward.connect(user1).createBounty(reward, description, expiry);

      // Accept the bounty
      const collateral = ethers.utils.parseUnits("9", 18); // 10% of reward - fee
      await fUSDT.connect(user2).approve(chainReward.address, collateral);
      await chainReward.connect(user2).acceptBounty(0);

      const task = await chainReward.getTask(0);
      expect(task.acceptor).to.equal(user2.address);
      expect(task.collateral).to.equal(collateral);
    });

    it("Should submit a task result", async function () {
      // Create and accept a bounty first
      const reward = ethers.utils.parseUnits("100", 18);
      const fee = ethers.utils.parseUnits("10", 18);
      const description = "ipfs_hash";
      const expiry = Math.floor(Date.now() / 1000) + 3600;

      await fUSDT.connect(user1).approve(chainReward.address, reward.add(fee));
      await chainReward.connect(user1).createBounty(reward, description, expiry);

      const collateral = ethers.utils.parseUnits("9", 18); // 10% of reward - fee
      await fUSDT.connect(user2).approve(chainReward.address, collateral);
      await chainReward.connect(user2).acceptBounty(0);

      // Submit the task result
      const result = "result_ipfs_hash";
      await chainReward.connect(user2).submitTaskResult(0, result);

      const task = await chainReward.getTask(0);
      expect(task.result).to.equal(result);
      expect(task.isSubmitted).to.be.true;
    });
  });

  describe("Review and withdrawal functions", function () {
    it("Should review and approve a task result", async function () {
      // Create, accept, and submit a task first
      const reward = ethers.utils.parseUnits("100", 18);
      const fee = ethers.utils.parseUnits("10", 18);
      const description = "ipfs_hash";
      const expiry = Math.floor(Date.now() / 1000) + 3600;

      await fUSDT.connect(user1).approve(chainReward.address, reward.add(fee));
      await chainReward.connect(user1).createBounty(reward, description, expiry);

      const collateral = ethers.utils.parseUnits("9", 18); // 10% of reward - fee
      await fUSDT.connect(user2).approve(chainReward.address, collateral);
      await chainReward.connect(user2).acceptBounty(0);

      const result = "result_ipfs_hash";
      await chainReward.connect(user2).submitTaskResult(0, result);

      // Review and approve the task
      await chainReward.reviewTask(0, true);

      const bounty = await chainReward.getBounty(0);
      expect(bounty.isCompleted).to.be.true;
    });

    it("Should allow acceptor to withdraw collateral after completion", async function () {
      // Create, accept, submit, and approve a task first
      const reward = ethers.utils.parseUnits("100", 18);
      const fee = ethers.utils.parseUnits("10", 18);
      const description = "ipfs_hash";
      const expiry = Math.floor(Date.now() / 1000) + 3600;

      await fUSDT.connect(user1).approve(chainReward.address, reward.add(fee));
      await chainReward.connect(user1).createBounty(reward, description, expiry);

      const collateral = ethers.utils.parseUnits("9", 18); // 10% of reward - fee
      await fUSDT.connect(user2).approve(chainReward.address, collateral);
      await chainReward.connect(user2).acceptBounty(0);

      const result = "result_ipfs_hash";
      await chainReward.connect(user2).submitTaskResult(0, result);

      await chainReward.reviewTask(0, true);

      // Withdraw collateral
      const balanceBefore = await fUSDT.balanceOf(user2.address);
      await chainReward.connect(user2).withdrawCollateral(0);
      const balanceAfter = await fUSDT.balanceOf(user2.address);

      expect(balanceAfter.sub(balanceBefore)).to.equal(collateral);
    });
  });
});
