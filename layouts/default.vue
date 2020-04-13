<template>
  <v-app>
    <v-navigation-drawer app></v-navigation-drawer>

    <v-app-bar app dark color="#522D5B">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-tool-bar-title color="#E7D39F">PDU Monitor</v-tool-bar-title>
      <v-spacer></v-spacer>
      <v-menu small offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn text color="#E7D39F" v-on="on">Menu</v-btn>
        </template>
        <v-list>
          <v-list>
            <v-list-item nuxt-link to="/dashboard">
              <v-list-item-title class="body-2">Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item nuxt-link to="/">
              <v-list-item-title class="body-2">About</v-list-item-title>
            </v-list-item>
            <v-list-item nuxt-link to="/docs">
              <v-list-item-title class="body-2">Documents</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list>
      </v-menu>
      <v-btn
        v-if="isAuthenticated"
        text
        color="#E7D39F"
        nuxt-link
        to="/login"
        @click="logout"
      >
        <span>Logout</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="#D7385E" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">ASIAREP</v-list-item-title>
          <v-list-item-subtitle class="#E7D39F--text"
            >Internet of Things</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav class="mt-4">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid class="mt-4">
        <Nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookie from 'js-cookie'

export default {
  middleware: ['check-auth', 'auth'],
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/dashboard' },
        { title: 'Documents', icon: 'mdi-file-chart', link: '/docs' },
        { title: 'About', icon: 'mdi-help-box', link: '/' }
      ],
      right: null
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$store.commit('setToken', null)
      localStorage.setItem('token', null)
      Cookie.remove('jwt')
      localStorage.setItem('loggedIn', false)
      Cookie.set('loggedIn', false)
      this.$router.push('/login')
    }
  }
}
</script>

//https://colorhunt.co/palette/179481
