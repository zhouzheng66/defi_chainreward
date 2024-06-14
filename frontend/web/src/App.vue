<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-12 00:24:15
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 12:44:39
 * @FilePath: /defiChainreward/frontend/web/src/App.vue
 * @Description: app.vue
-->
<template>
  <!-- <div>
    <img alt="Vue logo" src="./assets/logo.jpg" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div> -->
  <div>
    <Index />
    <ModalConfirm />
    <Loading />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Index from "./components/index.vue";
import ModalConfirm from "./components/ModalConfirm.vue";
import Loading from "./components/Loading.vue";
const components = {
  HelloWorld,
  ModalConfirm,
  Loading,
};
onBeforeMount(() => {
  const clientWidth = document.documentElement.clientWidth / 1280;
  const clientHeight = document.documentElement.clientHeight / 720;
  const clientZoom = clientHeight < clientWidth ? clientHeight : clientWidth;

  document.documentElement.style.zoom = String(clientZoom);
  // background UI
  document.documentElement.style.background =
    "linear-gradient(30deg, #9FA5D5, #E8F5C8) no-repeat fixed";
});
</script>

<style scoped></style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
