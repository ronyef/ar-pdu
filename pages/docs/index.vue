<template>
  <v-container>
    <h1>Documents</h1>
    <div v-for="item in test" :key="item.ts">
      {{ item.message }}
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch({ store }) {
    try {
      // bind on server with SSR not rebind on client.
      await store.dispatch('bindTestCollection')
    } catch (e) {
      console.error(e)
    }
  },
  computed: {
    ...mapGetters(['test'])
  },
  async mounted() {
    try {
      await this.$store.dispatch('bindTestCollection')
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style></style>
