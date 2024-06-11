/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-06 16:58:42
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-06 17:10:20
 * @FilePath: /defi_chainreward/frontend/web/src/events/EventModelOpen.ts
 * @Description: 处理静态框打开事件
 */
import { EventBase } from "./EventBase";

export class EventModalOpen extends EventBase {
  public static readonly event: string = "logic.EventModalOpen";

  public get subject(): string {
    return EventModalOpen.event;
  }
}
