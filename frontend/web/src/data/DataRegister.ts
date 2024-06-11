/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 02:20:34
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-11 23:35:21
 * @FilePath: /defi_chainreward/frontend/web/src/data/DataRegister.ts
 * @Description: 事件注册
 */
import { homeData } from "./HomeData";
import { userData } from "./UserData";
import { walletData } from "./WalletData";
import { contractData } from "./ContractData";
const DataCache: any[] = [];
export const registerDataModel = (dataModel: any) => {
  DataCache.push(dataModel);
};
registerDataModel(homeData);
registerDataModel(userData);
registerDataModel(walletData);
registerDataModel(contractData);
export const dataModels = DataCache;
