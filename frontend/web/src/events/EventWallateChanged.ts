/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:14:40
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 02:27:37
 * @FilePath: /defi_chainreward/frontend/my-app/src/events/EventWallateChanged.ts
 * @Description: 钱包改变时间
 */
import { walletData } from "../data/WalletData";
import { EventBase } from "./EventBase";

export class GameEventWalletAccountChanged extends EventBase {
  public static readonly event: string =
    "game.logic.GameEventWalletAccountChanged";

  public get subject(): string {
    return GameEventWalletAccountChanged.event;
  }

  public async exec(account: string) {
    Promise.resolve();
  }
  // TODO
}
