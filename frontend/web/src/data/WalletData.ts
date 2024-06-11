/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:16:07
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-11 23:33:11
 * @FilePath: /defi_chainreward/frontend/my-app/src/data/WalletData.ts
 * @Description: 钱包数据
 */
import { ethers } from "ethers";
import { Singleton } from "../core/Singleton";
import { ChainID } from "../const/enum/Chain";
import { StringUtil } from "../core/utils/StringUtil";
import { EventBus } from "@/plugins/EventBus";
import { Toast } from "@/plugins/Toast";
import { IndexDB } from "@/plugins/indexDB";
import { EventWalletAccountChanged } from "@/events/EventWalletAccountChanged";
import { EventWalletChainChanged } from "@/events/EventWalletChainChanged";
import { EventWalletConnected } from "@/events/EventWalletConnected";
import { EventWalletDisconnect } from "@/events/EventWalletDisconnect";

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
  public get cacheKey(): string {
    return "DB:WalletData";
  }
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
  public get isAuth(): boolean {
    return !StringUtil.isEmpty(this.data.address);
  }
  public async isChainValid(): Promise<boolean> {
    if (!this.hasProvider) {
      return Promise.resolve(false);
    }
    const currentId = this.data.chainId;
    if (ChainIds.findIndex((id) => id === currentId) >= 0) {
      return Promise.resolve(true);
    }

    const chainId0x = await this.ethereum.request({
      method: "eth_chainId",
    });

    const chainId = parseInt(chainId0x, 16);
    const idx = ChainIds.findIndex((id) => id === chainId);
    return idx >= 0;
  }

  public async switchNetwork(chainId: number = ChainID.Scroll) {
    if (!this.provider) {
      Toast.error("there's no provider.");
      return Promise.resolve();
    }

    try {
      await this.provider.send("wallet_switchEthereumChain", [
        { chainId: `0x${chainId.toString(16)}` },
      ]);
    } catch (e) {
      Toast.error(`change network failed.`);
      console.error("change network", e);
    }
  }
  private async saveData() {
    await IndexDB.instance.addItem(this.cacheKey, {
      address: this.data.address,
      chainId: this.data.chainId,
    });
  }
  public async disconnect() {
    await this.ethereum.request({
      method: "wallet_revokePermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    this.data.address = "";
    this.data.chainId = -1;
    await IndexDB.instance.deleteItem(this.cacheKey);
    this.saveData();
    EventBus.instance.emit(EventWalletDisconnect.event);
  }
  public async changeAccount(account: string) {
    if (StringUtil.isEmpty(account)) {
      await this.disconnect();
    } else {
      this.data.address = account;
      this.saveData();
      EventBus.instance.emit(EventWalletAccountChanged.event, account);
    }
  }
  async getAccount(): Promise<string | null> {
    try {
      const accounts = await this.ethereum?.request({
        method: "eth_requestAccounts",
      });
      return accounts ? accounts[0] : null;
    } catch (error) {
      console.error("Error fetching account:", error);
      return null;
    }
  }

  async getBalance(address: string): Promise<string | null> {
    try {
      const balance = await this.ethereum?.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      return balance ? ethers.utils.formatEther(balance) : null;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
    }
  }
}
export const walletData: Readonly<WalletData> = WalletData.getInstance();
