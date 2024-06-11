/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-05 21:50:55
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-06 16:37:46
 * @FilePath: /defi_chainreward/frontend/web/src/route/constant.ts
 * @Description: 这个文件的作用是定义一些常量，用于控制用户导航到受保护的路由时是否需要登录。

LOGIN_NAME是一个字符串，表示登录页面的路由名称。
whiteNameList是一个常量数组，表示不需要登录的路由名称。
WhiteNameList是一个类型别名，表示whiteNameList的类型。
WhiteName是一个类型别名，表示whiteNameList数组中的元素类型。
 */
export const LOGIN_NAME = "pl";

// 路由白名单
export const whiteNameList = [LOGIN_NAME, "404"] as const; // no redirect whitelist

export type WhiteNameList = typeof whiteNameList;

export type WhiteName = (typeof whiteNameList)[number];
