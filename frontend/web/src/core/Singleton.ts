/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:00:29
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 01:02:02
 * @FilePath: /defi_chainreward/frontend/my-app/src/core/Singleton.ts
 * @Description: 用来创造单例模式，确保每一个类只有一个实力，并提供一个全局访问点来访问该实例
 */
export class Singleton {
  public static getInstance(): any {
    let Class: any = this;
    if (!Class._Instance) {
      Class._Instance = new Class();
      if (Class._Instance.initialize) {
        Class._Instance.initialize();
      }
    }
    return Class._Instance;
  }
}
