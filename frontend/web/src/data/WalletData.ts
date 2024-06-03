/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:16:07
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 02:22:59
 * @FilePath: /defi_chainreward/frontend/my-app/src/data/WalletData.ts
 * @Description: 钱包数据
 */
import { ethers } from "ethers";
import { Singleton } from "../core/Singleton";
import { ChainID } from "../const/enum/Chain";
import { StringUtil } from "../core/utils/StringUtil";
interface WalletCache {
  address: string;
  chainId: number;
}

const ChainIds = Object.keys(ChainID)
  .filter((key) => !isNaN(Number(ChainID[key as keyof typeof ChainID])))
  .map((key) => ChainID[key as keyof typeof ChainID]);

export class WalletData extends Singleton {
  private _provider: any = null;
  private data: WalletCache = {
    address: "",
    chainId: -1,
  };
  public get ethereum(): any {
    //@ts-ignore
    return window?.ethereum;
  }
  public get chainId(): number {
    return this.data.chainId;
  }
  public get provider(): any {
    if (!this._provider && this.hasProvider) {
      this._provider = new ethers.providers.Web3Provider(this.ethereum);
    }
    return this._provider;
  }
  public get hasProvider(): boolean {
    return this.ethereum !== undefined && this.ethereum !== null;
  }
  public get address(): string {
    if (StringUtil.isEmpty(this.data.address)) {
      return this.data.address;
    }
    return ethers.utils.getAddress(this.data.address);
  }
}
export const walletData: Readonly<WalletData> = WalletData.getInstance();
