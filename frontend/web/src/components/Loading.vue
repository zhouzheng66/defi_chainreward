<template>
  <div v-if="isLoading" class="loading-overlay">
    <a-spin size="large" class="loading-spinner" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted, ref } from "vue";
import { EventBus } from "../plugins/EventBus";
import { EventLoading } from "../events/EventLoading";

export default defineComponent({
  name: "Loading",

  setup() {
    const isLoading = ref(false);

    onBeforeMount(() => {
      EventBus.instance.on(EventLoading.event, onLoading);
    });

    onUnmounted(() => {
      EventBus.instance.off(EventLoading.event, onLoading);
    });

    const onLoading = (state: boolean) => {
      isLoading.value = state;
    };

    return {
      isLoading,
      onLoading,
    };
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  color: #1890ff; /* 修改颜色根据需要 */
}
</style>
