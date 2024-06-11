/*
这段代码的主要目的是声明模块，以防止 TypeScript 编译器在未定义的模块上报错。
/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "wow.js";
