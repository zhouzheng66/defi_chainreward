/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-05 21:36:42
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-05 21:36:47
 * @FilePath: /defi_chainreward/frontend/web/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bounties: [],
  },
  mutations: {
    setBounties(state, bounties) {
      state.bounties = bounties;
    },
    addBounty(state, bounty) {
      state.bounties.push(bounty);
    },
  },
  actions: {
    fetchBounties({ commit }) {
      // 模拟获取数据
      const bounties = [
        { id: 1, title: "Bounty 1", description: "Description for Bounty 1" },
        { id: 2, title: "Bounty 2", description: "Description for Bounty 2" },
      ];
      commit("setBounties", bounties);
    },
    createBounty({ commit }, bounty) {
      commit("addBounty", bounty);
    },
  },
  getters: {
    bounties: (state) => state.bounties,
    bountyById: (state) => (id) =>
      state.bounties.find((bounty) => bounty.id === id),
  },
});
