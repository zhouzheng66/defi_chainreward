/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:02:34
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 01:04:11
 * @FilePath: /defi_chainreward/frontend/my-app/src/core/utils/StringUtil.ts
 * @Description:  String 工具包
 */
export class StringUtil {
  static isEmpty(str: string | null | undefined) {
    return !str || str === "";
  }
  // 对字符串进行异或操作
  static xor(str: string, key: string): string {
    let res = "";
    for (let i = 0; i < str.length; i++) {
      res += String.fromCharCode(
        str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return res;
  }
  // 获取给定字符串的地址快照。如果字符串长度小于或等于16，则返回原始字符串。否则，返回字符串的前16个字符加上省略号（...）
  static getAddressSnapshot(str: string) {
    if (str.length <= 16) {
      return str;
    }
    return str.substring(0, 16) + "......";
  }
}
