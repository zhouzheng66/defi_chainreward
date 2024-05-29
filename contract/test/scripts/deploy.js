async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Token = await ethers.getContractFactory("YourERC20Token");
    const token = await Token.deploy();
    await token.deployed();
    console.log("Token deployed to:", token.address);

    const ChainReward = await ethers.getContractFactory("ChainReward");
    const chainReward = await ChainReward.deploy(token.address);
    await chainReward.deployed();
    console.log("ChainReward deployed to:", chainReward.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
