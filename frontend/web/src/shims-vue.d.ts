/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-12 00:24:15
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-12 22:55:57
 * @FilePath: /defiChainreward/frontend/web/src/shims-vue.d.ts
 * @Description: 这段代码的主要目的是声明模块，以防止 TypeScript 编译器在未定义的模块上报错。
 */
/*

/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
