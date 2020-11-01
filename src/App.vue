<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
  mounted() {
    this.getAllElections()
    this.fetchUser()
  },
  methods: {
    ...mapActions('auth', ['fetchUser']),
    ...mapActions('elections', ['getAllElections'])
  }
}
</script>
