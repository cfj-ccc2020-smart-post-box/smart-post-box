import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const usersListStore = new Vuex.Store({
  state: {
    users: [
      {
        name: '-',
        iconUrl: './img/icons/safari-pinned-tab.svg',
      },
      {
        name: '-',
        iconUrl: './img/icons/safari-pinned-tab.svg',
      },
      {
        name: '-',
        iconUrl: './img/icons/safari-pinned-tab.svg',
      },
    ],
  },
  mutations: {
    setUserInfo(state, ops: { index: number; name: string; iconUrl: string }) {
      state.users[ops.index].name = ops.name;
      state.users[ops.index].iconUrl = ops.iconUrl;
    },
  },
});
