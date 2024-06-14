/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 01:55:55
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 14:12:28
 * @FilePath: /defi_chainreward/frontend/web/src/main.ts
 * @Description:入口文件
 */
import { createApp } from "vue";
import App from "./App.vue";
// @ts-ignore
import { router, setupRouter } from "./route";
import Antd from "ant-design-vue";
import { ethers } from "ethers";
import "ant-design-vue/dist/reset.css";
import { dataModels } from "./data/DataRegister";
import { message } from "ant-design-vue";
import { Toast } from "./plugins/Toast";
import { EventManager } from "./events/EventManager";

import "./assets/iconfont/iconfont.js";

const app = createApp(App);
app.use(Antd);
app.config.globalProperties.$ethers = ethers;

const startUp = async () => {
  for (let i = 0; i < dataModels.length; i++) {
    let dataModal = dataModels[i];
    await dataModal.init();
  }

  app.config.globalProperties.$gameEventListener = EventManager.getInstance();
  app.config.globalProperties.$message = message;

  Toast.$app = app;

  // 挂载路由
  //   await setupRouter(app);
  app.mount("#app");
};

startUp();
// import { createApp } from "vue";
// import App from "./App.vue";
// import { setupRouter, router } from "./route";
// import { Toast } from "./plugins/Toast";

// const app = createApp(App);
// // setupRouter(app);
// Toast.$app = app;
// app.mount("#app");
