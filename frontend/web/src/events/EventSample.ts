/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-11 23:26:00
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-11 23:26:16
 * @FilePath: /defiChainreward/frontend/web/src/events/EventSample.ts
 * @Description: 一个简单的事件
 */
import { EventBase } from "./EventBase";

export class EventSample extends EventBase {
  public static readonly event: string = "logic.EventSample";

  public get subject(): string {
    return EventSample.event;
  }
}
