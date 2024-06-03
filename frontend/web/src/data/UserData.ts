/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 02:01:12
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 02:18:48
 * @FilePath: /defi_chainreward/frontend/web/src/data/UserData.ts
 * @Description: 用户data类
 */
import { Singleton } from "../core/Singleton";
import { UserDTO } from "./dto/UserDTO";
import { ethers } from "ethers";
export class UserData extends Singleton {
  private _userMap: Map<string, UserDTO | null> = new Map();
  async getUserData(address: string, refersh = false): Promise<UserDTO | null> {
    let userDTO: UserDTO | null = null;
    const addr = ethers.utils.getAddress(address);
    if (!refersh) {
      userDTO = this._userMap.get(addr) ?? null;
    }
    if (userDTO) {
      return userDTO;
    }
    // TODO
    return null;
  }
}
export const userData: Readonly<UserData> = UserData.getInstance();
