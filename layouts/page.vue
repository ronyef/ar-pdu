<template>
  <v-app>
    <v-app-bar app flat fixed color="transparent">
      <v-tool-bar-title class="grey--text"
        >Asiarep Internet of Things</v-tool-bar-title
      >
      <v-spacer></v-spacer>
      <v-btn text color="grey" nuxt-link to="/register">
        <v-icon left>mdi-account-plus</v-icon>
        <span>Register</span>
      </v-btn>
      <v-btn text color="grey" nuxt-link to="/login">
        <v-icon left>mdi-login</v-icon>
        <span>Login</span>
      </v-btn>
    </v-app-bar>
    <Nuxt />
    <v-footer fixed dark color="transparent">
      <v-btn
        v-for="link in links"
        :key="link"
        color="grey lighten-1"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-spacer></v-spacer>
      <div>
        <span color="grey lighten-1"
          >&copy; {{ new Date().getFullYear() }}</span
        >
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      links: ['About Us', 'Team', 'Contact Us']
    }
  }
}
</script>

<style scoped>
.left {
  background-image: url(../assets/images/mining2.jpeg);
  /* background: rgba(82, 45, 91, 1); */
  height: 100vh;
}
.content {
  background: #d7385e;
}
</style>

// #D7385E // #522D5B
