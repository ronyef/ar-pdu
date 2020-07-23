<template>
  <v-container>
    <h1>Dashboard - {{ this.$route.params.equipment }}</h1>
    <p>Realtime Machine Events</p>
    <br />
    <v-data-table
      :headers="headers"
      :items="eventsByMachine"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.ts="{ item }">
        {{
          $moment(new Date(item.ts.seconds * 1000)).format('DD MMM YYYY HH:mm')
        }}
      </template>
      <!-- <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="detailItem(item)">mdi-eye</v-icon>
      </template> -->
    </v-data-table>
    <br />
    <v-btn nuxt-link outlined to="/dashboard">Back to All Machines</v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      headers: [
        { text: 'Equipment', value: 'machine' },
        { text: 'Date Time', value: 'ts' },
        { text: 'Fault', value: 'fault' },
        { text: 'Category', value: 'category' },
        { text: 'Level', value: 'level' }
        // { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters(['eventsByMachine'])
  },
  async mounted() {
    try {
      await this.$store.dispatch(
        'bindEventsByMachineCollection',
        this.$route.params.equipment
      )
    } catch (e) {
      console.error(e)
    }
  },
  methods: {}
}
</script>

<style></style>
