/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 02:01:12
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 12:53:57
 * @FilePath: /defi_chainreward/frontend/web/src/data/UserData.ts
 * @Description: 用户data类
 */
import { Singleton } from "../core/Singleton";
import { UserDTO } from "./dto/UserDTO";
import { ethers } from "ethers";
import { IndexDB } from "@/plugins/indexDB";
export class UserData extends Singleton {
  private _userMap: Map<string, UserDTO | null> = new Map();
  public get cacheKey(): string {
    return "DB:ProfileData";
  }
  async loadData() {
    const data = await IndexDB.instance.getItem(this.cacheKey);
    if (data) {
      console.log(data);
    }
  }
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
  async init() {
    await this.loadData();
  }
}
export const userData: Readonly<UserData> = UserData.getInstance();
