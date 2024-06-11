/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 00:46:53
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-11 22:51:20
 * @FilePath: /defi_chainreward/frontend/my-app/src/contract/contracts/ContractChainReward.ts
 * @Description: ChainReward的调用接口
 */
import { Contract, ethers } from "ethers";
import ContractChainRewardABI from "../abi/contracts/ChainReward.sol/ChainReward.json";
import { contractData } from "../../data/ContractData";
import { ContractBase } from "./ContractBase";
import ContractRewardABI from "../abi/contracts/ChainReward.sol/ChainReward.json";

export class ContractChainReward extends ContractBase {
  // constructor(provider: ethers.providers.Provider | ethers.Signer) {
  //   const address = contractData.contractAddress.ChainReward;
  //   this.contract = new ethers.Contract(
  //     address,
  //     ContractChainRewardABI,
  //     provider
  //   );
  // }

  static create(): any {
    // return new ContractChainReward(provider);
    const address = contractData.contractAddress.ChainReward;
    const contract = new ContractChainReward(
      ContractRewardABI,
      address,
      "",
      ""
    );
    return contract;
  }

  async setFee(newFee: ethers.BigNumber): Promise<void> {
    const tx = await this.contract.setFee(newFee);
    await tx.wait();
  }

  async addToBlacklist(user: string): Promise<void> {
    const tx = await this.contract.addToBlacklist(user);
    await tx.wait();
  }

  async removeFromBlacklist(user: string): Promise<void> {
    const tx = await this.contract.removeFromBlacklist(user);
    await tx.wait();
  }

  async createBounty(
    reward: ethers.BigNumber,
    description: string,
    expiry: number
  ): Promise<void> {
    const tx = await this.contract.createBounty(reward, description, expiry);
    await tx.wait();
  }

  async adjustReward(
    bountyId: number,
    newReward: ethers.BigNumber
  ): Promise<void> {
    const tx = await this.contract.adjustReward(bountyId, newReward);
    await tx.wait();
  }

  async cancelBounty(bountyId: number): Promise<void> {
    const tx = await this.contract.cancelBounty(bountyId);
    await tx.wait();
  }

  async acceptBounty(bountyId: number): Promise<void> {
    const tx = await this.contract.acceptBounty(bountyId);
    await tx.wait();
  }

  async submitTaskResult(bountyId: number, result: string): Promise<void> {
    const tx = await this.contract.submitTaskResult(bountyId, result);
    await tx.wait();
  }

  async reviewTask(bountyId: number, approve: boolean): Promise<void> {
    const tx = await this.contract.reviewTask(bountyId, approve);
    await tx.wait();
  }

  async withdrawCollateral(bountyId: number): Promise<void> {
    const tx = await this.contract.withdrawCollateral(bountyId);
    await tx.wait();
  }

  async getBountyCount(): Promise<number> {
    return await this.contract.getBountyCount();
  }

  async getBounty(bountyId: number): Promise<any> {
    return await this.contract.getBounty(bountyId);
  }

  async getTask(bountyId: number): Promise<any> {
    return await this.contract.getTask(bountyId);
  }

  public registerEvents() {
    // TODO: Register events
  }
}
