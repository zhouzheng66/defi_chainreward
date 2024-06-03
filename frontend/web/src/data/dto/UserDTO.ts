/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 02:06:33
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 02:06:45
 * @FilePath: /defi_chainreward/frontend/web/src/data/dto/UserDTO.ts
 * @Description: 定义用户的传输对象
 */
import { BigNumber, ethers } from "ethers";
import { BaseDTO } from "./BaseDTO";

export class UserDTO extends BaseDTO {
  address: string = "";
  // TODO
}
