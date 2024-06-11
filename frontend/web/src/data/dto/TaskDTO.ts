/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 02:08:21
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-11 23:16:11
 * @FilePath: /defi_chainreward/frontend/web/src/data/dto/TaskDTO.ts
 * @Description: 悬赏任务的传输对象
 */
import { BigNumber, ethers } from "ethers";
import { BaseDTO } from "./BaseDTO";
import { TaskStatus } from "@/const/enum/TaskStatus";
export class TaskDTO extends BaseDTO {
  //TODO
  taskId: number = 0;
  isser: string = "";
  describe: string = "";
  isCompleted: boolean = false;
  isActive: boolean = true;
  reward: BigNumber = BigNumber.from(0);
  expire: BigNumber = BigNumber.from(0);
  //   public get isExpire(): boolean {
  //     return;
  //   }

  public getTaskStatus(): TaskStatus {
    if (this.isActive) {
      return TaskStatus.DOING;
    } else if (this.isCompleted) {
      return TaskStatus.DONE;
    } else {
      return TaskStatus.NOT_START;
    }
  }
}
