<template>
  <q-layout view="hHh lpR fFf" style="background-color: #fff">
    <q-header class="bg-primary" reveal elevated>
      <q-toolbar>
        <q-toolbar-title class="text-white">
          E-vote
        </q-toolbar-title>
        <q-btn flat label="Home" to="/" />
        <q-btn flat label="elections" to="/elections"/>
        <q-btn v-if="!isLoggedIn" flat label="Login" to="/login" />
        <q-btn v-if="!isLoggedIn" flat label="Register" to="/register"/>
        <q-btn v-if="userRole === 'admin'" flat label="Admin" to="/admin"/>
        <q-btn v-if="isLoggedIn" flat label="Settings" to="/settings"/>
        <q-btn v-if="isLoggedIn" @click="logout" flat label="Logout"/>
        <q-avatar clickable v-if="user && isLoggedIn">
            <img :src="`/img/users/${user.photo}`" alt="" />
          </q-avatar>
      </q-toolbar>
    </q-header>
     
    <q-page-container>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" appear :duration="300">
        <router-view />
      </transition>
    </q-page-container>

    <q-footer reveal style="background-color: #34495e">
        <q-toolbar class="text-center">
          <q-toolbar-title>E-vote 2020</q-toolbar-title>
        </q-toolbar>
      </q-footer>
  </q-layout>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      slide: 1,
      autoplay: false
    }
  },
  computed: {
    ...mapGetters('auth', ['userRole', 'isLoggedIn', 'user'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>