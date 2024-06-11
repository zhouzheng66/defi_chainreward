/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-06 17:15:23
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-06 17:19:14
 * @FilePath: /defi_chainreward/frontend/web/src/requests/request.ts
 * @Description: 向后端发送request
 */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
});
export default instance;
