/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 00:39:15
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 01:29:12
 * @FilePath: /defi_chainreward/frontend/my-app/src/events/EventBase.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 00:39:15
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 01:23:17
 * @FilePath: /defi_chainreward/frontend/my-app/src/contract/contracts/events/BaseEvent.ts
 * @Description: 事件的基类
 */
import { EventBus } from "../plugins/EventBus";
import { walletData } from "../data/WalletData";
import { Loading } from "../plugins/Loading";

export abstract class EventBase {
  public static readonly event: string = "core.game.event.base";
  public static get eventAsync(): string {
    return `${this.event}_await`;
  }

  public get subject(): string {
    console.error("not implement", this.subject);
    return EventBase.event;
  }

  public async exec(
    eventData: any,
    arg2?: any,
    arg3?: any,
    arg4?: any,
    arg5?: any
  ) {}

  public async execAsync(
    eventData: any,
    arg2?: any,
    arg3?: any,
    arg4?: any,
    arg5?: any
  ) {
    try {
      await this.exec(eventData, arg2, arg3, arg4, arg5);
      EventBus.instance.emit(
        `${this.subject}_await`,
        eventData,
        arg2,
        arg3,
        arg4,
        arg5
      );
    } catch (e) {
      console.error("reject event", this.subject, e);
    }
  }
}
