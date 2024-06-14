<template>
  <div class="team-members-module">
    <h2 class="gradient-color">Our Team</h2>
    <p class="team-description">
      Meet the talented individuals behind our project.
    </p>
    <a-divider class="divider" />
    <div class="team-members">
      <div
        v-for="(member, index) in teamMembers"
        :key="index"
        class="team-member"
      >
        <div class="member-image">
          <img
            :src="member.image"
            alt="Team Member Image"
            class="rounded-image"
          />
          <div class="member-info">
            <p>{{ member.name }}</p>
            <p class="position">{{ member.position }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ZYZImage from "../../assets/welcome/ZYZ.jpg";
import weng from "../../assets/welcome/weng.png";
import wc from "../../assets/welcome/wc.png";
import wendy from "../../assets/welcome/wendy.png";
import jiang from "../../assets/welcome/jiang.png";
import kang from "../../assets/welcome/kang.png";

const teamMembers = ref([
  {
    name: "0xZYZ",
    position: "Team Leader",
    image: ZYZImage,
  },
  {
    name: "weng",
    position: "Blockchain Developer",
    image: weng,
  },
  {
    name: "wc",
    position: "Backend Developer",
    image: wc,
  },
  {
    name: "wendy",
    position: "Designer",
    image: wendy,
  },
  {
    name: "康智豪",
    position: "Designer",
    image: kang,
  },
  {
    name: "蒋瑞",
    position: "Designer",
    image: jiang,
  },
]);
</script>

<style scoped>
.team-members-module {
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(50, 50, 50, 0.6); /* 深灰色背景 */
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

h2 {
  font-size: 28px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: bold;
  color: #fff; /* 白色文字 */
}

.team-description {
  text-align: center;
  margin-bottom: 1rem;
  color: #ccc; /* 浅灰色文字 */
}

.team-members {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow: auto;
}

.team-member {
  flex: 0 0 calc(16.666% - 10px);
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
}

.member-image {
  position: relative;
}

.member-image img {
  max-width: 150px;
  height: auto;
  border-radius: 8px;
}

.member-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8); /* 黑色背景 */
  color: #fff; /* 白色文字 */
  text-align: center;
  padding: 10px;
}

.member-info p {
  margin: 0;
}

.position {
  font-size: 14px;
  color: #aaa; /* 浅灰色文字 */
}

.gradient-color {
  background: linear-gradient(to right, #000, #666); /* 黑到灰的渐变 */
  -webkit-background-clip: text;
  color: transparent;
}

.divider {
  height: 3px;
  background: transparent linear-gradient(to right, #333, #666); /* 深灰到浅灰的渐变 */
}
</style>
