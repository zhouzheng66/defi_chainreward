/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-11 23:24:11
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-11 23:24:57
 * @FilePath: /defiChainreward/frontend/web/src/events/EventWalletChainChanged.ts
 * @Description: 切换链
 */
import { walletData } from "../data/WalletData";
import { EventBase } from "./EventBase";

export class EventWalletChainChanged extends EventBase {
  public static readonly event: string = "logic.EventWalletChainChanged";

  public get subject(): string {
    return EventWalletChainChanged.event;
  }

  public async exec(chainId: number) {
    Promise.resolve();
  }
}
