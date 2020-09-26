<template>
  <div class="users-list">
    <ul>
      <li>
        <span>{{ firstUserName }}</span>
        <img :src="firstUserIconUrl" />
      </li>
      <li>
        <span>{{ secondUserName }}</span>
        <img :src="secondUserIconUrl" />
      </li>
      <li>
        <span>{{ thirdUserName }}</span>
        <img :src="thirdUserIconUrl" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { usersListStore } from '../store/users-list.store';

import axios from 'axios';

export default Vue.extend({
  name: 'UsersList',
  computed: {
    firstUserName(): string {
      return usersListStore.state.users[0].name;
    },
    secondUserName(): string {
      return usersListStore.state.users[1].name;
    },
    thirdUserName(): string {
      return usersListStore.state.users[2].name;
    },
    firstUserIconUrl(): string {
      return usersListStore.state.users[0].iconUrl;
    },
    secondUserIconUrl(): string {
      return usersListStore.state.users[1].iconUrl;
    },
    thirdUserIconUrl(): string {
      return usersListStore.state.users[2].iconUrl;
    },
  },
  methods: {
    async getUsersListAndRenderList() {
      const result = await axios.post('./api/users');

      result.data.forEach((user: { name: string, iconUrl: string }, index: number) => {
        usersListStore.commit('setUserInfo', { index, name: user.name, iconUrl: user.iconUrl });
      });
    },
  },
  async mounted() {
    await this.getUsersListAndRenderList();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/* PC */
@media (min-width: 992px) {
}
/* Tablet */
@media (max-width: 991.98px) {
}
/* horizontal SP */
@media (max-width: 767.98px) {
}
/* SP */
@media (max-width: 575.98px) {
}
</style>
