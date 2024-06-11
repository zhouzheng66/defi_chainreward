/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-11 23:23:35
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-11 23:24:02
 * @FilePath: /defiChainreward/frontend/web/src/events/EventWalletDisconnect.ts
 * @Description: 钱包disconnect
 */
import { walletData } from "../data/WalletData";
import { EventBase } from "./EventBase";

export class EventWalletDisconnect extends EventBase {
  public static readonly event: string = "logic.EventWalletDisconnect";

  public get subject(): string {
    return EventWalletDisconnect.event;
  }

  public async exec() {
    Promise.resolve();
  }
}
