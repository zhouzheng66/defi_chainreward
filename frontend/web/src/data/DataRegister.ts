/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 02:20:34
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 02:26:09
 * @FilePath: /defi_chainreward/frontend/web/src/data/DataRegister.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
