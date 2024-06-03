/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-05-29 20:53:16
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-05-29 21:19:49
 * @FilePath: /defi_chainreward/contract/test/scripts/deploy.js
 * 部署脚本，可以直接在config中进行配置
 */
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("RCToken");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);

  const ChainReward = await ethers.getContractFactory("ChainReward");
  const chainReward = await ChainReward.deploy(token.address, 20);
  await chainReward.deployed();
  console.log("ChainReward deployed to:", chainReward.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
