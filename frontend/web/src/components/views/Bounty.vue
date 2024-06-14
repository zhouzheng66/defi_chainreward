<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-05 21:32:53
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-05 21:32:56
 * @FilePath: /defi_chainreward/frontend/web/src/views/Bounty.vue
 * @Description: 悬赏详细信息
-->
<template>
  <div>
    <BountyDetail :id="$route.params.id" />
  </div>
</template>

<script>
import BountyDetail from "@/components/BountyDetail.vue";

export default {
  name: "Bounty",
  components: {
    BountyDetail,
  },
};
</script>
