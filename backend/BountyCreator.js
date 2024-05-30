import { ethers,JsonRpcProvider } from "ethers";
import fs from "fs";
// 创造悬赏
export async function createBounty(reward, fileURL, expiry) {
    try {

        const provider = new JsonRpcProvider("http://127.0.0.1:8545");
        const signer = await provider.getSigner(0); // 使用第一个账户作为签名者
        console.log(signer.address)
        //chainreward address
        const chainRewardAddress = "0xD0141E899a65C95a556fE2B27e5982A6DE7fDD7A";
        //erc20 address
        const erc20Address = "0x34B40BA116d5Dec75548a9e9A8f15411461E8c70";

        //erc20 abi
        const erc20Abi = JSON.parse(fs.readFileSync("./abis/erc20Abis.json"));
        //获取erc20合约实例
        const erc20Contract = new ethers.Contract(erc20Address, erc20Abi, signer);
        //调用approve方法
        const approveTx = await erc20Contract.approve(chainRewardAddress, reward);
        
        //chainreward abi
        const chainRewardAbi = JSON.parse(fs.readFileSync("./abis/chainRewardAbis.json"));
        //获取chainreward合约实例
        const contract = new ethers.Contract(chainRewardAddress, chainRewardAbi, signer);
        //调用createBounty方法
        const tx = await contract.createBounty(reward, fileURL, expiry);
        return tx;
    } catch (error) {
        console.error("Error creating bounty:", error);
        throw error;
    }
}
