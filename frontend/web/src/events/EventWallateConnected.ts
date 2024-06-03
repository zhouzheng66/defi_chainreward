/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 02:00:19
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 02:00:53
 * @FilePath: /defi_chainreward/frontend/web/src/events/EventWallateConnect.ts
 * @Description: 链接钱包事件
 */
import { userData } from "../data/UserData";
import { EventBase } from "./EventBase";
import { Loading } from "../plugins/Loading";

export class GameEventWalletConnected extends EventBase {
  public static readonly event: string = "logic.GameEventWalletConnected";

  public get subject(): string {
    return GameEventWalletConnected.event;
  }

  public async exec(address: string) {
    Loading.open();
    await userData.getUserData(address, true);
    Loading.close();
  }
}
