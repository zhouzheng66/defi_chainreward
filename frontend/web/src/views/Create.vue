<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-05 21:33:04
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-05 21:33:08
 * @FilePath: /defi_chainreward/frontend/web/src/views/Create.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <CreateBounty />
  </div>
</template>

<script>
import CreateBounty from "@/components/CreateBounty.vue";

export default {
  name: "Create",
  components: {
    CreateBounty,
  },
};
</script>
