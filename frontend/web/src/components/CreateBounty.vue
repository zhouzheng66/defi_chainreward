<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-05 21:32:10
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-05 21:32:13
 * @FilePath: /defi_chainreward/frontend/web/src/components/CreateBounty.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h2>Create Bounty</h2>
    <form @submit.prevent="submit">
      <div>
        <label for="title">Title</label>
        <input v-model="title" id="title" type="text" />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea v-model="description" id="description"></textarea>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateBounty",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    submit() {
      const bounty = {
        id: Date.now(),
        title: this.title,
        description: this.description,
      };
      this.$store.dispatch("createBounty", bounty);
      this.$router.push("/bounties");
    },
  },
};
</script>
