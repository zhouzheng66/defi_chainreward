/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:28:21
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 02:27:52
 * @FilePath: /defi_chainreward/frontend/web/src/events/EventLoading.ts
 * @Description: 事件加载
 */
import { EventBase } from "./EventBase";

export class EventLoading extends EventBase {
  public static readonly event: string = "logic.GameEventLoading";

  public get subject(): string {
    return EventLoading.event;
  }
  // TODO
}
