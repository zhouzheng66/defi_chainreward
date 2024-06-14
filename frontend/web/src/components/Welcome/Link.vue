<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-13 16:20:11
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 16:23:32
 * @FilePath: /defiChainreward/frontend/web/src/components/Welcome/Link.vue
 * @Description: 各种链接
-->
<template>
  <div class="footer-module">
    <a-row justify="space-around" align="middle">
      <a-col class="link link-border">
        <a
          href="https://sepolia.scrollscan.com/address/0x861ec40cf915a2036617272a81ed16b339952e51"
          target="_blank"
        >
          ContractAddress: 0x861ec40cf915a2036617272a81ed16b339952e51
        </a>
      </a-col>
      <a-col class="link link-border">
        <a
          href="https://github.com/zhouzheng66/defi_chainreward.git/blob/main/design/litepaper_en.md"
          target="_blank"
        >
          WhitePaper
        </a>
      </a-col>
      <a-col class="link link-border">
        <a href="https://twitter.com" target="_blank"> X(Twitter) </a>
      </a-col>
      <a-col class="link link-border">
        <a
          href="https://github.com/zhouzheng66/defi_chainreward.git"
          target="_blank"
        >
          GitHub
        </a>
      </a-col>
      <a-col class="link link-border">
        <a
          href="https://github.com/zhouzheng66/defi_chainreward.git"
          target="_blank"
        >
          Privacy Concerns
        </a>
      </a-col>
      <a-col class="link">
        <a
          href="https://github.com/zhouzheng66/defi_chainreward.git"
          target="_blank"
        >
          Terms & Conditions
        </a>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
// 你可以在此处添加链接的实际URL
</script>

<style scoped>
.footer-module {
  background-color: #333;
  color: #fff;
  padding: 1rem 0.5rem 0.5rem;
  text-align: center;
}

.link-border {
  padding-left: 0.7rem;
  padding-right: 1.1rem;
  /*border-left: 1px solid #ffd77a;*/
  border-right: 2px solid #fff;
}

.link a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
}

.link a:hover {
  text-decoration: underline;
}
</style>
