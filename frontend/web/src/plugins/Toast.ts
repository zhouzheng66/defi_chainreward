/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:26:24
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 01:27:37
 * @FilePath: /defi_chainreward/frontend/my-app/src/plugins/Toast.ts
 * @Description: 用于在vue程序中显示和处理消息
 */
export class Toast {
  public static $app: any = null!;

  private static message(): any {
    return this.$app.config.globalProperties.$message;
  }

  static success(msg: string) {
    // @ts-ignore
    this.message().success(msg);
  }

  static error(msg: string) {
    // @ts-ignore
    this.message().error(msg);
  }

  static warn(msg: string) {
    // @ts-ignore
    this.message().warning(msg);
  }
}
