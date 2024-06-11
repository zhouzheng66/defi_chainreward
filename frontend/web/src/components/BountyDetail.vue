<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-05 21:31:51
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-05 21:31:54
 * @FilePath: /defi_chainreward/frontend/web/src/components/BountyDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h2>{{ bounty.title }}</h2>
    <p>{{ bounty.description }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BountyDetail",
  computed: {
    ...mapGetters({
      bounty: (state) => (id) => state.bountyById(id),
    }),
  },
  props: ["id"],
};
</script>
