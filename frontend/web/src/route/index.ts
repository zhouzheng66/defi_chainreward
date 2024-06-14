/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-05 21:29:05
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 13:59:06
 * @FilePath: /defi_chainreward/frontend/web/src/router.ts
 * @Description: 创建路由
 *
 */
import { createRouter, createWebHistory } from "vue-router";
import { createRouterGuards } from "./router-guard";
import { whiteNameList } from "./constant";
import { App } from "vue";

import Home from "../views/Home.vue";
import Bounties from "../views/Bounties.vue";
import Bounty from "../views/Bounty.vue";
import Create from "../views/Create.vue";
import HelloWorld from "../components/HelloWorld.vue";

const routes = [
  {
    path: "/",
    name: "helloworld",
    component: HelloWorld,
  },
  { path: "/pl", name: "pl", component: Home },
  {
    path: "/bounties",
    name: "bounties",
    component: Bounties,
  },
  {
    path: "/bounty/:id",
    name: "bounty",
    component: Bounty,
    props: true,
  },
  {
    path: "/create",
    name: "create",
    component: Create,
  },
];

export async function setupRouter(app: App) {
  // 创建路由守卫
  createRouterGuards(router, whiteNameList);

  app.use(router);

  // 路由准备就绪后挂载APP实例
  await router.isReady();
}

export const router = createRouter({
  history: createWebHistory(""),
  routes: routes,
});

export default router;
