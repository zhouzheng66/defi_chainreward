/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-12 23:55:34
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-12 23:57:43
 * @FilePath: /defiChainreward/frontend/web/src/contract/contracts/ContractRCToken.ts
 * @Description: RCtoken的调用接口文档
 */
import { ContractBase } from "./ContractBase";
import ContractLLTTokenABI from "../abi/contracts/tokens/RCTToken.sol/RCToken.json";
import { contractData } from "../../data/ContractData";
import { ethers } from "ethers";
import { userData } from "../../data/UserData";

export class ContractRCToken extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.RCToken;
    const contract = new ContractRCToken(ContractLLTTokenABI, address, "", "");
    return contract.createContract();
  }

  async balanceOf(address: string): Promise<string> {
    return await this.contract.balanceOf(address);
  }

  async balanceOf6551(address: string) {
    const player = await userData.getUserData(address);
    if (!player) {
      return "0";
    }
  }

  public registerEvents() {
    // TODO
  }
}
