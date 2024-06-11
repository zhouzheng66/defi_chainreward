<template>
  <div>
    <ul>
      <li v-for="bounty in bounties" :key="bounty.id">
        <router-link :to="'/bounty/' + bounty.id">{{
          bounty.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BountyList",
  computed: {
    ...mapGetters(["bounties"]),
  },
  created() {
    this.$store.dispatch("fetchBounties");
  },
};
</script>
