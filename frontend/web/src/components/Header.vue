<template>
  <div class="header">
    <a-row>
      <a-col :offset="1" :span="3">
        <a-image
          class="logo"
          :src="require('../assets/logo.png')"
          :preview="false"
        />
      </a-col>
      <a-col v-if="!isLogin" :offset="16" :span="2">
        <a-button
          @click="connectWallet"
          type="primary"
          ghost
          size="large"
          class="gradient-color sign-button"
        >
          <wallet-outlined class="sign-button-logo" />
          <span>Sign In</span>
        </a-button>
      </a-col>
      <a-col v-else :offset="12" :span="8">
        <a-row align="middle">
          <a-col :offset="8" :span="2" class="twitter-logo">
            <a href="https://www.twitter.com">
              <a-image
                width="70%"
                height="70%"
                :src="require('../assets/twitter.png')"
                :preview="false"
                @click="onTwitterLogin"
              />
            </a>
          </a-col>
          <a-col
            class="metamask-icon"
            :offset="1"
            :span="2"
            @click="onWalletClicked"
          >
            <IconSvg icon-name="#icon-metamask" />
          </a-col>
          <a-col class="wallet-address" :span="4" @click="onWalletClicked">
            {{ userAddress }}
          </a-col>
          <a-col :offset="1" :span="2">
            <a-image
              width="70%"
              height="70%"
              :src="require('../assets/RCToken_nonbackground.jpg')"
              :preview="false"
            />
          </a-col>
          <a-col :span="3"> {{ balanceOfRCT }} RCT</a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, onUnmounted } from "vue";
import { StringUtil } from "../core/utils/StringUtil";
import { EventBus } from "../plugins/EventBus";
import { EventWalletConnected } from "../events/EventWalletConnected";
import { EventWalletDisconnect } from "../events/EventWalletDisconnect";
import { EventWalletChainChanged } from "../events/EventWalletChainChanged";
import { ChainID } from "../const/enum/Chain";
import { walletData } from "../data/WalletData";
import { Toast } from "../plugins/Toast";
import { EventWalletAccountChanged } from "../events/EventWalletAccountChanged";
import IconSvg from "../components/IconSvg.vue";
import { contractData } from "../data/ContractData";
import { userData } from "../data/UserData";
import { ethers } from "ethers";
import { DialogModal } from "../plugins/DialogModal";
import { WalletOutlined } from "@ant-design/icons-vue";
// import { particleData ,SocialLoginType} from "../data/ParticleData";

export default defineComponent({
  name: "Header",

  components: { WalletOutlined, IconSvg },
  setup() {
    const isLogin = ref(walletData.isAuth);
    const balanceOfRCT = ref("0");
    const userAddress = ref(
      !StringUtil.isEmpty(walletData.address)
        ? walletData.shortAddress
        : "Sign In"
    );

    const connectWallet = async () => {
      const isChainValid = await walletData.isChainValid();
      if (!isChainValid) {
        // Toast.error("Please switch to the Scroll Sepolia network");
        // return Promise.resolve();
        return walletData.switchNetwork();
      }
      if (!StringUtil.isEmpty(walletData.address)) {
        Toast.warn("Wallet already connected");
        return Promise.resolve();
      }
      try {
        await walletData.connectWallet();
      } catch (e) {
        Toast.error("Connect wallet failed");
        console.error(e);
      }
    };

    onBeforeMount(() => {
      EventBus.instance.on(EventWalletConnected.eventAsync, onWalletConnect);
      EventBus.instance.on(
        EventWalletDisconnect.eventAsync,
        onWalletDisConnect
      );
      EventBus.instance.on(EventWalletChainChanged.eventAsync, onChainChanged);
      EventBus.instance.on(
        EventWalletAccountChanged.eventAsync,
        onAccountChange
      );
    });

    onUnmounted(() => {
      EventBus.instance.off(EventWalletConnected.eventAsync, onWalletConnect);
      EventBus.instance.off(
        EventWalletDisconnect.eventAsync,
        onWalletDisConnect
      );
      EventBus.instance.off(EventWalletChainChanged.eventAsync, onChainChanged);
      EventBus.instance.off(
        EventWalletAccountChanged.eventAsync,
        onAccountChange
      );
    });

    const onWalletConnect = async () => {
      userAddress.value = walletData.shortAddress;
      isLogin.value = walletData.isAuth;

      // await refreshLLT();
      await refreshRCT();
    };

    const onWalletDisConnect = () => {
      userAddress.value = "Sign In";
      isLogin.value = false;
    };

    const onChainChanged = (chainId: any) => {
      // TODO
      if (chainId === ChainID.Mumbai || chainId === ChainID.Scroll) {
        onWalletConnect();
      }
    };

    const onAccountChange = (account: string) => {
      if (!StringUtil.isEmpty(account)) {
        onWalletConnect();
      }
    };

    // const refreshLLT = async () => {
    //   const user = await userData.getUserData(walletData.address);
    //   let balance = ethers.constants.Zero;
    //   if (user) {
    //     try {
    //       balance = await user.balance();
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }

    //   const token = await contractData.rcTokenContract.balanceOf(
    //     walletData.address
    //   );
    //   balanceOfLLT.value = ethers.utils.formatEther(balance.add(token));
    // };
    const refreshRCT = async () => {
      balanceOfRCT.value = "10000";
    };

    const onWalletClicked = async () => {
      DialogModal.open("Do your want to sign out?", async () => {
        await walletData.disconnect();
      });
    };

    const onTwitterLogin = async () => {
      // await particleData.loginWithSocialAccount(SocialLoginType.Github);
    };

    return {
      isLogin,
      userAddress,
      connectWallet,
      balanceOfRCT,
      onWalletClicked,
      onTwitterLogin,
    };
  },
});
</script>

<!-- <style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 204, 0.9);
  padding: 10px 0;
  text-align: center;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.logo-size {
  /* background-color: #1890ff;*/
  /*width: 50%;*/
  /*height: 50%; */
}

.logo {
  width: 50%;
  height: 50%;
}

.metamask-icon {
  cursor: pointer;
}

.wallet-address {
  cursor: pointer;
}

.sign-button-logo {
  color: #4096ff;
}

.gradient-color {
  background: linear-gradient(to right, #2db7f5, #19be6b);
  -webkit-background-clip: text;
  color: transparent;
}

.sign-button {
  font-weight: bold;
  border: 2px solid #2db7f5;
}

.twitter-logo {
  cursor: pointer;
}
</style> -->
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(50, 50, 50, 0.9); /* 深灰色背景 */
  padding: 10px 0;
  text-align: center;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.logo-size {
  /* 可根据需求添加样式 */
}

.logo {
  width: 50%;
  height: 50%;
}

.metamask-icon {
  cursor: pointer;
}

.wallet-address {
  cursor: pointer;
  color: #ccc; /* 浅灰色文字 */
}

.sign-button-logo {
  color: #ccc; /* 浅灰色文字 */
}

.gradient-color {
  background: linear-gradient(to right, #000, #666); /* 黑到灰的渐变 */
  -webkit-background-clip: text;
  color: transparent;
}

.sign-button {
  font-weight: bold;
  border: 2px solid #666; /* 边框灰色 */
  color: #fff; /* 白色文字 */
  background-color: #333; /* 深灰色背景 */
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

.sign-button:hover {
  background-color: #555; /* 浅灰色背景 */
  border-color: #888; /* 边框颜色变浅 */
  color: #fff; /* 保持白色文字 */
}

.twitter-logo {
  cursor: pointer;
  color: #ccc; /* 浅灰色文字 */
}
</style>
