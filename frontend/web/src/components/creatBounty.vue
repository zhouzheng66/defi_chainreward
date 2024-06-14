<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-13 14:20:21
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 14:22:22
 * @FilePath: /defiChainreward/frontend/web/src/components/creatBounty.vue
 * @Description: 创建悬赏页面
-->
<template>
  <div>
    <h1>创建悬赏</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">标题:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="description">描述:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <div>
        <label for="reward">奖励金额:</label>
        <input type="text" id="reward" v-model="reward" required />
      </div>
      <div>
        <label for="expiry">到期时间:</label>
        <input type="date" id="expiry" v-model="expiry" required />
      </div>
      <div>
        <label for="file">上传文件:</label>
        <input type="file" id="file" @change="handleFileUpload" required />
      </div>
      <button type="submit">提交</button>
    </form>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      description: "",
      reward: "",
      expiry: "",
      file: null,
      message: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("reward", this.reward);
      formData.append("expiry", this.expiry);
      formData.append("file", this.file);

      try {
        const response = await axios.post(
          "http://localhost:3000/createBounty",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.message = response.data.message;
      } catch (error) {
        console.error("Error uploading bounty:", error);
        this.message = "上传失败";
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
}

div {
  margin-bottom: 10px;
}

button {
  width: 100px;
  align-self: center;
}
</style>
