/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:24:52
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 01:34:25
 * @FilePath: /defi_chainreward/frontend/my-app/src/plugins/Loading.ts
 * @Description:  Loading 用于在开始和结束时显示加载动画
 */
import { EventBus } from "./EventBus";
import { EventLoading } from "../events/EventLoading";

export class Loading {
  public static open(): any {
    EventBus.instance.emit(EventLoading.event, true);
  }

  public static close(): any {
    EventBus.instance.emit(EventLoading.event, false);
  }
}
