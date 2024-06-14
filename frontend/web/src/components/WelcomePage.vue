<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-12 23:31:01
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 16:21:04
 * @FilePath: /defiChainreward/frontend/web/src/components/WelcomePage.vue
 * @Description: 欢迎页面
-->
<template>
  <div>
    <Introduction />
    <Team />
    <!-- <Header /> -->
    <Link />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Introduction from "./Welcome/Introduction.vue";
import Team from "./Welcome/Team.vue";
import Link from "./Welcome/Link.vue";
// import Header from "./Header.vue";
export default defineComponent({
  name: "WelcomePage",
  components: {
    Introduction,
    Team,
    Link,
  },
});
</script>
