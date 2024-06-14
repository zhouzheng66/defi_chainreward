<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-05 21:32:40
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-05 21:32:43
 * @FilePath: /defi_chainreward/frontend/web/src/views/Bounties.vue
 * @Description: 悬赏列表
-->
<template>
  <div>
    <h1>Bounties</h1>
    <BountyList />
  </div>
</template>

<script>
import BountyList from "@/components/BountyList.vue";

export default {
  name: "Bounties",
  components: {
    BountyList,
  },
};
</script>
