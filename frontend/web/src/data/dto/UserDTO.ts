/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 02:06:33
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 00:04:31
 * @FilePath: /defi_chainreward/frontend/web/src/data/dto/UserDTO.ts
 * @Description: 定义用户的传输对象
 */
import { BigNumber, ethers } from "ethers";
import { BaseDTO } from "./BaseDTO";
import { TaskDTO } from "./TaskDTO";
export class UserDTO extends BaseDTO {
  address: string = "";

  // TODO
  task: TaskDTO[] = [];
  public async getTask(): Promise<any> {
    return null;
  }
  public balance() {
    // TODO
    return ethers.BigNumber.from(1000);
  }
}
