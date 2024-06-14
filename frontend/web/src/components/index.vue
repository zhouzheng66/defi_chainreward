<!--
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-12 23:29:02
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-13 14:23:24
 * @FilePath: /defiChainreward/frontend/web/src/components/index.vue
 * @Description: 主页
-->
<template>
  <div class="index">
    <Header class="margin-top" />
    <div v-if="!isLogin">
      <a-divider />
      <a-row>
        <a-col :offset="1" :span="22">
          <WelcomePage />
        </a-col>
      </a-row>
    </div>
    <div v-else>
      <createBounty />
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  onUnmounted,
  onMounted,
} from "vue";
import WelcomePage from "./WelcomePage.vue";
import Header from "./Header.vue";
import creatBounty from "./creatBounty.vue";
import { walletData } from "../data/WalletData";
import { EventBus } from "../plugins/EventBus";
import { EventWalletDisconnect } from "../events/EventWalletDisconnect";
import { EventWalletConnected } from "../events/EventWalletConnected";
import { EventWalletAccountChanged } from "../events/EventWalletAccountChanged";

export default defineComponent({
  name: "Index",

  components: { WelcomePage, Header, creatBounty },
  setup() {
    const isLogin = ref(walletData.isAuth);

    onBeforeMount(() => {
      EventBus.instance.on(EventWalletConnected.eventAsync, onSignIn);
      EventBus.instance.on(EventWalletDisconnect.eventAsync, onSignOut);
      EventBus.instance.on(
        EventWalletAccountChanged.eventAsync,
        onAccountChanged
      );
    });

    onMounted(() => {
      if (isLogin.value) {
        EventBus.instance.emit(EventWalletConnected.event, walletData.address);
      }
    });

    onUnmounted(() => {
      EventBus.instance.off(EventWalletConnected.eventAsync, onSignIn);
      EventBus.instance.off(EventWalletDisconnect.eventAsync, onSignOut);
      EventBus.instance.off(
        EventWalletAccountChanged.eventAsync,
        onAccountChanged
      );
    });

    const onSignIn = async () => {
      isLogin.value = true;
    };

    const onSignOut = () => {
      isLogin.value = false;
    };

    const onAccountChanged = () => {};

    return {
      isLogin,
    };
  },
});
</script>
