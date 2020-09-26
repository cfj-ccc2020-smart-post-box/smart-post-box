<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <UsersList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import UsersList from '@/components/UsersList.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    HelloWorld,
    UsersList,
  },
});
</script>
