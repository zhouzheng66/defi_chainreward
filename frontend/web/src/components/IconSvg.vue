<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-12 23:48:53
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 00:16:09
 * @FilePath: /defiChainreward/frontend/web/src/components/IconSvg.vue
 * @Description:用于显示一个 SVG 图标。组件接收一个名为 iconName 的属性，该属性表示要显示的图标名称。
-->
<template>
  <div class="icon-svg">
    <svg class="iconSvg" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "IconSvg",
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.iconSvg {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
