/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-05 21:51:15
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-05 21:51:21
 * @FilePath: /defi_chainreward/frontend/web/src/route/router-guard.ts
 * @Description:主要目的是为Vue Router路由添加守卫（Guard），以控制用户在不同的路由之间进行导航。
 */
import { Router } from "vue-router";
import { walletData } from "../data/WalletData";
import { LOGIN_NAME, WhiteNameList } from "./constant";

const defaultRoutePath = "/index";

export function createRouterGuards(
  router: Router,
  whiteNameList: WhiteNameList
) {
  router.beforeEach(async (to, _, next) => {
    const isLogin = walletData.isAuth;

    if (isLogin) {
      if (to.name === LOGIN_NAME) {
        next({ path: defaultRoutePath });
      } else {
        next();
      }
    } else {
      // not login
      if (whiteNameList.some((n) => n === to.name)) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({ name: LOGIN_NAME, replace: true });
      }
    }
  });
}
