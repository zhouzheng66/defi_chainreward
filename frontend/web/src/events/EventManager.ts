/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:57:25
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 02:20:04
 * @FilePath: /defi_chainreward/frontend/web/src/events/EventManager.ts
 * @Description: 时间管理
 */
import { EventBus } from "../plugins/EventBus";
import { Singleton } from "../core/Singleton";
export class EventManager extends Singleton {
  public initialize() {
    this.initAsyncEventListeners();
  }
  private initAsyncEventListeners() {
    this.addListeners([]);
  }
  public addListeners(listeners: any[]) {
    listeners.forEach((listener) => this.addListener(listener));
  }
  public addListener(listener: any) {
    EventBus.instance.on(
      listener.subject,
      async (
        args1: any,
        args2: any,
        args3: any,
        args4: any,
        args5: any,
        args6: any
      ) => {
        await listener.execAsync(args1, args2, args3, args4, args5, args6);
      }
    );
  }
}
