/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-11 22:24:43
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-11 22:26:22
 * @FilePath: /defiChainreward/frontend/web/src/plugins/DialogModal.ts
 * @Description: 义了一个名为 DialogModal 的类，用于处理游戏中的对话框。
 */
import { EventModalOpen } from "../events/EventModalOpen";
import { EventBus } from "./EventBus";

export class DialogModal {
  static open(desc: string, callback: Function, title = "") {
    EventBus.instance.emit(EventModalOpen.event, true, title, desc, callback);
  }

  static close() {
    EventBus.instance.emit(EventModalOpen.event, false, "", "", null);
  }
}
