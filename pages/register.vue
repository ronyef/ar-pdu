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
          <!-- <v-img src="https://cdn.pixabay.com/photo/2015/09/25/18/47/tunnel-957963_1280.jpg" height="200px"></v-img> -->
          <v-card-title class="pt-8 px-8 justify-center headline"
            >REGISTER</v-card-title
          >
          <v-card-text class="px-10">
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                v-model="password1"
                label="Password"
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="password2"
                label="Confirm Password"
                type="password"
              ></v-text-field>
            </v-form>
            <span v-if="notMatchError" class="red--text caption"
              >Passwords do not match!</span
            >
            <span v-if="isError" class="red--text caption">{{
              errorMessage
            }}</span>
          </v-card-text>
          <v-card-actions class="px-10 pb-8 justify-center">
            <v-btn color="#E7D39F" :disabled="!valid" @click="signup"
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
      password1: '',
      password2: '',
      notMatchError: false,
      isError: false,
      errorMessage: ''
    }
  },
  methods: {
    signup() {
      if (this.password1 === this.password2) {
        this.notMatchError = false

        this.$fireAuth
          .createUserWithEmailAndPassword(this.email, this.password1)
          .then((user) => {
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
      } else {
        this.isError = false
        this.errorMessage = ''
        this.notMatchError = true
      }
    }
  }
}
</script>

<style>
.fill {
  background-image: url(https://cdn.pixabay.com/photo/2015/09/25/18/47/tunnel-957963_1280.jpg);
}
</style>
