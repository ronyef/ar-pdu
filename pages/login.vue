<template>
  <v-container fill-height fluid class="fill">
    <v-row justify="center">
      <v-spacer></v-spacer>
      <v-col md="4">
        <v-card
          class="mx-auto elevation-20 grey lighten-5"
          shaped
          max-width="344"
        >
          <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img> -->
          <v-card-title class="pt-8 px-8 justify-center headline"
            >USER LOGIN</v-card-title
          >
          <v-card-text class="px-10">
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                label="Email"
                required
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-form>
            <span v-if="isError" class="red--text caption">{{
              errorMessage
            }}</span>
          </v-card-text>
          <v-card-actions class="px-10 pb-8 justify-center">
            <v-btn color="#E7D39F" :disabled="!valid" @click="login"
              >Lets Go</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  layout: 'page',
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      isError: false,
      errorMessage: ''
    }
  },
  methods: {
    login() {
      // this.$store
      //   .dispatch('authenticateUser', {
      //     email: this.email,
      //     password: this.password
      //   })
      //   .then(() => {
      //     console.log('Sukses redirect')
      //     this.$router.push('/')
      //   })
      this.$fireAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user)
          this.$fireAuth.currentUser.getIdToken(true).then((token) => {
            this.$store.commit('setToken', token)
            localStorage.setItem('token', token)
            Cookie.set('jwt', token)
            this.$store.commit('login')
            localStorage.setItem('loggedIn', true)
            Cookie.set('loggedIn', true)
            this.$router.push('/')
          })
        })
        .catch((err) => {
          this.isError = true
          this.errorMessage = err.message
        })
    }
  }
}
</script>

<style>
.fill {
  background-image: url(https://cdn.pixabay.com/photo/2016/10/12/23/20/mining-excavator-1736289_1280.jpg);
}
</style>
