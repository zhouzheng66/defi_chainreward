<template>
  <div class="welcome-module">
    <div class="image">
      <img
        width="70%"
        height="70%"
        :src="require('../../assets/welcome/welcome_page.png')"
        :preview="false"
      />
    </div>
    <div class="content">
      <h2 class="gradient-color">
        Welcome to ChainReward: The Future of Decentralized Bounty Hunting
      </h2>
      <p>
        ChainReward is a cutting-edge blockchain bounty platform designed to
        revolutionize the way users post and accept bounties. Leveraging the
        power of blockchain technology, our platform ensures secure,
        transparent, and efficient transactions for both bounty issuers and
        acceptors.
      </p>
      <a-divider class="divider" />
      <div class="small-images">
        <img
          :src="require('../../assets/RCToken_nonbackground.jpg')"
          alt="Small Image 1"
          width="100"
          height="auto"
        />
        <img
          :src="require('../../assets/RCToken_nonbackground.jpg')"
          alt="Small Image 2"
          width="100"
          height="auto"
        />
        <img
          :src="require('../../assets/RCToken_nonbackground.jpg')"
          alt="Small Image 3"
          width="100"
          height="auto"
        />
        <img
          :src="require('../../assets/RCToken_nonbackground.jpg')"
          alt="Small Image 4"
          width="100"
          height="auto"
        />
        <img
          :src="require('../../assets/RCToken_nonbackground.jpg')"
          alt="Small Image 5"
          width="100"
          height="auto"
        />
        <img
          :src="require('../../assets/RCToken_nonbackground.jpg')"
          alt="Small Image 6"
          width="100"
          height="auto"
        />
        <!--        <img src="https://via.placeholder.com/100x100" alt="Small Image 1"/>-->
        <!--        <img src="https://via.placeholder.com/100x100" alt="Small Image 2"/>-->
        <!--        <img src="https://via.placeholder.com/100x100" alt="Small Image 3"/>-->
        <!--        <img src="https://via.placeholder.com/100x100" alt="Small Image 4"/>-->
        <!--        <img src="https://via.placeholder.com/100x100" alt="Small Image 5"/>-->
        <!--        <img src="https://via.placeholder.com/100x100" alt="Small Image 6"/>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gradient-color {
  background: linear-gradient(to right, #000, #666); /* 黑到灰的渐变 */
  -webkit-background-clip: text;
  color: transparent;
}

.welcome-module {
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  background-color: rgba(50, 50, 50, 0.6); /* 深灰色背景 */
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.image {
  flex: 1;
  padding: 1rem;
}

.image img {
  max-width: 100%;
  height: auto;
}

.content {
  flex: 2;
  padding: 1rem 2rem;
}

h2 {
  font-size: 28px;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #fff; /* 白色文字 */
}

p {
  font-size: 16px;
  color: #ccc; /* 浅灰色文字 */
  line-height: 1.4;
  margin-bottom: 2rem;
}

.small-images {
  margin-left: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.small-images img {
  max-width: 100px;
  height: auto;
  margin-right: 1rem;
}

.divider {
  height: 2px;
  background: transparent linear-gradient(to right, #333, #666); /* 深灰到浅灰的渐变 */
}
</style>
