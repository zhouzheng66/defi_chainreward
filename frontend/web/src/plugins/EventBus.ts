/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:34:59
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 01:35:02
 * @FilePath: /defi_chainreward/frontend/web/src/plugins/EventBus.ts
 * @Description: 该类使用eventemitter3库来处理事件总线。

EventBus类有一个静态的instance属性，用于获取事件总线的实例。如果还没有创建实例，那么就创建一个新的实例并返回。

EventBus类还有一个eventEmitter属性，用于处理事件。如果还没有创建eventEmitter实例，那么就创建一个新的实例并返回。

EventBus类还有一个emit方法，用于向事件总线发送事件。它会将事件名称和参数传递给eventEmitter实例。

EventBus类还有一个on方法，用于监听事件。它会将事件名称和回调函数传递给eventEmitter实例。

EventBus类还有一个off方法，用于取消监听事件。它会将事件名称和回调函数传递给eventEmitter实例。
 */
import EventEmitter from "eventemitter3";

export class EventBus {
  private static _instance: EventBus;
  static get instance(): EventBus {
    if (!this._instance) {
      this._instance = new EventBus();
    }
    return this._instance;
  }

  private _eventEmitter: EventEmitter | null = null;

  private get eventEmitter(): EventEmitter {
    if (!this._eventEmitter) {
      this._eventEmitter = new EventEmitter();
    }
    return this._eventEmitter;
  }

  public emit(event: string, ...args: any[]): void {
    this.eventEmitter.emit(event, ...args);
  }

  public on(event: string, listener: (...args: any[]) => void): void {
    this.eventEmitter.on(event, listener);
  }

  public off(event: string, listener: (...args: any[]) => void): void {
    this.eventEmitter.off(event, listener);
  }
}
