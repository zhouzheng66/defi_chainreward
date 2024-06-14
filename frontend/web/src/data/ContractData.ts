/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 00:51:04
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 12:44:10
 * @FilePath: /defi_chainreward/frontend/my-app/src/contract/data/ContractData.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  CONTRACT_ADDRESS_SEPOLIATEST,
  CONTRACT_ADDRESS_MUMBAI,
  CONTRACT_ADDRESS_SCROLL,
  IContractAddress,
} from "../const/Contract";
import { ChainID } from "../const/enum/Chain";
import { Singleton } from "../core/Singleton";
import { walletData } from "./WalletData";
import { ContractChainReward } from "../contract/contracts/ContractChainReward";
import { ContractRCToken } from "../contract/contracts/ContractRCToken";
export class ContractData extends Singleton {
  private _chainRewardContractIns: any;
  private _rcTokenContractIns: any;

  public get chainRewardContract(): any {
    if (!this._chainRewardContractIns) {
      this._chainRewardContractIns = ContractChainReward.create();
    }
    return this._chainRewardContractIns;
  }
  public get contractAddress(): IContractAddress {
    if (walletData.chainId === ChainID.Mumbai) {
      return CONTRACT_ADDRESS_MUMBAI;
    } else if (walletData.chainId === ChainID.Scroll) {
      return CONTRACT_ADDRESS_SCROLL;
    }
    return CONTRACT_ADDRESS_MUMBAI;
  }
  public get rcTokenContract(): any {
    if (this._rcTokenContractIns) {
      this._rcTokenContractIns = ContractRCToken.create();
    }
    return this._rcTokenContractIns;
  }
  public clearAllContracts() {
    this._chainRewardContractIns = null;
  }
  init() {}
}
export const contractData: Readonly<ContractData> = ContractData.getInstance();
